'use client';
import { useState, useEffect } from 'react';
import CourseNavBar from '../../../../components/CourseNavBar';
import Sidebar from '../../../../components/Sidebar';
import Loader from '../../../../components/Loader';
import { FaChevronDown } from 'react-icons/fa';
import db from '../../../../lib/firebase';
import { Auth } from 'firebase/auth';
import { getDoc, getDocs, doc, where, query, documentId, collection, updateDoc, setDoc } from 'firebase/firestore';
import { useParams } from 'next/navigation';


export default function assignGrade() {
    console.log('hi');
    const [loading, setLoading] = useState(false);
    const [studentInfo, setStudentInfo] = useState([]);
    const [grade, setGrade] = useState('');
    let [assignmentType, setAssignmentType] = useState('');

    let { name, courseCode, studentUid } = useParams();
    name = name ? decodeURI(name) : '';
    courseCode = courseCode ? decodeURI(courseCode) : '';
    studentUid = studentUid ? decodeURI(studentUid) : '';
    console.log(courseCode);
    console.log(name);
    console.log(studentUid);


    // Demo students array to display some students but will later have data 
    // displayed from the database
    const [students, setStudents] = useState([
        { firstName: 'John', lastName: 'Doe', grade: 'A', assignments: [{ name: 'Assignment 1', grade: 90 }, { name: 'Assignment 2', grade: 85 }] },
        { firstName: 'Jane', lastName: 'Doe', grade: 'B', assignments: [{ name: 'Assignment 1', grade: 80 }, { name: 'Assignment 2', grade: 75 }] },
        { firstName: 'Jim', lastName: 'Smith', grade: 'C', assignments: [{ name: 'Assignment 1', grade: 70 }, { name: 'Assignment 2', grade: 65 }] },
        { firstName: 'Jill', lastName: 'Johnson', grade: 'A', assignments: [{ name: 'Assignment 1', grade: 95 }, { name: 'Assignment 2', grade: 90 }] },
        { firstName: 'Jack', lastName: 'Brown', grade: 'B', assignments: [{ name: 'Assignment 1', grade: 85 }, { name: 'Assignment 2', grade: 80 }] },
    ]);

    const toggleAssignments = index => {

    };

    const updateGrade = (studentIndex, assignmentIndex, newGrade) => {
        const newStudents = [...students];
        newStudents[studentIndex].assignments[assignmentIndex].grade = newGrade;
        setStudents(newStudents);
    };

    const handleGradeSubmit = async (grade) => {
        try {
            const studentRef = collection(db, 'students');
            const querySnapshot = await getDocs(studentRef);

            querySnapshot.forEach(async (studentDoc) => {
                if (studentDoc.data().uid === studentUid) {
                    const registeredCoursesRef = collection(studentDoc.ref, 'registeredCourses');
                    const courseDocRef = doc(registeredCoursesRef, courseCode);
                    const courseDocSnapshot = await getDoc(courseDocRef);

                    if (courseDocSnapshot.exists()) {
                        const submittedAssignments = courseDocSnapshot.data().submittedAssignments || [];
                        let updatedSubmittedAssignments = submittedAssignments.map(async (assignment) => {

                            if (assignment.name === name) {
                                if (assignment.grade == null) {
                                    const course = doc(db, 'courses', courseCode);
                                    const courseDoc = await getDoc(course);

                                    if (courseDoc.exists()) {
                                        const gradedAssignments = courseDoc.data().gradedAssignments ? courseDoc.data().gradedAssignments : [];
                                        let updatedGradedAssignments = [...gradedAssignments, { email: studentDoc.data().email, assignmentName: name, grade: grade }]
                                        await updateDoc(course, { gradedAssignments: updatedGradedAssignments });
                                        console.log('Updated gradedAssignments in the courses document');
                                    } else {
                                        // Create the courses document if it doesn't exist
                                        await setDoc(course, { gradedAssignments: [{ email: studentDoc.data().email, assignmentName: name, grade: grade }] });
                                        console.log('Created courses document and added gradedAssignments');
                                    }

                                    return { ...assignment, grade: grade };


                                }
                            }
                            return assignment; //return assignment
                        });
                        updatedSubmittedAssignments = await Promise.all(updatedSubmittedAssignments);
                        // Update the submittedAssignments array in the document
                        await updateDoc(courseDocRef, { submittedAssignments: updatedSubmittedAssignments });
                        console.log('added to database');

                        window.location.href = `/${courseCode}/assignments`;

                    }
                }
            });

            setLoading(false);
        } catch (error) {
            console.error('Error updating grade:', error);
            setLoading(false);
        }
    };



    useEffect(() => {
        const fetchStudentInfo = async () => {
            try {
                const studentRef = collection(db, 'students');

                const querySnapshot = await getDocs(studentRef);

                const studentsData = [];

                querySnapshot.forEach(async (studentDoc) => {
                    if (studentDoc.data().uid === studentUid) {

                        const registeredCoursesRef = collection(studentDoc.ref, 'registeredCourses');
                        const coursesQuerySnapshot = await getDocs(query(registeredCoursesRef, where(documentId(), '==', courseCode)));

                        coursesQuerySnapshot.forEach((courseDoc) => {
                            const submittedAssignments = courseDoc.data().submittedAssignments || [];
                            submittedAssignments.forEach(async (assignment) => {
                                if (assignment.name === name) {
                                    studentsData.push({
                                        studentName: `${studentDoc.data().firstName} ${studentDoc.data().lastName}`,
                                        assignmentSubmission: assignment.submission, assignmentFileSubmission: assignment.fileSubmission
                                    });

                                    const quizRef = doc(db, 'quizzes', name);
                                    const quizSnapshot = await getDoc(quizRef);

                                    if (!quizSnapshot.empty) {
                                        setAssignmentType('quiz');
                                    } else {
                                        setAssignmentType('essay');
                                    }
                                    console.log(assignmentType);
                                    console.log(studentsData);

                                }
                            });
                        });
                        setStudentInfo(studentsData);



                    }

                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching student info:', error);
                setLoading(false);
            }
        };

        fetchStudentInfo();


    }, [studentInfo, assignmentType]);

    if (loading) {
        return <Loader />; // Return the Loading component if loading is true
    }



    return (
        <>
            {assignmentType = 'essay' && <>
                <div className="flex flex-col md:flex-row bg-blue-100">
                    <Sidebar />
                    <div className="relative md:ml-64">
                        <CourseNavBar />
                    </div>
                    <div className="p-6 text-center w-full">
                        <h1 className="text-3xl text-black font-semibold mb-4" data-testid="course-heading">{studentInfo.studentName}</h1>
                        <h2 className="text-3xl text-black font mt-4" data-testid="assignments-heading">{name}</h2>
                        <div className="overflow-x-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {studentInfo.map((student, index) => (

                                    student.assignmentFileSubmission ? (

                                        <div key={index} className="bg-white rounded-lg p-6 border border-gray-300">
                                            <p className="font-semibold text-lg">{student.studentName}</p>
                                            <p className="text-gray-500 mb-4">{student.assignmentSubmission}</p>

                                            <div className="flex items-center justify-between">
                                                <input
                                                    type="number"
                                                    className="w-24 p-2 border border-gray-300 rounded"
                                                    placeholder="/100"
                                                    value={grade}
                                                    onChange={(e) => setGrade(e.target.value)}
                                                />
                                                <button
                                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                                    onClick={() => handleGradeSubmit(grade)}
                                                >
                                                    Grade 
                                                </button>
                                            </div>
                                        </div>) : (
                                       <div key={index} className="rounded-lg p-6 border border-gray-300">
                                       <iframe className="mb-5" src={student.assignmentSubmission} title="Downloaded PDF" width="900px" height="800px" />
                                   
                                       <div>
                                           <p className="font-semibold text-lg">{student.studentName}</p>
                                       </div>
                                   
                                       <div className="flex items-center mt-4">
                                           <input
                                               type="number"
                                               className="w-24 p-2 border border-gray-300 rounded"
                                               placeholder="/100"
                                               value={grade}
                                               onChange={(e) => setGrade(e.target.value)}
                                           />
                                           <button
                                               className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-2"
                                               onClick={() => handleGradeSubmit(grade)}
                                           >
                                               Grade
                                           </button>
                                       </div>
                                   </div>                                   
                                   
                                    )

                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </>
            }
        </>
    );
}

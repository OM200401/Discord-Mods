'use client';
import { useState, useEffect } from 'react';
import CourseNavBar from '../../../../views/CourseNavBar';
import Sidebar from '../../../../views/Sidebar';
import Loader from '../../../../views/Loader';
import { FaChevronDown } from 'react-icons/fa';
import db from '../../../../lib/firebase';
import { Auth } from 'firebase/auth';
import { getDoc, getDocs, doc, where, query, documentId, collection, updateDoc, setDoc } from 'firebase/firestore';
import { useParams } from 'next/navigation';


import { getStudentDocs, updateStudentSubmittedAssignments } from '../../../../models/User';
import { getRegisteredCoursesDoc,getCourseDoc, getCourseRef, setGradedAssignments,updateGradedAssignments, getRegisteredCoursesRef } from '../../../../models/Course';
import { getQuizDoc } from '../../../../models/Assignment';


export default function AssignGrade() {
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
            const querySnapshot = await getStudentDocs();

            querySnapshot.forEach(async (studentDoc) => {
                if (studentDoc.data().uid === studentUid) {
                    const courseDocSnapshot = await getRegisteredCoursesDoc(studentDoc,courseCode);
                    const courseDocRef = await getRegisteredCoursesRef(studentDoc,courseCode);
                    if (courseDocSnapshot.exists()) {
                        const submittedAssignments = courseDocSnapshot.data().submittedAssignments || [];
                        let updatedSubmittedAssignments = submittedAssignments.map(async (assignment) => {

                            if (assignment.name === name) {
                                if (assignment.grade == null) {
                                    const course = await getCourseRef(courseCode);
                                    const courseDoc = await getCourseDoc(courseCode);

                                    if (courseDoc.exists()) {
                                       await updateGradedAssignments(course,courseDoc,studentDoc.data().email,name, grade);

                                    } else {
                                        // Create the courses document if it doesn't exist
                                        await setGradedAssignments(course,studentDoc.data().email,name,grade);
                                       console.log('Created courses document and added gradedAssignments');
                                    }

                                    return { ...assignment, grade: grade };


                                }
                            }
                            return assignment; //return assignment
                        });
                        updatedSubmittedAssignments = await Promise.all(updatedSubmittedAssignments);
                        // Update the submittedAssignments array in the document
                        await updateStudentSubmittedAssignments(courseDocRef,updatedSubmittedAssignments);
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

                const querySnapshot = await getStudentDocs();

                const studentsData = [];

                querySnapshot.forEach(async (studentDoc) => {
                    if (studentDoc.data().uid === studentUid) {

                        // const registeredCoursesRef = collection(studentDoc.ref, 'registeredCourses');
                        // const coursesQuerySnapshot = await getDocs(query(registeredCoursesRef, where(documentId(), '==', courseCode)));
                        
                        const coursesRegisteredDoc = await getRegisteredCoursesDoc(studentDoc,courseCode);

                       
                            const submittedAssignments = coursesRegisteredDoc.data().submittedAssignments || [];
                            submittedAssignments.forEach(async (assignment) => {
                                if (assignment.name === name) {
                                    studentsData.push({
                                        studentName: `${studentDoc.data().firstName} ${studentDoc.data().lastName}`,
                                        assignmentSubmission: assignment.submission, assignmentFileSubmission: assignment.fileSubmission
                                    });

                                    const quizSnapshot = await getQuizDoc(name);

                                    if (!quizSnapshot.empty) {
                                        setAssignmentType('quiz');
                                    } else {
                                        setAssignmentType('essay');
                                    }
                                    console.log(assignmentType);
                                    console.log(studentsData);

                                }
                         
                        });
                        setStudentInfo(studentsData);
                        console.log(studentInfo);


                    }

                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching student info:', error);
                setLoading(false);
            }
        };

        fetchStudentInfo();


    }, []);

    if (loading) {
        return <Loader />; // Return the Loading component if loading is true
    }



    return (
        <>
            {assignmentType = 'essay' && <>
                <div className="flex flex-col md:flex-row bg-blue-100">
                    <Sidebar  />
                    <div className="relative md:ml-64">
                        <CourseNavBar />
                    </div>
                    <div className="p-6 text-center w-full">
                        <h1 className="text-3xl text-black font-semibold mb-4" data-testid="course-heading">{studentInfo.studentName}</h1>
                        <h2 className="text-3xl text-black font mt-4" data-testid="assignments-heading">{name}</h2>
                        <div className="overflow-x-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {studentInfo.map((student, index) => (

                                    student.assignmentFileSubmission=='false' ? (

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
                                       <iframe src={student.assignmentSubmission} type="pdf" className="mb-5" title="Downloaded PDF" width="900px" height="800px" />
                                      

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

'use client';
import { useState, useEffect } from 'react';
import CourseNavBar from '../../../views/CourseNavBar';
import Sidebar from '../../../views/Sidebar';
import Loader from '../../../views/Loader';
import { FaChevronDown } from 'react-icons/fa';
import db from '../../../lib/firebase';
import { Auth } from 'firebase/auth';
import {getDoc,getDocs,doc,where,query, documentId,collection} from 'firebase/firestore';
import { useParams } from 'next/navigation';
import { getStudentDocs } from '../../../models/User';
import { getRegisteredCoursesDoc } from '../../../models/Course';

export default function Assignments() {

    const [loading, setLoading] = useState(false);
    const [studentInfo,setStudentInfo] =useState([]);
    const [userName,setUserName] = useState('non');
    const [userType, setUserType] = useState('');

    let { name,courseCode } = useParams();
    name = name ? decodeURI(name) : '';
    courseCode = courseCode ? decodeURI(courseCode) : '';
    console.log(courseCode);
    console.log(name);
    
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

    useEffect(() => {
        
        const fetchStudentInfo = async () => {
            try {
                setUserType('Teacher');
                
                const querySnapshot = await getStudentDocs();

                const studentsData = [];
                await Promise.all(querySnapshot.docs.map(async (studentDoc) => {
                    const courseDoc = await getRegisteredCoursesDoc(studentDoc,courseCode);
                 
                    if(courseDoc.exists())   {     
                        const submittedAssignments = courseDoc.data().submittedAssignments || [];
                 
                        submittedAssignments.forEach((assignment) => {
                            if (assignment.name === name) {
                                if(assignment.grade == null) {
                                    studentsData.push({
                                        studentName: `${studentDoc.data().firstName} ${studentDoc.data().lastName}`,
                                        assignmentName: assignment.name,
                                        studentUid: studentDoc.data().uid
                                    });
                                }
                            }
                        });
                    }
                }));
                setStudentInfo(studentsData);

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
        <div className="flex flex-col md:flex-row bg-blue-100">
            <Sidebar userName={userName} userType={"Teacher"}/>
            <div className="relative md:ml-64">
                <CourseNavBar />
            </div>
            <div className="p-6 text-center w-full">
                <h1 className="text-3xl text-black font-semibold mb-4" data-testid="course-heading">Course Name</h1>
                <h2 className="text-3xl text-black font mt-4" data-testid="assignments-heading">Students</h2>
                <div className="overflow-x-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        { studentInfo.map((student, index) => (
                            <div key={index} className="bg-white rounded-lg p-6 border border-gray-300">
                                <p className="font-semibold text-lg">{student.studentName}</p>
                                <p className="text-gray-500 mb-4">{student.assignmentName}</p>
                                <a href={`/${courseCode}/assignGrade/${name}/${student.studentUid}`} className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Grade this submission</a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
    }
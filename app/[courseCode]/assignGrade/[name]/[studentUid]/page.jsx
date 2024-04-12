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
import { fetchStudentInfo } from '../../../../utilities/AssignGradeUtilities';
import AssignGradeView from '../../../../views/AssignGradeView';


export default function AssignGrade() {
    // State variables
    const [loading, setLoading] = useState(false); // State for storing loading status
    const [studentInfo, setStudentInfo] = useState([]); // State for storing student information
    const [grade, setGrade] = useState(''); // State for storing grade
    let [assignmentType, setAssignmentType] = useState(''); // State for storing assignment type

    // Extracting parameters from URL
    let { name, courseCode, studentUid } = useParams();
    name = name ? decodeURI(name) : '';
    courseCode = courseCode ? decodeURI(courseCode) : '';
    studentUid = studentUid ? decodeURI(studentUid) : '';


    // Demo students array to display some students but will later have data 
    // displayed from the database
  

    

    // Function for handling grade submission
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


    // Effect hook for fetching student info
    useEffect(() => {
        fetchStudentInfo(studentUid, name, courseCode, setLoading, setStudentInfo, setAssignmentType);


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
                    <AssignGradeView studentInfo={studentInfo} grade={grade} setGrade={setGrade} handleGradeSubmit={handleGradeSubmit} />


                                    
                           
                </div>
            </>
            }
        </>
    );
}

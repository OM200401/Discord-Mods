'use client';
import CourseNavBar from '../../../views/StuCourseNavBar.jsx';
import Sidebar from '../../../views/Sidebar.jsx';
import { useState, useEffect } from 'react';
import Loader from '../../../views/Loader.jsx';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '../../../lib/firebase';

import { getStudentDoc,updateStudentGrade } from '../../../utilities/StudentUtilities.js';
import { getRegisteredCoursesDoc, getRegisteredCoursesRef } from '../../../models/Course.js';
import { getEssayDoc,getQuizDoc} from '../../../models/Assignment.js';
import { calculateCumulativeGrade } from '../../../utilities/CalculateGradeUtilities.js';
import { GradeView } from '../../../views/StudentGradeView.jsx';

export default function Grades({params}) {
    const courseCode = params.courseCode; // Course code from the params

    const [loading, setLoading] = useState(true); // State for storing loading status
    const [currentAssignments, setCurrentAssignments] = useState([]); // State for storing current assignments
    const [user,setUser] = useState(null); // State for storing user
    const [userType,setUserType] = useState('user'); // State for storing user type
    const [userName,setUserName] = useState('non'); // State for storing user name
    const [grade, setGrade] = useState(''); // State for storing grade   

    // Function for calculating cumulative grade
  
    //Effect hook for handling authentication state change
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if(auth.currentUser){
                setUser(auth.currentUser);
                try {
                    if (user) {
                        // Query for the student document
                        let studentDoc = await getStudentDoc(user.uid);
                        let gradeWeightArray = [];

                   
                        if (studentDoc) {
                            // Query for the registeredCourses subcollection document
                            const courseDocSnapshot = await getRegisteredCoursesDoc(studentDoc,courseCode);
                            const courseRef = await getRegisteredCoursesRef(studentDoc,courseCode);
                            if (courseDocSnapshot.exists()) {
                                // Get the submittedAssignments array
                                const submittedAssignments = courseDocSnapshot.data().submittedAssignments || [];
                                
                                // Filter the submittedAssignments where grade is not null
                                const filteredAssignments = submittedAssignments.filter(assignment => assignment.grade !== null);

                                Promise.all(filteredAssignments.map(async (assignment) => {
                                   
                                    const [quizSnapshot, essaySnapshot] = await Promise.all([
                                        getQuizDoc(assignment.name),
                                        getEssayDoc(assignment.name)
                                    ]);
                                
                                    if (quizSnapshot.exists()) {
                                        gradeWeightArray.push({ grade: parseInt(assignment.grade), weight: parseInt(quizSnapshot.data().weightage) });
                                    } else {
                                        gradeWeightArray.push({ grade: parseInt(assignment.grade), weight: parseInt(essaySnapshot.data().weightage) });
                                }
                                })).then(() => {
                                    console.log(gradeWeightArray);
                                    setGrade(Math.round(calculateCumulativeGrade(gradeWeightArray)));
                                  
                                }).catch(error => {
                                    console.error('Error fetching documents:', error);
                                });

                                await updateStudentGrade(courseRef,grade);
                                setCurrentAssignments(filteredAssignments);

                            } else {
                                console.log('Course document not found.');
                            }
                        } else {
                            console.log('Student document not found.');
                        }
                    } else {
                        console.log('User not authenticated.');
                    }
                } catch (error) {
                    console.error('Error fetching assignments:', error);
                } finally {
                    setLoading(false); // Set loading to false after fetching assignments
                }
                    // Iterate through each assignment name and fetch data
               
            }
        });

        return () => unsubscribe();
    }, [grade]); // Add courseCode as a dependency


    // if (loading) {
    //     return <Loader data-testid="loader" />; // Return the Loading component if loading is true
    // }

    return (

            <div className="flex flex-col md:flex-row bg-blue-100">
                <Sidebar userName={userName} userType={"Student"} />
                <div className="relative md:ml-64">
                    <CourseNavBar courseCode={courseCode} data-testid="course-navbar"/>
                   
                </div>
                <GradeView currentAssignments={currentAssignments}  grade={grade} courseCode={courseCode}/>
            </div>
        );
           
                                
}

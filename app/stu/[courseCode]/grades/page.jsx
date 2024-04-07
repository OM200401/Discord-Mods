'use client';
import CourseNavBar from '../../../components/StuCourseNavBar.jsx';
import Sidebar from '../../../components/Sidebar';
import { useState, useEffect } from 'react';
import Loader from '../../../components/Loader.jsx';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../lib/firebase';
import { getDoc, doc,getDocs,query,collection, where } from 'firebase/firestore';
import db from '../../../lib/firebase.js'

export default function Grades({params}) {
    const courseCode = params.courseCode;

    const [loading, setLoading] = useState(true);
    const [currentAssignments, setCurrentAssignments] = useState([]);
    const [user,setUser] = useState(null);
    const [userType,setUserType] = useState('user');
    const [userName,setUserName] = useState('non');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if(auth.currentUser){
                setUser(auth.currentUser);
                try {
                    if (user) {
                        // Query for the student document
                        const studentQuerySnapshot = await getDocs(collection(db, 'students'));
                        let studentDoc;

                        studentQuerySnapshot.forEach(doc => {
                            if (doc.data().uid === user.uid) {
                                studentDoc = doc;
                            }
                        });
        
                        if (studentDoc) {
                            // Query for the registeredCourses subcollection document
                            const registeredCoursesRef = collection(studentDoc.ref, 'registeredCourses');
                            const courseDocRef = doc(registeredCoursesRef, courseCode);
                            const courseDocSnapshot = await getDoc(courseDocRef);
        
                            if (courseDocSnapshot.exists()) {
                                // Get the submittedAssignments array
                                const submittedAssignments = courseDocSnapshot.data().submittedAssignments || [];
        
                                // Filter the submittedAssignments where grade is not null
                                const filteredAssignments = submittedAssignments.filter(assignment => assignment.grade !== null);
        
                                // Update the state with filtered assignments
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
    }, []); // Add courseCode as a dependency

    // Demo assignments array to display some assignments but will later have data 
    // displayed from the database
    // const assignments = [
    //     { title: 'Assignment 1', dueDate: '2022-01-01', points: 100 },
    //     { title: 'Assignment 2', dueDate: '2022-01-15', points: 150 },
    //     { title: 'Assignment 3', dueDate: '2022-01-15', points: 150 },
    //     { title: 'Assignment 4', dueDate: '2022-01-15', points: 150 },
    //     { title: 'Assignment 5', dueDate: '2022-01-15', points: 150 },
    // ];


    if (loading) {
        return <Loader data-testid="loader" />; // Return the Loading component if loading is true
    }

    return (
            <div className="flex flex-col md:flex-row bg-blue-100">
                <Sidebar userName={userName} userType={"Student"} />
                <div className="relative md:ml-64">
                    <CourseNavBar courseCode={courseCode} data-testid="course-navbar"/>
                   
                </div>
                <div className="p-6 text-center w-full">
                    <h1 className="text-3xl text-black font-semibold mb-4" data-testid="course-heading">{courseCode}</h1>
                    <h2 className="text-3xl text-black font mt-4 mb-6" data-testid="assignments-heading">Assignments</h2>
                    <div className="flex justify-end"></div>
                    <div className="overflow-x-auto">
                        {currentAssignments.map((assignment, index) => (
                            <div key={index} className="bg-gray-100 mb-4 p-4 rounded border border-gray-300">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-blue-400 hover:blue5-00">{assignment.name}</h3>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600">Grade: {assignment.grade}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
           
                                
}

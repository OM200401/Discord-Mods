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
                  console.log(user);
                  const userInfoRef = collection(db,'students');
                  const q = query(userInfoRef, where('uid','==',user.uid));
                //   console.log(q);
                  try{
                      const querySnapshot = await getDocs(q);
                      querySnapshot.forEach((doc) => {
                          setUserName(doc.data().firstName);
                          setUserType(doc.data().userType);
                        //   console.log(doc.data().firstName);
                      })
                  }catch(error){
                      console.log(error.message);
                  }  

                const coursesRef = doc(db, 'courses', courseCode);
                const courseSnapshot = await getDoc(coursesRef);

                if (courseSnapshot.exists()) {
                    const assignmentNames= courseSnapshot.data().currentAssignments || [];

                    // Initialize an array to store all assignments
                    const assignments = [];

                    // Iterate through each assignment name and fetch data
                    for (const name of assignmentNames) {
                        let assignmentData = null;
                        const quizRef = doc(db, 'quizzes', name);
                        const quizSnapshot = await getDoc(quizRef);

                        if (quizSnapshot.exists()) {
                            assignmentData = quizSnapshot.data();
                        } else {
                            const essayRef = doc(db, 'essays', name);
                            const essaySnapshot = await getDoc(essayRef);
                            if (essaySnapshot.exists()) {
                                assignmentData = essaySnapshot.data();
                            }
                        }

                        // Push assignment data to assignments array
                        if (assignmentData) {
                            assignments.push({ name, ...assignmentData });
                            // console.log(assignments);
                        }
                    }

                    // Update currentAssignments state after all assignments are fetched
                    setCurrentAssignments(assignments);
                    console.log(currentAssignments);
                }
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

    useEffect(() => {
        // Simulate a network request
        setTimeout(() => {
            setLoading(false); // Set loading to false after 3 seconds
        }, 1000);
    }, []);

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
                <h1 className="text-3xl text-black font-semibold mb-4" data-testid="course-heading">Course Name</h1>
                <h2 className="text-3xl text-black font mt-4 mb-6" data-testid="assignments-heading">Assignments</h2>
                <div className="flex justify-end"></div>
                <div className="overflow-x-auto">
                    {currentAssignments.map((assignment, index) => (
                        <a href="" key={index}>
                            <div className="flex items-center justify-between bg-gray-100 mb-4 p-4 rounded border border-gray-300">
                                <div>
                                    <h3 className="text-lg font-semibold text-blue-400 hover:blue5-00">{assignment.title}</h3>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-600">Due Date: {assignment.dueDate}</p>
                                    <h3 className="text-l text-gray-600"> grade /{assignment.points}</h3>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

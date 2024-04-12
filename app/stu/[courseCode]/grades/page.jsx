'use client';
import CourseNavBar from '../../../views/StuCourseNavBar.jsx';
import Sidebar from '../../../views/Sidebar.jsx';
import { useState, useEffect } from 'react';
import Loader from '../../../views/Loader.jsx';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../lib/firebase';
import { getDoc, doc,getDocs,query,collection, where,updateDoc } from 'firebase/firestore';
import db from '../../../lib/firebase.js'

export default function Grades({params}) {
    const courseCode = params.courseCode; // Course code from the params

    const [loading, setLoading] = useState(true); // State for storing loading status
    const [currentAssignments, setCurrentAssignments] = useState([]); // State for storing current assignments
    const [user,setUser] = useState(null); // State for storing user
    const [userType,setUserType] = useState('user'); // State for storing user type
    const [userName,setUserName] = useState('non'); // State for storing user name
    const [grade, setGrade] = useState(''); // State for storing grade   

    // Function for calculating cumulative grade
    function calculateCumulativeGrade(gradeWeightList) {
        let totalGrade = 0;
        let totalWeight = 0;
        console.log('hello 1');
    
        // Iterate through each grade-weight object in the list
        gradeWeightList.forEach((item) => {
            const { grade, weight } = item;
    
            // Add the weighted grade to the total
            totalGrade += (grade * weight);
    
            // Add the weight to the total weight
            totalWeight += weight;
        });
    
        console.log('hello 2');
    
        // Check if totalWeight is not zero to avoid division by zero
        if (totalWeight !== 0) {
            // If the total weight is not 100, adjust the grade
  
                // Calculate the scaling factor to adjust the grade to 100%
                const scaleFactor = 100 / totalWeight;
                
                // Scale the total grade
                totalGrade = (totalGrade/100) * scaleFactor;
        
    
            // Return the cumulative grade
            console.log('your grade is ' + totalGrade);
            return totalGrade;
        } else {
            console.error('Total weight is zero.');
            return null; // Return null if totalWeight is zero
        }
    }
    
    //Effect hook for handling authentication state change
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if(auth.currentUser){
                setUser(auth.currentUser);
                try {
                    if (user) {
                        // Query for the student document
                        const studentQuerySnapshot = await getDocs(collection(db, 'students'));
                        let studentDoc;
                        let gradeWeightArray = [];

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

                                Promise.all(filteredAssignments.map(async (assignment) => {
                                    const quizRef = doc(db, 'quizzes', assignment.name);
                                    const essayRef = doc(db, 'essays', assignment.name);
                                
                                    const [quizSnapshot, essaySnapshot] = await Promise.all([
                                        getDoc(quizRef),
                                        getDoc(essayRef)
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
                                
                                updateDoc(courseDocRef,{grade:grade.toString()})
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
                <h3 className="text-3xl text-black font mt-4 mb-6" data-testid="assignments-heading">Grade: {grade && <>{grade}%</>}</h3>
                <div className="flex justify-end"></div>
                <div className="overflow-x-auto">
                    {currentAssignments.map((assignment, index) => (
                        <div key={index} className="bg-white mb-4 p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-blue-400 hover:text-blue-500 cursor-pointer">{assignment.name}</h3>
                                </div>
                                <div>
                                    <p className="text-s text-gray-600">Grade: {assignment.grade}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                </div>
            </div>
        );
           
                                
}

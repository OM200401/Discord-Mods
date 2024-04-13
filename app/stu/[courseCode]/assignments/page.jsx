'use client';
import CourseNavBar from '../../../views/StuCourseNavBar.jsx';
import Sidebar from '../../../views/Sidebar.jsx';
import Loader from '../../../views/Loader.jsx';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../lib/firebase.js';

import { getStudentDoc } from '../../../utilities/StudentUtilities.js';
import { getCourseDoc, getRegisteredCoursesDoc } from '../../../models/Course.js';
import { getQuizDoc,getEssayDoc } from '../../../models/Assignment';
import { AssignmentsList } from '../../../views/StudentAssignmentView';



export default function Assignments({params}) {
    // State variables
    const [loading, setLoading] = useState(false); // State for storing loading status
    const courseCode = params.courseCode; // Course code from params
    const [currentAssignments, setCurrentAssignments] = useState([]); // State for storing current assignments
    const [user,setUser] = useState(null); // State for storing user
    const [userType,setUserType] = useState('user'); // State for storing user type
    const [userName,setUserName] = useState('non'); // State for storing user name
    const [submittedAssignments, setSubmittedAssignments] = useState([]); // State for storing submitted assignments
    // Effect hookk for handling authentication state change
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (auth.currentUser) {
                setUser(auth.currentUser);
                const studentQuerySnapshot = await getStudentDoc(user.uid);

                setUserName(studentQuerySnapshot.data().firstName);
                setUserType(studentQuerySnapshot.data().userType);
              

                const courseSnapshot = await getCourseDoc(courseCode);

                const submittedAssignmentsNames = [];
                const submittedAssignmentData = [];

                if (!studentQuerySnapshot.empty) {
                    const courseDocSnapshot = await getRegisteredCoursesDoc(studentQuerySnapshot,courseCode);

                    if (courseDocSnapshot.exists()) {
                        const submittedAssignmentsData = courseDocSnapshot.data().submittedAssignments || [];
                        submittedAssignmentsData.forEach((assignment) => {
                            submittedAssignmentsNames.push(assignment.name);
                            submittedAssignmentData.push(assignment);
                        })
                  
                setSubmittedAssignments(submittedAssignmentData);

                    const assignmentNames = courseSnapshot.data().currentAssignments || [];
                    
                    const assignmentPromises = assignmentNames.map(async (name) => {
                        let assignmentData = null;
                        let assignmentType = null;
                

                        const [quizSnapshot, essaySnapshot] = await Promise.all([
                            getQuizDoc(name),
                            getEssayDoc(name)
                        ]);

                        if (quizSnapshot.exists() && !submittedAssignmentsNames.includes(name)) {
                            assignmentData = quizSnapshot.data();
                            assignmentType = "quiz";
                        } else if (!submittedAssignmentsNames.includes(name)) {
                            assignmentData = essaySnapshot.data();
                            assignmentType = "essay";
                        }
                        return { name, ...assignmentData, assignmentType };
                    });
                    
                    const assignments = await Promise.all(assignmentPromises);
                    setCurrentAssignments(assignments);
                    setLoading(false);
                }
            }
        }
    });
    

        return () => unsubscribe();
    }, []); // Add courseCode as a dependency

    useEffect(() => {
        // Simulate a network request
        setTimeout(() => {
            setLoading(false); // Set loading to false after 3 seconds
        }, 1000);
    }, []);

    if (loading) {
        return <Loader />; // Return the Loading component if loading is true
    }

    return (
        <div className="flex flex-col md:flex-row bg-blue-100 min-h-screen">
            <Sidebar userName={userName} userType={"Student"} />
            <div className="md:ml-64 fixed">
                <CourseNavBar courseCode={courseCode} />
            </div>
            <AssignmentsList currentAssignments={currentAssignments} courseCode={courseCode} submittedAssignments={submittedAssignments} />

        </div>
    );
}
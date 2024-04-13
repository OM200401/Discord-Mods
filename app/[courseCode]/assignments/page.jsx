'use client'
import CourseNavBar from '../../views/CourseNavBar';
import Sidebar from '../../views/Sidebar';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import TeacherAssignmentCard from '../../views/TeacherAssignmentCard';
import Loader from '../../views/Loader';



import { getTeacherDoc } from '../../utilities/TeacherUtilities';
import { getCourseDoc } from '../../models/Course';
import { getEssayDoc, getQuizDoc} from '../../models/Assignment';

export default function Assignments({ params }) {
    // Extracting courseCode from params
    const courseCode = params.courseCode;

    // State variables
    const [currentAssignments, setCurrentAssignments] = useState([]); // State for storing current assignments
    const [user,setUser] = useState(null); // State for storing user
    const [userType,setUserType] = useState('user'); // State for storing user type
    const [userName,setUserName] = useState('non'); // State for storing user name
    const [submittedAssignments, setSubmittedAssignments] = useState([]); // State for storing submitted assignments
    const [loading, setLoading] = useState(true); // State for storing loading status


    // Effect hook for handling authentication state change
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (auth.currentUser) {
                setUser(auth.currentUser);
    
                const teacherRef = await getTeacherDoc(user.uid);
                
                setUserName(teacherRef.data().firstName);
                setUserType(teacherRef.data().userType);

                const courseSnapshot = await getCourseDoc(courseCode);
    
                if (courseSnapshot.exists()) {
                    const assignmentNames = courseSnapshot.data().currentAssignments || [];
    
                    // Initialize an array to store all promises for fetching assignment data
                    const assignmentPromises = assignmentNames.map(async (name) => {
                        let assignmentData = null;
                        // const quizRef = doc(db, 'quizzes', name);
                        // const essayRef = doc(db, 'essays', name);
    
                        const [quizSnapshot, essaySnapshot] = await Promise.all([
                            getQuizDoc(name),
                            getEssayDoc(name)
                        ]);
    
                        if (quizSnapshot.exists()) {
                            assignmentData = quizSnapshot.data();
                        } else if (essaySnapshot.exists()) {
                            assignmentData = essaySnapshot.data();
                        }
    
                        return { name, ...assignmentData };
                    });
    
                    // Await all promises and update currentAssignments state
                    const assignments = await Promise.all(assignmentPromises);
                    setCurrentAssignments(assignments);
                }
            }
        });
    
        return () => unsubscribe();
    }, [courseCode,currentAssignments]);
     // Add courseCode as a dependency

    
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
        <div className="flex flex-col md:flex-row bg-blue-100">
            <Sidebar userName={userName} userType={"Teacher"}/>
            <div className="relative md:ml-64">
                <CourseNavBar courseCode={courseCode}/>
            </div>
            <div className="p-6 text-center w-full">
                <h1 className="text-3xl text-black font-semibold mb-4" data-testid="course-heading">Course Name</h1>
                <h2 className="text-3xl text-black font mt-4" data-testid="assignments-heading">Assignments</h2>
                <div className="flex justify-end">
                    <a href="addAssignments" className="px-4 py-2 mb-3 bg-green-500 text-white rounded hover:bg-green-600 hover:scale-110 transition ease-in-out duration-200   ">Add</a>
                </div>
                <div className="overflow-x-auto">
                    {currentAssignments.map((assignment, index) => (
                      (userType == 'Teacher' && <TeacherAssignmentCard key={index} assignment={assignment} courseCode = {courseCode} />)
                    ))}
                </div>
            </div>
        </div>
    );
}

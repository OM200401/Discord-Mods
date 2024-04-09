'use client'
import CourseNavBar from '../../components/CourseNavBar';
import Sidebar from '../../components/Sidebar';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { getDoc, doc,getDocs,query,collection, where,updateDoc } from 'firebase/firestore';
import db from '../../lib/firebase'
import StudentAssignmentCard from '../../components/StudentAssignmentCard';
import TeacherAssignmentCard from '../../components/TeacherAssignmentCard';
import Loader from '../../components/Loader';


export default function Assignments({ params }) {
    const courseCode = params.courseCode;
    // console.log(params);
    // console.log("Assignments page course code is " + courseCode);


    const [currentAssignments, setCurrentAssignments] = useState([]);
    const [user,setUser] = useState(null);
    const [userType,setUserType] = useState('user');
    const [userName,setUserName] = useState('non');
    const [submittedAssignments, setSubmittedAssignments] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (auth.currentUser) {
                setUser(auth.currentUser);
    
                const userInfoRef = collection(db, 'teachers');
                const q = query(userInfoRef, where('uid', '==', user.uid));
                try {
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        setUserName(doc.data().firstName);
                        setUserType(doc.data().userType);
                    })
                } catch (error) {
                    console.log(error.message);
                }
    
                const coursesRef = doc(db, 'courses', courseCode);
                const courseSnapshot = await getDoc(coursesRef);
    
                if (courseSnapshot.exists()) {
                    const assignmentNames = courseSnapshot.data().currentAssignments || [];
    
                    // Initialize an array to store all promises for fetching assignment data
                    const assignmentPromises = assignmentNames.map(async (name) => {
                        let assignmentData = null;
                        const quizRef = doc(db, 'quizzes', name);
                        const essayRef = doc(db, 'essays', name);
    
                        const [quizSnapshot, essaySnapshot] = await Promise.all([
                            getDoc(quizRef),
                            getDoc(essayRef)
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
                      (userType == 'Teacher' && <TeacherAssignmentCard assignment={assignment} courseCode = {courseCode} />)
                    ))}
                </div>
            </div>
        </div>
    );
}

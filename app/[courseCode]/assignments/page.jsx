'use client'
import CourseNavBar from '../../components/CourseNavBar';
import Sidebar from '../../components/Sidebar';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { getDoc, doc,getDocs,query,collection, where } from 'firebase/firestore';
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

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if(auth.currentUser){
                setUser(auth.currentUser);
                  console.log(user);
                  const userInfoRef = collection(db,'teachers');
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
                    // console.log(currentAssignments);
                }
            }
        });

        return () => unsubscribe();
    }, []); // Add courseCode as a dependency

    const [loading, setLoading] = useState(true);

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
                    <a href="addAssignments" className="px-4 py-2 mb-3 bg-green-500 text-white rounded hover:bg-green-600">Add</a>
                </div>
                <div className="overflow-x-auto">
                    {currentAssignments.map((assignment, index) => (
                      (userType == 'Student' && <StudentAssignmentCard assignment={assignment} courseCode={courseCode} />) ||
                      (userType == 'Teacher' && <TeacherAssignmentCard assignment={assignment} courseCode = {courseCode} />)
                    ))}
                </div>
            </div>
        </div>
    );
}

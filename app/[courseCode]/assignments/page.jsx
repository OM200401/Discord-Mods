'use client'
import CourseNavBar from '../../components/CourseNavBar';
import Sidebar from '../../components/Sidebar';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useParams } from 'next/navigation';
import { auth } from '@/app/lib/firebase';
import { getDoc, doc,getDocs } from 'firebase/firestore';
import db from '../../lib/firebase';
import StudentAssignmentCard from '@/app/components/StudentAssignmentCard';

export default function Assignments() {
    const { courseCode } = useParams();
    console.log("my course code is " + courseCode);

    const [currentAssignments, setCurrentAssignments] = useState([]);
    const [user,setUser] = useState(null);
    const [userType,setUserType] = useState('user');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (auth.currentUser) {
                const student = query(collection(db, 'students'), where('uid', '==', user.uid));
                const studentSnapshot = await getDoc(student);
                
                if(!studentSnapshot.empty){
                        setUserType(studentSnapshot.data().userType);
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
                        }
                    }

                    // Update currentAssignments state after all assignments are fetched
                    setCurrentAssignments(assignments);
                }
            }
        });

        return () => unsubscribe();
    }, [courseCode]); // Add courseCode as a dependency

    return (
        <div className="flex flex-col md:flex-row bg-blue-100">
            <Sidebar />
            <div className="relative md:ml-64">
                <CourseNavBar />
            </div>
            <div className="p-6 text-center w-full">
                <h1 className="text-3xl text-black font-semibold mb-4" data-testid="course-heading">Course Name</h1>
                <h2 className="text-3xl text-black font mt-4" data-testid="assignments-heading">Assignments</h2>
                <div className="flex justify-end">
                    <a href="addAssignments" className="px-4 py-2 mb-3 bg-green-500 text-white rounded hover:bg-green-600">Add</a>
                </div>
                <div className="overflow-x-auto">
                    {currentAssignments.map((assignment, index) => (
                      userType == 'Student' && <StudentAssignmentCard assignment={assignment} />
                    ))}
                </div>
            </div>
        </div>
    );
}

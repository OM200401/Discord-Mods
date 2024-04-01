'use client'
import CourseNavBar from '../../components/CourseNavBar';
import Sidebar from '../../components/Sidebar';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useParams } from 'next/navigation';
import { auth } from '@/app/lib/firebase';
import { getDoc, doc } from 'firebase/firestore';
import db from '../../lib/firebase';
import StudentAssignmentCard from '@/app/components/StudentAssignmentCard';

export default function Assignments() {
    const { courseCode } = useParams();
    console.log("my course code is " + courseCode);

    const [currentAssignments, setCurrentAssignments] = useState([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (auth.currentUser) {
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
                        <div key={index} className="flex items-center justify-between bg-gray-100 mb-4 p-4 rounded border border-gray-300">
                            <div>
                                <h3 className="text-lg font-semibold text-black">{assignment.name}</h3>
                                <p className="text-sm text-gray-600">Weightage: {assignment.weightage}</p>
                                {/* You can add other properties from the assignment object here */}
                            </div>
                            <div className="flex">
                                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2">Edit</button>
                                <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

'use client';

import CourseNavBar from '../../components/CourseNavBar';
import Sidebar from '../../components/Sidebar';
import { useEffect,useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useParams } from 'next/navigation';
import { auth } from '@/app/lib/firebase';
import { collection, query, where, getDocs,getDoc,doc } from "firebase/firestore";
import db from '../../lib/firebase';

export default function Assignments() {

    // Demo assignments array to display some assignments but will later have data 
    // displayed from the database
    const {courseCode} = useParams();
    console.log("my course code is " + courseCode);

    const [currentAssignments,setCurrentAssignments] = useState([]);
    const[user,setUser] = useState(null);
    const [assignmentData,setAssignmentData] = useState([]);
    const [unique,setUnique] = useState(new Set());


    let coursesNames = [];

    const assignments = [
        { title: 'Assignment 1', dueDate: '2022-01-01', points: 100 },
        { title: 'Assignment 2', dueDate: '2022-01-15', points: 150 },
        { title: 'Assignment 3', dueDate: '2022-01-15', points: 150 },
        { title: 'Assignment 4', dueDate: '2022-01-15', points: 150 },
        { title: 'Assignment 5', dueDate: '2022-01-15', points: 150 },
    ];

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if(auth.currentUser){
                setUser(auth.currentUser);
                let courseData = [];

                const courses = doc(db,'courses',courseCode);

                await getDoc(courses)
                .then((courseSnapshot) => {
                    if (courseSnapshot.exists()) {
                        coursesNames = courseSnapshot.data().currentAssignments;
                    }
                    console.log(coursesNames);

                    const uniqueCourseIds = new Set();
                    if(currentAssignments.length == 0){
                    Promise.all(coursesNames.map(async (name) => {
                        let currentCourse = doc(db, 'quizzes', name);
                        const courseSnapshot = await getDoc(currentCourse);
                        if (courseSnapshot.exists() && !uniqueCourseIds.has(name)) {
                            // setCurrentAssignments((prevAssignments) => [...prevAssignments, { name, ...courseSnapshot.data() }]);
                            courseData.push({name, ...courseSnapshot.data() });
                            setCurrentAssignments(courseData);
                            console.log(courseData);
                            uniqueCourseIds.add(name);
                        } else {
                            currentCourse = doc(db, 'essays', name);
                            const courseSnapshot2 = await getDoc(currentCourse);
                            if (courseSnapshot2.exists() && !uniqueCourseIds.has(name)) {
                                courseData.push({name, ...courseSnapshot2.data() });
                                setCurrentAssignments(courseData);
                                console.log(courseData);
                                uniqueCourseIds.add(name);
                            }
                        }
                    }))
                    
                }
                })
                .catch((error) => {
                    console.error('Error fetching course data:', error);
                });


            } 
            return () => unsubscribe();
        });
    }, []);

  

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
                            {/* You can add other properties from the courseData object here */}
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

'use client';
import CourseNavBar from '../../../views/StuCourseNavBar.jsx';
import Sidebar from '../../../views/Sidebar.jsx';
import { useState, useEffect } from 'react';
import Loader from '../../../views/Loader.jsx';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../lib/firebase';
import { getDoc, doc,getDocs,query,collection, where } from 'firebase/firestore';
import db from '../../../lib/firebase.js'

export default function Grades() {
    const courseCode = "COSC304";
    const userName = "user";
    
    const [loading, setLoading] = useState(true);

    // Demo assignments array to display some assignments but will later have data 
    // displayed from the database
    const assignments = [
        { title: 'Assignment 1', dueDate: '2022-01-01', points: 100 },
        { title: 'Assignment 2', dueDate: '2022-01-15', points: 150 },
        { title: 'Assignment 3', dueDate: '2022-01-15', points: 150 },
        { title: 'Assignment 4', dueDate: '2022-01-15', points: 150 },
        { title: 'Assignment 5', dueDate: '2022-01-15', points: 150 },
    ];

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
                    {assignments.map((assignment, index) => (
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

'use client';
import { useState, useEffect } from 'react';
import CourseNavBar from '../../views/CourseNavBar';
import Sidebar from '../../views/Sidebar';
import Loader from '../../views/Loader';

import { getGradesForCourse} from '../../models/Course';

export default function Assignments({ params }) {

   // State variables
   const [loading, setLoading] = useState(true); // State for storing loading status
   const [userName,setUserName] = useState('non'); // State for storing user name
   const [studentAssignments, setStudentAssignments] = useState(null); // State for storing student assignments

   // Extracting courseCode from params
   const courseCode = params.courseCode;
 
    // Function for toggling  assignments
 

    // Effect Hook for fetching Grades and other data 
    useEffect(() => {
        const fetchData = async () => {
            try {
               const studentGrades = await getGradesForCourse(courseCode);
               setStudentAssignments(studentGrades);
            } catch (error) {
                console.error('Error fetching course data:', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, []);



    if (loading) {
        return <Loader />; // Return the Loading component if loading is true
    }

    return (
        <div className="flex flex-col md:flex-row bg-blue-100">
            <Sidebar userName={userName} userType={"Teacher"} />
            <div className="relative md:ml-64">
                <CourseNavBar courseCode={courseCode} />
            </div>
            <div className="p-6 text-center w-full">
                <h1 className="text-3xl text-black font-semibold mb-4" data-testid="course-heading">Course Name</h1>
                <h2 className="text-3xl text-black font mt-4" data-testid="assignments-heading">Students</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                    {studentAssignments.map((student, index) => (
                        <div key={index} className="bg-white rounded-md shadow-md p-4">
                            <h3 className="text-xl font-semibold mb-2">{student.assignmentName}</h3>
                            <p className="text-gray-600">{student.email}</p>
                            <p className="text-gray-600">Grade: {student.grade}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
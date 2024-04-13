'use client'
import CourseNavBar from '../../views/CourseNavBar';
import Sidebar from '../../views/Sidebar';
import { useEffect, useState } from 'react';
import StudentAssignmentCard from '../../views/StudentAssignmentCard';
import TeacherAssignmentCard from '../../views/TeacherAssignmentCard';
import Loader from '../../views/Loader';


export default function Assignments({ params }) {
    const courseCode = "COSC304";
    const userName = "test1";

    const [currentAssignments, setCurrentAssignments] = useState([]);

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

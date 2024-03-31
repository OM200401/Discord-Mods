"use client";
import { useParams } from 'next/navigation';
import Sidebar from '../../components/Sidebar';
import { useState } from 'react';

export default function CourseInfo() {
    const {courseCode} = useParams();

    console.log(courseCode);

    const [courses, setCourses] = useState([
        { courseCode: 'COSC304', courseName: 'Introduction to Databases', description: 'This course introduces the concept of databases.' },
        { courseCode: 'COSC310', courseName: 'Software Engineering', description: 'This course covers the fundamentals of software engineering.' },
        { courseCode: 'COSC222', courseName: 'Data Structures', description: 'This course teaches about various data structures.' },
        { courseCode: 'COSC328', courseName: 'Computer Networks', description: 'This course is about computer networking concepts.' },
        { courseCode: 'COSC340', courseName: 'Operating Systems', description: 'This course covers the basics of operating systems.' },
        { courseCode: 'COSC211', courseName: 'Computer Architecture', description: 'This course is about the architecture of computers.' },
        { courseCode: 'COSC360', courseName: 'Web Development', description: 'This course teaches web development techniques.' },
        { courseCode: 'COSC322', courseName: 'Artificial Intelligence', description: 'This course introduces the concept of artificial intelligence.' },
    ]);

    const course = courses.find(c => c.courseCode === courseCode);

    const handleEnroll = () => {
        // Add the backend enrollment logic here
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-blue-100">
            <Sidebar />
            <div className="p-6 text-center w-full">
                <h1 className="text-3xl text-black font-semibold mb-4">{courseCode}</h1>
                <h1 className="text-3xl text-black font-semibold mb-4">{course?.courseName}</h1>
                <p className="text-gray-700 mb-4">{course?.description}</p>
                <button onClick={handleEnroll} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Enroll
                </button>
            </div>
        </div>
    );
}
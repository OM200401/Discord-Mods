"use client";
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';

export default function Courses() {
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

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-blue-100">
            <Sidebar />
            <div className="p-6 text-center ml-96">
                <h1 className="text-3xl text-black font-semibold mb-4 ">Courses</h1>
                <div className="flex flex-wrap justify-start">
                    {courses.map((course, index) => (
                        <Card key={index} courseCode={course.courseCode} courseName={course.courseName} />
                    ))}
                </div>
            </div>
        </div>
    );
}
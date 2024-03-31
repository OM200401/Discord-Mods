"use client";
import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import BrowseCard from '../components/BrowseCard';
import { collection, getDocs } from 'firebase/firestore';
import db from '../lib/firebase';

export default function Courses() {
    const [courses, setCourses] = useState([
        // { courseCode: 'COSC304', courseName: 'Introduction to Databases', description: 'This course introduces the concept of databases.' },
        // { courseCode: 'COSC310', courseName: 'Software Engineering', description: 'This course covers the fundamentals of software engineering.' },
        // { courseCode: 'COSC222', courseName: 'Data Structures', description: 'This course teaches about various data structures.' },
        // { courseCode: 'COSC328', courseName: 'Computer Networks', description: 'This course is about computer networking concepts.' },
        // { courseCode: 'COSC340', courseName: 'Operating Systems', description: 'This course covers the basics of operating systems.' },
        // { courseCode: 'COSC211', courseName: 'Computer Architecture', description: 'This course is about the architecture of computers.' },
        // { courseCode: 'COSC360', courseName: 'Web Development', description: 'This course teaches web development techniques.' },
        // { courseCode: 'COSC322', courseName: 'Artificial Intelligence', description: 'This course introduces the concept of artificial intelligence.' },
    ]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                // Fetch all documents from the enrolments collection and map to an array
                const coursesCollection = collection(db,'courses');
                const snapshot = await getDocs(coursesCollection);
                const courses = snapshot.docs
                                    .filter(doc => doc.id !== "DefaultCourse")
                                    .map((doc) => ({ id: doc.id, ...doc.data() }));
                setCourses(courses);
                console.log(courses);

            } catch (error) {
                console.error('Error fetching enrolments:', error);
            }
        };

        fetchCourses();
    }, []);

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-blue-100">
            <Sidebar />
            <div className="p-6 text-center ml-96">
                <h1 className="text-3xl text-black font-semibold mb-4 ">Courses</h1>
                <div data-testid = "course-card" className="flex flex-wrap justify-start">
                    {courses.map((course, index) => (
                        <BrowseCard key={index} courseCode={course.id} courseName={course.courseName} />
                    ))}
                </div>
            </div>
        </div>
    );
}
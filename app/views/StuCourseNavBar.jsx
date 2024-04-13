'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FiMenu } from 'react-icons/fi';

export default function CourseNavBar({courseCode}) {
    // Using a state to detect if navbar is open or closed
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div  data-testid="stuCourseNavBar" className="relative bg-blue-100">
            <button onClick={() => setIsOpen(!isOpen)} className="relative top-0 left-0 m-6 z-10 bg-black">
                <FiMenu />
            </button>
            <nav
                className={`bg-blue-200 text-black w-64 py-7 px-2 absolute inset-y-0 left-0 overflow-clip transform md:relative md:translate-x-0 transition-transform duration-200 ease-in-out ${isOpen ? 'h-screen' : 'h-auto'}`}
                style={{ transform: isOpen ? 'translateX(0)' : 'translateX(-100%)', zIndex: isOpen ? '10' : '-10' }}
                data-testid="course-navbar"
            >
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold px-3">Course Name</h1>
                </div>
                <div>
                    <Link href={`/stu/${courseCode}`} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700">Home</Link>
                    <Link href={`/stu/${courseCode}/assignments`} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700">Assignments</Link>
                    <Link href={`/stu/${courseCode}/grades`} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700">Grades</Link>
                    <Link href={`/stu/${courseCode}/discussion`}>Discussion</Link>
                </div>
            </nav>
        </div>
    );
}

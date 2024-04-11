import { useState, useEffect } from 'react';
import Link from "next/link";
import Loader from '../components/Loader';
import CourseCard from "../components/CourseCard";
import { getNumStudents, getNumTeachers } from '../models/User';
import { FaUserGraduate, FaChalkboardTeacher } from 'react-icons/fa';

export default function AdminPageView({ courses, loading, userType }) {
    const [numStudents, setNumStudents] = useState(0);
    const [numTeachers, setNumTeachers] = useState(0);

    useEffect(() => {
        async function fetchData() {
            const students = await getNumStudents();
            const teachers = await getNumTeachers();
            setNumStudents(students);
            setNumTeachers(teachers);
        }
        fetchData();
    }, []);

    return (
        <div className="mt-4 md:mt-0 md:ml-8 p-4 md:p-8">
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-blue-500 text-white p-4 rounded shadow-lg flex items-center space-x-4">
                    <FaUserGraduate size={48} />
                    <div>
                        <h2 className="text-2xl font-bold">Students</h2>
                        <p className="text-xl">{numStudents}</p>
                    </div>
                </div>
                <div className="bg-green-500 text-white p-4 rounded shadow-lg flex items-center space-x-4">
                    <FaChalkboardTeacher size={48} />
                    <div>
                        <h2 className="text-2xl font-bold">Teachers</h2>
                        <p className="text-xl">{numTeachers}</p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {loading ? (
                    <Loader/>
                ) : (
                    courses.map(course => (
                        <Link key={course.id} href={ userType === 'Student' ? `../stu/${course.id}` : userType === "Teacher" ? `${course.id}` : "" }>
                            <CourseCard data-testid="course-card" courseCode={course.id} courseName={course.courseName} imageUrl={course.imageUrl}/>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}
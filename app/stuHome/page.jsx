'use client';
import Link from "next/link";
import dynamic from "next/dynamic";
import CourseCard from "../components/CourseCard";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { createUser, getStudentDoc } from '../models/User';
import { getRegisteredCourses } from "../utilities/RegisteredCourses";
import Loader from '../components/Loader';

let Sidebar;
if (process.env.NODE_ENV === 'test') {
    const MockSidebar = () => <div data-testid="sidebar-component"></div>;
    MockSidebar.displayName = 'Sidebar';
    Sidebar = MockSidebar;
} else {
    Sidebar = dynamic(() => import('../components/Sidebar'), {ssr: false});
}
// Home Page that will be seen by the student user on logging in

export default function Home(){
    const [user,setUser] = useState(null);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if(auth.currentUser){
                const user = await createUser(auth.currentUser.uid, "Student");
                setUser(user)

                const student = await getStudentDoc(user.uid);
                const registeredCourses = await getRegisteredCourses(student);
                setCourses(registeredCourses);

                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
        }); 
        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    return (
        <div className="min-h-screen flex flex-col md:flex-row ml-80">
            <Sidebar data-testid="sidebar-component" userName={ user?.firstName } userType={"Student"} />
            {/* <h1>hello this is the stuHome</h1> */}
            <div className="mt-4 md:mt-0 md:ml-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 p-4 md:p-8">
                {loading ? (
                    <Loader />
                ) : (
                    courses.map(course => (
                        <Link key={course.id} href={`../stu/${course.id}`}>
                        <CourseCard data-testid="course-card" courseCode={course.id} courseName={course.courseName} imageUrl={course.imageUrl}/>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}
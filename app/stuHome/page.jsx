'use client';
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { createUser, getStudentDoc } from '../models/User';
import { getRegisteredCourses } from "../utilities/RegisteredCourses";
import HomePageView from "../views/HomePageView";

let Sidebar;
if (process.env.NODE_ENV === 'test') {
    const MockSidebar = () => <div data-testid="sidebar-component"></div>;
    MockSidebar.displayName = 'Sidebar';
    Sidebar = MockSidebar;
} else {
    Sidebar = dynamic(() => import('../views/Sidebar'), {ssr: false});
}

// Home Page that will be seen by the student user on logging in
export default function Home(){
    const [user,setUser] = useState(null);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // When Auth state changes, create a new User object, use their uid to get the student document, use the document reference to get their registered courses (courses they are taking)

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if(auth.currentUser){
                const user = await createUser(auth.currentUser.uid, "Student");
                setUser(user);
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
        <div className="bg-black min-h-screen flex flex-col md:flex-row ml-80 ">
            <Sidebar data-testid="sidebar-component" userName={ user?.firstName } userType={"Student"} />
            <HomePageView courses={courses} loading={loading} userType={"Student"} />
        </div>
    );
}
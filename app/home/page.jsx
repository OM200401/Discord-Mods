'use client';
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { createUser, getTeacherDoc } from '../models/User';
import { getRegisteredCourses } from "../utilities/RegisteredCourses";
import HomePageView from "../views/HomePageView";

// Conditionally rendering Sidebar based on the environment
let Sidebar;
if (process.env.NODE_ENV === 'test') {
    const MockSidebar = () => <div data-testid="sidebar-component"></div>;
    MockSidebar.displayName = 'Sidebar';
    Sidebar = MockSidebar;
} else {
    Sidebar = dynamic(() => import('../views/Sidebar'), {ssr: false});
}

// Home Page that will be seen by the teacher user on logging in
export default function Home(){

    const [user,setUser] = useState(); // State for storing the user details
    const [courses, setCourses] = useState([]); // State for storing courses
    const [loading, setLoading] = useState(true); // State for storing the condition for loading

    // Effect hook for authentication state change
    useEffect(() => {
        // When Auth state changes, create a new User object, use their uid to get the teacher document, use the document reference to get their registered courses (courses they are teaching)
        
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if(auth.currentUser){
                const user = await createUser(auth.currentUser.uid, "Teacher");
                setUser(user);
                const teacher = await getTeacherDoc(user.uid);
                const registeredCourses = await getRegisteredCourses(teacher);
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
            <Sidebar data-testid="sidebar-component" userName={ user?.firstName } userType={"Teacher"} />
            <HomePageView courses={courses} loading={loading} userType={"Teacher"} />
        </div>
    );
}
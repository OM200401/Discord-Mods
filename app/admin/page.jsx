'use client';
import Link from "next/link";
import AdminSidebar from "../views/AdminSidebar"; 
import dynamic from "next/dynamic";
import CourseCard from "../views/CourseCard";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import db from '../lib/firebase'; 
import { auth } from '../lib/firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAllCourses } from "../models/Course";
import { createUser } from "../models/User";    
import AdminHomeView from "../views/AdminHomeView";

// Conditionally importing Sidebar based on the environment
let Sidebar;
if (process.env.NODE_ENV === 'test') {
    const MockSidebar = () => <div data-testid="sidebar-component"></div>;
    MockSidebar.displayName = 'Sidebar';
    Sidebar = MockSidebar;
} else {
    Sidebar = dynamic(() => import('../views/Sidebar'), {ssr: false});
}
// Home Page that will be seen by the student user on logging in

export default function Admin(){
    // State variables
    const [user,setUser] = useState(null); // State for storing user
    const [courses, setCourses] = useState([]); // State for storing courses
    const [loading, setLoading] = useState(true); // State for storing loading status

    // Effect hook for handling authentication state change
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if(auth.currentUser){
                const user = await createUser(auth.currentUser.uid, "admin");
                setUser(user);
                const allCourses = await getAllCourses();
                setCourses(allCourses);

                setTimeout(() => {
                    setLoading(false);
                }, 500);

            } else {
                // User is signed out
                console.log('No user');
            }
            // console.log(userName);
        }); 

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [user]);

    return (
        <div className="flex flex-col md:flex-row ml-80">
            <AdminSidebar data-testid="sidebar-component" userName={ user?.firstName } />
            <AdminHomeView courses={courses} loading={loading} userType={"admin"} />

        </div>
    );
}
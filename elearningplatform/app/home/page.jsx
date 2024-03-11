'use client';
import Sidebar from "../components/Sidebar"; 
import CourseCard from "../components/CourseCard";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import db from '../lib/firebase'; 
import {auth} from '../lib/firebase';

// Home Page that will be seen by the student user on logging in

export default function home(){
    const [userName, setUserName] = useState('');
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docRef = doc(db, 'Userinfo', user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setUserName(docSnap.data().firstName);
                } else {
                    console.log('No such document!');
                }
            } else {
                // User is signed out
                console.log('No user');
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    return (
        <div className="flex">
            <Sidebar userName={ userName } />
            <div className="ml-96 grid grid-cols-3 gap-10 p-10">
                <CourseCard courseCode="COSC 310" courseName="Software Engineering" imageUrl="" />               
                <CourseCard courseCode="COSC 304" courseName="Introduction to Databases" imageUrl="" />               
                <CourseCard courseCode="PHIL 331" courseName="Computer Ethics" imageUrl="" />               
                <CourseCard courseCode="PSYO 111" courseName="Introduction to Psychology I" imageUrl="" />               

            </div>
        </div>
    );
}
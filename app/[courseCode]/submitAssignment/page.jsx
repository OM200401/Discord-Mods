'use client'
import CourseNavBar from '../../components/CourseNavBar';
import Sidebar from '../../components/Sidebar';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useParams } from 'next/navigation';
import { auth } from '@/app/lib/firebase';
import { getDoc, doc,getDocs,query,collection, where } from 'firebase/firestore';
import db from '../../lib/firebase';
import { useSearchParams } from 'next/navigation';



export default function Assignments() {
    console.log(useParams());

    // const search = window.location.search;
    // const params = new URLSearchParams(search);
    // console.log(params);

    const [currentAssignments, setCurrentAssignments] = useState([]);
    const [user,setUser] = useState(null);
    const [userType,setUserType] = useState('user');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (auth.currentUser) {
               
              
                  
            }
        });

        return () => unsubscribe();
    }, []); // Add courseCode as a dependency

    return (
        <div className="flex flex-col md:flex-row bg-blue-100">
            <Sidebar />
            <div className="relative md:ml-64">
                <CourseNavBar />
            </div>
            <div className="p-6 text-center w-full">
                <h1 className="text-3xl text-black font-semibold mb-4" data-testid="course-heading">Course Name</h1>
                <h2 className="text-3xl text-black font mt-4" data-testid="assignments-heading">Assignments</h2>
                <div className="flex justify-end">
                    <a href="addAssignments" className="px-4 py-2 mb-3 bg-green-500 text-white rounded hover:bg-green-600">Add</a>
                </div>
                <div className="overflow-x-auto">
                    
                </div>
            </div>
        </div>
    );
}

'use client'
import Sidebar from '@/app/components/Sidebar';
import CourseNavBar from '@/app/components/CourseNavBar';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useParams } from 'next/navigation';
import { auth } from '@/app/lib/firebase';
import { getDoc, doc,getDocs,query,collection, where } from 'firebase/firestore';
import db from '../../../../lib/firebase';



export default function Assignments() {
    const {name,courseCode} = useParams();
    console.log(name);
    // const search = window.location.search;
    // const params = new URLSearchParams(search);
    // console.log(params);

    const [currentAssignments, setCurrentAssignments] = useState([]);
    const [user,setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (auth.currentUser) {
                setUser(auth.currentUser);

                const assignmentRef = doc(db,'quizzes',name);
                const assignmentSnapshot = await getDoc(assignmentRef);

                if(!assignmentSnapshot.empty){
                    console.log(assignmentSnapshot.data())
                }else{
                    const assignmentRef = doc(db,'essays',name);
                    const assignmentSnapshot = await getDoc(assignmentRef);
                    
                    if(!assignmentSnapshot.empty){
                        console.log(assignmentSnapshot.data());
                    }


                }

                
                  
            }
        });

        return () => unsubscribe();
    }, []); // Add courseCode as a dependency

    return (
        <div className="flex flex-col md:flex-row bg-blue-100">
            <Sidebar />
            <div className="relative md:ml-64">
                <CourseNavBar courseCode={courseCode} />
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

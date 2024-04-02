'use client'

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useParams } from 'next/navigation';
import { auth } from '@/app/lib/firebase';
import { getDoc, doc,getDocs,query,collection, where } from 'firebase/firestore';
import db from '../../../lib/firebase';



export default function Assignments() {
    const {name} = useParams();
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
                
                  
            }
        });

        return () => unsubscribe();
    }, []); // Add courseCode as a dependency

    return (
        <div className="flex flex-col md:flex-row bg-blue-100">
            <h1>This is assignment page</h1>
        </div>
    
    );
}

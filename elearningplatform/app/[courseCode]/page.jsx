'use client';

import Sidebar from '../components/Sidebar';
import { useState, useEffect } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import db from '../lib/firebase'; 
import {auth} from '../lib/firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import CourseNavBar from '../components/CourseNavBar';

export default function CoursePage() {

    // Fetch course info from the database based on the courseCode

    const [userName, setUserName] = useState('non');
    const [user,setUser] = useState();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if(auth.currentUser){
              setUser(auth.currentUser);
                console.log(user);
                const userInfoRef = collection(db,'Userinfo');
                const q = query(userInfoRef, where('uid','==',user.uid));
                console.log(q);
                try{
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        setUserName(doc.data().firstName);
                    })
                }catch(error){
                    console.log(error.message);
                }

              }  else {
                // User is signed out
                console.log('No user');
            }

            console.log(userName);
        }); 

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [userName]);

    return (
        <div className="flex flex-col md:flex-row">
          <Sidebar userName={ userName } />
          <div className="relative md:ml-64">
            <CourseNavBar />
          </div>
        </div>
      );
}
'use client';

import Sidebar from '../components/Sidebar';
import { useState, useEffect } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import db from '../lib/firebase'; 
import {auth} from '../lib/firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import CourseNavBar from '../components/CourseNavBar';
import { getStorage, ref, getDownloadURL} from "firebase/storage";
export default function CoursePage() {

    // Fetch course info from the database based on the courseCode
     
    const [userName, setUserName] = useState('non');
    const [user,setUser] = useState(); 
    const [pdfUrl, setPdfUrl] = useState('');
    const [uploading, setUploading] = useState(false); 

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

     
    useEffect(() => {
      const storage = getStorage();
      const pdfRef = ref(storage, 'COSC 320-Assignment 4- 2023-2024-T2.pdf');
      getDownloadURL(pdfRef)
          .then((url) => {
              setPdfUrl(url);
          })
          .catch((error) => {
              console.log('Error getting PDF URL:', error);
          });
    }, []);

    return (
        <div className="flex flex-col md:flex-row">
          <Sidebar userName={ userName } />
          <div className="relative md:ml-64">
            <CourseNavBar />
          </div>
          <div className="p-6 w-screen bg-blue-100 text-center">
            <h1 className="text-3xl text-black font-semibold"  data-testid="course-heading">Course Name</h1>
            <div className="mt-4">
              <h2 className="text-2xl font-semibold text-black mt-48">Resources</h2>
              <ul className="list-disc ml-80 text-left">
                <li><a href="#resource1" className="text-blue-500 hover:underline">Resource 1</a>
                {pdfUrl && <iframe src={pdfUrl} className="mt-2 w-full h-screen" />}</li>
                <li><a href="#resource2" className="text-blue-500 hover:underline">Resource 2</a></li>
                <li><a href="#resource3" className="text-blue-500 hover:underline">Resource 3</a></li>
              </ul>
            </div>
          </div>
        </div>
    );
}
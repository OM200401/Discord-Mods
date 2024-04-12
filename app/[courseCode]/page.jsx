'use client';
import Sidebar from '../views/Sidebar';
import { useState, useEffect } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import db from '../lib/firebase'; 
import {auth} from '../lib/firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import CourseNavBar from '../views/CourseNavBar';import { createUser } from '../models/User';
import { getStorage, ref, getDownloadURL} from "firebase/storage";
import CourseHomeView from '../views/CourseHomeView';
import { getPdfUrl } from '../utilities/UploadedFiles';

export default function CoursePage({ params }) {

    // Fetch course info from the database based on the courseCode
     
    const [user,setUser] = useState(); 
    const [pdfUrl, setPdfUrl] = useState('');
    const [loading, setLoading] = useState(true);

    let courseCode = params ? params.courseCode : 'COSC304';

    //check if in test mode
    if(process.env.NODE_ENV === 'test') {
      courseCode = 'COSC304';
    }

    useEffect(() => {
      // When Auth state changes, create a new User object
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if(auth.currentUser){
              const user = await createUser(auth.currentUser.uid, "Teacher");
              setUser(user);

              const url = await getPdfUrl('COSC 320-Assignment 4- 2023-2024-T2.pdf');
              setPdfUrl(url);

              setTimeout(() => {
                  setLoading(false);
              }, 500);
          }
      }); 

      // Cleanup subscription on unmount
      return () => unsubscribe();
  }, []);

    return (
        <div className="flex flex-col md:flex-row">
          <Sidebar data-testid = "sidebar-component" userName={ user?.firstName } userType={"Teacher"} />
          <div className="relative md:ml-64 ">
            <CourseNavBar courseCode={ courseCode }/>
          </div>
          <CourseHomeView courseCode={ courseCode } loading={ loading } pdfUrl={ pdfUrl }/>
        </div>
    );
}
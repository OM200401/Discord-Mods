'use client';
import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import EnrolmentCard from '../components/EnrolmentCard';
import AdminSidebar from '../components/AdminSidebar';
import db from '../lib/firebase'; 
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';

/*
* This page fetches data from the enrolments collection. 
* Documents in the enrolments collection are as follows: { email: <email>, courseCode: <courseCode> }. 
* Each enrolment is displayed as a card with the email and course code.
* This page is part of the admin interface and can only be accessed by admins.
*/

export default function Enrolments() {
    const [enrolments, setEnrolments] = useState([]);
    const [userName, setUserName] = useState('non');
    const [user,setUser] = useState();

    useEffect(() => {
        const fetchEnrolments = async () => {
            try {
                // Fetch all documents from the enrolments collection and map to an array
                const enrolmentsCollection = collection(db,'enrolments');
                const snapshot = await getDocs(enrolmentsCollection);
                const enrolmentsData = snapshot.docs
                                        .filter(doc => doc.id !== "DefaultCourse")
                                        .map((doc) => ({ id: doc.id, ...doc.data() })); 
                setEnrolments(enrolmentsData);

            } catch (error) {
                console.error('Error fetching enrolments:', error);
            }
        };

        fetchEnrolments();
    }, [enrolments]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if(auth.currentUser){
              setUser(auth.currentUser);
                console.log(user);
                const userInfoRef = collection(db,'admins');
                const q = query(userInfoRef, where('uid','==',user.uid));
                console.log(q);
                try{
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        setUserName(doc.data().firstName);
                    })
                } catch(error){
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
        // Page has a sidebar and displays enrolment cards
        <div className="flex flex-col md:flex-row bg-blue-100 min-h-screen">
            <AdminSidebar data-testid="sidebar-component" userName={ userName } />
            <div className="p-6 text-center w-full">
                <h1 className="text-3xl text-black font-semibold mb-4" data-testid="course-heading">Manage Enrolments</h1>
                <div className="overflow-x-auto">
                    {enrolments.map((enrolmentRequest, index) => (
                        <div key={index} className="m-2">
                            <EnrolmentCard data-testid='enrolment-card' userEmail={enrolmentRequest.email} courseCode={enrolmentRequest.courseCode} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
'use client';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import EnrolmentCard from '../components/EnrolmentCard';
import AdminSidebar from '../components/AdminSidebar';
import db from '../lib/firebase'; 

/*
* This page fetches data from the enrolments collection. 
* Documents in the enrolments collection are as follows: { email: <email>, courseCode: <courseCode> }. 
* Each enrolment is displayed as a card with the email and course code.
* This page is part of the admin interface and can only be accessed by admins.
*/

export default function Enrolments() {
    const [enrolments, setEnrolments] = useState([]);

    useEffect(() => {
        const fetchEnrolments = async () => {
            try {
                // Fetch all documents from the enrolments collection and map to an array
                const enrolmentsCollection = collection(db,'enrolments');
                const snapshot = await getDocs(enrolmentsCollection);
                const enrolmentsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })); 
                setEnrolments(enrolmentsData);

            } catch (error) {
                console.error('Error fetching enrolments:', error);
            }
        };

        fetchEnrolments();
    }, []);

    return (
        // Page has a sidebar and displays enrolment cards
        <div className="flex flex-col md:flex-row bg-blue-100">
            <AdminSidebar />
            <div className="p-6 text-center w-full">
                <h1 className="text-3xl text-black font-semibold mb-4" data-testid="course-heading">Manage Enrolments</h1>
                <div className="overflow-x-auto">
                    {enrolments.map((enrolmentRequest, index) => (
                        <div key={index} className="m-2">
                            <EnrolmentCard userEmail={enrolmentRequest.email} courseCode={enrolmentRequest.courseCode} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
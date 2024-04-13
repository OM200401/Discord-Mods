'use client';
import db from '../lib/firebase';
import { useState } from 'react';
import { collection, getDocs, deleteDoc, setDoc, getDoc, query, where, doc } from 'firebase/firestore';

export default function EnrolmentCard({ userEmail, courseCode, onFeedback }) {

    const deleteEnrolment = async () => {
        const enrolmentRef = collection(db, 'enrolments');
        const q = query(enrolmentRef, where('email', '==', userEmail), where('courseCode', '==', courseCode));
        const snapshot = await getDocs(q);

        snapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
            console.log('Document successfully deleted!');
        })
    }

    const registerStudent = async () => {

        const studentRef = collection(db, 'students');
        const studentQuery = query(studentRef, where('email', '==', userEmail));
        const studentSnapshot = await getDocs(studentQuery);

        const newCourse = doc(db, 'courses', courseCode);
        const newCourseDoc = await getDoc(newCourse);
        let newCourseData = '';

        if(newCourseDoc.exists()){
            newCourseData = newCourseDoc.data();
        }

        studentSnapshot.forEach(async (studentDoc) => {
            const registeredCoursesRef = collection(studentDoc.ref, 'registeredCourses');
            await setDoc(doc(registeredCoursesRef, courseCode), newCourseData);
        });
        console.log("Student registered for course")
    }

    const handleAccept = () => {
        registerStudent();
        deleteEnrolment();
        onFeedback(`Enrolment for ${userEmail} in ${courseCode} accepted`, true);
    };

    const handleReject = () => {
        deleteEnrolment();
        onFeedback(`Enrolment for ${userEmail} in ${courseCode} rejected`, false);
    };

    return (
        <div data-testid="enrolment-card" className="relative bg-white shadow-lg rounded-lg group hover:scale-110 transition duration-200 max-w-md mx-auto">
            <div className="px-6 py-4">
                <div className="flex justify-between">
                    <div>
                        <h3 className="text-lg md:text-xl font-bold text-gray-800">{userEmail}</h3>
                        <p className="mt-2 text-xs md:text-sm text-gray-600">{courseCode}</p>
                    </div>
                    <div className="flex space-x-2">
                        <button onClick={handleAccept} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700">Accept</button>
                        <button onClick={handleReject} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700">Reject</button>
                    </div>
                </div>
      
            </div>
        </div>
    );
}
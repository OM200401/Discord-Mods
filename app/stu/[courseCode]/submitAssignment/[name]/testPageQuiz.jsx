'use client'
'use client'
import Sidebar from '../../../../../app/components/Sidebar';
import CourseNavBar from '../../../../../app/components/StuCourseNavBar';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useParams } from 'next/router'; // Changed import
import { auth } from '../../../../../app/lib/firebase';
import { getDoc, getDocs, query, collection, where } from 'firebase/firestore';
import db from '../../../../lib/firebase';

export default function Assignments({ courseCode, name }) { // Added props

    const [assignmentData, setAssignmentData] = useState(null);
    const [userName, setUserName] = useState('');
    const [userType, setUserType] = useState('user');
    const [assignmentType, setAssignmentType] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (auth.currentUser) {
                const userInfoRef = collection(db, 'students');
                const q = query(userInfoRef, where('uid', '==', auth.currentUser.uid));
                try {
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        setUserName(doc.data().firstName);
                        setUserType(doc.data().userType);
                    });
                } catch (error) {
                    console.log(error.message);
                }

                const quizRef = doc(db, 'quizzes', name);
                const quizSnapshot = await getDoc(quizRef);

                if (quizSnapshot.exists()) { // Changed to exists() instead of data()
                    setAssignmentData({ name, ...quizSnapshot.data() });
                    setAssignmentType('quiz');
                } else {
                    console.error('Quiz not found');
                }
            }
        });

        return () => unsubscribe();
    }, [name]); // Added name to dependencies

    return (
        <>
            <div className="flex flex-col md:flex-row bg-blue-100">
                <Sidebar userName={userName} userType={userType} />
                <div className="relative md:ml-64">
                    <CourseNavBar courseCode={courseCode} />
                </div>
                <div className="p-6 text-center w-full">
                    <h1 className="text-3xl text-black font-semibold mb-4" data-testid="course-heading">{assignmentData && assignmentData.name}</h1>
                    <h2 className="text-3xl text-black font mt-4" data-testid="assignments-heading">Prompt: {assignmentData && assignmentData.questionPrompt}</h2>
                    {/* Additional quiz content rendering here */}
                </div>
            </div>
        </>
    );
}

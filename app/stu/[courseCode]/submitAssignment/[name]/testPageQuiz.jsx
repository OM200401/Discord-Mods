'use client'
import Sidebar from '../../../../../app/components/Sidebar';
import CourseNavBar from '../../../../../app/components/StuCourseNavBar';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useParams } from 'next/navigation';
import { auth } from '../../../../../app/lib/firebase';
import { getDoc, doc,getDocs,query,collection, where,updateDoc } from 'firebase/firestore';
import { arrayUnion } from 'firebase/firestore';
import db from '../../../../lib/firebase';
import {storage} from '../../../../lib/firebase';
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage';

export default function Assignments() {
    let {name,courseCode} = useParams();

    name = decodeURIComponent(name);
    courseCode = decodeURIComponent(courseCode)
    console.log(name);
    console.log(courseCode);

    const [assignmentData, setAssignmentData] = useState([]);
    const [user,setUser] = useState(null);
    const [userType,setUserType] = useState('user');
    const [userName,setUserName] = useState('non');
    const [assignmentType,setAssignmentType] = useState(null);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (auth.currentUser) {
                setUser(auth.currentUser);

                console.log(user);
                const userInfoRef = collection(db,'students');
                const q = query(userInfoRef, where('uid','==',user.uid));
                try{
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        setUserName(doc.data().firstName);
                        setUserType(doc.data().userType);
                    })
                }catch(error){
                    console.log(error.message);
                }  
              
            const quizRef = doc(db, 'quizzes', name);

            const quizSnapshot = await getDoc(quizRef);

            if (quizSnapshot.data()) {
                setAssignmentData({ name, ...quizSnapshot.data() });
                setAssignmentType('quiz');
            } else {
                console.error('Quiz not found');
            } 
            }
        });

        return () => unsubscribe();
    }, []); // Remove assignmentType from dependencies


    return (
        <>
        {assignmentType != null && assignmentType === 'quiz' && (
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
        )}
        </>
    );
}

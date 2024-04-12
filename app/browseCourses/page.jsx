"use client";

import { useEffect, useState } from 'react';
import Sidebar from '../views/Sidebar';
import Card from '../views/BrowseCourseCard';
import { onAuthStateChanged } from 'firebase/auth';
import db from '../lib/firebase'; 
import { auth } from '../lib/firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import Loader from '../views/Loader';
import { motion } from 'framer-motion';

export default function Courses() {
    // State variables
    const [loading, setLoading] = useState(true); // State for storing loading status
    const [userName, setUserName] = useState('non'); // State for storing user name
    const [user,setUser] = useState(); // State for storing user
    const [userType, setUserType] = useState('non'); // State for storing user type
    const [courses, setCourses] = useState([]); // State for storing courses

    //Effect hook for fetching courses
    useEffect(() => {

        const fetchCourses = async () => {
            try {
                // Fetch all documents from the enrolments collection and map to an array
                const coursesCollection = collection(db,'courses');
                const snapshot = await getDocs(coursesCollection);
                const courses = snapshot.docs
                                    .filter(doc => doc.id !== "DefaultCourse")
                                    .map((doc) => ({ id: doc.id, ...doc.data() }));
                setCourses(courses);

            } catch (error) {
                console.error('Error fetching enrolments:', error);
            }
        };

        fetchCourses();
    }, []);
  
    // Effect Hook for handling authentication state change
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if(auth.currentUser){
                setUser(auth.currentUser);
                console.log(user.uid);
                const teacher = query(collection(db, 'teachers'), where('uid', '==', user.uid));
                const teacherSnapshot = await getDocs(teacher);

                const teacherdoc = teacherSnapshot.docs[0];

                const student = query(collection(db, 'students'), where('uid', '==', user.uid));
                const studentSnapshot = await getDocs(student);

                const studentdoc = studentSnapshot.docs[0];
                if(teacherdoc && teacherdoc.data()){
                    setUserName(teacherdoc.data().firstName);
                    setUserType(teacherdoc.data().userType);
                }else if(studentdoc && studentdoc.data()){
                    setUserName(studentdoc.data().firstName);
                    setUserType(studentdoc.data().userType);
                }

                // console.log(doc.id, ' => ', doc.data());
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
                
            }
            // console.log(userName);
        }); 

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    if (loading) {
        return <Loader data-testid='loader' />; // Return the Loading component if loading is true
    }
  
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-blue-100">
            <Sidebar userName={userName} userType={userType} />
            <div className="p-6 text-center ml-96">
                <h1 className="text-3xl text-black font-semibold mb-4 ">Courses</h1>
                <div data-testid = "course-card" className="flex flex-wrap justify-start">
                    {courses.map((course, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100  }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <Card key={index} courseCode={course.id} courseName={course.courseName} />
                        </motion.div>
                    ))}
                </div>  
            </div>
        </div>
    );
}
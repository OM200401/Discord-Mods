'use client';
import Link from "next/link";
import Loader from '../components/Loader';
import dynamic from "next/dynamic";
import CourseCard from "../components/CourseCard";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import db from '../lib/firebase'; 
import { auth } from '../lib/firebase';
import { collection, query, where, getDocs,getDoc,doc } from "firebase/firestore";

let Sidebar;
if (process.env.NODE_ENV === 'test') {
    const MockSidebar = () => <div data-testid="sidebar-component"></div>;
    MockSidebar.displayName = 'Sidebar';
    Sidebar = MockSidebar;
} else {
    Sidebar = dynamic(() => import('../components/Sidebar'), {ssr: false});
}
// Home Page that will be seen by the teacher user on logging in

export default function Home(){
    const [userName, setUserName] = useState('non');
    const [user,setUser] = useState();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate a network request
        setTimeout(() => {
            setLoading(false); // Set loading to false after 3 seconds
        }, 1000);
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if(auth.currentUser){
                setUser(auth.currentUser);

                console.log(user.uid);
                const teacher = query(collection(db, 'teachers'), where('uid', '==', user.uid));
                // const teacher = doc(db, 'teachers', user.uid);
                const teacherSnapshot = await getDocs(teacher);

                if(!teacherSnapshot.empty){
                    const teacherDoc = teacherSnapshot.docs[0];
                    setUserName(teacherDoc.data().firstName);
                    // console.log(doc.id, ' => ', doc.data());
                    const registeredCoursesRef = collection(teacherDoc.ref,'registeredCourses');
                    const registeredCoursesSnapshot = await getDocs(registeredCoursesRef);
                    registeredCoursesSnapshot.forEach((registeredCourseDoc) => {
                        if (registeredCourseDoc.id !== "DefaultCourse") {
                            console.log('Registered Course ID:', registeredCourseDoc.id, ' => ', registeredCourseDoc.data());
                            courses.push( {id: registeredCourseDoc.id, ...registeredCourseDoc.data()} );  
                        }                         
                    });
                } 
            }
            console.log(courses)
            console.log(userName);
        }); 

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [userName]);

    return (
        <div className="flex flex-col md:flex-row ml-80">
            <Sidebar data-testid="sidebar-component" userName={ userName } />
            <div className="mt-4 md:mt-0 md:ml-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 p-4 md:p-8">
                {loading ? (
                    <Loader/>
                ) : (
                    courses.map(course => (
                        <Link key={course.id} href={`/[courseCode]?courseCode=${course.id}`}>
                        <CourseCard data-testid="course-card" courseCode={course.id} courseName={course.courseName} imageUrl={course.imageUrl}/>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}
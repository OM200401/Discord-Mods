'use client';
import Link from "next/link";
import Loader from '../components/Loader';
import dynamic from "next/dynamic";
import CourseCard from "../components/CourseCard";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import db from '../lib/firebase'; 
import { auth } from '../lib/firebase';
import { collection, query, where, getDocs,getDoc, documentId } from "firebase/firestore";

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
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if(auth.currentUser){
                setUser(auth.currentUser);
                console.log(user.uid);

                const teacher = query(collection(db, 'teachers'), where('uid', '==', user.uid));
                const teacherSnapshot = await getDocs(teacher);

                const doc = teacherSnapshot.docs[0];
                setUserName(doc.data().firstName);
                // console.log(doc.id, ' => ', doc.data());
                const registeredCoursesRef = collection(doc.ref,'registeredCourses');
                const registeredCoursesSnapshot = await getDocs(registeredCoursesRef);

                console.log(registeredCoursesSnapshot);
                registeredCoursesSnapshot.forEach(async (registeredCourseDoc) => {
                    console.log(registeredCourseDoc.data());
                    if (registeredCourseDoc.id !== "DefaultCourse") {
                        const coursesRef = collection(db,'courses');
                        const courseQuery = query(coursesRef, where(documentId(), '==', registeredCourseDoc.id));
                        const courseSnapshot = await getDocs(courseQuery);
                        const course = courseSnapshot.docs[0];
                        console.log(course.data())
                        courses.push( {id: course.id, ...course.data()} );   
                    }                      
                });
                console.log(courses)
                setTimeout(() => {
                    setLoading(false);
                }, 3000);
                
            }
            console.log(userName);
        }); 

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

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
'use client';
import Link from "next/link";
// import Sidebar from "../components/Sidebar"; 
import dynamic from "next/dynamic";
import CourseCard from "../components/CourseCard";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import db from '../lib/firebase'; 
import {auth} from '../lib/firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
// import {fetchCourseInfo} from "../components/FetchCourseData"
import Loader from '../components/Loader';

let Sidebar;
if (process.env.NODE_ENV === 'test') {
    const MockSidebar = () => <div data-testid="sidebar-component"></div>;
    MockSidebar.displayName = 'Sidebar';
    Sidebar = MockSidebar;
} else {
    Sidebar = dynamic(() => import('../components/Sidebar'), {ssr: false});
}
// Home Page that will be seen by the student user on logging in

export default function Home(){
    const [userName, setUserName] = useState('non');
    const [user,setUser] = useState();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if(auth.currentUser){
              setUser(auth.currentUser);
                console.log(user);
                console.log(user.uid);

                const student = query(collection(db, 'students'), where('uid', '==', user.uid));
                const studentSnapshot = await getDocs(student);

                studentSnapshot.forEach(async (doc) => {
                    // console.log(doc.id, ' => ', doc.data());
                    const registeredCoursesRef = collection(doc.ref,'registeredCourses');
                    const registeredCoursesSnapshot = await getDocs(registeredCoursesRef);

                    console.log(registeredCoursesSnapshot);
                    registeredCoursesSnapshot.forEach((registeredCourseDoc) => {
                        if (registeredCourseDoc.id !== "DefaultCourse") {
                            console.log('Registered Course ID:', registeredCourseDoc.id, ' => ', registeredCourseDoc.data());
                            courses.push( {id: registeredCourseDoc.id, ...registeredCourseDoc.data()} );   
                        }                      
                    });
                    console.log(courses)
                    setTimeout(() => {
                        setLoading(false);
                    }, 3000);
                });
            }
            console.log(userName);
        }); 

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [userName]);

    return (
        <div className="flex flex-col md:flex-row ml-80">
            <Sidebar data-testid="sidebar-component" userName={ userName } />
            {/* <h1>hello this is the stuHome</h1> */}
            <div className="mt-4 md:mt-0 md:ml-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 p-4 md:p-8">
                {loading ? (
                    <Loader />
                ) : (
                    courses.map(course => (
                        <Link key={course.id} href={`../stu/[courseCode]?courseCode=${course.courseCode}`}>
                        <CourseCard data-testid="course-card" courseCode={course.courseCode} courseName={course.courseName} imageUrl={course.imageUrl}/>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}
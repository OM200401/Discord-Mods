"use client";
import { useParams } from 'next/navigation';
import Sidebar from '../../components/Sidebar';
import { useEffect, useState } from 'react';
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';
import db from '../../lib/firebase';
import { auth } from '../../lib/firebase';

export default function CourseInfo() {
    const {courseCode} = useParams();

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if(auth.currentUser){
                setUser(auth.currentUser);
            }
        });

        const fetchCourses = async () => {
            try {
                // Fetch all documents from the enrolments collection and map to an array
                const coursesCollection = collection(db,'courses');
                const snapshot = await getDocs(coursesCollection);
                const courses = snapshot.docs
                                    .filter(doc => doc.id !== "DefaultCourse")
                                    .map((doc) => ({ id: doc.id, ...doc.data() }));
                setCourses(courses);
                console.log(courses);

            } catch (error) {
                console.error('Error fetching course data:', error);
            }
        };

        fetchCourses();
        return () => unsubscribe();
    }, []);

    const course = courses.find(c => c.id === courseCode);

    const handleEnroll = async () => {

        if(!user){
            console.log('User not logged in');
            return false;
        }

        const studentQuery = query(collection(db, 'students'), where('uid', '==', user.uid));
        const teacherQuery = query(collection(db, 'teachers'), where('uid', '==', user.uid));

        try{
            const enrolmentRef = collection(db, 'enrolments');
            const enrolmentsQuery = query(enrolmentRef, where('courseCode', '==', courseCode), where('email', '==', user.email));
            const currentEnrolmentSnapshot = await getDocs(enrolmentsQuery);

            if(!currentEnrolmentSnapshot.empty){
                console.log('User has already requested to enrol.');
                return false;
            }

            const enrolmentData = {
                email: user.email,
                courseCode: courseCode
            }

            const studentSnapshot = await getDocs(studentQuery);
            const teacherSnapshot = await getDocs(teacherQuery);
            const existingCourse = [];

            if(!studentSnapshot.empty){ 
                studentSnapshot.forEach(async (studentDoc) => {
                    const registeredCoursesRef = collection(studentDoc.ref, 'registeredCourses');
                    const registeredCoursesSnapshot = await getDocs(registeredCoursesRef);
                    registeredCoursesSnapshot.forEach(async (doc) => {
                        if(doc.id === courseCode){
                            existingCourse.push(doc.id);
                            console.log('User already enrolled in course');
                            return false;
                        } 
                    });
                    if(existingCourse.length === 0){
                        await addDoc(enrolmentRef, enrolmentData);
                        console.log('Enrolment added successfully.');
                    }
                });
            } else {
                teacherSnapshot.forEach(async (teacherDoc) => {
                    const registeredCoursesRef = collection(teacherDoc.ref, 'registeredCourses');
                    const registeredCoursesSnapshot = await getDocs(registeredCoursesRef);
                    registeredCoursesSnapshot.forEach(async (doc) => {
                        if(doc.id === courseCode){
                            existingCourse.push(doc.id);
                            console.log('User already enrolled in course');
                            return false;
                        } 
                    });
                });
                if(existingCourse.length === 0){
                    await addDoc(enrolmentRef, enrolmentData);
                    console.log('Enrolment added successfully.');
                }
            }  

        } catch(error){
            console.log('Could not add enrolment.');   
            console.error(error.message);
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-blue-100">
            <Sidebar />
            <div className="p-6 text-center w-full">
                <h1 className="text-3xl text-black font-semibold mb-4">{courseCode}</h1>
                <h1 className="text-3xl text-black font-semibold mb-4">{course?.courseName}</h1>
                <p className="text-gray-700 mb-4">{course?.description}</p>
                <button onClick={handleEnroll} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Request to Enroll
                </button>
            </div>
        </div>
    );
}
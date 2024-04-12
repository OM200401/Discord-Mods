"use client";
import { useParams } from 'next/navigation';
import Sidebar from '../../views/Sidebar';
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';
import db from '../../lib/firebase';
import { auth } from '../../lib/firebase';
import { useState, useEffect } from 'react';
import Loader from '../../views/Loader';

export default function CourseInfo() {
    const {courseCode} = useParams();

    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [user, setUser] = useState();
    const [userName, setUserName] = useState('non');
    const [userType, setUserType] = useState('non');
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if(auth.currentUser){
                setUser(auth.currentUser);
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
                // console.log(courses);
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
            setMessage('User not logged in');
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
                            setMessage('User already enrolled in course');
                            return false;
                        } 
                    });
                    if(existingCourse.length === 0){
                        await addDoc(enrolmentRef, enrolmentData);
                        setMessage('Enrolment added successfully.');
                    }
                });
            } else {
                teacherSnapshot.forEach(async (teacherDoc) => {
                    const registeredCoursesRef = collection(teacherDoc.ref, 'registeredCourses');
                    const registeredCoursesSnapshot = await getDocs(registeredCoursesRef);
                    registeredCoursesSnapshot.forEach(async (doc) => {
                        if(doc.id === courseCode){
                            existingCourse.push(doc.id);
                            setMessage('User already enrolled in course');
                            return false;
                        } 
                    });
                });
                if(existingCourse.length === 0){
                    await addDoc(enrolmentRef, enrolmentData);
                    setMessage('Enrolment added successfully.');
                }
            }  

        } catch(error){
            setMessage('Could not add enrolment.');   
            console.error(error.message);
        }
    };

    useEffect(() => {
        // Simulate a network request
        setTimeout(() => {
            setLoading(false); // Set loading to false after 3 seconds
        }, 1000);
    }, []);

    if (loading) {
        return <Loader />; // Return the Loading component if loading is true
    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-blue-100">
            <Sidebar userName={userName} userType={userType} />
            <div className="p-6 text-center w-screen mx-60">
                <h1 className="text-3xl text-black font-semibold mb-4">{courseCode}</h1>
                <h1 className="text-3xl text-black font-semibold mb-4">{course?.courseName}</h1>
                <p className="text-gray-700 mb-4">{course?.description}</p>
                {userType === 'Student' && (
                    <button onClick={handleEnroll} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Request to Enroll
                    </button>
                )}
                {message && (
                    <div className="mt-4 bg-blue-100 border-l-4  text-blue-700 p-4" role="alert">
                        <p className="font-bold">Notice</p>
                        <p>{message}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
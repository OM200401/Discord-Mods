'use client';
import { useState, useEffect } from 'react';
import { collection, doc, getDocs, getDoc, setDoc } from 'firebase/firestore';
import db from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { query, where } from "firebase/firestore";
import { set } from 'firebase/database';
import AdminSidebar from '../components/AdminSidebar';
import Sidebar from '../components/Sidebar';

const AddCoursePage = () => {
    const [userName, setUserName] = useState('non');
    const [user,setUser] = useState();
    const [courseCode, setCourseCode] = useState('');
    const [courseName, setCourseName] = useState('');
    const [description, setDescription] = useState('');
    const [teachers, setTeachers] = useState(['Fetching all teachers...']);
    const [selectedTeacher, setSelectedTeacher] = useState('');

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const teachersRef = collection(db, 'teachers');
                const snapshot = await getDocs(teachersRef);
                const teachersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setTeachers(teachersData);
            } catch (error) {
                console.error('Error fetching teachers:', error);
            }
        };

        fetchTeachers();
    }, []);

    const isCourseCodeValid = (courseCode) => {
        const regex = /^[A-Z]{4}\d{3}$/;
        return regex.test(courseCode);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'courseCode') {
            setCourseCode(value);
        } else if (name === 'courseName') {
            setCourseName(value);
        } else if (name === 'description') {
            setDescription(value);
        } else if (name === 'teacher') {
            setSelectedTeacher(value);
        }
    };

    const handleSubmit = async (e) => { 
        
        e.preventDefault();
        if(!isCourseCodeValid(courseCode))
            alert('Invalid Course Code. Must be 4 uppercase letters followed by 3 digits.');

        const newCourseData = {
            courseName: courseName,
            description: description,
            teacher: selectedTeacher
        };
    
        try{
            const coursesRef = collection(db, ' courses');
            await setDoc(doc(db, "courses", courseCode), newCourseData);

            console.log("Course added to courses collection")

            const teacherRef = doc(db, 'teachers', selectedTeacher);
            const teacherDoc = await getDoc(teacherRef);
        
            console.log("Got teacher snapshot")

            const registeredCoursesRef = collection( teacherDoc.ref, 'registeredCourses');
            await setDoc(doc(registeredCoursesRef, courseCode), newCourseData); 

            console.log("Course added to registered courses")

            setCourseCode('');
            setCourseName('');
            setDescription('');
            setSelectedTeacher('');

        } catch(error){
            console.log("Error adding course:", error);
        }

    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if(auth.currentUser){
              setUser(auth.currentUser);
                console.log(user);
                const userInfoRef = collection(db,'admins');
                const q = query(userInfoRef, where('uid','==',user.uid));
                console.log(q);
                try{
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        setUserName(doc.data().firstName);
                    })
                }catch(error){
                    console.log(error.message);
                }

              }  else {
                // User is signed out
                console.log('No user');
            }

            console.log(userName);
        }); 

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [userName]);

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-200">
            <AdminSidebar data-testid="sidebar-component" userName={ userName } />
            <h1 className='text-black mb-32 font-bold text-3xl'>Add Course</h1>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="courseCode">
                        Course Code:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="courseCode"
                        type="text"
                        name="courseCode"
                        value={courseCode}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="courseName">
                        Course Name:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="courseName"
                        type="text"
                        name="courseName"
                        value={courseName}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description:
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40"
                        id="description"
                        type="text"
                        name="description"
                        value={description}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="teacher">
                        Teacher:
                    </label>
                    <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="teacher"
                        name="teacher"
                        value={selectedTeacher}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Teacher</option>
                        {teachers.map((teacher) => (
                            <option key={teacher.id} value={teacher.id}>{teacher.firstName} {teacher.lastName}</option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddCoursePage;

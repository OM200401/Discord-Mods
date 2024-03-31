'use client';
import { useState, useEffect } from 'react';
import { collection, doc, getDocs, getDoc, setDoc } from 'firebase/firestore';
import db from '../lib/firebase';
import { set } from 'firebase/database';
import AdminSidebar from '../components/AdminSidebar';

const AddCoursePage = () => {
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
            courseCode: courseCode,
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

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Course Code:
                    <input
                        type="text"
                        name="courseCode"
                        value={courseCode}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Course Name:
                    <input
                        type="text"
                        name="courseName"
                        value={courseName}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Description:
                    <input
                        type="text"
                        name="description"
                        value={description}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Teacher:
                    <select name="teacher" value={selectedTeacher} onChange={handleInputChange}>
                        <option value="">Select Teacher</option>
                        {teachers.map((teacher) => (
                            <option key={teacher.id} value={teacher.id}>{teacher.firstName} {teacher.lastName}</option>
                        ))}
                    </select>
                </label>
                <br />
                <button className="bg-green-200" type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddCoursePage;

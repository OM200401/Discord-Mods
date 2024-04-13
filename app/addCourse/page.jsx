'use client';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import AdminSidebar from '../views/AdminSidebar';
import { isCourseCodeValid, courseAlreadyExists, addCourse } from '../models/Course';
import { createUser, fetchAllTeachers, getTeacherDoc } from '../models/User';
import { addTeacherRegisteredCourse } from '../utilities/TeacherUtilities';
import AdminAddCourseView from '../views/AdminAddCourseView';

const AddCoursePage = () => {
    // State variables
    const [user,setUser] = useState(null); // State for storing user
    const [courseCode, setCourseCode] = useState(''); // State for storing course code
    const [courseName, setCourseName] = useState(''); // State for storing course name
    const [description, setDescription] = useState(''); // State for storing description
    const [teachers, setTeachers] = useState(['Fetching all teachers...']); // State for storing teachers
    const [selectedTeacher, setSelectedTeacher] = useState(''); // State for storing selected teacher
    const [loading, setLoading] = useState(true); // State for storing loading status
    const [feedback, setFeedback] = useState(''); // State for storing feedback

    //Function for handling input change
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

    // Function or handling form submission
    const handleSubmit = async (e) => { 
        
        e.preventDefault();
        if(!isCourseCodeValid(courseCode)){
            alert('Invalid Course Code. Must be 4 uppercase letters followed by 3 digits.');
            return;
        }

        if(courseName === ''){
            alert('Course name cannot be empty.');
            return;
        }

        if(selectedTeacher === ''){
            alert('Please select a teacher.');
            return;
        }

        if(await courseAlreadyExists(courseCode)){
            if(!window.confirm("Course with this course code already exists. Do you want to overwrite the existing course? You will lose all the old teacher and assignment data.")) {
                return;
            }
        }

        const newCourseData = {
            courseName: courseName,
            description: description,
            teacher: selectedTeacher,
            currentAssignments: [],
            gradedAssignments: [],
            currentWeight: 0
        };
    
        try{
            await addCourse(courseCode, newCourseData);
            setFeedback("Course added to courses collection");
            
            const teacherDoc = await getTeacherDoc(selectedTeacher);
            setFeedback("Got teacher snapshot");

            await addTeacherRegisteredCourse(teacherDoc.ref, courseCode, newCourseData);
            setFeedback("Course added to teacher's registered courses");

            setCourseCode('');
            setCourseName('');
            setDescription('');
            setSelectedTeacher('');

        } catch(error){
            console.error("Error adding course:", error);
        }
    };

    // Effect hook for handling authentication state change
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if(auth.currentUser){
                if(auth.currentUser){
                    // User is signed in
                    const user = await createUser(auth.currentUser.uid, "admin");
                    setUser(user);

                    const teachers = await fetchAllTeachers();
                    setTeachers(teachers);

                    setTimeout(() => {
                        setLoading(false);
                    }, 200);
                } else {
                    // User is signed out
                    console.log('No user');
                }
            }
        }); 

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [user]);

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-200">
            <AdminSidebar data-testid="adminSidebar-component" userName={ user?.firstName } />
            <AdminAddCourseView 
                loading={loading}
                handleInputChange={handleInputChange} 
                handleSubmit={handleSubmit} 
                courseCode={courseCode} 
                courseName={courseName} 
                description={description} 
                selectedTeacher={selectedTeacher} 
                teachers={teachers} 
                feedback={feedback}
            />
        </div>
    );
};

export default AddCoursePage;

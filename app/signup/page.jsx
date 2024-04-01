'use client'
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { collection } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from "firebase/auth";
import db from '../lib/firebase';
import {auth} from '../lib/firebase';
import { redirect } from 'next/navigation';
import { addDoc,doc,getDoc,setDoc } from 'firebase/firestore';

//Created signup page for users that do not have an account on the platform
// Added html validation for input of email and password

export default function SignUpPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userType, setUserType] = useState('Student');
    const [errorMsg, setErrorMsg] = useState('');
    const [user,setUser] = useState(null);

    useEffect(() => {
        if (user) {
          console.log("Redirect");
          redirect('/home');
        }
    }, [user]);

    const getFriendlyErrorMessage = (firebaseErrorCode) => {
        switch (firebaseErrorCode) {
            case 'auth/invalid-email':
                return 'The email address is not valid.';
            case 'auth/user-disabled':
                return 'This user account has been disabled.';
            case 'auth/user-not-found':
                return 'No user found with this email address.';
            case 'auth/wrong-password':
                return 'The password is incorrect.';
            case 'auth/invalid-credential':
                return 'The credentials are invalid.';
            case 'auth/weak-password':
                return 'Password should be at least 6 characters long.';
            // Add more cases as needed
            default:
                return 'An unknown error occurred.';
        }
    };


    const handleSubmit = async(e) => {
        e.preventDefault();

        // Validate the form data here
        if (!firstName || !lastName || !email || !password || !confirmPassword || !userType) {
            setErrorMsg('All fields are required');
            return;
        }


    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user
        const uid = user.uid;
        setUser(user);

        // After the user is created, you can add additional user info to your Firestore collection
        if(userType == 'Student'){
            const studentCollection = collection(db,'students');
            const defaultCourse = doc(db, 'courses', 'DefaultCourse')

            const defaultCourseDoc = await(getDoc(defaultCourse));

            let defaultCourseData = '';

            if(defaultCourseDoc.exists()) {
                 defaultCourseData = defaultCourseDoc.data();

            }


            const studentDocRef = await addDoc(studentCollection,{
                firstName:firstName,
                lastName:lastName,
                email:email,
                userType:userType,
                uid:uid
            }) 


            const registeredCoursesCollectionRef = collection(studentDocRef, 'registeredCourses')
            await setDoc(doc(registeredCoursesCollectionRef, 'DefaultCourse'), defaultCourseData);

 
        }else {
            const teacherCollection = collection(db,'teachers');
            
            const defaultCourse = doc(db, 'courses', 'DefaultCourse')

            const defaultCourseDoc = await(getDoc(defaultCourse));

            let defaultCourseData = '';

            if(defaultCourseDoc.exists()) {
                 defaultCourseData = defaultCourseDoc.data();

            }


            const teacherDocRef = await addDoc(teacherCollection,{
                firstName:firstName,
                lastName:lastName,
                email:email,
                userType:userType,
                uid:uid
            })


            const registeredCoursesCollectionRef = collection(teacherDocRef, 'registeredCourses')
            await setDoc(doc(registeredCoursesCollectionRef, 'DefaultCourse'), defaultCourseData);


        }
       
       
    } catch (error) {
        // Handle any errors from login fields here
        setErrorMsg(getFriendlyErrorMessage(error.code)); 
        console.error("Error signing in with email and password", error);
    }
    }

    return (
        <div className="min-h-screen flex flex-col justify-start">
            
            <Navbar />
            <div className="relative py-3 sm:max-w-xl sm:mx-auto mt-10">
                <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                    <div className="max-w-md mx-auto">
                        <div className="flex items-center space-x-5">
                            <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                                <h2 className="leading-relaxed">Sign Up</h2>
                                <p className="text-sm text-gray-500 font-normal leading-relaxed">Enter your information to create your account.</p>
                            </div>
                        </div>
                        <form data-testid='signup-form' onSubmit={handleSubmit} className="divide-y divide-gray-200">
                            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <div className="flex flex-col">
                                    <label htmlFor='FirstName' className="leading-loose">First Name</label>
                                    <input id='FirstName' type='input' onChange={e => setFirstName(e.target.value)} className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Name" value={firstName} required />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor='LastName' className="leading-loose">Last Name</label>
                                    <input id='LastName' type='input' onChange={e => setLastName(e.target.value)} className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Name" value={lastName} required/>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor='Email' className="leading-loose">Email</label>
                                    <input id='Email' type="email" onChange={e => setEmail(e.target.value)} className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Email" value={email}  required/>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor='Password' className="leading-loose">Password</label>
                                    <input id='Password' type="password" onChange={e => setPassword(e.target.value)} className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Password" value={password} required/>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor='confirmPassword' className="leading-loose">Confirm Password</label>
                                    <input id='confirmPassword' type="password" onChange={(e) => setConfirmPassword(e.target.value)} className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Confirm Password" value={confirmPassword} required/>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor='userType' className="leading-loose">User Type</label>
                                    <select id='userType' value={userType} onChange={(e) => setUserType(e.target.value)} className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600">
                                        <option value="student">Student</option>
                                        <option value="teacher">Teacher</option>
                                    </select>
                                </div>                                                                
                                <button type='submit' onClick={handleSubmit} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Sign Up</button>
                            </div>
                        </form>
                        {errorMsg && <p className="text-red-500">{errorMsg}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

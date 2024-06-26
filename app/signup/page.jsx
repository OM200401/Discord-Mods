'use client'
import { useEffect, useState } from 'react';
import Navbar from '../views/Navbar';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from '../lib/firebase';
import { redirect } from 'next/navigation';
import {Input} from '@nextui-org/react';
import { setDefaultStudentCourse,createStudent } from '../utilities/StudentUtilities';
import { setDefaultTeacherCourse,createTeacher } from '../utilities/TeacherUtilities';


//Created signup page for users that do not have an account on the platform
// Added html validation for input of email and password

export default function SignUpPage() {
    // State variables
    const [firstName, setFirstName] = useState(''); // State for storing first name
    const [lastName, setLastName] = useState(''); // State for storing last name
    const [email, setEmail] = useState(''); // State for storing email
    const [password, setPassword] = useState(''); // State for storing password
    const [confirmPassword, setConfirmPassword] = useState(''); // State for storing confirmed password
    const [userType, setUserType] = useState('Student'); // State for storing user type
    const [errorMsg, setErrorMsg] = useState(''); // State for storing error message
    const [user,setUser] = useState(null); // State for storing user

    // Effect hook for redirection based on the type of the user
    useEffect(() => {
        if (user) {
            if(userType === 'Teacher'){
                redirect('/home');
            }else{
                // console.log("Redirect");
                redirect('/stuHome');
            }
        }
    }, [user]);

    // Function to display friendly error message based on firebase error code
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
            case 'auth/email-already-in-use':
                return 'The email address already exists';
            default:
                return 'An unknown error occurred.';
        }
    };

    // Function to handle signup form submission
    const handleSubmit = async(e) => {
        e.preventDefault();

        // Validate the form data here
        if (!firstName || !lastName || !email || !password || !confirmPassword || !userType) {
            setErrorMsg('All fields are required');
            return;
        }
        
        try {
            await createUserWithEmailAndPassword(auth, email, password).then(async cred=> {
                setUser(cred.user);
                if(userType === 'Student'){
                    createStudent(firstName,lastName,email,userType,cred.user.uid);
                    setDefaultStudentCourse(cred.user.uid);
                }else {    
                    setUser(cred.user);                
                    createTeacher(firstName,lastName,email,userType,cred.user.uid);
                    setDefaultTeacherCourse(cred.user.uid);
            }
        })
    }
    
       
        catch (error) {
            // Handle any errors from login fields here
            setErrorMsg(getFriendlyErrorMessage(error.code)); 
            console.error("Error signing in with email and password", error);
        }    }

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
                                <Input 
                                    label="First Name" 
                                    type="text" 
                                    variant="flat"
                                    placeholder="First Name" 
                                    value={firstName} 
                                    onChange={(e) => setFirstName(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div className="flex flex-col">
                                <Input 
                                    label="Last Name" 
                                    type="text" 
                                    placeholder="Last Name" 
                                    value={lastName} 
                                    onChange={(e) => setLastName(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div className="flex flex-col">
                                <Input 
                                    label="Email" 
                                    type="email" 
                                    placeholder="Email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div className="flex flex-col">
                                <Input 
                                    label="Password" 
                                    type="password" 
                                    placeholder="Password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div className="flex flex-col">
                                <Input 
                                    label="Confirm Password" 
                                    type="password" 
                                    placeholder="Confirm Password" 
                                    value={confirmPassword} 
                                    onChange={(e) => setConfirmPassword(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor='userType' className="leading-loose">User Type</label>
                                <select id='userType' value={userType} onChange={(e) => setUserType(e.target.value)} className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600">
                                    <option value="Student">Student</option>
                                    <option value="Teacher">Teacher</option>
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
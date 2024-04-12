'use client';
import Navbar from "../views/Navbar";
import { useState } from 'react';
import {Button} from "@nextui-org/react";
import Link from "next/link";
import {collection, getDocs,doc,where,query} from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../lib/firebase';
import db from '../lib/firebase';
import {Input} from "@nextui-org/react";
import {MailIcon} from '../Icons/MailIcon';
import { EyeFilledIcon } from "../Icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../Icons/EyeSlashedFilledIcon";

// Created front end for the login page with Email and Password
// Validation in html also added to check the type of email input and password

export default function LoginPage() {
    // const router = useRouter();
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [user,setUser] = useState(null);

    const [uid,setUid] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    const [errorMsg, setErrorMsg] = useState('');

    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

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
            case 'auth/email-already-in-use':
                return 'The email is already in use.';
            // Add more cases as needed
            default:
                return 'An unknown error occurred.';
        }
    };


    const handleSubmit = async(e) => {
        setError("");
        e.preventDefault();
        
        // Check if email or password field is empty
        if (!email.trim()) {
            setError('Email field cannot be empty.');
            return;
        }
        if (!password.trim()) {
            setError('Password field cannot be empty.');
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);           
            const user = userCredential.user;    
            setUser(user);

            //check if user is in the teachers collection
            const tq = query(collection(db, "teachers"), where("email","==", email));
            const querySnapshotStu = await getDocs(tq);
            if(!querySnapshotStu.empty){
                // User is a teacher
                window.location.href = ('/home');
                return;
            }

            //check if user is in the students collection
            const sq = query(collection(db, "students"), where("email","==", email));
            const querySnapshotTeach = await getDocs(sq);
            if(!querySnapshotTeach.empty){
                //User is a teacher
                window.location.href = ('/stuHome');
                return;
            }

            //check if user is in the admins collection
            const aq = query(collection(db, "admins"), where("email","==", email));
            const querySnapshotAdmin = await getDocs(aq);
            if(!querySnapshotAdmin.empty){
                //User is an admin
                window.location.href = ('/admin');
                return;
            }

            // Handle error when user is neither teacher nor student
            setError("User is not a teacher or a student");
                   
        } catch (error) {
            // Handle any errors from login fields here
            setError(getFriendlyErrorMessage(error.code)); 
            console.error("Error signing in with email and password", error);
        } 
    };



    return (
        <div className="min-h-screen flex flex-col justify-start">
            <Navbar />
            <div className="relative py-3 sm:max-w-xl sm:mx-auto mt-10">
                <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                    <div className="max-w-md mx-auto">
                        <div className="flex items-center space-x-5">
                            <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                                <h2 className="leading-relaxed">Login</h2>
                                <p className="text-sm text-gray-500 font-normal leading-relaxed">Enter your credentials to access your account.</p>
                            </div>
                        </div>
                        {error && <p className="text-red-500 font-normal leading-relaxed ml-2">{error}</p>}
                        <div className="divide-y divide-gray-200">
                            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <div className="flex flex-col">
                                    {/* <label className="leading-loose">Email</label> */}
                                    <Input 
                                        label="Email" 
                                        type="email" 
                                        placeholder="you@example.com" 
                                        labelPlacements="outside" 
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)} 
                                    />
                                </div>
                                <div className="flex flex-col">
                                    {/* <label className="leading-loose">Password</label> */}
                                    <Input 
                                        label="Password"
                                        variant="flat"
                                        placeholder="Enter your password"
                                        endContent={
                                          <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                            {isVisible ? (
                                              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                            ) : (
                                              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                            )}
                                          </button>
                                        }
                                        type={isVisible ? "text" : "password"}
                                        className="max-w-xs" 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)} 
                                    />
                                </div>
                                <Button color="primary" variant="shadow" size="lg" onClick={(e) => (handleSubmit(e))}>Login</Button>
                                <div className="mt-4">
                                    <p>Don&apos;t have an account? <a className="text-blue-600 hover:text-blue-700"><Link href="/signup">Sign up</Link></a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

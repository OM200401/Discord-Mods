'use client';
import Navbar from "../components/Navbar";
import { useState } from 'react';
import { useEffect } from "react";
import Link from "next/link";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../lib/firebase';
import { redirect } from "next/navigation";

// Created front end for the login page with Email and Password
// Validation in html also added to check the type of email input and password

export default function LoginPage() {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [user,setUser] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');

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
                   
        } catch (error) {
            // Handle any errors from login fields here
            setError(getFriendlyErrorMessage(error.code)); 
            console.error("Error signing in with email and password", error);
        } 
    };

    useEffect(() => {
        if (user) {
          console.log("Redirect");
          redirect('/home');
        }
    }, [user]);


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
                                    <label className="leading-loose">Email</label>
                                    <input type="email" className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="flex flex-col">
                                    <label className="leading-loose">Password</label>
                                    <input type="password" className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <button onClick={(e) => (handleSubmit(e))} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Login</button>
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
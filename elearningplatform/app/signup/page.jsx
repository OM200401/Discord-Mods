'use client'
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { collection } from 'firebase/firestore';
import { onSnapshot,addDoc } from 'firebase/firestore';
import db from '../lib/firebase';



//Created signup page for users that do not have an account on the platform
// Added html validation for input of email and password

export default function SignUpPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userType, setUserType] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const colRef = collection(db,'Userinfo');
        addDoc(colRef,{
            name:name,
            email:email,
            password:password,
            userType:userType
        });
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
                        <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
                            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <div className="flex flex-col">
                                    <label className="leading-loose">First Name</label>
                                    <input type='input' onChange={e => setName(e.target.value)} className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Name" value={name} />
                                </div>
                                <div className="flex flex-col">
                                    <label className="leading-loose">Last Name</label>
                                    <input type='input' onChange={e => setName(e.target.value)} className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Name" value={name} />
                                </div>
                                <div className="flex flex-col">
                                    <label className="leading-loose">Email</label>
                                    <input type="email" onChange={e => setEmail(e.target.value)} className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Email" value={email}  />
                                </div>
                                <div className="flex flex-col">
                                    <label className="leading-loose">Password</label>
                                    <input type="password" onChange={e => setPassword(e.target.value)} className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Password" value={password} />
                                </div>
                                <div className="flex flex-col">
                                    <label className="leading-loose">Confirm Password</label>
                                    <input type="password" className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                </div>
                                <div className="flex flex-col">
                                    <label className="leading-loose">User Type</label>
                                    <select value={userType} onChange={(e) => setUserType(e.target.value)} className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600">
                                        <option value="student">Student</option>
                                        <option value="teacher">Teacher</option>
                                    </select>
                                </div>                                                                
                                <button type='submit' onClick={handleSubmit} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
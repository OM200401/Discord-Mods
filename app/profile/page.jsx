"use client";
import React, { useState, useEffect } from 'react';
import CourseNavBar from '../components/CourseNavBar';
import Sidebar from '../components/Sidebar';
import { auth, firestore } from '../lib/firebase'; 
import 'firebase/firestore';
import db from '../lib/firebase';


export default function Profile() {
    const [userInfo, setUserInfo] = useState([]);    
    useEffect(() => {
        const fetchUserData = async () => {
            const studentRef = firestore.collection('students').doc(auth.currentUser.uid);
            const doc = await studentRef.get();
                if (!doc.exists) {
                    console.log('No such doc');            
                }
            if (doc.userType == 'Student'){                   
                const data = doc.data();
                console.log(data.firstName);
                setUserInfo({
                    UserId: auth.currentUser.uid,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    oldpassword: data.password,
                    // profilePicture: data.profilePicture
                });
                }    
                else{
                    const teacherRef = firestore.collection('teachers').doc(auth.currentUser.uid);
                    const doc = await teacherRef.get();                
                    const data = doc.data();
                    console.log(data.firstName);
                    console.log(data.lastName);
                    setUserInfo({
                        UserId: doc.id,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        oldpassword: data.password,
                        // profilePicture: data.profilePicture
                    });
                }            
            }
            fetchUserData();
        }, []);         
        
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSaveButtonClick = async (field, value) => {
        let userRef;
        if (auth.currentUser.type == 'Student'){
            userRef = firestore.collection('students').doc(auth.currentUser.uid);
        }
        else if (auth.currentUser.type == 'teacher'){
            userRef = firestore.collection('teachers').doc(auth.currentUser.uid);
        }
        await userRef.update({
            [field]: value
        });
    };


    // const handleSaveButtonClick = () => {
    //     // Here we update the UserInfo state with the new values
    //     setUserInfo(prevState => ({
    //         ...prevState,
    //         UserId: prevState.UserId,
    //         firstName: prevState.firstName,
    //         lastName: prevState.lastName,
    //         email: prevState.email,
    //         oldpassword: prevState.oldpassword,
    //         profilePicture: prevState.profilePicture
    //     }));
    // };    


    

    return (
        <div className="bg-blue-100 min-h-screen">
            <div className="flex">
                <Sidebar />
                <div className="relative md:ml-64 w-full">
                    <div className="p-6 text-center">
                        <h1 className="text-3xl text-black font-semibold mb-4" data-testid="profile-heading">Profile</h1>
                        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
                            <div className="px-4 py-5 sm:px-6">
                                <div className="mb-6 flex justify-center items-center">
                                    {/* <img
                                        src={UserInfo.profilePicture}
                                        alt="Profile Picture"
                                        className="w-32 h-32 rounded-full mr-4"
                                    /> */}
                                    {/* <input type="text" name="profilePicture" value={userInfo.profilePicture} onChange={handleInputChange} className="border-b border-gray-400 focus:outline-none text-black" placeholder="Enter Profile Picture URL" />
                                    <button className="text-blue-500 hover:text-blue-700 focus:outline-none" onClick={handleSaveButtonClick}>Edit</button> */}
                                </div>
                                <h3 className="text-lg font-semibold leading-6 text-gray-900">User Information</h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
                            </div>
                            <div className="border-t border-gray-200">
                                <dl>
                                    <div className="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">UserID</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{userInfo.UserId}</dd>
                                    </div>
                                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">First Name</dt>
                                        <dd className="flex justify-between items-center mt-1 sm:col-span-2">
                                            <input type="text" name="firstName" value={userInfo.firstName} onChange={handleInputChange} className="border-b border-gray-400 focus:outline-none text-black" />    
                                            <button className="bg-blue-500 text-white hover:bg-blue-700 focus:outline-none px-3 py-1 rounded ml-2"onClick={handleSaveButtonClick}>Save</button>
                                        </dd>
                                    </div>
                                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Last Name</dt>
                                        <dd className="flex justify-between items-center mt-1 sm:col-span-2">
                                            <input type="text" name="lastName" value={userInfo.lastName} onChange={handleInputChange} className="border-b border-gray-400 focus:outline-none text-black" />
                                            <button className="bg-blue-500 text-white hover:bg-blue-700 focus:outline-none px-3 py-1 rounded ml-2" onClick={handleSaveButtonClick}>Save</button>
                                        </dd>
                                    </div>
                                    <div className="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Email</dt>
                                        <dd className="flex justify-between items-center mt-1 sm:col-span-2">
                                            <input type="email" name="email" value={userInfo.email}onChange={handleInputChange} className="border-b border-gray-400 focus:outline-none text-black" />
                                            <button className="bg-blue-500 text-white hover:bg-blue-700 focus:outline-none px-3 py-1 rounded ml-2" onClick={handleSaveButtonClick}>Save</button>
                                        </dd>
                                    </div>
                                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Old Password</dt>
                                        <dd className="flex justify-between items-center mt-1 sm:col-span-2">
                                            <input type="password" name="oldpassword" onChange={handleInputChange} className="border-b border-gray-400 focus:outline-none text-black" />
                                        </dd>
                                    </div>
                                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">New Password</dt>
                                        <dd className="flex justify-between items-center mt-1 sm:col-span-2">
                                            <input type="password" name="oldpassword"  onChange={handleInputChange} className="border-b border-gray-400 focus:outline-none text-black" />
                                        </dd>
                                    </div>
                                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Retype Password</dt>
                                        <dd className="flex justify-between items-center mt-1 sm:col-span-2">
                                            <input type="password" name="oldpassword" onChange={handleInputChange} className="border-b border-gray-400 focus:outline-none text-black" />
                                        </dd>
                                    </div>
                                    <button className="bg-blue-500 text-white hover:bg-blue-700 focus:outline-none px-3 py-1 rounded mb-5" onClick={handleSaveButtonClick}>Save</button>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

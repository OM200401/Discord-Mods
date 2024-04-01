"use client";
import React, { useState, useEffect } from 'react';
import CourseNavBar from '../components/CourseNavBar';
import Sidebar from '../components/Sidebar';
import { auth, firestore } from '../lib/firebase'; 
import {collection, getDocs, getDoc, query, where, doc, updateDoc} from 'firebase/firestore';
import db from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { data } from 'autoprefixer';


export default function Profile() {
    const [userInfo, setUserInfo] = useState([]); 
    const [user, setUser] = useState();

    useEffect(() => {
        const fetchUserData = onAuthStateChanged(auth, async(user) => {
            setUser(auth.currentUser);
            // if (auth.currentUser){
            //     const studentRef = query(collection(db, 'students'), where('uid', '==', user.uid));
            //     const querySnapshot = await getDocs(studentRef);
            //     // const doc = await studentRef.getDocs();                
            //     if (!querySnapshot.empty) {
            //         querySnapshot.forEach((doc) => {
            //             console.log(doc.data());
            //             const data = doc.data();
            //             setUserInfo({
            //                 UserId: data.uid,
            //                 firstName: data.firstName,
            //                 lastName: data.lastName,
            //                 email: data.email,
            //                 oldpassword: data.password,
            //                 // profilePicture: data.profilePicture
            //             });
            //         });

            if (auth.currentUser){
                const studentRef = query(collection(db, 'students'), where('uid', '==', user.uid));
                const querySnapshot = await getDocs(studentRef);
                // const doc = await studentRef.getDocs();                
                if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {
                        console.log(doc.data());
                        const data = doc.data();
                        setUserInfo({
                            UserId: data.uid,
                            firstName: data.firstName,
                            lastName: data.lastName,
                            email: data.email,
                            oldpassword: data.password,
                            // profilePicture: data.profilePicture
                        });
                    });
                }else{
                    const teacherRef = query(collection(db, 'teachers'), where('uid', '==', user.uid));
                    const teacherSnapshot = await getDocs(teacherRef); 
                    teacherSnapshot.forEach((doc) => {
                        console.log(doc.data());
                        const data = doc.data();
                        setUserInfo({
                            UserId: data.uid,
                            firstName: data.firstName,
                            lastName: data.lastName,
                            email: data.email,
                            oldpassword: data.password,
                            // profilePicture: data.profilePicture
                        });
                    });
                }                     
            }
                            
                       
        });
            return () => fetchUserData();            
        });         
        
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSaveButtonClick = async (field, value) => {
        let userRef;
        if (auth.currentUser.type === 'Student') {
            userRef = doc(db, 'students', auth.currentUser.uid);
        } else {
            userRef = doc(db, 'teachers', auth.currentUser.uid);
        }
        const newUserInfo = {
            firstName: userInfo.newFirstName || userInfo.firstName,
            lastName: userInfo.newLastName || userInfo.lastName,
            email: userInfo.newEmail || userInfo.email,
            password: userInfo.newpassword || userInfo.oldpassword,
        };

        await updateDoc(userRef, newUserInfo);
    };    

    return (
    <div className="bg-blue-100 min-h-screen">
        <div className="flex">
            <Sidebar />
            <div className="relative md:ml-64 w-full">
                <div className="p-6 text-center">
                    <h1 className="text-3xl text-black font-semibold mb-4" data-testid="profile-heading">Profile</h1>
                    <div className="max-w-xxl mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
                        <div className="px-4 py-5 sm:px-6">
                            <div className="mb-6 flex justify-center items-center">
                            </div>
                            <h3 className="text-lg font-semibold leading-6 text-gray-900">User Information</h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
                        </div>
                        <div className="border-t border-gray-200">
                            <dl>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">First Name</dt>
                                    <dd className="flex justify-between items-center mt-1 sm:col-span-2">
                                        <input type="text" name="firstName" value={userInfo.firstName} onChange={handleInputChange} className="border-b border-gray-400 focus:outline-none text-black" />    
                                        <input type="text" name="newFirstName" placeholder="New First Name" onChange={handleInputChange} className="border-b border-gray-400 focus:outline-none text-black ml-2" />
                                        <button className="bg-blue-500 text-white hover:bg-blue-700 focus:outline-none px-3 py-1 rounded ml-2"onClick={handleSaveButtonClick}>Edit</button>
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Last Name</dt>
                                    <dd className="flex justify-between items-center mt-1 sm:col-span-2">
                                        <input type="text" name="lastName" value={userInfo.lastName} onChange={handleInputChange} className="border-b border-gray-400 focus:outline-none text-black" />
                                        <input type="text" name="newLastName" placeholder="New Last Name" onChange={handleInputChange} className="border-b border-gray-400 focus:outline-none text-black ml-2" />
                                        <button className="bg-blue-500 text-white hover:bg-blue-700 focus:outline-none px-3 py-1 rounded ml-2" onClick={handleSaveButtonClick}>Edit</button>
                                    </dd>
                                </div>
                                <div className="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                                    <dd className="flex justify-between items-center mt-1 sm:col-span-2">
                                        <input type="email" name="email" value={userInfo.email}onChange={handleInputChange} className="border-b border-gray-400 focus:outline-none text-black" />
                                        <input type="email" name="newEmail" placeholder="New Email" onChange={handleInputChange} className="border-b border-gray-400 focus:outline-none text-black ml-2" />
                                        <button className="bg-blue-500 text-white hover:bg-blue-700 focus:outline-none px-3 py-1 rounded ml-2" onClick={handleSaveButtonClick}>Edit</button>
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
                                        <input type="password" name="newpassword"  onChange={handleInputChange} className="border-b border-gray-400 focus:outline-none text-black" />
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Retype Password</dt>
                                    <dd className="flex justify-between items-center mt-1 sm:col-span-2">
                                        <input type="password" name="retypepassword" onChange={handleInputChange} className="border-b border-gray-400 focus:outline-none text-black" />
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
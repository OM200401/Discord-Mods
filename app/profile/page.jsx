"use client";
import React, { useState, useEffect } from 'react';
import CourseNavBar from '../components/CourseNavBar';
import Sidebar from '../components/Sidebar';
import { auth, firestore } from '../lib/firebase'; 
import {collection, getDocs, getDoc, query, where, doc, updateDoc} from 'firebase/firestore';
import db from '../lib/firebase';
import { getAuth, onAuthStateChanged, updateEmail, updateProfile } from 'firebase/auth';
import { data } from 'autoprefixer';


export default function Profile() {
    const auth = getAuth();
    const [userInfo, setUserInfo] = useState([]); 
    const [user, setUser] = useState(); 
    const [newFirstName, setNewFirstName] = useState(''); 
    const [newLastName, setNewLastName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');


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
                if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {                        
                        const data = doc.data();
                        console.log(data);
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
                        const data = doc.data();
                        console.log(data);
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
        
    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setUserInfo(prevState => ({
    //         ...prevState,
    //         [name]: value
    //     }));
    // };
  

    const handleEdit1ButtonClick = onAuthStateChanged(auth, async (field, value) => {
        setNewFirstName(user.firstName);        
        if(auth.currentUser){
            if (user.type == 'Student') {
                // userRef = doc(db, 'students', user.uid);
                studentRef = query(collection(db, 'students'), where('uid', '==', user.uid));
                const querySnapshot = await getDocs(studentRef);
                if (!querySnapshot.empty) {
                    querySnapshot.forEach(async (doc) => {    
                        console.log(data);                    
                        const data = doc.data();
                        setNewFirstName(data.firstName);                        
                        await updateDoc(doc, {
                            firstName: newFirstName                            
                        });
                    });
                }             

            } else {
                teacherRef = query(collection(db, 'teachers'), where('uid', '==', user.uid));
                const teacherSnapshot = await getDocs(teacherRef);
                if (!teacherSnapshot.empty) {
                    teacherSnapshot.forEach(async (doc) => {
                        console.log(data);                        
                        const data = doc.data();
                        setNewFirstName(data.firstName);                        
                        await updateDoc(doc, {
                            firstName: newFirstName                            
                        });
                    });
                }             
            }
            // Update the document
            
            // Update the state
            setUserInfo(prevState => ({
                ...prevState,
                firstName: newFirstName                
            }));
            // // Clear the input fields
            // setNewFirstName('');
            // setNewLastName('');
            // setNewEmail('');
        }

    });    
    const handleEdit2ButtonClick = onAuthStateChanged(auth, async (field, value) => {
        setNewLastName(user.lastName);
        if(auth.currentUser){
            if (user.type == 'Student') {
                // userRef = doc(db, 'students', user.uid);
                studentRef = query(collection(db, 'students'), where('uid', '==', user.uid));
                const querySnapshot = await getDocs(studentRef);
                if (!querySnapshot.empty) {
                    querySnapshot.forEach(async (doc) => {   
                        console.log(data);                     
                        const data = doc.data();
                        setNewLastName(data.lastName);                        
                        await updateDoc(doc, {
                            lastName: newLastName,                            
                        });
                    });
                }             

            } else {
                teacherRef = query(collection(db, 'teachers'), where('uid', '==', user.uid));
                const teacherSnapshot = await getDocs(teacherRef);
                if (!teacherSnapshot.empty) {
                    teacherSnapshot.forEach(async (doc) => {  
                        console.log(data);                      
                        const data = doc.data();                        
                        setNewLastName(data.lastName);                       
                        await updateDoc(doc, {                            
                            lastName: newLastName                           
                        });
                    });
                }             
            }
            // Update the document
            
            // Update the state
            setUserInfo(prevState => ({
                ...prevState,               
                lastName: newLastName                
            }));
            // // Clear the input fields
            // setNewFirstName('');
            // setNewLastName('');
            // setNewEmail('');
        }

    }); 
    const handleEdit3ButtonClick = onAuthStateChanged(auth, async (field, value) => {
        setNewEmail(user.email);      
        if(auth.currentUser){
            if (user.type == 'Student') {
                // userRef = doc(db, 'students', user.uid);
                studentRef = query(collection(db, 'students'), where('uid', '==', user.uid));
                const querySnapshot = await getDocs(studentRef);
                if (!querySnapshot.empty) {
                    querySnapshot.forEach(async (doc) => {  
                        console.log(data);                      
                        const data = doc.data();                        
                        setNewEmail(data.email);
                        updateEmail(data.email, "user@example.com").then(() => {
                            // Email updated!
                            // ...
                          })
                        await updateDoc(doc, {                            
                            email: newEmail,
                        });
                    });
                }             

            } else {
                teacherRef = query(collection(db, 'teachers'), where('uid', '==', user.uid));
                const teacherSnapshot = await getDocs(teacherRef);
                if (!teacherSnapshot.empty) {
                    teacherSnapshot.forEach(async (doc) => {  
                        console.log(data);                      
                        const data = doc.data();                       
                        setNewEmail(data.email);
                        await updateDoc(doc, {
                            email: newEmail,
                        });
                    });
                }             
            }
            // Update the document
            
            // Update the state
            setUserInfo(prevState => ({
                ...prevState,
                email: newEmail
            }));
            // // Clear the input fields
            // setNewFirstName('');
            // setNewLastName('');
            // setNewEmail('');
        }

    }); 
    const handleEdit4ButtonClick = onAuthStateChanged(auth, async (field, value) => {
        setNewPassword(user.password);    
        if(auth.currentUser){
            if (user.type == 'Student') {
                // userRef = doc(db, 'students', user.uid);
                studentRef = query(collection(db, 'students'), where('uid', '==', user.uid));
                const querySnapshot = await getDocs(studentRef);
                if (!querySnapshot.empty) {
                    querySnapshot.forEach(async (doc) => {  
                        console.log(data);                      
                        const data = doc.data();
                        setNewFirstName(data.firstName);
                        setNewLastName(data.lastName);
                        setNewEmail(data.email);
                        await updateDoc(doc, {
                            firstName: newFirstName,
                            lastName: newLastName,
                            email: newEmail,
                        });
                    });
                }             

            } else {
                teacherRef = query(collection(db, 'teachers'), where('uid', '==', user.uid));
                const teacherSnapshot = await getDocs(teacherRef);
                if (!teacherSnapshot.empty) {
                    teacherSnapshot.forEach(async (doc) => {    
                        console.log(data);                    
                        const data = doc.data();
                        setNewFirstName(data.firstName);
                        setNewLastName(data.lastName);
                        setNewEmail(data.email);
                        await updateDoc(doc, {
                            firstName: newFirstName,
                            lastName: newLastName,
                            email: newEmail,
                        });
                    });
                }             
            }
            // Update the document
            
            // // Update the state
            // setUserInfo(prevState => ({
            //     ...prevState,
            //     firstName: newFirstName,
            //     lastName: newLastName,
            //     email: newEmail,
            // }));
            // // Clear the input fields
            // setNewFirstName('');
            // setNewLastName('');
            // setNewEmail('');
        }

    }); 

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
                                        <input type="text" name="firstName" value={userInfo.firstName} className="border-b border-gray-400 focus:outline-none text-black" />    
                                        <input type="text" name="newFirstName" placeholder="New First Name" value = {newFirstName} onChange={(e)=>setNewFirstName(e.target.value)} className="border-b border-gray-400 focus:outline-none text-black ml-2" />
                                        <button className="bg-blue-500 text-white hover:bg-blue-700 focus:outline-none px-3 py-1 rounded ml-2"onClick={handleEdit1ButtonClick}>Edit</button>
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Last Name</dt>
                                    <dd className="flex justify-between items-center mt-1 sm:col-span-2">
                                        <input type="text" name="lastName" value={userInfo.lastName}  className="border-b border-gray-400 focus:outline-none text-black" />
                                        <input type="text" name="newLastName" placeholder="New Last Name" value = {newLastName} onChange={(e)=>setNewLastName(e.target.value)}className="border-b border-gray-400 focus:outline-none text-black ml-2" />
                                        <button className="bg-blue-500 text-white hover:bg-blue-700 focus:outline-none px-3 py-1 rounded ml-2" onClick={handleEdit2ButtonClick}>Edit</button>
                                    </dd>
                                </div>
                                <div className="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                                    <dd className="flex justify-between items-center mt-1 sm:col-span-2">
                                        <input type="email" name="email" value={userInfo.email}className="border-b border-gray-400 focus:outline-none text-black" />
                                        <input type="email" name="newEmail" placeholder="New Email" value = {newEmail} onChange={(e)=>setNewEmail(e.target.value)} className="border-b border-gray-400 focus:outline-none text-black ml-2" />
                                        <button className="bg-blue-500 text-white hover:bg-blue-700 focus:outline-none px-3 py-1 rounded ml-2" onClick={handleEdit3ButtonClick}>Edit</button>
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Old Password</dt>
                                    <dd className="flex justify-between items-center mt-1 sm:col-span-2">
                                        <input type="password" name="oldpassword"  className="border-b border-gray-400 focus:outline-none text-black" />
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">New Password</dt>
                                    <dd className="flex justify-between items-center mt-1 sm:col-span-2">
                                        <input type="password" name="newpassword" value = {newPassword} onChange={(e)=>setNewPassword(e.target.value)} className="border-b border-gray-400 focus:outline-none text-black" />
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Retype Password</dt>
                                    <dd className="flex justify-between items-center mt-1 sm:col-span-2">
                                        <input type="password" name="retypepassword" value = {newPassword} onChange={(e)=>setNewPassword(e.target.value)} className="border-b border-gray-400 focus:outline-none text-black" />
                                    </dd>
                                </div>
                                <button className="bg-blue-500 text-white hover:bg-blue-700 focus:outline-none px-3 py-1 rounded mb-5" onClick={handleEdit4ButtonClick}>Save</button>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

}
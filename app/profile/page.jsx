"use client";
import React, { useState } from 'react';
import CourseNavBar from '../components/CourseNavBar';
import Sidebar from '../components/Sidebar';

export default function Profile() {
    const [userInput, setUserInput] = useState({
        UserId: "4",
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'email@gmail.com',
        oldpassword: "old password",
        profilePicture: 'path_to_your_profile_picture.jpg' 
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInput(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSaveButtonClick = () => {
        // Here we update the userInput state with the new values
        setUserInput(prevState => ({
            ...prevState,
            UserId: prevState.UserId,
            firstName: prevState.firstName,
            lastName: prevState.lastName,
            email: prevState.email,
            oldpassword: prevState.oldpassword,
            profilePicture: prevState.profilePicture
        }));
    };

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
                                        src={userInput.profilePicture}
                                        alt="Profile Picture"
                                        className="w-32 h-32 rounded-full mr-4"
                                    /> */}
                                    {/* <input type="text" name="profilePicture" value={userInput.profilePicture} onChange={handleInputChange} className="border-b border-gray-400 focus:outline-none text-black" placeholder="Enter Profile Picture URL" />
                                    <button className="text-blue-500 hover:text-blue-700 focus:outline-none" onClick={handleSaveButtonClick}>Edit</button> */}
                                </div>
                                <h3 className="text-lg font-semibold leading-6 text-gray-900">User Information</h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
                            </div>
                            <div className="border-t border-gray-200">
                                <dl>
                                    <div className="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">UserID</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{userInput.UserId}</dd>
                                    </div>
                                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">First Name</dt>
                                        <dd className="flex justify-between items-center mt-1 sm:col-span-2">
                                            <input type="text" name="firstName" value={userInput.firstName} onChange={handleInputChange} className="border-b border-gray-400 focus:outline-none text-black" />
                                            <button className="bg-blue-500 text-white hover:bg-blue-700 focus:outline-none px-3 py-1 rounded ml-2" onClick={handleSaveButtonClick}>Save</button>
                                        </dd>
                                    </div>
                                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Last Name</dt>
                                        <dd className="flex justify-between items-center mt-1 sm:col-span-2">
                                            <input type="text" name="lastName" value={userInput.lastName} onChange={handleInputChange} className="border-b border-gray-400 focus:outline-none text-black" />
                                            <button className="bg-blue-500 text-white hover:bg-blue-700 focus:outline-none px-3 py-1 rounded ml-2" onClick={handleSaveButtonClick}>Save</button>
                                        </dd>
                                    </div>
                                    <div className="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Email</dt>
                                        <dd className="flex justify-between items-center mt-1 sm:col-span-2">
                                            <input type="email" name="email" value={userInput.email} onChange={handleInputChange} className="border-b border-gray-400 focus:outline-none text-black" />
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

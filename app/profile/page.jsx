"use client";
import { useState, useEffect } from 'react';
import { auth } from '../lib/firebase'; 
import { updateDoc } from 'firebase/firestore';
import { updatePassword } from 'firebase/auth';
import { onAuthStateChanged, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import Sidebar from '../views/Sidebar';
import AdminSidebar from '../views/AdminSidebar';
import { getStudentDoc } from '../utilities/StudentUtilities';
import { getTeacherDoc } from '../utilities/TeacherUtilities';
import { getAdminDoc } from '../utilities/AdminUtilities';
import Loader from '../views/Loader';

export default function Profile() {
    // State variables
    const [userInput, setUserInput] = useState({
        email: '',
        firstName: '',
        lastName: '',
        uid: "",
        userType:""
    }); // State for storing user input

    const [user,setUser] = useState(); // State for storing user
    const [userType,setUserType] = useState('user'); // State for storing user type
    const [isEditing, setIsEditing] = useState(false); // State for storing editing status
    const [newPassword, setNewPassword] = useState(''); // State for storing new password
    const [currentPassword, setCurrentPassword] = useState(''); // State for storing current password
    const [editedUserInput, setEditedUserInput] = useState({
        email: '',
        firstName: '',
        lastName: '',
        uid: "",
        userType:""
    }); // State for storing edited user input
    const [feedback, setFeedback] = useState(''); // State for storing feedback
    const [loading, setLoading] = useState(true); // State for loader

    // Effect hook for handling authentication state change
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setLoading(true);
            if (auth.currentUser) {
                setUser(auth.currentUser);
                console.log(user.uid);

                const stuSnapshot = await getStudentDoc(user.uid);
                const teacherSnapshot = await getTeacherDoc(user.uid);
                const adminSnapshot = await getAdminDoc(user.uid);

                if(stuSnapshot.exists()){
                    setUserInput(stuSnapshot.data());
                } else if(teacherSnapshot.exists()){
                    setUserInput(teacherSnapshot.data());
                } else if(adminSnapshot.exists()){
                    setUserInput(adminSnapshot.data());
                } else {
                    return;
                }
            } else {
                // User is signed out
                console.log('No user is signed in.');
            }
            setLoading(false);
        });
        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    // Function for handling profile edit
    const handleEdit = () =>{
        setEditedUserInput({...userInput});
        toggleEditing();
    }

    // Function for handling input change
    const handleInputChange = (event) =>{
        setEditedUserInput({...editedUserInput,
            [event.target.name]: event.target.value
        });
    }

    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };

    // Function to save the changes to the database
    const handleSave = async () => {
        // console.log("clicked");
        if(userInput.userType === "Student"){
            const stuSnap = await getStudentDoc(user.uid);
            // console.log("in if condition");
            if(stuSnap.exists()){
                const docRef = stuSnap.ref;
                console.log('Updating document:', docRef);
                console.log('With data:', {
                    firstName: editedUserInput.firstName,
                    lastName: editedUserInput.lastName
                });
                await updateDoc(docRef, {
                    firstName: editedUserInput.firstName,
                    lastName: editedUserInput.lastName
                    // Add other fields as needed
                });
            }
        }
        
        if(userInput.userType === "Teacher"){
            const teachSnap = await getTeacherDoc(user.uid);
            if(teachSnap.exists()){
                const docRef = teachSnap.ref;
                await updateDoc(docRef, {
                    firstName: editedUserInput.firstName,
                    lastName: editedUserInput.lastName
                    // Add other fields as needed
                });
            }
        }

        if(userInput.userType === "admin"){
            const adminSnap = await getAdminDoc(user.uid);
            if(adminSnap.exists()){
                const docRef = adminSnap.ref;
                await updateDoc(docRef, {
                    firstName: editedUserInput.firstName,
                    lastName: editedUserInput.lastName,
                    // Add other fields as needed
                });
            }
        }
        
        setUserInput(editedUserInput);
        toggleEditing();
        setFeedback('Information updated successfully')
    };

    // Function to reset password in the firebase authentication system
    const handlePasswordReset = async (email, currentPassword, newPassword) => {
        try {
            if (auth.currentUser) {
                // Create a credential
                const credential = EmailAuthProvider.credential(email, currentPassword);

                // Reauthenticate the user
                await reauthenticateWithCredential(auth.currentUser, credential);

                // Update the password
                await updatePassword(auth.currentUser, newPassword);
                setFeedback('Password updated successfully');
            } else {
                setFeedback('No user is signed in.');
            }
        } catch (error) {
            setFeedback('Error updating password:', error);
        }
    };

    return (
            <div className="bg-blue-100 min-h-screen">
                {loading ? (
                    <Loader />
                ): (
                    <div className="flex">  
                    {userInput.userType === 'Teacher' || userInput.userType === 'Student' ? 
                        <Sidebar userName={userInput.firstName} userType={userInput.userType}/> :
                        <AdminSidebar userName={userInput.firstName} userType={userInput.userType}/> 
                    }
                    <div className="relative md:ml-64 w-full">
                        <div className="p-6 text-center">
                            <h1 className="text-3xl text-black font-semibold mb-4" data-testid="profile-heading">Profile</h1>
                            <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
                                <div className="px-4 py-5 sm:px-6">
                                    <div className="mb-6 flex justify-center items-center">
                                        {/* If you have a profile picture, uncomment this block */}
                                        {/* <img
                                            src={userInput.profilePicture}
                                            alt="Profile Picture"
                                            className="w-32 h-32 rounded-full mr-4"
                                        /> */}
                                    </div>
                                    <h3 className="text-lg font-semibold leading-6 text-gray-900">User Information</h3>
                                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
                                </div>
                                <div className="border-t border-gray-200 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    {/* Uncomment this block if you want to display the UserID */}
                                    {/* <div className="sm:col-span-3 flex justify-between">
                                        <dt className="text-sm font-medium text-gray-500">UserID</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{userInput.UserId}</dd>
                                    </div> */}
                                    <div className="sm:col-span-3 flex justify-between">
                                        <dt className="text-sm font-medium text-gray-500">First Name</dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            {isEditing ? 
                                                <input type="text" name="firstName" value={editedUserInput.firstName} onChange={handleInputChange}  className="border-b border-gray-400 focus:outline-none text-black" /> :
                                                <span className='text-black'>{userInput.firstName}</span>
                                            }
                                        </dd>
                                    </div>
                                    <div className="sm:col-span-3 flex justify-between">
                                        <dt className="text-sm font-medium text-gray-500">Last Name</dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            {isEditing ? 
                                                <input type="text" name="lastName" value={editedUserInput.lastName} onChange={handleInputChange}  className="border-b border-gray-400 focus:outline-none text-black" /> :
                                                <span className='text-black'>{userInput.lastName}</span>
                                            }
                                        </dd>
                                    </div>
                                    <div className="sm:col-span-3 flex justify-between">
                                        <dt className="text-sm font-medium text-gray-500">Email</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{userInput.email}</dd>
                                    </div>
                                    {isEditing ? (
                                        <>
                                            <div className="sm:col-span-3 flex justify-between">
                                                <dt className="text-sm font-medium text-gray-500">Current Password</dt>
                                                <dd className="mt-1 text-sm text-gray-900">
                                                    <input type="password" name="currentPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="border-b border-gray-400 focus:outline-none text-black" />
                                                </dd>
                                            </div>
                                            <div className="sm:col-span-3 flex justify-between">
                                                <dt className="text-sm font-medium text-gray-500">New Password</dt>
                                                <dd className="mt-1 text-sm text-gray-900">
                                                    <input type="password" name="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="border-b border-gray-400 focus:outline-none text-black" />
                                                </dd>
                                            </div>
                                            <div className="sm:col-span-3 flex justify-end">
                                                <button onClick={() => handlePasswordReset(userInput.email, currentPassword, newPassword)} className='bg-red-500 pt-2 pb-2 pl-7 pr-7 mb-5 rounded-full hover:bg-red-700'>Reset Password</button>
                                            </div>
                                        </>
                                    ) : null}
                                    <div className="sm:col-span-3 flex justify-end">
                                        {isEditing ? (
                                            <button onClick={handleSave} className='bg-green-400 pt-2 pb-2 pl-7 pr-7 mb-5 rounded-full hover:bg-green-600'>Save</button>
                                        ) : (
                                            <button onClick={handleEdit} className='bg-yellow-400 pt-2 pb-2 pl-7 pr-7 mb-5 rounded-full hover:bg-yellow-600'>Edit</button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-3 flex justify-center">
                            <span className="text-lg font-bold text-blue-900">{feedback}</span>
                        </div>
                    </div>
                </div>
                )}
                
            </div>
        );
    }


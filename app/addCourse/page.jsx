'use client';
import { useState } from 'react';
import { useEffect } from "react";
import firebase from 'firebase/app'; // import firebase from the firebase/app module

const Page = () => {
    const [courseCode, setCourseCode] = useState('');
    const [courseName, setCourseName] = useState('');
    const [description, setDescription] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'courseCode') {
            setCourseCode(value);
        } else if (name === 'courseName') {
            setCourseName(value);
        } else if (name === 'description') {
            setDescription(value);
        }
    };

    const handleSubmit = async (e) => { // Make sure to mark the handleSubmit function as async
        e.preventDefault();
        try {
            // Initialize Firebase
            const firebaseConfig = {
                // your Firebase config here
            };
            if (!firebase.apps.length) { // Check if Firebase app is already initialized
                firebase.initializeApp(firebaseConfig);
            }

            // Get a reference to the Firestore database
            const db = firebase.firestore();

            // Create a new document in the "courses" collection
            await db.collection('courses').doc(courseCode).set({
                courseCode,
                courseName,
                description
            });

            console.log('Data sent to Firebase successfully!');
        } catch (error) {
            console.error('Error sending data to Firebase:', error);
        }
        
        console.log('Course Code:', courseCode);
        console.log('Course Name:', courseName);
        console.log('Description:', description);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Course Code:
                    <input
                        type="text"
                        name="courseCode"
                        value={courseCode}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Course Name:
                    <input
                        type="text"
                        name="courseName"
                        value={courseName}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Description:
                    <input
                        type="text"
                        name="description"
                        value={description}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Page;

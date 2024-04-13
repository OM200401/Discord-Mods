'use client'
import React, { useState, useEffect, useRef } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import db from '../../../lib/firebase';
import { getDoc, updateDoc, getDocs, setDocs, doc } from 'firebase/firestore';
import { getCourseRef, getCourseDoc } from '../../../models/Course';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../lib/firebase';
import { arrayUnion } from 'firebase/firestore';
import { useParams } from 'next/navigation';
import Sidebar from '@/app/views/Sidebar';

export default function DiscussionBoard({ params }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [user, setUser] = useState(null);
  const messagesEndRef = useRef(null); // Reference to the messages container

  let { courseCode } = useParams();
  courseCode = courseCode ? decodeURI(courseCode) : '';

  console.log(courseCode);

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (auth.currentUser) {
      setUser(user);
      try {
        const courseData = await getCourseDoc(courseCode);
        if (courseData.exists) {
          const discussionBoard = courseData.data().discussionBoard || [];
          setMessages(discussionBoard);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }
  });

  // Clean up function
  return () => unsubscribe();
}, []); // Empty array means this effect runs once on mount and not on updates

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return; // Don't submit empty messages

    try {
      const courseRef = doc(db, 'courses', courseCode);

      const newMessageData = {
        email: user.email,
        newMessage: newMessage
      };

      const updatedCourseData = {
        discussionBoard: arrayUnion(newMessageData)
      };

      await updateDoc(courseRef, updatedCourseData);

      // Update the local state
      setMessages((prevMessages) => [...prevMessages, newMessageData]);

      setNewMessage('');
      // Scroll to the bottom of the messages container
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      console.error("Error submitting message:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex">
      <div className="w-1/4 bg-white text-white">
        <Sidebar userName={user?.firstName} userType={"Student"}/>
      </div>
      <div className="w-3/4 flex flex-col justify-end m-3">
        <div className="container mx-auto py-10 px-5 flex-1 overflow-auto">
          <h1 className="text-4xl font-bold mb-5 text-blue-500">Discussion Board</h1>
          <ul>
            {messages.map((message, index) => (
              <li key={index} className="border-b border-blue-500 mb-2 p-2 rounded shadow">
                <p><strong>{message.email}</strong>: {message.newMessage}</p>
              </li>
            ))}
          </ul>
          <div ref={messagesEndRef} /> 
        </div>
        <form onSubmit={handleSubmit} className="mb-5">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="w-full p-2 border border-blue-500 rounded mb-2 shadow-inner"
            placeholder="Type your message here..."
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-600 transition-colors">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

'use client'
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import db from '../../lib/firebase';
import { getDoc,updateDoc,getDocs,setDocs } from 'firebase/firestore';
import { getCourseRef,getCourseDoc } from '../../models/Course';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../lib/firebase';

export default function DiscussionBoard ({params }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [user,setUser] = useState(null);
  const courseCode = params.courseCode;




  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if(auth.currentUser){
          setUser(user);
          try {
            const courseData = await getCourseDoc(courseCode);
            if (courseData.exists) {
              const discussionBoard = courseData.data().discussionBoard || [];
              setMessages(discussionBoard);
            }
            setLoading(false);
          } catch (error) {
            console.error("Error fetching messages:", error);
            setLoading(false);
          }
        }
    })
});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return; // Don't submit empty messages

    try {
      const courseRef = getCourseRef(courseCode);

      const updatedCourseData = {
        discussionBoard: arrayUnion({
            email:user.email,
            newMessage:newMessage
        })
    };


      updateDoc(courseRef,updatedCourseData);
      
      setNewMessage('');
      // Show the newly submitted message immediately
      setMessages([...messages, { [user.email]: newMessage }]);
    } catch (error) {
      console.error("Error submitting message:", error);
    }
  };


  return (
    <div>
      <h2>Discussion Board</h2>
      {loading ? (
        <p>Loading messages...</p>
      ) : (
        <div>
          {messages.map((message, index) => (
            <div key={index}>
              {Object.entries(message).map(([name, comment], idx) => (
                <div key={idx}>
                  <p><strong>{name}</strong>: {comment}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};


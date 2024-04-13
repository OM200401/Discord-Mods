
'use client'
import React, { useState, useEffect, useRef } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import db from '../../lib/firebase';
import { getDoc, updateDoc, getDocs, setDocs, doc } from 'firebase/firestore';
import { getCourseRef, getCourseDoc } from '../../models/Course';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { arrayUnion } from 'firebase/firestore';
import { useParams } from 'next/navigation';

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
    })
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return; // Don't submit empty messages

    try {
      const courseRef = doc(db, 'courses', courseCode);

      const updatedCourseData = {
        discussionBoard: arrayUnion({
          email: user.email,
          newMessage: newMessage
        })
      };

      await updateDoc(courseRef, updatedCourseData);

      setNewMessage('');
      // Scroll to the bottom of the messages container
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      console.error("Error submitting message:", error);
    }
  };


  return (
    <div>
      <h2>Discussion Board</h2>
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
        <div ref={messagesEndRef} /> {/* Empty div for scrolling to bottom */}
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

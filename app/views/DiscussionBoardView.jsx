import { useState } from 'react';
import db from '../lib/firebase';
import 'firebase/firestore';

import { getCourseDoc, getCourseRef } from '../models/Course';
import { updateDoc, } from 'firebase/firestore';

export default function DiscussionBoardView({params,courseCode,}) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };



  const fetchMessages = async () => {
    try{
      const courseDoc = await getCourseDoc(courseCode);
      if(!courseDoc.empty){
        const discussionBoard = courseData.data().discussionBoard || [];
        setMessages(discussionBoard);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }


  useEffect(() => {
    fetchMessages();
  },[courseId]);



  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const courseRef = await getCourseRef(courseCode);
      const courseData = await getCourseDoc(courseCode);
      if(!courseData.empty){
        const discussionBoard = courseData.data().discussionBoard || [];
        const updatedBoard = [...discussionBoard, newMessage];
        await updateDoc(courseRef, { discussionBoard: updatedBoard })
        setMessages(updatedBoard);
        setNewMessage('');
      }

    }catch (error){ 
      console.error('Error submitting message:', error);
    }



  }

  return (
    <div className="min-h-screen bg-white text-black flex flex-col justify-end">
      <div className="container mx-auto py-10 px-5 flex-1 overflow-auto">
        <h1 className="text-4xl font-bold mb-5 text-blue-500">Discussion Board</h1>
        <ul>
          {messages.map((message, index) => (
            <li key={index} className="border-b border-blue-500 mb-2 p-2">
              {message}
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleSubmit} className="mb-5">
        <textarea
          value={newMessage}
          onChange={handleNewMessageChange}
          className="w-full p-2 border border-blue-500 rounded mb-2"
          placeholder="Type your message here..."
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}
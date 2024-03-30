
'use client'
import React, { useState } from 'react';
import db from '../../lib/firebase';
import {auth} from '../../lib/firebase';
import { redirect } from 'next/navigation';
import { addDoc,doc,getDoc,setDoc,collection } from 'firebase/firestore';
import Navbar from '../../components/Navbar';


function QuizForm() {
    const [questions, setQuestions] = useState([{ question: '', answers: [''] }]);

    const handleChange = (index, key, value) => {       
        const updatedQuestions = [...questions];
        updatedQuestions[index][key] = value;
        setQuestions(updatedQuestions);
    };

    const addAnswer = (index) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].answers.push('');
        setQuestions(updatedQuestions);
    };

    const addQuestion = () => {
        setQuestions([...questions, { question: '', answers: [''] }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const quizCollectionRef = collection(db, 'quizzes');
            await addDoc(quizCollectionRef, { questions });
            // Optionally, you can reset the form after submission
            setQuestions([{ question: '', answers: [''] }]);
        } catch (error) {
            console.error('Error adding quiz:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            {questions.map((question, index) => (
                <div key={index} className="mb-6">
                    <label htmlFor={`question-${index}`} className="block text-gray-700 mb-2">Question {index + 1}</label>
                    <input
                        type="text"
                        id={`question-${index}`}
                        value={question.question}
                        onChange={(e) => handleChange(index, 'question', e.target.value)}
                        className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                    />
                    {question.answers.map((answer, ansIndex) => (
                        <div key={ansIndex} className="mt-2">
                            <label htmlFor={`answer-${index}-${ansIndex}`} className="block text-gray-700 mb-2">Answer {ansIndex + 1}</label>
                            <input
                                type="text"
                                id={`answer-${index}-${ansIndex}`}
                                value={answer}
                                onChange={(e) => {
                                    const updatedQuestions = [...questions];
                                    updatedQuestions[index].answers[ansIndex] = e.target.value;
                                    setQuestions(updatedQuestions);
                                }}
                                className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    ))}
                    <button type="button" onClick={() => addAnswer(index)} className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none">Add Answer</button>
                </div>
            ))}
            <button type="button" onClick={addQuestion} className="mb-6 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md focus:outline-none">New Question</button>
            <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md focus:outline-none">Submit Quiz</button>
        </form>
    );
}

export default QuizForm;
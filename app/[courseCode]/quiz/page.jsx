
'use client'
import { useState, useEffect } from 'react';
import Sidebar from '../../views/Sidebar';
import Loader from '../../views/Loader';
import CourseNavBar from '../../views/CourseNavBar';
import db from '../../lib/firebase';
import {doc,setDoc} from 'firebase/firestore';

export default function Assignments({ params }) {
    const [showForm, setShowForm] = useState(false);
    const [quizTitle, setQuizTitle] = useState('');
    const [questions, setQuestions] = useState([{ text: '', options: ['Option #1', 'Option #2'], correctAnswer: null}]);
    const [weightage, setWeightage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [userName,setUserName] = useState('non');

    const courseCode = params.courseCode;
    console.log("Quiz page course code is: " + courseCode);
    console.log(params)

    const handleAddOption = (questionIndex) => {
        setQuestions(questions.map((question, index) => {
            if (index === questionIndex) {
                return { ...question, options: [...question.options, `Option #${question.options.length + 1}`] };
            }
            return question;
        }));
    };

    const handleDeleteQuestion = (questionIndex) => {
        setQuestions(questions.filter((_, index) => index !== questionIndex));
    };

    const handleAddQuestion = () => {
        setQuestions([...questions, { text: '', options: ['Option #1', 'Option #2'], correctAnswer: null}]);
    };

    const handleCorrectOptionChange = (questionIndex, optionIndex) => {
        setQuestions(questions.map((question, index) => {
            if (index === questionIndex) {
                return { ...question, correctAnswer: optionIndex };
            }
            return question;
        }));
    };

    const handleWeightageChange = (e) => {
        const value = e.target.value;
        if (value >= 0 && value <= 100) {
            setWeightage(value);
        } else {
            alert('Weightage must be a number between 0 and 100.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const quizCollectionRef = doc(db, 'quizzes',quizTitle);
            setDoc(quizCollectionRef, {  questions, weightage });
            // Optionally, you can reset the form after submission
            setQuizTitle('');
            setQuestions([{ text: '', options: ['Option #1', 'Option #2'], correctAnswer: null }]);
            setShowForm(false);
            setWeightage(0);

        } catch (error) {
            console.error('Error adding quiz:', error);

        }
    };

    useEffect(() => {
        // Simulate a network request
        setTimeout(() => {
            setLoading(false); // Set loading to false after 3 seconds
        }, 1000);
    }, []);

    if (loading) {
        return <Loader />; // Return the Loading component if loading is true
    }

    return (
        <div className="flex flex-col md:flex-row bg-blue-100">
            <Sidebar userName={userName} userType={"Teacher"}/>
            <div className="relative md:ml-64">
                <CourseNavBar courseCode={courseCode}/>
            </div>
            <div className="p-6 text-center w-full">
                <h1 className="text-3xl text-black font-semibold mb-4" data-testid="course-heading">Course Name</h1>
                <h2 className="text-3xl text-black font mt-4" data-testid="assignments-heading"> New Assignment</h2>
                <div className="flex flex-row items-center justify-center p-4">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mx-5" onClick={() => setShowForm(true)}>Add Quiz</button>
                    <a href='addEssays' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mx-5">Add Essay</a>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mx-5" onClick={handleAddQuestion}>Add Question</button>
                </div>
                {showForm && (
                    <>
                        <div className="flex flex-row items-center justify-center p-4 text-black font-semibold">
                            <label className="mr-2">Quiz Title:</label>
                            <input
                                type="text"
                                value={quizTitle}
                                onChange={(e) => setQuizTitle(e.target.value)}
                                className="border border-gray-300 px-4 py-2 rounded-md text-black"
                                placeholder="Enter quiz title"
                            />
                        </div>
                        <div className="flex flex-row items-center justify-center p-4 text-black font-semibold">
                            <label className="mr-2">Weightage of the quiz in the course:</label>
                            <input type="number" value={weightage} onChange={handleWeightageChange} min="0" max="100" />
                        </div>
                        {questions.map((question, questionIndex) => (
                            <div key={questionIndex} className="mt-4">
                                <input
                                    type="text"
                                    placeholder="Enter question"
                                    className="border border-gray-300 px-4 py-2 rounded-md text-black w-96 mb-4"
                                    value={question.text}
                                    onChange={(e) => setQuestions(questions.map((q, i) => {
                                        if (i === questionIndex) {
                                            return { ...q, text: e.target.value };
                                        }
                                        return q;
                                    }))}
                                />
                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-4" onClick={() => handleDeleteQuestion(questionIndex)}>Delete Question</button>
                                <h3 className="text-lg text-black font-semibold mb-2">Select Correct Option</h3>
                                {question.options.map((option, optionIndex) => (
                                    <div key={optionIndex} className="flex flex-row justify-center items-center mt-2">
                                        <input
                                            type="radio"
                                            className='mx-10'
                                            checked={question.correctAnswer === optionIndex}
                                            onChange={() => handleCorrectOptionChange(questionIndex, optionIndex)}
                                        />
                                        <input
                                            type="text"
                                            value={option}
                                            className="border border-gray-300 px-4 py-2 rounded-md text-black w-64 mr-4"
                                            onChange={(e) => setQuestions(questions.map((q, i) => {
                                                if (i === questionIndex) {
                                                    return { ...q, options: q.options.map((o, j) => {
                                                        if (j === optionIndex) {
                                                            return e.target.value;
                                                        }
                                                        return o;
                                                    }) };
                                                }
                                                return q;
                                            }))}
                                        />
                                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => setQuestions(questions.map((q, i) => {
                                            if (i === questionIndex) {
                                                return { ...q, options: q.options.filter((o, j) => j !== optionIndex) };
                                            }
                                            return q;
                                        }))}>Delete Option</button>
                                    </div>
                                ))}
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2" onClick={() => handleAddOption(questionIndex)}>Add Option</button>
                            </div>
                        ))}
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleSubmit}>Submit Quiz</button>
                    </>
                )}
            </div>
        </div>
    );
}


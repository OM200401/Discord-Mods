'use client'
import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import CourseNavBar from '../../components/CourseNavBar';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { setDoc, getDoc, doc,getDocs,query,collection, where } from 'firebase/firestore';
import db from '../../lib/firebase'
import Loader from '../../components/Loader';


export default function Assignments({ params }) {
    const [userName,setUserName] = useState('non');
    const [showForm, setShowForm] = useState(false);
    const [quizTitle, setQuizTitle] = useState(''); // New state for quiz title
    const [essayTitle, setEssayTitle] = useState(''); // New state for essay title
    const [errorMessage, setErrorMessage] = useState('');
    const [questions, setQuestions] = useState([{ text: '', options: ['Option #1', 'Option #2'], correctAnswer: null }]);
    const [weightage, setWeightage] = useState(0);
    const [formType, setFormType] = useState("");
    const [questionPrompt, setQuestionPrompt] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [loading, setLoading] = useState(true);

    const [user,setUser] = useState(null);
    const [userType,setUserType] = useState('user');

    const courseCode = params.courseCode;
    // console.log("my course code is " + courseCode);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if(auth.currentUser){
                setUser(auth.currentUser);
                  console.log(user);
                  const userInfoRef = collection(db,'teachers');
                  const q = query(userInfoRef, where('uid','==',user.uid));
                //   console.log(q);
                  try{
                      const querySnapshot = await getDocs(q);
                      querySnapshot.forEach((doc) => {
                          setUserName(doc.data().firstName);
                          setUserType(doc.data().userType);
                        //   console.log(doc.data().firstName);
                      })
                  }catch(error){
                      console.log(error.message);
                  }  


            }
        })
    });

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
        setQuestions([...questions, { text: '', options: ['Option #1', 'Option #2'], correctAnswer: null }]);
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

    const handleSubmitQuiz = async (e) => {
        e.preventDefault();

        //Validation checks
        if(!quizTitle.trim()){
            setErrorMessage('Quiz title is required');
            return;
        }
        if(questions.some(question => !question.text.trim() || question.correctAnswer === null)){
            setErrorMessage('All questions must have text and a correct answer selected');
            return;
        }
        
        setErrorMessage('');

        try {
            const quizCollectionRef = doc(db, 'quizzes', quizTitle);
            const courseCollectionRef = doc(db, 'courses', courseCode);

            await setDoc(quizCollectionRef, { questions,weightage,dueDate:dueDate});

            const courseSnapshot = await getDoc(courseCollectionRef);
            const courseData = courseSnapshot.data();
            const currentAssignments = courseData.currentAssignments || [];

            currentAssignments.push(quizCollectionRef.id);
            await setDoc(courseCollectionRef,{...courseData,currentAssignments});
            console.log('it worked');
            // Optionally, you can reset the form after submission
            setQuizTitle('');
            setQuestions([{ text: '', options: ['Option #1', 'Option #2'], correctAnswer: null }]);
            setShowForm(false);
        } catch (error) {
            console.error('Error adding quiz:', error);
        }
    };


    const handleSubmitEssay = async (e) => {
        e.preventDefault();

        //Validation checks
        if(!essayTitle.trim()){
            setErrorMessage('Essay title is required');
            return;
        }
        if(!questionPrompt.trim()){
            setErrorMessage('Question prompt is required');
            return;
        }

        setErrorMessage('');
        

        try {
            const essayCollectionRef = doc(db, 'essays', essayTitle);
            const courseCollectionRef = doc(db, 'courses', courseCode);

            await setDoc(essayCollectionRef, { questionPrompt,weightage,dueDate:dueDate});


            const courseSnapshot = await getDoc(courseCollectionRef);
            const courseData = courseSnapshot.data();
            const currentAssignments = courseData.currentAssignments || [];

            currentAssignments.push(essayCollectionRef.id);
            await setDoc(courseCollectionRef,{...courseData,currentAssignments});
            
            console.log('it worked');



            // Optionally, you can reset the form after submission
            setEssayTitle('');
            setQuestionPrompt('');
            setShowForm(false);
        } catch (error) {
            console.error('Error adding quiz:', error);
        }
    };

    const handleAddQuizClick = () => {
        setFormType('quiz');
        setShowForm(true);
    };

    const handleAddEssayClick = () => {
        setFormType('essay');
        setShowForm(true);
    };

    const handleQuestionPromptChange = (e) => {
        setQuestionPrompt(e.target.value);
    };

    const handleDueDateChange = (e) => {
        setDueDate(e.target.value);
    };

    

    useEffect(() => {
        // Simulate a network request
        setTimeout(() => {
            setLoading(false); // Set loading to false after 3 seconds
        }, 1000);
    }, []);

    if (loading) {
        return <Loader data-testid="loader" />; // Return the Loading component if loading is true
    }

    return (
        <div className="flex flex-col md:flex-row">
            <Sidebar userName={userName} userType={"Teacher"}/>
            <div className="relative md:ml-64">
                <CourseNavBar courseCode={courseCode}/>
            </div>
            <div className="p-6 text-center w-screen bg-blue-100">
                <h1 className="text-3xl text-black font-semibold mb-4" data-testid="course-heading">Course Name</h1>
                <h2 className="text-3xl text-black font mt-4" data-testid="assignments-heading"> New Assignment</h2>
                <div className="flex flex-row items-center justify-center p-4">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mx-5" onClick={handleAddQuizClick}>Add Quiz</button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mx-5" onClick={handleAddEssayClick}>Add Essay</button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mx-5" onClick={handleAddQuestion}>Add Question</button>
                </div>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                {showForm && (
                    <>
                      
                        {formType === 'quiz' && (
                            <>
                              <div className="flex flex-row items-center justify-center p-4 text-black font-semibold">
                            <label htmlFor='quizTitle' className="mr-2">Quiz Title:</label> {/* Input field for quiz title */}
                            <input
                                id='quizTitle'
                                type="text"
                                value={quizTitle}
                                onChange={(e) => setQuizTitle(e.target.value)} // Update quiz title state
                                className="border border-gray-300 px-4 py-2 rounded-md text-black w-96 mb-4"
                            />
                        </div>
                        <div className="flex flex-row items-center justify-center p-4 text-black font-semibold">
                            <label htmlFor='dueDate' className="mr-2">Due Date:</label>
                            <input
                                id='dueDate'
                                type="date"
                                className="border border-gray-300 px-4 py-2 rounded-md text-black w-96 mb-4"
                                value={dueDate}
                                onChange={handleDueDateChange}
                            />
                        </div>
                                <div className="flex flex-row items-center justify-center p-4 text-black font-semibold">
                                    <label htmlFor='Weightage' className="mr-2">Weightage of the quiz in the course:</label>
                                    <input id='Weightage' type="number" value={weightage} onChange={handleWeightageChange} min="0" max="100" />
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
                                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleSubmitQuiz}>Submit Quiz</button>
                            </>
                        )}
                        {formType === 'essay' && (
                            <>
                        <div className="flex flex-row items-center justify-center p-4 text-black font-semibold">
                            <label htmlFor='essayTitle' className="mr-2">Essay Title:</label> {/* Input field for quiz title */}
                            <input
                                id='essayTitle'
                                type="text"
                                value={essayTitle}
                                onChange={(e) => setEssayTitle(e.target.value)} // Update quiz title state
                                className="border border-gray-300 px-4 py-2 rounded-md text-black w-96 mb-4"
                            />
                        </div>
                        <div className="flex flex-row items-center justify-center p-4 text-black font-semibold">
                            <label htmlFor='dueDate' className="mr-2">Due Date:</label>
                            <input
                                id='dueDate'
                                type="date"
                                className="border border-gray-300 px-4 py-2 rounded-md text-black w-96 mb-4"
                                value={dueDate}
                                onChange={handleDueDateChange}
                            />
                        </div>

                                <div className="flex flex-row items-center justify-center p-4 text-black font-semibold">
                                    <label htmlFor='weightage' className="mr-2">Weightage of the essay in the course:</label>
                                    <input id='weightage' type="number" value={weightage} onChange={handleWeightageChange} min="0" max="100" />
                                </div>
                                <div className="flex flex-row items-center justify-center p-4 text-black font-semibold">
                                    <label htmlFor='Question' className="mr-2">Question Prompt:</label>
                                    <textarea
                                        id='Question'
                                        className="border border-gray-300 px-4 py-2 rounded-md text-black w-96 mb-4"
                                        value={questionPrompt}
                                        onChange={handleQuestionPromptChange}
                                    />
                                </div>
                                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleSubmitEssay}>Submit Quiz</button>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

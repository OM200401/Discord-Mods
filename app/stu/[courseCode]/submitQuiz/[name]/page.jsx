'use client'
import Sidebar from '@/app/components/Sidebar';
import CourseNavBar from '@/app/components/CourseNavBar';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useParams } from 'next/navigation';
import { auth } from '@/app/lib/firebase';
import { getDoc, doc,getDocs,query,collection, where } from 'firebase/firestore';
import db from '../../../../lib/firebase';
import QuizQuestionCard from '../../../../components/QuizQuestionCard.jsx';


export default function Assignments() {
    let {name,courseCode} = useParams();
    name = decodeURIComponent(name);
    courseCode = decodeURIComponent(courseCode);

    // Create component to render each array
    const [questions, setQuestions] = useState([]);
    const [user,setUser] = useState(null);
    const [userName,setUserName] = useState('non');
    const [answers, setAnswers] = useState([]);
    const [score, setScore] = useState(null);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (auth.currentUser) {
          setUser(auth.currentUser);
          const studentRef = collection(db, 'students');
          const q = query(studentRef, where('uid', '==', user.uid)); 
          try{
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              setUserName(doc.data().firstName);
            });
          } catch (error) {
            console.log(error.message);
          }
        
          const assignmentRef = doc(db,'quizzes',name);
          const assignmentSnapshot = await getDoc(assignmentRef);

          if(!assignmentSnapshot.empty){
            setQuestions(assignmentSnapshot.data().questions);
            setAnswers(new Array(assignmentSnapshot.data().questions.length).fill(null));
          }
        }
      });

      return () => unsubscribe();
    }, []); 

    const handleOptionSelect = (questionIndex, optionIndex) => {
      const updatedAnswers = [...answers];
      updatedAnswers[questionIndex] = optionIndex;
      setAnswers(updatedAnswers);
      console.log(answers);
    };

    const handleSubmit = () => {
      console.log("Submission: " + answers);
      console.log("Correct Answers: " + questions.map(question => question.correctAnswer));
      let score = 0; 
      for(let i = 0; i < questions.length; i++){
        if(answers[i] !== null && questions[i].correctAnswer === answers[i]){
          score++;
        }
      }
      setScore(score);
    }

    return (
        <div className="flex flex-col md:flex-row bg-blue-100">
            <Sidebar userName={userName} userType={"Student"}/>
            <div className="relative md:ml-64">
                <CourseNavBar courseCode={courseCode} />
            </div>
            <div className="text-xl font-bold mb-4 bg-blue-100 px-4 py-2 rounded-lg">
                {name}
            </div>
            <div className="p-6 text-center w-full">
                {questions.map((question, index) => (
                    <QuizQuestionCard 
                        key={index} 
                        questionData={question} 
                        onOptionSelect={(optionIndex) => handleOptionSelect(index, optionIndex)}
                    />
                ))}
                <button onClick={handleSubmit} className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200">
                    Submit Quiz
                </button>
                {score !== null && (
                    <div className="mt-4 text-xl font-bold">
                        Score: {score} / {questions.length}
                    </div>
                )}
            </div>
        </div>
    );

}

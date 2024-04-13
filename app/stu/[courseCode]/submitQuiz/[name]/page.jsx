'use client'
import Sidebar from '@/app/views/Sidebar';
import CourseNavBar from '@/app/views/StuCourseNavBar';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useParams } from 'next/navigation';
import { auth } from '@/app/lib/firebase';
import { getDoc,doc,getDocs,query,collection,where,arrayUnion,updateDoc } from 'firebase/firestore';
import db from '../../../../lib/firebase';
import QuizQuestionCard from '../../../../views/QuizQuestionCard.jsx';
import { updateGradedAssignments,getCourseRef,getCourseDoc } from '../../../../models/Course';


export default function Assignments() {
    let {name,courseCode} = useParams(); // Get name and courseCode from params
    name = decodeURIComponent(name);
    courseCode = decodeURIComponent(courseCode);

    // State variables
    const [user,setUser] = useState(null); // State for storing user
    const [userName,setUserName] = useState('non'); // State for storing user name
    const [questions, setQuestions] = useState([]); // State for storing questions
    const [answers, setAnswers] = useState([]); // State for storing answers
    const [score, setScore] = useState(null); // State for storing score

    // Effect hook for handling authentication state change
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

    // Function for handling the option selection to get the students answers
    const handleOptionSelect = (questionIndex, optionIndex) => {
      const updatedAnswers = [...answers];
      updatedAnswers[questionIndex] = optionIndex;
      setAnswers(updatedAnswers);
    };

    // Function for handling submit
    const handleSubmit = async () => {
      let blankAns = false;
      console.log("Submission: " + answers);
      console.log("Correct Answers: " + questions.map(question => question.correctAnswer));
      let score = 0; 
      for(let i = 0; i < questions.length; i++){
        if(answers[i] !== null){
          if(questions[i].correctAnswer === answers[i])
            score++;
        } else {
          blankAns = true;
        }
      }

      if(blankAns){
        alert("Please answer all questions before submitting");
        return;
      }

      setScore(score); 

      const percentage = (score / questions.length) * 100;

      const studentsRef = collection(db, 'students');
      const studentQuery = query(studentsRef, where('uid', '==', user.uid));
      // const studentDoc = doc(studentsRef, user.uid);
      const studentSnapshot = await getDocs(studentQuery);

      const registeredCoursesRef = collection(studentSnapshot.docs[0].ref, 'registeredCourses');
      const registeredCourseDoc = doc(registeredCoursesRef, courseCode);
      const registeredCourseSnapshot = await getDoc(registeredCourseDoc);

      if (registeredCourseSnapshot.exists()) {
        const course = await getCourseRef(courseCode);
        const courseDoc = await getCourseDoc(courseCode);

        const updatedCourseData = {
            submittedAssignments: arrayUnion({
                name: name,
                submission: answers,
                grade: Math.round(percentage),
                fileSubmission:'false'
            })
        };

        await updateDoc(registeredCourseDoc, updatedCourseData);
        await updateGradedAssignments(course,courseDoc,studentSnapshot.docs[0].data().email, name, Math.round(percentage));
        window.location.href = `/stu/${courseCode}/assignments`;
      }
    }

    return (
        <div className="flex flex-col md:flex-row bg-blue-100">
            <Sidebar userName={userName} userType={"Student"}/>
            <div className="relative md:ml-64">
                <CourseNavBar courseCode={courseCode} />
            </div>
            <div className="p-6 text-center w-full">
                <div className="text-3xl font-bold text-black mb-4 bg-blue-100 px-4 py-2 rounded-lg text-center">
                    {name}
                </div>
                <div className="mt-4">
                    {questions.map((question, index) => (
                        <QuizQuestionCard 
                            key={index} 
                            questionData={question} 
                            onOptionSelect={(optionIndex) => handleOptionSelect(index, optionIndex)}
                            questionNumber={index + 1} // Pass question number to QuizQuestionCard
                        />
                    ))}
                    <button onClick={handleSubmit} className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200">
                        Submit Quiz
                    </button>
                </div>
                {score !== null && (
                    <div className="mt-4 text-2xl font-bold text-black">
                        Score: {score} / {questions.length}
                    </div>
                )}
            </div>
        </div>
    );

}

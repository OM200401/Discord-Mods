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
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (auth.currentUser) {
          setUser(auth.currentUser);
        
          const assignmentRef = doc(db,'quizzes',name);
          const assignmentSnapshot = await getDoc(assignmentRef);

          if(!assignmentSnapshot.empty){
            setQuestions(assignmentSnapshot.data().questions);
          }

        }
      });

      return () => unsubscribe();
    }, []); 

    return (
        <div className="flex flex-col md:flex-row bg-blue-100">
            <Sidebar />
            <div className="relative md:ml-64">
              <CourseNavBar courseCode={courseCode} />
            </div>
            <div className="p-6 text-center w-full">
                {questions.map((question, index) => (
                  <QuizQuestionCard key={index} questionData={question} />
                ))}
            </div>
        </div>
    );

}

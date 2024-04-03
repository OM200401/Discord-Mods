'use client'
import Sidebar from '@/app/components/Sidebar';
import CourseNavBar from '@/app/components/CourseNavBar';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useParams } from 'next/navigation';
import { auth } from '@/app/lib/firebase';
import { getDoc, doc,getDocs,query,collection, where } from 'firebase/firestore';
import db from '../../../../lib/firebase';
import { arrayUnion } from 'firebase/firestore';
import displayQuestion from '../../../../components/displayQuestion';


export default function Assignments() {
    let {name,courseCode} = useParams();

    // Create component to render each array
    const [currentQuestions, setQuestions] = useState([
      [["1","2","3"],"What is 1+1?"],
      [["A","B","C"],"What is the first alphabet?"]
    ]);
    name = decodeURIComponent(name);
    courseCode = decodeURIComponent(courseCode)
    console.log(name);
    console.log(courseCode);

    // const search = window.location.search;
    // const params = new URLSearchParams(search);
    // console.log(params);

    const [assignmentData, setAssignmentData] = useState([]);
    const [user,setUser] = useState(null);
    const [essay, setEssay] = useState('');


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (auth.currentUser) {
                setUser(auth.currentUser);
              
                    const assignmentRef = doc(db,'essays',name);
                    const assignmentSnapshot = await getDoc(assignmentRef);
                    
                    if(!assignmentSnapshot.empty){
                        setAssignmentData({name, ...assignmentSnapshot.data()});
                    }
                
            }
        });

        return () => unsubscribe();
    }, []); // Add courseCode as a dependency
    console.log(assignmentData)

    const handleChange = (event) => {
        setEssay(event.target.value);
      };


      const handleSubmit = async (event) => {
        event.preventDefault();

        const studentRef = query(collection(db,'students'), where('uid','==',user.uid));
        const studentSnapshot = await getDocs(studentRef);

        if(!studentSnapshot.empty){
            studentSnapshot.forEach(async(studentDoc) => {
            const registeredCoursesRef = collection(studentDoc.ref, 'registeredCourses');

            const courseDocRef = doc(registeredCoursesRef, courseCode);


                const courseDocSnapshot = await getDoc(courseDocRef);

                if (courseDocSnapshot.exists()) {
                // Update the submittedAssignments array with the submitted essay
                const updatedCourseData = {
                    submittedAssignments: arrayUnion({
                        name: decodeURIComponent(name),
                        submission: essay,
                        grade: null
                    })
                };

                await updateDoc(courseDocRef, updatedCourseData);
                setEssay('');

                    }
                })

        // Here you can do something with the submitted essay, like send it to a server
        console.log('Submitted essay:', essay);
      };
      }


    return (
        <div className="flex flex-col md:flex-row bg-blue-100">
            <Sidebar />
            <div className="relative md:ml-64">
                <CourseNavBar courseCode={courseCode} />
            </div>
            <div className="p-6 text-center w-full">
                <h1 className="text-3xl text-black font-semibold mb-4" data-testid="course-heading">{assignmentData && assignmentData.name}</h1>
                <h2 className="text-3xl text-black font mt-4" data-testid="assignments-heading">Prompt: {assignmentData && assignmentData.questionPrompt}</h2>
                <div className="max-w-md mx-auto mt-8 bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Write Submission</h2>
                    {currentQuestions.map((questionData, index) => (
                      <Question key={index} questionData={questionData} />
                    ))}
                    {/* <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label htmlFor="essay" className="block text-gray-700">Take your Quiz:</label>
                        <textarea
                          id="essay"
                          name="essay"
                          rows="6"
                          className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          value={essay}
                          onChange={handleChange}
                          required
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                      >
                        Submit
                      </button>
                    </form> */}
                  </div>
                </div>
            </div>
        </div>
    );

}

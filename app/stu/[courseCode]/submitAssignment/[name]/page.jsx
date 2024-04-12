'use client'

import Sidebar from '@/app/views/Sidebar';
import CourseNavBar from '@/app/views/StuCourseNavBar';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useParams } from 'next/navigation';
import { auth } from '@/app/lib/firebase';
import { getDoc, doc,getDocs,query,collection, where,updateDoc } from 'firebase/firestore';
import { arrayUnion } from 'firebase/firestore';
import db from '../../../../lib/firebase';
import {storage} from '../../../../lib/firebase';
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage';

export default function Assignments() {
    let {name,courseCode} = useParams(); //getting name and courseCode from the params

    name = decodeURIComponent(name);
    courseCode = decodeURIComponent(courseCode);

    const [assignmentData, setAssignmentData] = useState([]); // State for storing assignment data
    const [user,setUser] = useState(null); // State for storing user
    const [essay, setEssay] = useState(''); // State for storing essay
    const [userType,setUserType] = useState('user'); // State for storing user type
    const [userName,setUserName] = useState('non'); // State for storing user name
    const [assignmentType,setAssignmentType] = useState(null); // State for storing assignment type
    const [file,setFile] = useState(null); // State for storing file

    // Effect hook for handling authentication state change
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (auth.currentUser) {
                setUser(auth.currentUser);

                console.log(user);
                const userInfoRef = collection(db,'students');
                const q = query(userInfoRef, where('uid','==',user.uid));
                try{
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        setUserName(doc.data().firstName);
                        setUserType(doc.data().userType);
                    })
                }catch(error){
                    console.log(error.message);
                }  
              
                const essayRef = doc(db, 'essays', name);
                const quizRef = doc(db, 'quizzes', name);

                const essaySnapshot = await getDoc(essayRef);
                const quizSnapshot = await getDoc(quizRef);

                if (essaySnapshot.data()) {
                    setAssignmentData({ name, ...essaySnapshot.data() });
                    setAssignmentType('essay');
                } else  {
                    setAssignmentData({ name, ...quizSnapshot.data() });
                    setAssignmentType('quiz');
                } 

            }
        });

        return () => unsubscribe();
    }, [assignmentType]); // Add assignmentType as a dependency

    // Function for handling change in essay
    const handleChange = (event) => {
        setEssay(event.target.value);
    };

    // Function for handling change in file 
    const handleChangedFile = (event) => {
      setFile(event.target.files[0])
    };

    // Function for uploading the file to the database
    const handleFileChange = async (event) => {
      event.preventDefault();
      if (file) {
          try {
              // Upload the file to a storage location (you need to implement this)
              // Once the file is uploaded, get the URL
              const fileURL = await uploadFileAndGetURL(file);
              
              const studentRef = collection(db, 'students');
              const querySnapshot = await getDocs(query(studentRef, where('uid', '==', user.uid)));
              
              querySnapshot.forEach(async (studentDoc) => {
                  const registeredCoursesRef = collection(studentDoc.ref, 'registeredCourses');
                  const courseDocRef = doc(registeredCoursesRef, courseCode);
      
                  const courseDocSnapshot = await getDoc(courseDocRef);


                  if (courseDocSnapshot.exists()) {
                      // Update the submittedAssignments array with the submitted file URL
                      const updatedCourseData = {
                          submittedAssignments: arrayUnion({
                              name: decodeURIComponent(name),
                              submission: fileURL,
                              grade: null,
                              fileSubmission:'true'
                          })
                      };
      
                      await updateDoc(courseDocRef, updatedCourseData);
                      window.location.href = `/stu/${courseCode}/assignments`;
                  }
              });
          } catch (error) {
              console.error('Error uploading file:', error);
          }
      }
  };
  
  // Function to upload the file and get its URL 
  const uploadFileAndGetURL = async (file) => {
      const storageRef = ref(storage, 'assignmentFiles/' + file.name);
      await uploadBytes(storageRef, file);
      return getDownloadURL(storageRef);
  };
  
    // Function for handling essay submission
    const handleSubmitEssay = async (event) => {
        event.preventDefault();
        if(essay.length==0){
          alert('Your essay must have some text if you are not submitting a file');
        }else{
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
                            grade: null,
                            fileSubmission:'false'
                        })
                    };

                    await updateDoc(courseDocRef, updatedCourseData);
                    setEssay('');
                    window.location.href = `/stu/${courseCode}/assignments`;
                }
            });
        }
        console.log('Submitted essay:', essay);

        }
    };

    return (
        <>
        {assignmentType != null && assignmentType === 'essay' && (
            <div className="flex flex-col md:flex-row bg-blue-100">
                <Sidebar userName={userName} userType={userType} />
                <div className="relative md:ml-64">
                    <CourseNavBar courseCode={courseCode} />
                </div>
                <div className="p-6 text-center w-full">
                    <h1 className="text-3xl text-black font-semibold mb-4" data-testid="course-heading">{assignmentData && assignmentData.name}</h1>
                    <h2 className="text-3xl text-black font mt-4" data-testid="assignments-heading">Prompt: {assignmentData && assignmentData.questionPrompt}</h2>
                    <div className="max-w-md mx-auto mt-8 bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-4">Write Submission</h2>
                            <form onSubmit={handleSubmitEssay}>
                                <div className="mb-4">
                                    <label htmlFor="essay" className="block text-gray-700">Write your essay:</label>
                                    <textarea
                                        id="essay"
                                        name="essay"
                                        rows="6"
                                        className="w-full text-black px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        value={essay}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                                
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                                >
                                    Submit
                                </button>
                            </form>

                            <form onSubmit={handleFileChange}>
                                <div className="mb-4">
                                    <label htmlFor="file" className="block text-gray-700">Upload file:</label>
                                    <input
                                        type="file"
                                        id="file"
                                        name="file"
                                        className="w-full text-black px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        onChange={handleChangedFile} // Bind the function to the onChange event

                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                                >
                                    Submit
                                </button>
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
        )}

        {assignmentType != null && assignmentType === 'quiz' && (
            <div className="flex flex-col md:flex-row bg-blue-100">
                <Sidebar userName={userName} userType={userType} />
                <div className="relative md:ml-64">
                    <CourseNavBar courseCode={courseCode} />
                </div>
                <h1 className="text-3xl text-black font-semibold mb-4" data-testid="course-heading">Aamir quiz</h1>
            </div>
        )}
        </>
    );
}

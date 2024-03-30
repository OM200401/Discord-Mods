'use client';
import { useState } from 'react'; // Import useState hook
import CourseNavBar from '../../components/CourseNavBar';
import Sidebar from '../../components/Sidebar';
import db from '../../lib/firebase';
import {auth,firestore,storage,uploadBytes} from '../../lib/firebase';
import { addDoc,collection,updateDoc } from 'firebase/firestore';
import {getDownloadURL, ref} from 'firebase/storage';
import { update } from 'firebase/database';

export default function Assignments() {
    // State variables to store the title of the assignment, the selected type (quiz or essay), the due date, the worth of the assignment, and the PDF file
    const [assignmentTitle, setAssignmentTitle] = useState('');
    const [assignmentType, setAssignmentType] = useState('essay'); // Default type is 'essay'
    const [dueDate, setDueDate] = useState('');
    const [assignmentWorth, setAssignmentWorth] = useState('');
    const [pdfFile, setPdfFile] = useState(null);

    // Function to handle file upload
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setPdfFile(file);
    };

    // Function to handle submission of assignment details
    const handleSubmit = async () => {
        // Perform submission logic here
        console.log('Assignment Details Submitted:', {
            assignmentTitle,
            assignmentType,
            dueDate,
            assignmentWorth,
            pdfFile
        });
        // Clear input fields after submission
        // setAssignmentTitle('');
        // setDueDate('');
        // setAssignmentWorth('');
        // setPdfFile(null);

        try {
            const colRef = collection(db,'Assignments');

            const assignmentDocRef = await addDoc(colRef, {
                assignmentTitle: assignmentTitle,
                assignmentType: assignmentType,
                dueDate: dueDate,
                assignmentWorth: assignmentWorth,
            });

            let url = '';
            const storageRef = ref(storage, `assignments/${assignmentDocRef.id}`);
            
            const snapshot = await uploadBytes(storageRef,pdfFile);

            getDownloadURL(snapshot.ref).then((downloadURL) => {
                updateDoc(assignmentDocRef,{fileURL:downloadURL});
            })
              
    
        } catch (error) {
            //Handle errors if any thrown after validation
            setErrorMsg(error.message);
        }


    };

    return (
        <div className="flex flex-col h-screen bg-blue-100"> {/* Add h-screen class to ensure full height */}
            <Sidebar />
            <div className="p-6 text-center w-full">
                <h1 className="text-3xl text-black font-semibold mb-4" data-testid="course-heading">Course Name</h1>
                <h2 className="text-3xl text-black font mt-4" data-testid="assignments-heading"> New Assignment</h2>
                <div className="flex flex-col items-center mt-5"> {/* Center the content vertically */}
                    {/* Radio buttons for selecting the assignment type */}
                    <div className="flex items-center mb-4">
                        <input
                            type="radio"
                            id="quiz"
                            name="assignmentType"
                            value="quiz"
                            checked={assignmentType === 'quiz'}
                            onChange={() => setAssignmentType('quiz')} // Update the assignment type state to 'quiz'
                            className="mr-2 text-black"
                        />
                        <label htmlFor="quiz" className="mr-4 text-black">Quiz</label>
                        <input
                            type="radio"
                            id="essay"
                            name="assignmentType"
                            value="essay"
                            checked={assignmentType === 'essay'}
                            onChange={() => setAssignmentType('essay')} // Update the assignment type state to 'essay'
                            className="mr-2 text-black"
                        />
                        <label htmlFor="essay" className="text-black">Essay</label>
                    </div>
                    {/* Input field for the title of the assignment */}
                    <input
                        type="text"
                        placeholder="Enter assignment title"
                        className="border border-gray-300 px-4 py-2 rounded-md text-black w-96 mb-4" // Set text color to black and width to 96
                        value={assignmentTitle}
                        onChange={(e) => setAssignmentTitle(e.target.value)} // Update the assignment title state
                    />
                    {/* Input field for the due date of the assignment */}
                    <input
                        type="date"
                        placeholder="Enter due date"
                        className="border border-gray-300 px-4 py-2 rounded-md text-black w-96 mb-4" // Set text color to black and width to 96
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)} // Update the due date state
                    />
                    {/* Input field for the worth of the assignment */}
                    <input
                        type="number"
                        placeholder="Enter assignment worth"
                        className="border border-gray-300 px-4 py-2 rounded-md text-black w-96 mb-4" // Set text color to black and width to 96
                        value={assignmentWorth}
                        onChange={(e) => setAssignmentWorth(e.target.value)} // Update the assignment worth state
                    />
                    {/* Input field for uploading PDF file */}
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileUpload} // Handle file upload
                        className="border border-gray-300 px-4 py-2 rounded-md text-black w-96 mb-4" // Set text color to black and width to 96
                    />
                    {/* Button to submit the assignment details */}
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleSubmit} // Handle submission of assignment details
                    >
                        Submit
                    </button>
                </div>
                <div className="overflow-x-auto">
                    {/* Additional content can be added here */}
                </div>
            </div>
        </div>
    );
}

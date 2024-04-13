import { render, fireEvent, waitFor } from '@testing-library/react'; 
import { signInWithEmailAndPassword } from "firebase/auth";
import db from '../../app/lib/firebase';
import { addDoc, doc, getDocs, setDoc, collection, query, where} from 'firebase/firestore';
import { auth } from '../../app/lib/firebase';
import { createUser, getTeacherDoc, fetchAllTeachers, getNumTeachers} from '../../app/models/User';
import exp from 'constants';


describe('Firebase Database Tests', () => { 
    test ('Test createUser method', async () => {
        const email = 'abcde@gmail.com';
        const password = '123456';
        try {
            // Sign in user
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;  
            
            // Ensure user UID is defined and non-empty
            expect(user.uid).toBeDefined();
            expect(user.uid).not.toEqual('');
            
            // Create user using UID
            const createdUser = await createUser(user.uid, 'Student');

            // Assertions
            expect(createdUser).toBeDefined(); // Ensure a user object is returned
            expect(createdUser.uid).toEqual(user.uid); // Ensure the returned user has the correct uid
            expect(createdUser.userType).toEqual('Student'); // Ensure the returned user has the correct userType
            expect(createdUser.firstName).toEqual('NewTester'); // Ensure the returned user has the correct firstName
            expect(createdUser.lastName).toEqual('Refactored'); // Ensure the returned user has the correct lastName
            expect(createdUser.email).toEqual(email); // Ensure the returned user has the correct email
            expect(createdUser.uid).toEqual(user.uid); // Ensure the returned user has the correct uid
            // This tests both createUser and getUserData functions from the user model
        } catch (error) {
            // If any error occurs, fail the test with the error message
            throw new Error('Test Failed: ' + error.message);
        }
    });

    test('Test getTeacherDoc', async () => {
        const teacherUID = 'NTO5DPPK3Mh7Yw774lH6am9PGMJ3';
        const teacherDoc = await getTeacherDoc(teacherUID);
        expect(teacherDoc).toBeDefined();
        expect(teacherDoc.id).toEqual(teacherUID);
        expect(teacherDoc.data().firstName).toEqual('Mike');
        expect(teacherDoc.data().lastName).toEqual('Smith');
        expect(teacherDoc.data().email).toEqual('nike@gmail.com');
    });

    test('Test fetchAllTeachers', async () => {

        const teachersCollection = collection(db, 'teachers');        
        // Get the documents that match the query
        const querySnapshot = await getDocs(teachersCollection);  
        // Array to store course info
        const teacherData = [];  
        // Loop through the query snapshot and extract the data
        querySnapshot.forEach(doc => {
            teacherData.push(doc.data());
        });

        const functionData = await fetchAllTeachers();
        
        expect(functionData).toBeDefined();
        expect(functionData.length).toBeGreaterThan(0);
        functionData.forEach(teacher => {
            const foundTeach = functionData.find(dbTeacher => dbTeacher.id === teacher.id);
            expect(foundTeach).toBeDefined();
            expect(foundTeach).toEqual(teacher);
        });
    });

    test('Test getNumTeachers', async () => {
        try {
            // Call getNumTeachers to fetch the number of teachers
            const numTeachers = await getNumTeachers();

            // Assertions
            expect(numTeachers).toBeDefined(); // Ensure a value is returned
            expect(numTeachers).toBeGreaterThan(0); // Ensure the number of teachers is greater than 0
            // expect(numTeachers).toEqual(6); // Change this according to the number of teachers in the database

        } catch (error) {
            // If any error occurs, fail the test with the error message
            throw new Error('Test Failed: ' + error.message);
        }
    });

});


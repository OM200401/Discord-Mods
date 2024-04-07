import { render, fireEvent, waitFor } from '@testing-library/react';
import SignUpPage from '../../app/signup/page';
import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import firebase from '../../app/lib/firebaseMock';
import db from '../../app/lib/firebase';
import { addDoc, doc, getDocs, setDoc, collection, query, where} from 'firebase/firestore';
import { auth } from '../../app/lib/firebase';



describe('Firebase Database Tests', () => {
    let user; // Declaring user globally to use it across the test and cleanup
    afterEach(async () => {
        if (user) {
            try {
                await deleteUser(user); // Delete the user from Firebase Authentication
                console.log('User deleted successfully');
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    });
    test('Test student signUp operation', async () => {
        const email = 'signupxy@example.com';// Need to change for each test
        const password = '123456';
        const firstName = 'John';
        const lastName = 'Doe';
        const userType = 'Student'; 
        
        try {
            // Attempting to sign up with correct information
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            user = userCredential.user;
            expect(user.uid).toBeDefined(); // Ensure a user object is returned
            expect(user.email.toLowerCase()).toEqual(email.toLowerCase()); // Ensure the returned user has the correct email
            const studentCollection = collection(db, 'students');
            const stuRef = query(studentCollection, where('email', '==', user.email));
            const stuSnapshot = await getDocs(stuRef);
            if (!stuSnapshot.empty) {
                stuSnapshot.forEach((doc) => {
                    console.log(doc.id, ' => ', doc.data());
                    expect(doc.data().firstName).toBe(firstName);
                    expect(doc.data().lastName).toBe(lastName);
                    expect(doc.data().email).toBe(email);                    
                });
            }

            // const userData = querySnapshot.docs[0].data();
            // expect(userData.firstName).toBe(firstName); // Additional assertions for user data
            // expect(userData.lastName).toBe(lastName); // Additional assertions for user data
            // expect(userData.email).toBe(email); // Additional assertions for user data
            // Additional assertions for user data
            // You can add more assertions based on your requirements
        } catch (error) {
            // If signup fails, fail the test
            throw new Error('Signup failed: ' + error.message);
        }
    
    });
});

import { render, fireEvent, waitFor } from '@testing-library/react'; 
import { signInWithEmailAndPassword } from "firebase/auth";
import db from '../../app/lib/firebase';
import { addDoc, doc, getDocs, setDoc, collection, query, where} from 'firebase/firestore';
import { auth } from '../../app/lib/firebase';
import { createUser} from '../../app/models/User';
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
            expect(createdUser.firstName).toEqual('NewTest'); // Ensure the returned user has the correct firstName
            expect(createdUser.lastName).toEqual('Refactor'); // Ensure the returned user has the correct lastName
            expect(createdUser.email).toEqual(email); // Ensure the returned user has the correct email
            expect(createdUser.uid).toEqual(user.uid); // Ensure the returned user has the correct uid
            // Add more assertions as needed
        } catch (error) {
            // If any error occurs, fail the test with the error message
            throw new Error('Test Failed: ' + error.message);
        }
    });
});


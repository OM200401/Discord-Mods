import { render, fireEvent, waitFor } from '@testing-library/react'; 
import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
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
        const email = 'stusignupfore2e@example.com';
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
                    // You can add more assertions based on your requirements
                    expect(doc.data().firstName).toBe(firstName);
                    expect(doc.data().lastName).toBe(lastName);
                    expect(doc.data().email).toBe(email);                    
                });
            }             

        } catch (error) {
            // If signup fails, fail the test
            throw new Error('Signup failed: ' + error.message);
        }

    
    });
    test('Test teacher signUp operation', async () => {
        const email = 'teachsignupfore2e@example.com';
        const password = '123456';
        const firstName = 'John';
        const lastName = 'Doe';
        const userType = 'Teacher'; 
        
        try {
            // Attempting to sign up with correct information
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            user = userCredential.user;
            expect(user.uid).toBeDefined(); // Ensure a user object is returned
            expect(user.email.toLowerCase()).toEqual(email.toLowerCase()); // Ensure the returned user has the correct email
            const teacherCollection = collection(db, 'teacher');
            const teachRef = query(teacherCollection, where('email', '==', user.email));
            const teachSnapshot = await getDocs(teachRef);
            if (!teachSnapshot.empty) {
                teachSnapshot.forEach((doc) => {
                    console.log(doc.id, ' => ', doc.data());
                    // You can add more assertions based on your requirements
                    expect(doc.data().firstName).toBe(firstName);
                    expect(doc.data().lastName).toBe(lastName);
                    expect(doc.data().email).toBe(email);                    
                });
            }              
        } catch (error) {
            // If signup fails, fail the test
            throw new Error('Signup failed: ' + error.message);
        }
    
    });    

});

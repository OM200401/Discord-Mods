import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../app/lib/firebase';

describe('Firebase Database Tests', () => {
    test('Test signUp operation', async () => {
        const email = 'signuptester10@example.com';// Need to change for each test
        const password = '123456';
        const firstName = 'John';
        const lastName = 'Doe';
        const userType = 'Student'; // or 'teacher' based on your setup
        try {
            // Attempting to sign up with correct information
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            expect(user.uid).toBeDefined(); // Ensure a user object is returned
            expect(user.email.toLowerCase()).toEqual(email.toLowerCase()); // Ensure the returned user has the correct email

            // Additional assertions for user data
            // You can add more assertions based on your requirements
        } catch (error) {
            // If signup fails, fail the test
            throw new Error('Signup failed: ' + error.message);
        }
    });
});

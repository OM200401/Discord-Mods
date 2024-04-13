import db from '../../app/lib/firebase';
import { collection, query, where, getDocs } from "firebase/firestore";

describe('Firebase Database Tests', () => {
    test('Test database read operation for admin test', async () => {
        // Assuming 'Userinfo' is the name of your Firestore collection
        const adminsCollection = collection(db, 'admins');

        // Query for all user documents
        const q = query(adminsCollection, where('firstName', '==', 'admin'));
      
        // Get the documents that match the query
        const querySnapshot = await getDocs(q);
      
        // Initialize an empty array to store the user data
        const adminsData = [];
      
        // Loop through the query snapshot and extract the data
        querySnapshot.forEach(doc => {
            adminsData.push(doc.data());
        });
  
        // Ensure that the data matches the expected data
        expect(adminsData.length).toBeGreaterThan(0); // Ensure that there is at least one document
        expect(adminsData[0]).toEqual({
            email: "admintest@gmail.com",
            firstName:"admin",
            lastName:"test",
            uid: "9ZEzx8hdLiRfnoR4CUVjH3nhrum1",
            userType: "admin"             
        });
    });  

    test('Test database read operation for admin properties', async () => {
      // Assuming 'Userinfo' is the name of your Firestore collection
      const adminsCollection = collection(db, 'admins');

      // Query for all user documents
      const q = query(adminsCollection);
    
      // Get the documents that match the query
      const querySnapshot = await getDocs(q);
    
      // Initialize an empty array to store the user data
      const adminData = [];
    
      // Loop through the query snapshot and extract the data
      querySnapshot.forEach(doc => {
        adminData.push(doc.data());
      });
    
      // Ensure that the data matches the expected data
      expect(adminData.length).toBeGreaterThan(0); // Ensure that there is at least one document    
      // Test each user
      adminData.forEach(admin => {        
        expect(admin).toHaveProperty('email');
        expect(admin).toHaveProperty('firstName');
        expect(admin).toHaveProperty('lastName');
        expect(admin).toHaveProperty('uid');
        expect(admin).toHaveProperty('userType');        
      });
    });

});
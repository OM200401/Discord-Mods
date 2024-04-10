import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBoo9Uw3WfBge7ShHB6u2tnFBasnWZA9io",
  authDomain: "elearningdatabase-53938.firebaseapp.com",
  projectId: "elearningdatabase-53938",
  storageBucket: "elearningdatabase-53938.appspot.com",
  messagingSenderId: "712504744238",
  appId: "1:712504744238:web:cee3359a38f6a1f99582bf",
  measurementId: "G-LQL0C5BKZP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { auth, firestore,storage };
export default firestore;
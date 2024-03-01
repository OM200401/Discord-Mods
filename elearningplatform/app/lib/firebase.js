import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyD16yyRt45iXMztKB2hyfsFKokB84i1ieI",
  authDomain: "e-learning-platform-59d37.firebaseapp.com",
  databaseURL: "https://e-learning-platform-59d37-default-rtdb.firebaseio.com",
  projectId: "e-learning-platform-59d37",
  storageBucket: "e-learning-platform-59d37.appspot.com",
  messagingSenderId: "820733472644",
  appId: "1:820733472644:web:9a0a3b52414ba50b0db7d1",
  measurementId: "G-HMD1P2KTRM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export {db};

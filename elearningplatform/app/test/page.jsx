"use client"
import { useEffect, useState } from 'react';
import firestore from '../lib/firebase';
import { ref, onValue } from 'firebase/database';
import Navbar from '../components/Navbar';

export default function DataPage() {
 const [data, setData] = useState(null);

 useEffect(() => {
    const dbRef = ref(firestore, 'User'); 

    const handleData = (snapshot) => {
      const data = snapshot.val();
      setData(data);
    };

    const unsubscribe = onValue(dbRef, handleData);

    return () => {
      unsubscribe();
    };
 }, []);

 return (
    <header>
        <Navbar />
        <div className="max-w-4xl mt-10 mx-auto p-6 bg-blue-200 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4 font-black">Current Users</h1>
            {data ? (
            <pre className="text-lg text-gray-700">{JSON.stringify(data, null, 2)}</pre>
            ) : (
            <p className="text-lg text-gray-500">Loading data...</p>
            )}
        </div>
    </header>
    
 );
}
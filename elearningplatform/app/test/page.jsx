"use client"
import { useEffect, useState } from 'react';
import { db } from '../lib/firebase'; 
import { ref, onValue } from 'firebase/database';

export default function DataPage() {
 const [data, setData] = useState(null);

 useEffect(() => {
    const dbRef = ref(db, 'User'); 

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
    <div>
      <h1>Data from Firebase Realtime Database</h1>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
 );
}
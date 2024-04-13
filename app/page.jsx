'use client'

import Link from 'next/link';
import Navbar from './views/Navbar.jsx';
import { useEffect,useState } from 'react';
import db from './lib/firebase.js';
import { collection } from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';
import * as React from "react";
import {Button} from "@nextui-org/react"; 
import TypeWriter from 'typewriter-effect';

export default function Home() {
  const colRef = collection(db, 'Students');
  const [students, setStudents] = useState([]);

  const testStudents = [];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => (
    onSnapshot(colRef, (snapshot) => 
      setStudents(snapshot.docs.map((doc) => doc.data())
    ))
  )
  ,[]);
  


  return (
    <div className='bg-black min-h-screen'>
      {/* The component Navbar is used below and is implemented in the Navbar.tsx file under components*/}
      <Navbar/> 
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold pt-10 font-mono">
          <TypeWriter
            options={{
              strings: ['Welcome to our E-Learning Platform'],
              autoStart: true,
              loop: true,
            }}
          />
        </h1>
        <p className="mt-3 text-2xl font-mono">
          <TypeWriter
            options={{
              strings: ['Join us and explore the world of knowledge.'],
              autoStart: true,
              loop: true,
            }}
          />
        </p>
        <div className="flex mt-6 justify-center">
          <Button color='primary' variant='shadow' size='lg'>
            <a>
              <Link href="/login">
                Get Started
                {/* This button would lead the user to the login page */}
              </Link>
            </a>
          </Button>
          
        </div>
      </main>
    </div>
  );
}
// import { expect, test } from 'vitest';
import jest from 'jest';

import { render, screen } from '@testing-library/react';
import Home from '../../app/page';

// import SignUpPageTest from '@/app/backEndTestFiles/signupTest/page';

import { useState } from 'react';
import { useEffect } from "react";
import Link from "next/link";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../app/lib/firebase';
import { redirect } from "next/navigation";
import db from '../../app/lib/firebase';

import { collection, query, where, getDocs } from "firebase/firestore";

describe('Firebase Database Tests', () => {
  test('Test database read operation number 1', async () => {
    // Assuming 'Students' is the name of your Firestore collection
    const studentsCollection = collection(db, 'Students');

    // Query for a specific student document with an ID of 'nYhZn7r4g529WXaYzSlx'
    const q = query(studentsCollection, where('Name', '==', 'Aamir'));

    // Get the documents that match the query
    const querySnapshot = await getDocs(q);

    // Initialize an empty array to store the student data
    const studentsData = [];

    // Loop through the query snapshot and extract the data
    querySnapshot.forEach(doc => {
      studentsData.push(doc.data());
    });

    // Ensure that the data matches the expected data
    expect(studentsData.length).toBeGreaterThan(0); // Ensure that there is at least one document
    expect(studentsData[0]).toEqual({
      Name: "Aamir",
      Year: 3 // Assuming 'Year' is lowercase in your Firestore documents
    });
  });

  test('Test database read operation number 2', async () => {
    // Assuming 'Students' is the name of your Firestore collection
    const studentsCollection = collection(db, 'Userinfo');

    // Query for a specific student document with an ID of 'nYhZn7r4g529WXaYzSlx'
    const q = query(studentsCollection, 
      where('firstName', '==', 'Om'),
      where('lastName', '==', 'Mistry'),      
      );

    // Get the documents that match the query
    const querySnapshot = await getDocs(q);

    // Initialize an empty array to store the student data
    const studentsData = [];

    // Loop through the query snapshot and extract the data
    querySnapshot.forEach(doc => {
      studentsData.push(doc.data());
    });

    // Ensure that the data matches the expected data
    expect(studentsData.length).toBeGreaterThan(0); // Ensure that there is at least one document
    expect(studentsData[0]).toEqual({
      courses: ["COSC 304", "COSC 310"],
      email: "om12@gmail.com",
      firstName: "Om",
      lastName: "Mistry",
      uid: "lL8Acy8nI2RJK1DcJKw8Z06qShx1",
      userType: "Student"
    });
  });
});
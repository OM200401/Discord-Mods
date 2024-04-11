'use client';
import Loader from '../../components/Loader';
import { useState, useEffect } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import Sidebar from '../../components/Sidebar';
import CourseNavBar from '../../components/StuCourseNavBar';
import db, { auth } from '../../lib/firebase';

export default function CoursePage() {

    const [userName, setUserName] = useState('test');

    const courseCode = 'BIOL696';

    return (
        <div className='bg-blue-100'>
            <div className="flex flex-col md:flex-row">
                <Sidebar userName={userName} userType={"Student"} />
                <div className="relative md:ml-64">
                    <CourseNavBar  courseCode={courseCode} />
                </div>
                <div className="p-6 w-screen bg-blue-100 text-center">
                    <h1 className="text-3xl text-black font-semibold mb-8" data-testid="course-heading">Course Name</h1>
                    <div className="mt-4 text-left  bg-white rounded-md shadow-lg p-8">
                        <h2 className="text-2xl font-semibold text-black mb-4 pb-2 border-b-2 border-blue-500">Info about the Course</h2>
                        <p className="leading-relaxed text-gray-600">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

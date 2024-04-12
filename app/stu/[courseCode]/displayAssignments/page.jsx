'use client';
import React from 'react';
import Sidebar from '../../../views/Sidebar';
import CourseNavBar from '../../../views/StuCourseNavBar';
import Loader from '../../../views/Loader';
import {useState, useEffect} from 'react';

export default function EssayDisplay() {
    const [loading, setLoading] = useState(true); // State for storing loading status

    // Dummy essay data
    const essay = {
        title: 'Sample Essay',
        dueDate: '2024-04-10',
        weightage: 20,
        questionPrompt: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,',
    };

    useEffect(() => {
        // Simulate a network request
        setTimeout(() => {
            setLoading(false); // Set loading to false after 3 seconds
        }, 1000);
    }, []);

    if (loading) {
        return <Loader />; // Return the Loading component if loading is true
    }

    return (
        <div className="flex bg-blue-100 min-h-screen">
            <Sidebar data-testid="sidebar" />
            <div className="relative md:ml-64 ">
                <CourseNavBar data-testid="course-navbar" />
            </div>
            <div className="flex-grow p-6">
                <div className="max-w-4xl mx-auto bg-white rounded-md shadow-lg p-8">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-3xl font-bold text-gray-800" data-testid="essay-title">{essay.title}</h1>
                        <a href="#" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" data-testid="start-assignment-button">Start Assignment</a>
                    </div>
                    <div className="flex justify-between text-sm text-gray-800 mb-4">
                        <p data-testid="due-date">Due Date: {essay.dueDate}</p>   
                        <p data-testid="points">Points: {essay.weightage}</p>
                    </div>
                    <p className="text-base text-gray-600" data-testid="question-prompt">{essay.questionPrompt}</p>
                </div>
            </div>
        </div>
    );
}

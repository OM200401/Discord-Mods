import { test, expect } from 'vitest';
import * as nextRouter from 'next/router';
import Home from '../../app/stuHome/testPage';
import {cleanup, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import CourseCard from '../../app/views/CourseCard';


const mockCourseData = [
    { id: '1', courseCode: 'course1', courseName: 'Course 1', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_gaZXWjn_qJVUXTVnHnGIPRka3psRSJgShg&usqp=CAU' },
    { id: '2', courseCode: 'course2', courseName: 'Course 2', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_gaZXWjn_qJVUXTVnHnGIPRka3psRSJgShg&usqp=CAU' },
    // Add more dummy courses if needed
]
  

test('Sidebar is present on the home page', async () => {
    render(<Home />);
    const sidebar = screen.getByTestId('sidebar-component');
    expect(sidebar).toBeDefined();
    cleanup();
}, 10000);


test('Course cards are present on the home page', async () => {
    // Render the CourseCard component with each item in mockCourseData
    mockCourseData.forEach(course => {
        render(<CourseCard courseCode={course.courseCode} courseName={course.courseName} imageUrl={course.imageUrl} />);
    });

    const courseCard = await screen.findAllByTestId('course-card');
    expect(courseCard.length).toBeGreaterThan(0);
}, 10000); 




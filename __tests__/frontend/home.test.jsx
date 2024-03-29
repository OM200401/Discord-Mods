import { expect, test, mock } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '../../app/home/page';
import * as FetchCourseData from '../../app/components/FetchCourseData';

// Mock fetchCourseInfo function
FetchCourseData.fetchCourseInfo = () => Promise.resolve([
    { id: '1', courseCode: 'course1', courseName: 'Course 1', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_gaZXWjn_qJVUXTVnHnGIPRka3psRSJgShg&usqp=CAU' },
    { id: '2', courseCode: 'course2', courseName: 'Course 2', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_gaZXWjn_qJVUXTVnHnGIPRka3psRSJgShg&usqp=CAU' },
    // Add more dummy courses as needed
]);

test('Sidebar is present on the home page', () => {
    render(<Home />);
    const sidebar = screen.getByTestId('sidebar-component');
    expect(sidebar).toBeDefined();
});

test('Course cards are present on the home page', async () => {
    const courseCard = await screen.findAllByTestId('course-card');
    const courseCards = screen.getAllByTestId('course-card');
    expect(courseCards.length).toBeGreaterThan(0);
});
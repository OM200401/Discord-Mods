import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Assignments from '../app/[courseCode]/assignments/page';

test('Sidebar component is present', () => {
    render(<Assignments />);
    const sidebar = screen.getByTestId('sidebar');
    expect(sidebar).toBeDefined();
});

test('CourseNavBar component is present', () => {
   
    const courseNavBar = screen.getByTestId('course-navbar');
    expect(courseNavBar).toBeDefined();
});

test('Page contains the expected heading text', () => {
   
    const heading = screen.getByTestId('course-heading');
    expect(heading).toBeDefined();
});

test('Page contains the expected assignments heading text', () => {
    
    const heading = screen.getByTestId('assignments-heading');
    expect(heading).toBeDefined();
});

test('Page contains assignment table', () => {
   
    const assignmentTable = screen.getByRole('table');
    expect(assignmentTable).toBeDefined();
});

test('Page displays assignments data correctly', () => {
    
    const assignmentRows = screen.getAllByRole('row', { name: /assignment/i });
    expect(assignmentRows.length).toBe(2); 
});
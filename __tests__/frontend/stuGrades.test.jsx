import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import sinon from 'sinon';
import * as nextRouter from 'next/router';
import Grades from '../../app/stu/[courseCode]/grades/page'

test('Sidebar component is present', () => {
    sinon.stub(nextRouter, 'useRouter').returns({
        route: '/',
        pathname: '',
        query: '',
        asPath: '',
    })
    render(<Grades/>);
    const sidebar = screen.findByTestId('sidebar-component');
    expect(sidebar).toBeDefined();
});

test('CourseNavBar component is present', () => {
   
    const courseNavBar = screen.findByTestId('course-navbar');
    expect(courseNavBar).toBeDefined();
});


//----------------------------------------------------

test('Course heading is rendered correctly', () => {

    const courseHeading = screen.getByTestId('course-heading');
    expect(courseHeading).toBeDefined();
});

test('Assignments heading is rendered correctly', () => {
 
    const assignmentsHeading = screen.getByTestId('assignments-heading');
    expect(assignmentsHeading).toBeDefined();
});

test('Assignments are rendered correctly', () => {
    const assignmentTitles = screen.getAllByRole('heading', { level: 3 });
    expect(assignmentTitles.length).toBeDefined();

    // Assuming there are 5 assignments, you might want to adjust the number if it changes
    assignmentTitles.forEach((title) => {
        expect(title).toBeDefined();
    });

    const dueDates = screen.getAllByText(/Due Date:/);
    expect(dueDates.length).toBeDefined(); // Assuming there are 5 due dates

    const points = screen.getAllByText(/grade \//);
    expect(points.length).toBeDefined(); // Assuming there are 5 sets of points
});

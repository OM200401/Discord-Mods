import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import sinon from 'sinon';
import * as nextRouter from 'next/router';
import Assignments from '../../app/stu/[courseCode]/assignments/page'


test('Sidebar component is present', () => {
    sinon.stub(nextRouter, 'useRouter').returns({
        route: '/',
        pathname: '',
        query: '',
        asPath: '',
    })
    render(<Assignments />);
    const sidebar = screen.findByTestId('sidebar-component');
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

test('Page displays assignments data correctly', () => {
    
    const assignmentRows = screen.getAllByRole('heading', { name: /Assignment/i });
    expect(assignmentRows.length).toBe(6); 
});




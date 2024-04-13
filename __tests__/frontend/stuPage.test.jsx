import { test, expect } from 'vitest';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import sinon from 'sinon';
import * as nextRouter from 'next/router';
import CoursePage from '../../app/stu/[courseCode]/testPage.jsx';





test('studentCousNavBar component is present', () => {
    render(<CoursePage/>);
    const courseNavBar = screen.findByTestId('stuCourseNavBar');
    expect(courseNavBar).toBeDefined();
});


test('sidebar component is present', () => {

    const courseNavBar = screen.findByTestId('sidebar');
    expect(courseNavBar).toBeDefined();
});



test('info about the course is present ', () => {
    const info = screen.getAllByText(/Info about the Course/);
expect(info).toBeDefined(); //
});

test('description of course is present  ', () => {
    const description = screen.getAllByText(/Lorem ipsum dolor sit amet/);
expect(description).toBeDefined(); 
});








  
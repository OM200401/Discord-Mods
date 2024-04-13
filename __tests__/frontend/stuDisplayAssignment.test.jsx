import { test, expect } from 'vitest';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import sinon from 'sinon';
import * as nextRouter from 'next/router';
import EssayDisplay from '../../app/stu/[courseCode]/assignments/testPage'

test('Sidebar component is present', async () => {
    sinon.stub(nextRouter, 'useRouter').returns({
        route: '/',
        pathname: '',
        query: '',
        asPath: '',
    })
    render(<EssayDisplay />);
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'), { timeout: 6000});


    const sidebar = screen.findByTestId('sidebar-component');
    expect(sidebar).toBeDefined();
});

test('CourseNavBar component is present', () => {
   
    const courseNavBar = screen.getByTestId('course-navbar');
    expect(courseNavBar).toBeDefined();
}); 


//----------------------------------------------------
// test('Essay title is rendered correctly', () => {
   
//     const title = screen.getByTestId('essay-title');
//     expect(title.textContent).toBeDefined();
// });

// test('Due date is rendered correctly', () => {
   
//     const dueDate = screen.getByTestId('due-date');
//     expect(dueDate.textContent).toBeDefined();
// });

// test('Points are rendered correctly', () => {
   
//     const points = screen.getByTestId('points');
//     expect(points.textContent).toBeDefined();
// });

// test('Essay question prompt is rendered correctly', () => {
  
//     const questionPrompt = screen.getByTestId('question-prompt');
//     expect(questionPrompt.textContent).toBeDefined();
// });

// test('Start Assignment button is present', () => {
//     const startButton = screen.getByTestId('start-assignment-button');
//     expect(startButton).toBeDefined();
// });
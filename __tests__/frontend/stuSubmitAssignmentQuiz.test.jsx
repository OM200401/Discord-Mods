import { test, expect } from 'vitest';
import sinon from 'sinon';
import {cleanup, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import * as nextRouter from 'next/router';
import Assignments from '../../app/stu/[courseCode]/submitAssignment/[name]/testPageQuiz';





const course = {
    courseCode: 'COSC304',
    name: 'Regan',
   
}


test('Assignments page renders correctly without crashing', () => {
    render(<Assignments courseCode ={course.courseCode} name = {course.name} />);
    const container = screen.getByTestId('course-heading');
    expect(container).toBeDefined();
});

test('Assignments page renders quiz prompt correctly', async () => {
    const prompt = await screen.findByTestId('assignments-heading');
    expect(prompt).toBeDefined();
});






import { test, expect } from 'vitest'
import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react'
import Assignments from '../../app/[courseCode]/grades/[name]/testPage'

test('Assignments page renders correctly without crashing', () => {
    render(<Assignments />);
    const container = screen.getByTestId('container');
    expect(container).toBeDefined();
});

test('Renders correct number of student elements', async () => {
    const studentElements = await screen.findAllByTestId('student-element');
    expect(studentElements).toHaveLength(5);
});
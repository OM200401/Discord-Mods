import { test, expect } from 'vitest';
import sinon from 'sinon';
import {cleanup, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import * as nextRouter from 'next/router';
import Assignments from '../../app/stu/[courseCode]/submitAssignment/[name]/testPageEssay';


test('renders Write your essay heading', () => {
    render(<Assignments/>);
    const firstName = screen.getByText(/Write Submission/i);
    expect(firstName).toBeDefined();

  });

  test('renders Write your prompt', () => {
    // Render the component
    const firstName = screen.getByText(/Prompt:/i);
    expect(firstName).toBeDefined();

  });


test('Sidebar component is present', async () => {
      
    const sidebar = screen.findByTestId('sidebar-component');
    expect(sidebar).toBeDefined();
});


test('renders Submit button', () => {
  const submitButton = screen.getByRole('button', { name: /Submit/i });
  expect(submitButton).toBeDefined();
});


test('renders Textarea for essay', () => {
  const essayTextarea = screen.getByLabelText(/Write your essay:/i);
  expect(essayTextarea).toBeDefined();
});

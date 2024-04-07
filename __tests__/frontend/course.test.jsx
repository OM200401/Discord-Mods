import { test, expect } from 'vitest';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import CoursePage from '../../app/[courseCode]/page';

test('Sidebar component is present', async () => {
    render(<CoursePage />);
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'), { timeout: 6000});

    const sidebar = screen.findByTestId('sidebar-component');
    expect(sidebar).toBeDefined();
});

test('Page contains the expected heading text', () => {
   
    const heading = screen.getByTestId('course-heading');
    expect(heading).toBeDefined();
});
 
test('Page contains the expected paragraph text', () => {
    ;
    const paragraph = screen.getByText(/Resources/i);
    expect(paragraph).toBeDefined();
});

test('"Get Started" link is present', () => {
    
    const link = screen.getByText(/Resource 1/i);
    expect(link).toBeDefined();
});

test('"Get Started" link leads to the correct page', () => {
    
    const link = screen.getByText(/Resource 1/i);
    expect(link).toBeDefined();
    expect(link.closest('a').getAttribute('href')).toBe('#resource1');
});
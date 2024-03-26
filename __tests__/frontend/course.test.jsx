import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CoursePage from '../../app/[courseCode]/page';
import sinon from 'sinon';
import * as nextRouter from 'next/router';

test('Sidebar component is present', () => {
    sinon.stub(nextRouter, 'useRouter').returns({
        route: '/',
        pathname: '',
        query: '',
        asPath: '',
    })
    render(<CoursePage />);
    const sidebar = screen.getByTestId('sidebar-component');
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
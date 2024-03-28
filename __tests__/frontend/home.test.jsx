import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import sinon from 'sinon';
import * as nextRouter from 'next/router';
import Home from '../../app/home/page';

// test('Sidebar is present on the home page', () => {
//     sinon.stub(nextRouter, 'useRouter').returns({
//         route: '/',
//         pathname: '',
//         query: '',
//         asPath: '',
//     });

//     render(<Home />);
//     const sidebar = screen.getByTestId('sidebar-component');
//     expect(sidebar).toBeDefined();
// });

test('Sidebar is present on the home page', () => {
    render(<Home />);
    const sidebar = screen.getByTestId('sidebar');
    expect(sidebar).toBeDefined();
});

test('Course cards are present on the home page', () => {
    const courseCards = screen.getAllByTestId('course-card');
    expect(courseCards.length).toBeGreaterThan(0);
});
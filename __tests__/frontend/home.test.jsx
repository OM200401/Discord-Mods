import { expect, test, mock } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../../app/home/page';
import { useRouter } from 'next/router';
import CoursePage from '../../app/[courseCode]/page';

test('Sidebar is present on the home page', () => {
    render(<Home />);
    const sidebar = screen.getByTestId('sidebar');
    expect(sidebar).toBeDefined();
});

test('Course cards are present on the home page', () => {
   
    const courseCards = screen.getAllByTestId('course-card');
    expect(courseCards.length).toBeGreaterThan(0);
});
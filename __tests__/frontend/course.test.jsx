import { test, expect } from 'vitest';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import CoursePage from '../../app/[courseCode]/page';

test('Sidebar component is present', async () => {
    render(<CoursePage />);
    await waitFor(() => expect(screen.findByTestId('sidebar-component')).toBeDefined());

});

test('CourseNavBar component is present', async () => {
    await waitFor(() => expect(screen.findByTestId('course-navbar')).toBeDefined());

});

test('CourseHomeView component is present', async () => {
    await waitFor(() => expect(screen.findByTestId('course-homeview')).toBeDefined());
});
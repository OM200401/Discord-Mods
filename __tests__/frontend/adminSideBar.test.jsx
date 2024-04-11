import { test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import AdminSidebar from '../../app/components/AdminSidebar'

test('Navigation bar is present', () => {
    render(<AdminSidebar userName="John" />);
    const nav = screen.getByRole('navigation')
    expect(nav).toBeDefined()
})

test('Dashboard link is present', () => {
  
    const dashboardLink = screen.getByText(/Dashboard/i);
    expect(dashboardLink).toBeDefined();
    expect(dashboardLink.closest('a').getAttribute('href')).toBe('/admin');
});

test('Enrolments link is present', () => {

    const enrolmentsLink = screen.getByText(/Enrolments/i);
    expect(enrolmentsLink).toBeDefined();
    expect(enrolmentsLink.closest('a').getAttribute('href')).toBe('/enrolments');
});

test('Add Course link is present', () => {

    const addCourseLink = screen.getByText(/Add Course/i);
    expect(addCourseLink).toBeDefined();
    expect(addCourseLink.closest('a').getAttribute('href')).toBe('/addCourse');
});

test('Profile link is present', () => {

    const profileLink = screen.getByText(/Profile/i);
    expect(profileLink).toBeDefined();
    expect(profileLink.closest('a').getAttribute('href')).toBe('/profile');
});


import { test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Sidebar from '../../app/components/Sidebar'

test('Sidebar is present', () => {
    render(<Sidebar />)
    const sidebar = screen.getByRole('navigation')
    expect(sidebar).toBeDefined()
})

test('E-Learning Platform link is present', () => {
    const platformLink = screen.getByText(/E-Learning Platform/i)
    expect(platformLink).toBeDefined()
    expect(platformLink.closest('a').getAttribute('href')).toBe('/')
})

test('Dashboard link is present', () => {
    const homeLink = screen.getByText(/Dashboard/i)
    expect(homeLink).toBeDefined()
    expect(homeLink.closest('a').getAttribute('href')).toBe('/home')
})

test('Courses link is present', () => {
    const homeLink = screen.getByText(/Browse/i)
    expect(homeLink).toBeDefined()
    expect(homeLink.closest('a').getAttribute('href')).toBe('/browseCourses')
})

test('Assignments link is present', () => {
    const homeLink = screen.getByText(/Assignments/i) 
    expect(homeLink).toBeDefined()
    expect(homeLink.closest('a').getAttribute('href')).toBe('/assignments')
})

test('Grades link is present', () => {
    const homeLink = screen.getByText(/Grades/i)
    expect(homeLink).toBeDefined()
    expect(homeLink.closest('a').getAttribute('href')).toBe('/grades')
})

test('Profile link is present', () => {
    const homeLink = screen.getByText(/Profile/i)
    expect(homeLink).toBeDefined()
    expect(homeLink.closest('a').getAttribute('href')).toBe('/profile')
})

test('Sign Out link is present', () => {
    const homeLink = screen.getByText(/Sign Out/i)
    expect(homeLink).toBeDefined()
    expect(homeLink.closest('a').getAttribute('href')).toBe('/login')
})
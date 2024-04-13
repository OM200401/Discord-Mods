import { test, expect } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import Sidebar from '../../app/views/Sidebar'

test('Sidebar is present', () => {
    render(<Sidebar userType={"Teacher"}/>)
    const sidebar = screen.getByRole('navigation') 
    expect(sidebar).toBeDefined()
})

test('E-Learning Platform link is present', () => { 
    const platformLink = screen.getByText(/Discourse/i)
    expect(platformLink).toBeDefined()
    expect(platformLink.closest('a').getAttribute('href')).toBe('/')
})

test('Dashboard link is present for teacher', () => {
    const homeLink = screen.getByText(/Dashboard/i)
    expect(homeLink).toBeDefined() 
    expect(homeLink.closest('a').getAttribute('href')).toBe('/home')
    cleanup()
})

test('Dashboard link is present for student', () => {
    render(<Sidebar userType="student" />)
    const homeLink = screen.getByText(/Dashboard/i)
    expect(homeLink).toBeDefined() 
    expect(homeLink.closest('a').getAttribute('href')).toBe('/stuHome')
})

test('Courses link is present', () => {
    const homeLink = screen.getByText(/Browse/i)
    expect(homeLink).toBeDefined()
    expect(homeLink.closest('a').getAttribute('href')).toBe('/browseCourses')
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
import { test,expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import NavBar from '../../app/views/Navbar'

test('Settings link is present', () => {
    render(<NavBar />)
    const settingsLink = screen.getByText(/Settings/i)
    expect(settingsLink).toBeDefined()
    expect(settingsLink.closest('a').getAttribute('href')).toBe('/test')
})

test('Login link is present', () => {
    const loginLink = screen.getByText(/Sign Up/i)
    expect(loginLink).toBeDefined()
    expect(loginLink.closest('a').getAttribute('href')).toBe('/signup')
})

test('Profile link is present', () => {
    const profileLink = screen.getByText(/Profile/i)
    expect(profileLink).toBeDefined()
    expect(profileLink.closest('a').getAttribute('href')).toBe('/profile')
})
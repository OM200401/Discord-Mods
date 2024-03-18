import { test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Signup from '../app/signup/page'

test('Signup form is present', () => {
    render(<Signup />)
    const form = screen.getByTestId('signup-form')
    expect(form).toBeDefined()
})

test('First name input is present', () => {
    const firstNameInput = screen.getByLabelText(/First Name/i)
    expect(firstNameInput).toBeDefined()
})

test('Last name input is present', () => {
    const lastNameInput = screen.getByLabelText(/Last Name/i)
    expect(lastNameInput).toBeDefined()
})

test('Email input is present', () => {
    const emailInput = screen.getByLabelText(/Email/i)
    expect(emailInput).toBeDefined()
})

test('Password input is present', () => {
    const passwordInput = screen.getByLabelText("Password")
    expect(passwordInput).toBeDefined()
})

test('Confirm password input is present', () => {
    const confirmPasswordInput = screen.getByLabelText("Confirm Password")
    expect(confirmPasswordInput).toBeDefined()
})

test('User type input is present', () => {
    const userTypeInput = screen.getByLabelText(/User Type/i)
    expect(userTypeInput).toBeDefined()
})
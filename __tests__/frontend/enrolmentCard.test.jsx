import { test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import EnrolmentCard from '../../app/views/EnrolmentCard'

test('EnrolmentCard renders correctly', () => {
    render(<EnrolmentCard userEmail="test@example.com" courseCode="CS101" />)
    const enrolmentCard = screen.getByTestId('enrolment-card')
    expect(enrolmentCard).toBeDefined()
})

test('User email is present', () => {
    const userEmail = screen.getByText(/test@example.com/i)
    expect(userEmail).toBeDefined()
})

test('Course code is present', () => {
    const courseCode = screen.getByText(/CS101/i)
    expect(courseCode).toBeDefined()
})

test('Accept button is present', () => {
    const acceptButton = screen.getByText(/Accept/i)
    expect(acceptButton).toBeDefined()
})

test('Reject button is present', () => {
    const rejectButton = screen.getByText(/Reject/i)
    expect(rejectButton).toBeDefined()
})
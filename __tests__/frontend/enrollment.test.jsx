import { test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Enrolments from '../../app/enrolments/page'
import EnrolmentCard from '../../app/components/EnrolmentCard'

const EnrolmentCardWrapper = () => (
    <EnrolmentCard userEmail="test@example.com" courseCode="TEST123" />
)


test('Enrolments page renders correctly', () => {
    render(<Enrolments />)
    const enrolmentsPage = screen.getByTestId('adminSidebar-component')
    expect(enrolmentsPage).toBeDefined()
})

test('Manage Enrolments header is present', () => {
    const header = screen.getByText(/Manage Enrolments/i)
    expect(header).toBeDefined()
})

test('EnrolmentCard component is present', async () => {
    render(<EnrolmentCardWrapper />)
    const enrolmentCard = await screen.findByTestId('enrolment-card')
    expect(enrolmentCard).toBeDefined()
})
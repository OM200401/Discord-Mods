import { test, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Assignments from '../../app/[courseCode]/grades/page'

test('Assignments page renders correctly', () => {
    render(<Assignments />)
    
    const courseHeading = screen.getByTestId('course-heading')
    expect(courseHeading).toBeDefined()

    const assignmentsHeading = screen.getByTestId('assignments-heading')
    expect(assignmentsHeading).toBeDefined()

    const students = screen.getAllByText(/doe/i)
    expect(students).toHaveLength(2)
})

test('Clicking on the chevron button toggles assignment visibility', async () => {
    
    const chevronButton = screen.getAllByRole('button')[0]
    fireEvent.click(chevronButton)

    const assignment = await screen.findByText('Assignment 1: 90')
    expect(assignment).toBeDefined()
})

test('Changing the grade updates the grade', async () => {
    
    const chevronButton = screen.getAllByRole('button')[0]
    fireEvent.click(chevronButton)

    const gradeInput = await screen.findByDisplayValue('65')
    fireEvent.change(gradeInput, { target: { value: '95' } })

    expect(gradeInput.value).toBe('95')
})
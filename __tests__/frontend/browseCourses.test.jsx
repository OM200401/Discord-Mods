import { test, expect } from 'vitest'
import { cleanup, render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import Courses from '../../app/browseCourses/testPage'

test('Courses page renders correctly', async () => {
    render(<Courses />)
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'), { timeout: 6000});

    
    const coursesHeading = screen.getByText('Courses')
    expect(coursesHeading).toBeDefined()

    const courseCards = screen.getByTestId("course-card")
    expect(courseCards).toBeDefined()
}) 

test('Course cards have correct course codes', () => {
    const courseCodes = screen.getAllByText(/COSC\d{3}/)
    expect(courseCodes).toHaveLength(8)
}) 
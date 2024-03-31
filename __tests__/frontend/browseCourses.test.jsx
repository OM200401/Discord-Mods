import { test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Courses from '../../app/browseCourses/page'

test('Courses page renders correctly', () => {
    render(<Courses />)
    
    const coursesHeading = screen.getByText('Courses')
    expect(coursesHeading).toBeDefined()

    const courseCards = screen.getByTestId("course-card")
    expect(courseCards).toBeDefined()
})

test('Course cards have correct course codes', () => {
    
    const courseCodes = screen.getAllByText(/COSC\d{3}/)
    expect(courseCodes).toHaveLength(8)
})
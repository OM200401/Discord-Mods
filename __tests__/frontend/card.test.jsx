import { test, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Card from '../../app/components/BrowseCard'

test('Card component renders correctly', () => {
    const courseCode = 'CS101'
    const courseName = 'Computer Science 101'
    render(<Card courseCode={courseCode} courseName={courseName} />)
    
    const courseCodeElement = screen.getByText(courseCode)
    expect(courseCodeElement).toBeDefined()

    const courseNameElement = screen.getByText(courseName)
    expect(courseNameElement).toBeDefined()

    const buttonElement = screen.getByText('See more')
    expect(buttonElement).toBeDefined()

    const linkElement = screen.getByText('See more')
    expect(linkElement).toBeDefined()
    expect(linkElement.closest('a').getAttribute('href')).toBe(`/browseCourses/${courseCode}`)
})


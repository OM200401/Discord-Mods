import { test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import CourseNavBar from '../../app/views/CourseNavBar'

test('Navigation bar is present', () => {
    render(<CourseNavBar />) 
    const nav = screen.getByRole('navigation')
    expect(nav).toBeDefined()
})

test('Home link is present', () => {
    const homeLink = screen.getByText(/Home/i)
    expect(homeLink).toBeDefined()
    expect(homeLink.closest('a').getAttribute('href')).toBe('/undefined')
})

test('Assignments link is present', () => {
    const assignmentsLink = screen.getByText(/Assignments/i)
    expect(assignmentsLink).toBeDefined()
    expect(assignmentsLink.closest('a').getAttribute('href')).toBe('/undefined/assignments')
})
 
test('Quizzes link is present', () => {
    const quizzesLink = screen.getByText(/Quiz/i)
    expect(quizzesLink).toBeDefined()
    expect(quizzesLink.closest('a').getAttribute('href')).toBe('/undefined/quiz')
})

test('Grades link is present', () => {
    const gradesLink = screen.getByText(/Grades/i)
    expect(gradesLink).toBeDefined()
    expect(gradesLink.closest('a').getAttribute('href')).toBe('/undefined/grades')
})
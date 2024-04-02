import { test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import AddCoursePage from '../../app/addCourse/page' 

test('AddCoursePage renders sidebar correctly', async () => {
    render(<AddCoursePage />)
    const addCoursePage = await screen.getByTestId('adminSidebar-component')
    expect(addCoursePage).toBeDefined()
})

test('Add Course header is present', () => {
    const header = screen.getAllByText(/Add Course/i)
    expect(header).toBeDefined()
})

test('Course Code input is present', () => {
    const courseCodeInput = screen.getByLabelText(/Course Code:/i)
    expect(courseCodeInput).toBeDefined()
})

test('Course Name input is present', () => {
    const courseNameInput = screen.getByLabelText(/Course Name:/i)
    expect(courseNameInput).toBeDefined()
})

test('Description input is present', () => {
    const descriptionInput = screen.getByLabelText(/Description:/i)
    expect(descriptionInput).toBeDefined()
})

test('Teacher select is present', () => {
    const teacherSelect = screen.getByLabelText(/Teacher:/i)
    expect(teacherSelect).toBeDefined()
})

test('Submit button is present', () => {
    const submitButton = screen.getByText(/Submit/i)
    expect(submitButton).toBeDefined()
})
import { test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import CourseCard from '../app/components/CourseCard'

const course = {
    courseCode: 'COSC101',
    courseName: 'Introduction to Computer Science',
    imageUrl: '/public/COSC101.jpeg'
}

test('Course image is present', () => {
    render(<CourseCard courseCode={course.courseCode} courseName={course.courseName} imageUrl={course.imageUrl} />)
    const image = screen.getByAltText(course.courseName)
    expect(image).toBeDefined()
})

test('Course code is present', () => {
    const courseCode = screen.getByText(course.courseCode)
    expect(courseCode).toBeDefined()
})

test('Course name is present', () => {
    const courseName = screen.getByText(course.courseName)
    expect(courseName).toBeDefined()
})
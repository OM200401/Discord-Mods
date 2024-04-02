import { test, expect } from 'vitest'
import { cleanup, render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import Courses from '../../app/browseCourses/page'
import CourseCard from '../../app/components/CourseCard';

// Mock data
const mockCourseData = [
    { id: '1', courseCode: 'COSC304', courseName: 'Course 1', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_gaZXWjn_qJVUXTVnHnGIPRka3psRSJgShg&usqp=CAU' },
    { id: '2', courseCode: 'COSC341', courseName: 'Course 2', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_gaZXWjn_qJVUXTVnHnGIPRka3psRSJgShg&usqp=CAU' },
    // Add more dummy courses if needed
]

test('Courses page renders correctly', async () => {
    render(<Courses />)
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'), { timeout: 6000});

    
    const coursesHeading = screen.getByText('Courses')
    expect(coursesHeading).toBeDefined()

    const courseCards = screen.getByTestId("course-card")
    expect(courseCards).toBeDefined()
    cleanup()
}) 

test('Course cards have correct course codes', () => {
    // Render the CourseCard component with each item in mockCourseData
    mockCourseData.forEach(course => {
        render(<CourseCard courseCode={course.courseCode} courseName={course.courseName} imageUrl={course.imageUrl} />);
    });
    
    const courseCodes = screen.getAllByText(/COSC\d{3}/)
    expect(courseCodes).toHaveLength(2)
    cleanup()
}) 
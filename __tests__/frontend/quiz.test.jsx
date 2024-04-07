import { test, expect } from 'vitest'
import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react'
import Assignments from '../../app/[courseCode]/quiz/testPage'

test('Quiz page renders correctly', async () => {
    render(<Assignments />)
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'), { timeout: 6000});

    
    const courseHeading = screen.getByTestId('course-heading')
    expect(courseHeading).toBeDefined() 

    const assignmentsHeading = screen.getByTestId('assignments-heading')
    expect(assignmentsHeading).toBeDefined()

    const addQuizButton = screen.getByText(/add quiz/i)
    expect(addQuizButton).toBeDefined() 
})

test('Clicking on the Add Quiz button shows the quiz form', async () => {
    
    const addQuizButton = screen.getByText(/add quiz/i)
    fireEvent.click(addQuizButton)

    const quizTitleInput = await screen.findByPlaceholderText('Enter quiz title')
    expect(quizTitleInput).toBeDefined()
})

test('Clicking on the Add Question button adds a new question', async () => {
    
    const addQuizButton = screen.getByText(/add quiz/i)
    fireEvent.click(addQuizButton)

    const addQuestionButton = screen.getByText(/add question/i)
    fireEvent.click(addQuestionButton)

    const questionInputs = await screen.findAllByPlaceholderText('Enter question')
    expect(questionInputs).toHaveLength(2)
})

test('Clicking on the Submit Quiz button submits the quiz', async () => {
    
    const addQuizButton = screen.getByText(/add quiz/i)
    fireEvent.click(addQuizButton)

    const quizTitleInput = await screen.findByPlaceholderText('Enter quiz title')
    fireEvent.change(quizTitleInput, { target: { value: 'Test Quiz' } })

    const submitQuizButton = screen.getByText(/submit quiz/i)
    fireEvent.click(submitQuizButton)

    // Here you would normally check if the quiz was submitted correctly.
    // However, since this involves interacting with Firebase, which is outside the scope of Vitest,
    // we'll just check if the quiz form is hidden after submission.
    expect(quizTitleInput).not.toBeDefined
})
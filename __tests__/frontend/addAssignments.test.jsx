import { test, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Assignments from '../../app/[courseCode]/addAssignments/page'

test('Assignments page renders correctly', () => {
  render(<Assignments />)
  
  const courseHeading = screen.getByTestId('course-heading')
  expect(courseHeading).toBeDefined()

  const assignmentsHeading = screen.getByTestId('assignments-heading')
  expect(assignmentsHeading).toBeDefined()

  const addQuizButton = screen.getByText('Add Quiz')
  expect(addQuizButton).toBeDefined()

  const addEssayButton = screen.getByText('Add Essay')
  expect(addEssayButton).toBeDefined()

  const addQuestionButton = screen.getByText('Add Question')
  expect(addQuestionButton).toBeDefined()
})

test('Clicking "Add Quiz" button shows quiz form', () => {
  
  const addQuizButton = screen.getByText('Add Quiz')
  fireEvent.click(addQuizButton)

  const quizTitleInput = screen.getByLabelText('Quiz Title:')
  expect(quizTitleInput).toBeDefined()

  const weightageInput = screen.getByLabelText('Weightage of the quiz in the course:')
  expect(weightageInput).toBeDefined()

  const submitQuizButton = screen.getByText('Submit Quiz')
  expect(submitQuizButton).toBeDefined()
})

test('Clicking "Add Essay" button shows essay form', () => {
  
  const addEssayButton = screen.getByText('Add Essay')
  fireEvent.click(addEssayButton)

  const essayTitleInput = screen.getByLabelText('Essay Title:')
  expect(essayTitleInput).toBeDefined()

  const questionPromptInput = screen.getByLabelText('Question Prompt:')
  expect(questionPromptInput).toBeDefined()

  const weightageInput = screen.getByLabelText('Weightage of the essay in the course:')
  expect(weightageInput).toBeDefined()

  const submitQuizButton = screen.getByText('Submit Quiz')
  expect(submitQuizButton).toBeDefined()
})
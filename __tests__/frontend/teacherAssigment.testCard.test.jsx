import { test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TeacherAssignmentCard from '../../app/views/TeacherAssignmentCard';


const assignment = {
    name: 'Assignment 1',
    weightage: 10,
    dueDate: '2025-04-10', 
  };
  const courseCode = 'COSC320';



test('teacherAssignmentCard are present on the assignment page', async () => {
    render(<TeacherAssignmentCard assignment={assignment} courseCode={courseCode}/>);
    const name = screen.getByText(assignment.name);
    expect(name).toBeDefined(); 
});

test('teacherAssignmentCard weightage is presented', async () => {
    const weightage = screen.getByText(/Weightage:\s*10/i); // Match the weightage text within the specific paragraph
    expect(weightage).toBeDefined(); 
});


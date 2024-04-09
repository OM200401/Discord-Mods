import { test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import StudentAssignmentCard from '../../app/components/StudentAssignmentCard';


const assignment = {
    name: 'Assignment 1',
    weightage: 10,
    dueDate: '2024-04-10', 
  };
  const courseCode = 'COSC320';



test('studentAssignmentCard are present on the assignment page', async () => {
    render(<StudentAssignmentCard assignment={assignment} courseCode={courseCode}/>);
    const name = screen.getByText(assignment.name);
    expect(name).toBeDefined(); 
});

test('studentAssignmentCard weightage is presented', async () => {
    const weightage = screen.getByText(/Weightage:\s*10/i); // Match the weightage text within the specific paragraph
    expect(weightage).toBeDefined(); 
});


test('studentAssignmentCard dueDate is presented', async () => {
    const dueDate = screen.getByText(new RegExp(assignment.dueDate, 'i')); // Case insensitive match
    expect(dueDate).toBeDefined(); 
});
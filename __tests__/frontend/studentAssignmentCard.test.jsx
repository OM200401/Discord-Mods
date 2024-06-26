import { test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import StudentAssignmentCard from '../../app/views/StudentAssignmentCard';


const assignment = {
    name: 'chicago',
    weightage: 25,
    dueDate: '2024-04-14', 
  };
  const courseCode = 'COSC304';

 

test('studentAssignmentCard are present on the assignment page', async () => {
    render(<StudentAssignmentCard assignment={assignment} courseCode={courseCode}/>);
    const name = screen.getByText(assignment.name);
    expect(name).toBeDefined(); 
});

test('studentAssignmentCard weightage is presented', async () => {
    const weightage = screen.getByText(/Weightage:\s*25/i); // Match the weightage text within the specific paragraph
    expect(weightage).toBeDefined(); 
});


test('studentAssignmentCard dueDate is presented', async () => {
    const dueDate = screen.getByText(new RegExp(assignment.dueDate, 'i')); // Case insensitive match
    expect(dueDate).toBeDefined(); 
});
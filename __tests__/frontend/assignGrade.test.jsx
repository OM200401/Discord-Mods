import { test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import AssignGrade from '../../app/[courseCode]/assignGrade/[name]/[studentUid]/testPage'


test('Assignments page render sidebar', () => {
    render(<AssignGrade name="regan" courseCode="COSC304" studentUid="1" />);
    const sidebar = screen.getByTestId('sidebar');
    expect(sidebar).toBeDefined();
});


test('Assignments page rendering navbarpart correctly', () => {
   
    const container = screen.getByTestId('navBar');
    expect(container).toBeDefined();
});



test('Assignments page rendering the course Heading part correctly', () => {
   
    const course = screen.getByTestId('course-heading');
    expect(course).toBeDefined();
});

test('Assignments page rendering the assignment Heading part correctly', () => {
   
    const assignment = screen.getByTestId('assignments-heading');
    expect(assignment).toBeDefined();
});


test('Assignments page rendering essay part correctly', () => {

    const essay = screen.getByTestId('essay');
    expect(essay).toBeDefined();
});



test('Assignments page rendering project part correctly', () => {
   
    const project = screen.getByTestId('project');
    expect(project).toBeDefined();
});


test('Assignments page rendering presentation part correctly', () => {
   
    const presentation = screen.getByTestId('presentation');
    expect(presentation).toBeDefined();
});



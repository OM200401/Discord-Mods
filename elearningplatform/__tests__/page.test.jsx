import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import Home from '../app/page';

test('Home page renders without crashing', () => {
  const { container } = render(<Home />);
  
  // Check if the page renders without crashing
  expect(container).toBeTruthy();
});

test('Home page contains expected content', () => {
  const { getByText } = render(<Home />);
  
  // Check if the page contains the expected heading text
  const heading = getByText(/Welcome to our E-Learning Platform/i);
  expect(heading).toBeTruthy();
  
  // Check if the page contains the expected paragraph text
  const paragraph = getByText(/Join us and explore the world of knowledge./i);
  expect(paragraph).toBeTruthy();
});

test('Navbar is present', () => {
  const { getByTestId } = render(<Home />);
  
  // Fetches the Navbar component using the data-testid attribute
  const navbar = getByTestId('navbar');
  expect(navbar).toBeTruthy();
});

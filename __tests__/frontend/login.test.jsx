import { expect, test } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from '../../app/login/page';
import {RouterMock} from 'next-router-mock';

test('Navbar component is present', () => {
    render(<RouterMock> <LoginPage /> </RouterMock>);
    const navbar = screen.getByTestId('navbar');
    expect(navbar).toBeDefined();
});

test('Page contains the expected heading text', () => {
    const heading = screen.getByRole('heading', { name: /Login/i });
    expect(heading).toBeDefined();
});



test('Page contains the expected paragraph text', () => {
    const paragraph = screen.getByText(/Enter your credentials to access your account./i);
    expect(paragraph).toBeDefined();
});




test('Email input field is present', () => {
  
    const emailInputs = screen.getAllByPlaceholderText('Email');
    const emailInput = emailInputs.find(input => input.getAttribute('type') === 'email');
    expect(emailInput).toBeTruthy(); 
});


test('Password input field is present', () => {
    const passwordInputs = screen.getAllByPlaceholderText('Password');
    const passwordInput = passwordInputs.find(input => input.getAttribute('type') === 'password');
    expect(passwordInput).toBeTruthy(); 
});



test('Login button is present', () => {
   
    const loginButtons = screen.getAllByRole('button', { name: /Login/i });
    const loginButton = loginButtons.find(button => button.tagName.toLowerCase() === 'button');
    expect(loginButton).toBeDefined();
});


test('Don\'t have an account? Sign up link is present', () => {
 
    const signUpLinks = screen.getAllByText(/Sign up/i);
    const signUpLink = signUpLinks.find(link => link.tagName.toLowerCase() === 'a');
    expect(signUpLink).toBeDefined();
});

test('signup page leads to the correct page', () => {
    const signUpLinks = screen.getAllByText(/Sign up/i);
    const signUpLink = signUpLinks.find(link => link.tagName.toLowerCase() === 'a');
    expect(signUpLink).toBeDefined();
    expect(signUpLink.closest('a').getAttribute('href')).toBe('/signup')
});
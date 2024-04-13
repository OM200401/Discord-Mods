import { expect, test } from 'vitest';
import sinon from 'sinon';
import * as nextRouter from 'next/router';
import {cleanup, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import Profile from '../../app/profile/testPage';
//import Sidebar from '../../components/Sidebar';




test('Input fields are rendered correctly', () => {
    render(<Profile/>)
    const firstNameInput = screen.getByTestId('firstNameField');
    const lastNameInput = screen.getByTestId('lastNameField');
    const emailInput = screen.getByTestId('EmailField');

    expect(firstNameInput.textContent).toBe('John');
    expect(lastNameInput.textContent).toBe('Doe');
    expect(emailInput.textContent).toBe('test@example.com');
});


// test('Renders input fields for user information', () => {

  
//     const firstNameInput = screen.getByTestId('firstNameFieldInput');
//     const lastNameInput = screen.getByTestId('lastNameFieldInput');
//     const emailInput = screen.getByTestId('emailFieldInput');
//     const currentPasswordInput = screen.getByTestId('currentPasswordFieldInput');
//     const newPasswordInput = screen.getByTestId('newPasswordFieldInput');
  
//     expect(firstNameInput).toBeInTheDocument();
//     expect(lastNameInput).toBeInTheDocument();
//     expect(emailInput).toBeInTheDocument();
//     expect(currentPasswordInput).toBeInTheDocument();
//     expect(newPasswordInput).toBeInTheDocument();
//   });





test('Sidebar component is present', async () => {
    
    const sidebar = screen.findByTestId('sidebar-component');
    expect(sidebar).toBeDefined();
});



test('Page contains expected profile title', () => {

    const title = screen.getByTestId('profile-heading'); 
    expect(title).toBeDefined();
});

test('Page contains expected User information sub heading', () => {
    const subHeader = screen.getByText(/User Information/i);
    expect(subHeader).toBeDefined();

});

test('Page contains expected personal details and application sub heading', () => {
    const text = screen.getByText(/Personal details and application./i);
    expect(text).toBeDefined();
});

test('Page contains expected First Name text', () => {
    const firstName = screen.getByText(/First Name/i);
    expect(firstName).toBeDefined();
});


test('Page contains expected Last Name text', () => {
    const lastName = screen.getByText(/Last Name/i);
    expect(lastName).toBeDefined();
});


test('Page contains expected Last Name text', () => {
    const Email = screen.getByText(/Email/i);
    expect(Email).toBeDefined();
});


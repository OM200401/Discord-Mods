// @ts-check
const { test, expect } = require('@playwright/test');

test('Sign up page is visible', async ({ page }) => {

  await page.goto('http://localhost:3000');   
  
  await expect(page).toHaveTitle('E-Learning Platform');

  // Click on the "Sign Up"
  await page.click('text=Sign Up');
  // The new URL should be "/signup"
  await page.waitForNavigation(); // Wait for navigation to complete
  await expect(page).toHaveURL('http://localhost:3000/signup');

});

test('Signup form submission', async ({ page }) => {
  await page.goto('http://localhost:3000/signup'); // Change the URL to match your signup page URL

  // Fill out the signup form
  await page.fill('input[type="text"]', 'John');
  await page.fill('input[type="text"]', 'Doe');
  await page.fill('input[type="email"]', 'johndoe1980@gmail.com');//Change for every test 
  await page.fill('input[type="password"]', '123456');
  await page.fill('input[type="password"]', '123456');
  // await page.selectOption('select', 'Student');

  // // Submit the form
  // await page.click('button[type=submit]');

  // // Add a delay to ensure redirection is completed
  // await page.waitForTimeout(10000); // Adjust the delay time as needed

  // // Check if the current URL is the admin page
  // const url = page.url();
  // expect(url).toBe('http://localhost:3000/stuHome');

//   // Expect successful signup redirection
//   await page.waitForNavigation();
//   await expect(page.url()).toContain('/stuHome'); // Change this based on your redirection logic
});

// test('signup form validation', async ({ page }) => {
//   await page.goto('http://localhost:3000/signup'); // Change the URL to match your signup page URL

//   // Submit the form without filling any fields
//   await page.click('button[type=submit]');

//   // Expect error message for empty fields
//   await expect(page).toHaveText('p', 'All fields are required');

//   // Fill out only the email field with an invalid email address
//   await page.fill('input[name=email]', 'invalid_email');

//   // Submit the form again
//   await page.click('button[type=submit]');

//   // Expect error message for invalid email format
//   await expect(page).toHaveText('p', 'The email address is not valid.');
// });


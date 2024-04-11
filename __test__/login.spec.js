import { test, expect } from '@playwright/test';

test('Student login working as intended', async ({ page }) => {
  test.setTimeout(150000);

  // Navigate to the index page
  await page.goto('http://localhost:3000/');
  
  // Click on "Get Started" to navigate to the login page
  await page.click('text=Get Started');

  //Wait for navigation to complete
  await page.waitForNavigation();  
  // Verify navigation to the login page
  await expect(page).toHaveURL('http://localhost:3000/login');

  // Fill in email and password 
  await page.fill('input[type="email"]', 'abcde@gmail.com');
  await page.fill('input[type="password"]', '123456');
  // Click on the login button
  await page.click('button:has-text("Login")');

  // // Wait for successful login and navigation to admin home page
  // await page.waitForNavigation();
  // await expect(page).toHaveURL('http://localhost:3000/admin');

  // Add a delay to ensure redirection is completed
  await page.waitForTimeout(10000); // Adjust the delay time as needed

  // Check if the current URL is the admin page
  const url = page.url();
  expect(url).toBe('http://localhost:3000/stuHome');

});

test('Teacher login working as intended', async ({ page }) => {
  test.setTimeout(150000);

  // Navigate to the index page
  await page.goto('http://localhost:3000/');
  
  // Click on "Get Started" to navigate to the login page
  await page.click('text=Get Started');

  //Wait for navigation to complete
  await page.waitForNavigation();  
  // Verify navigation to the login page
  await expect(page).toHaveURL('http://localhost:3000/login');

  // Fill in email and password 
  await page.fill('input[type="email"]', 'xyz@gmail.com');
  await page.fill('input[type="password"]', '123456');
  // Click on the login button
  await page.click('button:has-text("Login")');

  // // Wait for successful login and navigation to admin home page
  // await page.waitForNavigation();
  // await expect(page).toHaveURL('http://localhost:3000/admin');

  // Add a delay to ensure redirection is completed
  await page.waitForTimeout(10000); // Adjust the delay time as needed

  // Check if the current URL is the admin page
  const url = page.url();
  expect(url).toBe('http://localhost:3000/home');
});

test('Admin login working as intended', async ({ page }) => {
  test.setTimeout(150000);

  // Navigate to the index page
  await page.goto('http://localhost:3000/');
  
  // Click on "Get Started" to navigate to the login page
  await page.click('text=Get Started');

  //Wait for navigation to complete
  await page.waitForNavigation();  
  // Verify navigation to the login page
  await expect(page).toHaveURL('http://localhost:3000/login');

  // Fill in email and password 
  await page.fill('input[type="email"]', 'admintestnew@gmail.com');
  await page.fill('input[type="password"]', 'admintest');
  // Click on the login button
  await page.click('button:has-text("Login")');

  // // Wait for successful login and navigation to admin home page
  // await page.waitForNavigation();
  // await expect(page).toHaveURL('http://localhost:3000/admin');

  // Add a delay to ensure redirection is completed
  await page.waitForTimeout(10000); // Adjust the delay time as needed

  // Check if the current URL is the admin page
  const url = page.url();
  expect(url).toBe('http://localhost:3000/admin');
});
import { test, expect } from '@playwright/test';

test('should be able to enroll in a class', async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('http://localhost:3000/');
  // Find an element with the text 'Get Started' and click on it to navigate to the login page
  await page.click('text=Get Started');
  // The new URL should be "/login" (baseURL is used there)
  await page.waitForNavigation(); // Wait for navigation to complete
  await expect(page).toHaveURL('http://localhost:3000/login');

  // Input email and password and click on the login button
  await page.fill('input[type="email"]', 'abcd@gmail.com');
  await page.fill('input[type="password"]', '123456');
  await page.click('button', { text: 'Login' });

  // Optionally, you can add expectations to verify successful login
  // For example, you can expect to navigate to a certain page after successful login
  await page.waitForNavigation(); // Wait for navigation to complete
  await expect(page).toHaveURL('http://localhost:3000/stuHome');

  // Click on the "Browse" link
  await page.click('text=Browse');

  // The new URL should be "/browseCourses"
  await page.waitForNavigation(); // Wait for navigation to complete
  await expect(page).toHaveURL('http://localhost:3000/browseCourses');

  // Click on "See more" to view course details
  await page.click('text=See more');

  // Wait for navigation to complete
  await page.waitForNavigation();
  
  // The new URL should include the course code
  await expect(page).toHaveURL('http://localhost:3000/browseCourses/BIOL696'); 
});

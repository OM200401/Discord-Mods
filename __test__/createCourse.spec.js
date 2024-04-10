import { test, expect } from '@playwright/test';

test('admin should be able to create a course', async ({ page }) => {
  test.setTimeout(120000);

  // Navigate to the index page
  await page.goto('http://localhost:3000/');
  
  // Click on "Get Started" to navigate to the login page
  await page.click('text=Get Started');
  
  // Verify navigation to the login page
  await expect(page).toHaveURL('http://localhost:3000/login');

  // Fill in email and password and click on the login button
  await page.fill('input[type="email"]', 'admintestnew@gmail.com');
  await page.fill('input[type="password"]', 'admintest');
  await page.click('button', { text: 'Login' });

  // Wait for successful login and navigation to student home page
  await page.waitForNavigation();
  await expect(page).toHaveURL('http://localhost:3000/admin');

  // Click on the "Browse" link to navigate to the course browsing page
  await page.click('text=Add Course');
  
  // Wait for navigation to complete and route to the add course page
  await page.waitForNavigation();
  await expect(page).toHaveURL('http://localhost:3000/addCourse');
  
});

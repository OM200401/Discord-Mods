import { test, expect } from '@playwright/test';

test('should be able to enroll in a class', async ({ page }) => {
  test.setTimeout(120000);

  // Navigate to the index page
  await page.goto('http://localhost:3000/');
  
  // Click on "Get Started" to navigate to the login page
  await page.click('text=Get Started');
  
  // Verify navigation to the login page
  await expect(page).toHaveURL('http://localhost:3000/login');

  // Fill in email and password and click on the login button
  await page.fill('input[type="email"]', 'endtoend@gmail.com');
  await page.fill('input[type="password"]', '123456');
  await page.click('button', { text: 'Login' });

  // Wait for successful login and navigation to student home page
  await page.waitForNavigation();
  await expect(page).toHaveURL('http://localhost:3000/stuHome');

  // Click on the "Browse" link to navigate to the course browsing page
  await page.click('text=Browse');
  
  // Verify navigation to the course browsing page
  await expect(page).toHaveURL('http://localhost:3000/browseCourses');

  // Click on "See more" to view course details
  // Find the course with the title 'BIOL696' and click on the 'See more' button within it
  await page.click('text=See more');
  
  // Wait for navigation to complete
  await page.waitForNavigation();
  
  // The new URL should include the course code in the course details page
  await expect(page.url()).toContain('/browseCourses/BIOL696'); 
});

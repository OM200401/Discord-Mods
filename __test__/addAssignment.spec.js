import { test, expect } from '@playwright/test';

test('Teachers should be able to add assignments', async ({ page }) => {
  test.setTimeout(120000);

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

  // Wait for successful login and navigation to student home page
  // Add a delay to ensure redirection is completed
  await page.waitForTimeout(10000); // Adjust the delay time as needed
  const url = page.url();
  expect(url).toBe('http://localhost:3000/home');

  // Click on the COSC304 course to navigate to the course details page
  await page.click('text=COSC304');
  
  // Verify navigation to the course page
  await expect(page).toHaveURL('http://localhost:3000/COSC304');

  // Click on "assignments" to view as
  await page.click('text=Assignments');
  
  // Wait for navigation to complete
  await page.waitForNavigation();
  
  // The new URL should include the assignments page
  await expect(page).toHaveURL('http://localhost:3000/COSC304/assignments'); 

  // Click on the "Add" button to add assignment
  await page.click('text=Add');      
                                               

});

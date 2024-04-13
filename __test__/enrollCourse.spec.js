import { test, expect } from '@playwright/test';

test('Students should be able to request to enroll for a course', async ({ page }) => {
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
  await page.fill('input[type="email"]', 'abcde@gmail.com');
  await page.fill('input[type="password"]', '123456');
  // Click on the login button
  await page.click('button:has-text("Login")');

  // Wait for successful login and navigation to student home page
  // Add a delay to ensure redirection is completed
  await page.waitForTimeout(10000); // Adjust the delay time as needed
  
  const url = page.url();
  expect(url).toBe('http://localhost:3000/stuHome');

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

  // Click on the "Request to Enroll" button to enroll in the course
  await page.click('text=Request to Enroll');       
  
  // Wait for the alert to appear
  await page.waitForTimeout(5000);
  // Check if the alert message of user already being enrolled is displayed
  expect(await page.isVisible('text=User already enrolled in course')).toBeTruthy();
  //This message won't appear if the user is not already enrolled in the course
  

});

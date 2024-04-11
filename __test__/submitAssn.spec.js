import { test, expect } from '@playwright/test';

test('Students should be able to submit an assignment', async ({ page }) => {
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

  // Click on "COSC304" to navigate to the course page
  await page.click('text=COSC304');
  
  // Verify navigation to the course page
  await expect(page).toHaveURL('http://localhost:3000/stu/COSC304');

  // Click on "assignments" to view assignments
  await page.click('text=Assignments');
  
  // Wait for navigation to complete
  await page.waitForNavigation();
  
  // The new URL should include the list of assignmnents
  await expect(page).toHaveURL('http://localhost:3000/stu/COSC304/assignments'); 

  // Click on the "start" button to start the assignment
  await page.click('text=Start');      
  
  //This will navigate you to the specific assignment where you can submit
  page.getByText('Sumbit Quiz');

});

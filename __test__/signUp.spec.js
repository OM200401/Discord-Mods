import { test, expect } from '@playwright/test';

test('should be able to sign up', async ({ page }) => {
    test.setTimeout(120000);
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto('http://localhost:3000/');
    // Find an element with the text 'Get Started' and click on it to navigate to the login page
    await page.click('text=Get Started');
    // The new URL should be "/login" (baseURL is used there)
    await page.waitForNavigation(); // Wait for navigation to complete
    await expect(page).toHaveURL('http://localhost:3000/login');
    
    // Click on the "Sign Up" link
    await page.click('text=Sign Up');
    // The new URL should be "/signup"
    await page.waitForNavigation(); // Wait for navigation to complete
    await expect(page).toHaveURL('http://localhost:3000/signup');

    // Input firstName, lastName, email, password, confirmPassword and userType
    await page.fill('input[type="input"]', 'John');
    await page.fill('input[type="input"]', 'Doe');
    await page.fill('input[type="email"]', 'johndoe@gmail.com');
    await page.fill('input[type="password"]', '123456');
    await page.fill('input[type="password"]', '123456');
    await page.selectOption('select', 'Student');
    await page.click('button', { text: 'Sign Up' });
    
    // // Wait for course card to render
    // await page.waitForSelector('[data-testid="course-card"]');       
    // // The new URL should be "/home"
    // await expect(page).toHaveURL('http://localhost:3000/home');
    // const url = page.url();
    // expect(url).not.toMatch('http://localhost:3000/signup'); 

});

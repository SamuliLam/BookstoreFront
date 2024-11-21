import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

test.describe('Update profile', () => {
    // eslint-disable-next-line no-undef
    const email = process.env.LOGIN_EMAIL;
    // eslint-disable-next-line no-undef
    const password = process.env.LOGIN_PASSWORD;

    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173/login');

        await page.fill('#email', email);
        await page.fill('#password', password);
        await page.click('button[type="submit"]');

        await page.waitForURL('http://localhost:5173/', { timeout: 60000 });
    });

    test('should update profile successfully', async ({ page }) => {
        await page.goto('http://localhost:5173/profile');

        // Fill in the profile update form
        await page.fill('#first_name', 'New first name');
        await page.fill('#last_name', 'New last name');
        await page.click('button[type="submit"]');

        // Log to check if the form submission is successful
        console.log('Form submitted');

        // Increase the timeout for waiting for the success message
        await page.waitForSelector('.bg-green-100.text-green-800', { timeout: 90000 });

        // Verify the success message
        const successMessage = await page.textContent('.bg-green-100.text-green-800');
        expect(successMessage).toContain('Profile updated successfully');
    });
});
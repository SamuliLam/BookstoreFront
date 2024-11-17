// tests/admin-login.spec.js
import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

test.describe('Admin Login Tests', () => {

    const email = process.env.LOGIN_EMAIL;
    const password = process.env.LOGIN_PASSWORD;

    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173/login');
    });

    test('Click on login button redirects to /login', async ({ page }) => {
        await page.click('.login-button');
        expect(page.url()).toBe('http://localhost:5173/login');
    });

    test('Fill one input field and press login shows "Please fill out this field"', async ({ page }) => {
        await page.fill('#email', 'admin@example.com');
        await page.click('#login-form-submit');
        const passwordInput = await page.locator('#password');
        const validationMessage = await passwordInput.evaluate((input) => input.validationMessage);
        expect(validationMessage).toBe('Please fill in this field.');
    });

    test('Fill input fields with admin credentials', async ({ page }) => {
        await page.fill('#email', 'admin@example.com');
        await page.fill('#password', 'adminpassword');
        const emailInput = await page.inputValue('#email');
        const passwordInput = await page.inputValue('#password');
        expect(emailInput).toBe('admin@example.com');
        expect(passwordInput).toBe('adminpassword');
    });

    test('Press login button shows success message and redirects to /', async ({ page }) => {
        await page.fill('#email', email);
        await page.fill('#password', password);
        await page.click('#login-form-submit');

        const successMessage = await page.locator('#success-message');
        await expect(successMessage).toBeVisible();

        await page.waitForURL('http://localhost:5173/', { timeout: 60000 });


        expect(page.url()).toBe('http://localhost:5173/');
    });

});
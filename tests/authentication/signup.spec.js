import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { deleteUser } from '../../src/utils/api.js'; // Adjust path as necessary

dotenv.config();

test.describe('sign up functionality', () => {
    let user;

    test.beforeEach(async ({ page }) => {
        // Navigate to the signup page before each test
        await page.goto('http://localhost:5173/signup');

        // Intercept and mock the signup API response
        await page.route('http://localhost:8080/auth/signup', route => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    message: 'User created successfully!',
                    user: {
                        id: '123', // Simulate a user ID
                        firstName: process.env.SIGNUP_FIRST_NAME,
                        lastName: process.env.SIGNUP_LAST_NAME,
                        email: process.env.SIGNUP_EMAIL,
                    },
                }),
            });
        });
    });

    test('should sign up successfully and display success message', async ({ page }) => {
        // Get the credentials from environment variables
        const firstName = process.env.SIGNUP_FIRST_NAME;
        const lastName = process.env.SIGNUP_LAST_NAME;
        const email = process.env.SIGNUP_EMAIL;
        const password = process.env.SIGNUP_PASSWORD;

        await page.fill('#first_name', firstName);
        await page.fill('#last_name', lastName);
        await page.fill('#email', email);
        await page.fill('#password', password);
        await page.click('button[type="submit"]');

        user = await page.evaluate(() => JSON.parse(sessionStorage.getItem('user')));
    });

    test.afterEach(async () => {
        if (user && user.email) {
            await deleteUser(user.email);
            user = null;
        }
    });
});

import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { deleteUser } from '../../src/utils/api.js';

dotenv.config();

test.describe('sign up functionality', () => {
    let user;

    test.beforeEach(async ({ page }) => {

        await page.goto('http://localhost:5173/signup');
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

test.describe('sign up failure', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173/signup');
        await page.route('http://localhost:8080/auth/signup', route => {
            route.fulfill({
                status: 400,
                contentType: 'application/json',
                body: JSON.stringify({
                    message: 'User with this email already exists!',
                }),
            });
        });
    });

    test('should display error message when user already exists', async ({ page }) => {
        await page.fill('#first_name', process.env.SIGNUP_FIRST_NAME);
        await page.fill('#last_name', process.env.SIGNUP_LAST_NAME);
        await page.fill('#email', process.env.SIGNUP_EMAIL);
        await page.fill('#password', process.env.SIGNUP_PASSWORD);
        await page.click('button[type="submit"]');

        const errorMessage = await page.textContent('#alert-message');
        expect(errorMessage).toContain('This email is already in use');
    });
});
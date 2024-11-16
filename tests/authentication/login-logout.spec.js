// tests/authentication/login-logout.spec.js
import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

test.describe('login and logout functionality', () => {
    const email = process.env.LOGIN_EMAIL;
    const password = process.env.LOGIN_PASSWORD;

    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173/login');
    });

    test('should log in', async ({ page }) => {
        await page.fill('#email', email);
        await page.fill('#password', password);
        await page.click('button[type="submit"]');

        await page.waitForURL('http://localhost:5173/', { timeout: 60000 });

        const user = await page.evaluate(() => JSON.parse(sessionStorage.getItem('user')));
        expect(user).not.toBeNull();
        expect(user.email).toBe(email);
    });

    test('should log out', async ({ page }) => {
        await page.fill('#email', email);
        await page.fill('#password', password);
        await page.click('button[type="submit"]');

        await page.waitForURL('http://localhost:5173/', { timeout: 60000 });

        await page.click('#logout-button');

    });
});
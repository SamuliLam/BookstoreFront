// tests/authentication/login-logout.spec.js
import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export async function login(page) {
    await page.goto('http://localhost:5173/login');
    await page.fill('#email', process.env.LOGIN_EMAIL);
    await page.fill('#password', process.env.LOGIN_PASSWORD);
    await page.click('button[type="submit"]');
    await page.waitForURL('http://localhost:5173/', { timeout: 60000 });

    const user = await page.evaluate(() => JSON.parse(sessionStorage.getItem('user')));
    expect(user).not.toBeNull();
    expect(user.email).toBe(process.env.LOGIN_EMAIL);
}

test.describe('login and logout functionality', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173/login');
    });

    test('should log in', async ({ page }) => {
        await login(page);
    });

    test('should log out', async ({ page }) => {
        await login(page);
        await page.click('#logout-button');

        const user = await page.evaluate(() => JSON.parse(sessionStorage.getItem('user')));
        expect(user).toBeNull();
    });
});

test.describe('login failure', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173/login');
    });

    test('should display error message', async ({ page }) => {
        await page.fill('#email', 'test@email.com');
        await page.fill('#password', 'wrong-password');
        await page.click('button[type="submit"]');
        await page.waitForSelector('#alert-message');
        const errorLabel = await page.textContent('#alert-message');

        await expect(errorLabel).toContain('An unexpected error occurred');
        const user = await page.evaluate(() => JSON.parse(sessionStorage.getItem('user')));
        expect(user).toBeNull();

    });

});
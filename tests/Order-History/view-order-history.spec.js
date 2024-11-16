import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

test.describe('View Order History Functionality', () => {
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

    test('should display order history', async ({ page }) => {
        await page.click('a[href="/profile"] svg');
        await page.waitForURL('http://localhost:5173/profile');

        await page.click('text=Order History');

        await page.waitForSelector('.divide-y', { state: 'visible' });

        const hasOrders = await page.isVisible('table:has(th:has-text("ORDER ID"))');
        expect(hasOrders).toBeTruthy();
    });
});

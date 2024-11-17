import { test, expect } from '@playwright/test';
import { adminLogin } from '../helpers/loginHelper';

test('Admin should be able to access admin page', async ({ page, context }) => {
    await adminLogin(page, context);

    console.log('Clicking on admin button...');
    await page.click('#admin-button');

    console.log('Waiting for navigation to admin page...');
    await page.waitForURL('http://localhost:5173/admin', { timeout: 60000 });
    expect(page.url()).toBe('http://localhost:5173/admin');
});

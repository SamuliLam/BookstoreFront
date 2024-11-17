import { test, expect } from '@playwright/test';
import { adminLogin } from '../helpers/loginHelper';

test('Admin should be able to create new book', async ({ page, context }) => {
    await adminLogin(page, context);

    await page.click('#admin-button');
    await page.waitForURL('http://localhost:5173/admin', { timeout: 60000 });
    expect(page.url()).toBe('http://localhost:5173/admin');

    await page.click('#admin-add-new');

    await context.route('**/books', (route) => {
        route.fulfill({
            status: 201,
            contentType: 'application/json',
            body: JSON.stringify({ message: 'Book created successfully' }),
        });
    });

    await page.fill('[name="title"]', 'Test Book');
    await page.fill('[name="isbn"]', '1234567890');
    await page.fill('[name="genre"]', 'Fiction');
    await page.fill('[name="type"]', 'Hardcover');
    await page.fill('[name="publicationYear"]', '2024');
    await page.fill('[name="price"]', '19.99');
    await page.fill('[name="bookCondition"]', 'New');
    await page.fill('[name="image_url"]', 'https://example.com/image.jpg');
    await page.fill('[name="inventory_stock_level_used"]', '10');
    await page.fill('[name="inventory_stock_level_new"]', '5');
    await page.fill('[name="publisher_name"]', 'Example Publisher');
    await page.fill('[name="publisher_country"]', 'USA');
    await page.fill('[name="author_firstName"]', 'Harper');
    await page.fill('[name="author_lastName"]', 'Lee');

    await page.click('#submit-book');
    const successMessage = await page.locator('#success-message');
    await expect(successMessage).toBeVisible();
});
import { test, expect } from '@playwright/test';

test.describe('SearchBar functionality', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173/');
        await page.waitForLoadState('load', { timeout: 60000 });
    });

    test('should update search results on Enter key press', async ({ page }) => {
        const searchTerm = 'Lord';
        await page.fill('.searchbar input[type="text"]', searchTerm);
        await page.press('.searchbar input[type="text"]', 'Enter');

        // Wait for search results to be rendered
        await page.waitForSelector('#product-grid');

        // Verify search results
        const searchResults = await page.locator('#product-grid .productdetails');
        const searchResultsText = await searchResults.allTextContents();
        const containsSearchTerm = searchResultsText.some(text => text.includes(searchTerm));
        await expect(containsSearchTerm).toBe(true);
    });

    test('should update search results on button click', async ({ page }) => {
        const searchTerm = 'Lord';
        await page.fill('.searchbar input[type="text"]', searchTerm);
        await page.click('.searchbar button');

        // Wait for search results to be rendered
        await page.waitForSelector('#product-grid');

        // Verify search results
        const searchResults = await page.locator('#product-grid .productdetails');
        await expect(searchResults).toContainText(searchTerm);
    });
});
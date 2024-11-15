import {test, expect} from '@playwright/test';

test.describe('add and remove from shopping cart functionality', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('http://localhost:5173/');
        await page.waitForURL('http://localhost:5173/', {timeout: 60000});
    });

    async function addItemsToCart(page, count) {
        const productGrid = await page.locator('#product-grid');

        for (let i = 0; i < count; i++) {
            const addButton = await productGrid.locator('#add-button').nth(i);
            await addButton.click();

            await page.waitForSelector('#close-button');
            const closeButton = await page.locator('#close-button').first();
            await closeButton.click();
        }
    }

    async function getCartLength(page) {
        const shoppingCart = await page.evaluate(() => JSON.parse(sessionStorage.getItem('cart')));
        return shoppingCart.length;
    }

    test('should add to shopping cart', async ({page}) => {
        await addItemsToCart(page, 3);
        expect(await getCartLength(page)).toBe(3);
    });

    test('should remove from shopping cart', async ({page}) => {
        await addItemsToCart(page, 3);
        expect(await getCartLength(page)).toBe(3);

        const cartButton = await page.locator('#cart-button').first();
        await cartButton.click();

        const cartItems = await page.locator('#cart-items');
        const removeButton = await cartItems.locator('#add-remove-buttons button').nth(1);
        await removeButton.click();

        expect(await getCartLength(page)).toBe(2);
    });

    test('should clear shopping cart', async ({page}) => {
        await addItemsToCart(page, 3);
        expect(await getCartLength(page)).toBe(3);

        const cartButton = await page.locator('#cart-button').first();
        await cartButton.click();

        const clearButton = await page.locator('#clear-cart').first();
        await clearButton.click();

        expect(await getCartLength(page)).toBe(0);
    });
});
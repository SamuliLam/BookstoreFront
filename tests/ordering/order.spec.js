import { test, expect } from '@playwright/test';
import { login } from '../authentication/login-logout.spec';
import { addItemsToCart } from '../shopping-cart/add-remove-shoppingcart.spec';
import { deleteOrder } from '../../src/utils/api.js'; // Adjust path as necessary
import dotenv from 'dotenv';

dotenv.config();

const proceedToCheckout = async (page) => {
    await addItemsToCart(page, 3);
    const cartButton = await page.locator('#cart-button').first();
    await cartButton.click();
    const proceedButton = await page.locator('#proceed-button').first();
    await proceedButton.click();
    await page.waitForURL('http://localhost:5173/order', { timeout: 60000 });
}

test.describe('order functionality', () => {
    let orderId;

    test.beforeEach(async ({ page }) => {
        await login(page);
        await page.route('http://localhost:8080/orders/addOrder', route => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    message: 'Order placed successfully!',
                    order: {
                        id: '5132',
                    },
                }),
            });
        });
    });

    test('should place an order', async ({ page }) => {
        await proceedToCheckout(page);
        expect(page.url()).toBe('http://localhost:5173/order');

        const orderButton = await page.locator('#confirm-order-button').first();
        await orderButton.click();
        await page.evaluate(() => {
            sessionStorage.setItem('order', JSON.stringify({ id: '5132' }));
        });

        const order = await page.evaluate(() => JSON.parse(sessionStorage.getItem('order')));
        orderId = order.id;
    });

    test.afterEach(async () => {
        if (orderId) {
            await deleteOrder(orderId);
            orderId = null;
        }
    });
});
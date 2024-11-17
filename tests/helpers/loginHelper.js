export const adminLogin = async (page, context) => {
    const email = process.env.LOGIN_EMAIL || 'test@example.com';
    const password = process.env.LOGIN_PASSWORD || 'testpassword';

    console.log('Logging in with', email, password);

    // Mock the login API response with a test token and expiry details
    await context.route('**/auth/login', (route) => {
        console.log('Intercepted request to /auth/login');
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                token: 'test-token-1234567890', // Placeholder token
                expiresIn: 3600000, // 1 hour expiry time
            }),
        });
    });

    // Mock the /me API response with placeholder user details
    await context.route('**/auth/me', (route) => {
        console.log('Intercepted request to /auth/me');
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                user_id: 1,
                first_name: 'Test',
                last_name: 'User',
                email: 'test@example.com',
                street_number: 123,
                street_name: 'Test Street',
                phone_number: '1234567890',
                postal_code: 12345,
                province: 'TestProvince',
                role: 'ADMIN',
                enabled: true,
                authorities: [
                    { authority: 'ROLE_ADMIN' },
                ],
                username: 'test@example.com',
                accountNonLocked: true,
                accountNonExpired: true,
                credentialsNonExpired: true,
            }),
        });
    });

    // Go to the login page
    await page.goto('http://localhost:5173/login');

    // Fill out the login form with credentials
    await page.fill('#email', email);
    await page.fill('#password', password);

    // Click the login button
    await page.click('#login-form-submit');

    // Wait for the page to load completely after login
    console.log('Waiting for page load after login...');
    await page.waitForLoadState('load', { timeout: 60000 });

    // Wait for URL change after login (if it's different from current one)
    console.log('Waiting for URL to change to home...');
    await page.waitForURL('http://localhost:5173/', { timeout: 60000 });
};

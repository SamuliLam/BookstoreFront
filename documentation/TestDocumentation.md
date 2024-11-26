# Testing Documentation

## 1. Project Overview
- **Project Name:** Online Bookstore Management System
- **Version:** 1.6
- **Author:** Stefanos Thomas
- **Date:** 26.11.2024
- **Objective:** The purpose of this document is to provide a detailed description of the testing process for user authentication, order placement, account management, and book management functionalities of the Online Bookstore Management System.

## 2. Scope of Testing
- **Features to be tested:**
    - User Authentication
    - Order Placement
    - Account Management
    - Book Management
    - Admin Panel functionalities
- **Testing levels:**
    - Unit Testing
    - Integration Testing
- **Assumptions and Constraints:**
    - Tests require the dotenv package to be installed and configured with the necessary environment variables.
    - The database connection must be established before running the tests.
    - Frontend tests require a running instance of the application.
## 3. Test Strategy
- **Testing Types:**
    - Functional Testing
    - Non-functional Testing (Performance, Security)
- **Tools:**
    - JUnit, Mockito, Playwright, LightHouse
- **Test Environment:**
    - Hardware Requirements:
      - Processor: Intel i5 or higher
      - RAM: 8GB or more
    - Software Requirements:
      - Operating System: Windows 10
      - Web Browser: Google Chrome, Mozilla Firefox
      - dotenv package
## 4. Test Plan
- **Milestones:**
    - Test Environment Setup
    - Unit Testing Completion
    - Integration Testing Completion
    - Final Test Report
- **Roles and Responsibilities:**
    - Testers: Stefanos Thomas, Ismet Ymeri, Samuli Lamminmäki, Onni Luova
    - Developers: Stefanos Thomas, Ismet Ymeri, Samuli Lamminmäki, Onni Luova
    - Project Manager: Samuli Lamminmäki
## 5. Test Cases
### User Authentication
Test Description | Steps to Execute                                                             | Expected Result                               | Actual Result                           | Status (Pass/Fail) |
------------------|------------------------------------------------------------------------------|-----------------------------------------------|-----------------------------------------|--------------------|
Sign up with valid details | 1. Navigate to signup page 2. Enter valid credentials 3. Click signup button | User is signed up and success message is displayed | User created and logged in successfully | Pass               |
Sign up with existing email | 1. Navigate to signup 2. Enter invalid credentials 3. Click signup button    | Display error message and user is not logged in | User not created and logged in          | Pass               |
Login with valid credentials | 1. Navigate to login page 2.Enter valid credentials 3. Click login button    | User is logged in and redirected to homepage  | User logged in                          | Pass               |
Logout after login | 1. Login with valid credentials 2. Click logout button                       | User is logged out                            | User logged out                         | Pass               |
### Shopping Cart Functionality
Test Description | Steps to Execute                                                                                  | Expected Result                 | Actual Result                | Status (Pass/Fail) |
------------------|---------------------------------------------------------------------------------------------------|---------------------------------|------------------------------|--------------------|
Add book to cart | 1. Navigate to homepage 2. Click add to cart                                                      | Shopping cart length is updated | Shopping cart length updated | Pass               |
Remove book from cart | 1. Navigate to homepage 2. Click add to cart 3. Click shopping cart. 4 Click the decrement button | Shopping cart length is updated       | Shopping cart length updated       | Pass               |
Clear cart | 1. Navigate to homepage 2. Click add to cart 3. Click shopping cart 4. Click clear cart button | Shopping cart is cleared         | Shopping cart cleared         | Pass               |
### Admin Panel
Test Description | Steps to Execute                                                                                                          | Expected Result         | Actual Result                     | Status (Pass/Fail) |
------------------|---------------------------------------------------------------------------------------------------------------------------|-------------------------|-----------------------------------|--------------------|
Access admin panel | 1. Login as admin 2. Click on admin panel link                                                                            | Admin panel is accessed | Admin panel accessed successfully | Pass               |
Create book | 1. Login as admin 2. Click the admin panel link 3. Click on create book link 4. Enter book details 5. Click create button | Book is created and success message is displayed | Book created successfully | Pass |
### View Order History
Test Description | Steps to Execute                                                 | Expected Result                               | Actual Result                           | Status (Pass/Fail) |
------------------|------------------------------------------------------------------|-----------------------------------------------|-----------------------------------------|--------------------|
View order history | 1. Login as user 2. Click on profile 3. Click view order history | Order history is displayed                     | Order history displayed successfully   | Pass               |
### Ordering
Test Description | Steps to Execute                                                                                                       | Expected Result                               | Actual Result                           | Status (Pass/Fail) |
------------------|------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------|-----------------------------------------|--------------------|
Place order | 1. Login as user 2. Add books to cart 3. Click on cart 4. Click proceed to checkout 5. Click order confirmation button | Order is placed and success message is displayed | Order placed successfully | Pass               |
### Search Bar Functionality
Test Description | Steps to Execute                                                                 | Expected Result                               | Actual Result                           | Status (Pass/Fail) |
------------------|----------------------------------------------------------------------------------|-----------------------------------------------|-----------------------------------------|--------------------|
Search for book | 1. Navigate to homepage 2. Enter book title in search bar 3. Click search button | Book is displayed in search results           | Book displayed in search results       | Pass               |
### Update Account Profile Information
Test Description | Steps to Execute                                                                     | Expected Result                               | Actual Result                           | Status (Pass/Fail) |
------------------|--------------------------------------------------------------------------------------|-----------------------------------------------|-----------------------------------------|--------------------|
Update account information | 1. Login as user 2. Click on profile 3. Enter new information 4. Click update button | Account information is updated and success message is displayed | Account information updated successfully | Pass               |
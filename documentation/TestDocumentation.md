**# Testing Documentation

## 1. Project Overview
- **Project Name:** Online Bookstore Management System
- **Version:** 1.7
- **Author:** Stefanos Thomas
- **Date:** 28.11.2024
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
    - Testers: Stefanos Thomas, Ismet Ymeri, Samuli Lamminmäki, Onni Luova, Jan Nässling
    - Developers: Stefanos Thomas, Ismet Ymeri, Samuli Lamminmäki, Onni Luova, Jan Nässling
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
Update account information | 1. Login as user 2. Click on profile 3. Enter new information 4. Click update button | Account information is updated and success message is displayed | Account information updated successfully | Pass               |**
## 6. Metrics

### Test Coverage
- **Front end**
  - **User Authentication**
  - **Shopping Cart Functionality**
  - **Admin Panel**
  - **View Order History**
  - **Ordering**
  - **Search Bar Functionality**
  - **Update Account Profile Information**
- **Back end**
  - **Overall Coverage:**
    - **Instructions Coverage:** 94%
    - **Branches Coverage:** 84%
    - **Complexity Coverage:** 86%
    - **Lines Coverage:** 94%
    - **Methods Coverage:** 95%
    - **Classes Coverage:** 93%
  - **Package Coverage:**
    - **com.example.bookdbbackend.controller:**
      - **Instructions Coverage:** 91%
      - **Branches Coverage:** 91%
      - **Complexity Coverage:** 79%
      - **Lines Coverage:** 91%
      - **Methods Coverage:** 98%
      - **Classes Coverage:** 100%
    - **com.example.bookdbbackend.service:**
      - **Instructions Coverage:** 97%
      - **Branches Coverage:** 84%
      - **Complexity Coverage:** 87%
      - **Lines Coverage:** 98%
      - **Methods Coverage:** 96%
      - **Classes Coverage:** 100%
    - **com.example.bookdbbackend.configs:**
      - **Instructions Coverage:** 96%
      - **Branches Coverage:** 62%
      - **Complexity Coverage:** 80%
      - **Lines Coverage:** 100%
      - **Methods Coverage:** 100%
      - **Classes Coverage:** 100%
    - **com.example.bookdbbackend.exception:**
      - **Instructions Coverage:** 75%
      - **Branches Coverage:** n/a
      - **Complexity Coverage:** 67%
      - **Lines Coverage:** 67%
      - **Methods Coverage:** 67%
      - **Classes Coverage:** 100%
    - **com.example.bookdbbackend:**
      - **Instructions Coverage:** 37%
      - **Branches Coverage:** n/a
      - **Complexity Coverage:** 50%
      - **Lines Coverage:** 67%
      - **Methods Coverage:** 100%
      - **Classes Coverage:** 100%
    - **com.example.bookdbbackend.dtos:**
      - **Instructions Coverage:** 100%
      - **Branches Coverage:** n/a
      - **Complexity Coverage:** 100%
      - **Lines Coverage:** 100%
      - **Methods Coverage:** 100%
      - **Classes Coverage:** 100%
    - **com.example.bookdbbackend.model:**
      - **Instructions Coverage:** 100%
      - **Branches Coverage:** n/a
      - **Complexity Coverage:** 100%
      - **Lines Coverage:** 100%
      - **Methods Coverage:** 100%
      - **Classes Coverage:** 100%
    - **com.example.bookdbbackend.responses:**
      - **Instructions Coverage:** 100%
      - **Branches Coverage:** n/a
      - **Complexity Coverage:** 100%
      - **Lines Coverage:** 100%
      - **Methods Coverage:** 100%
      - **Classes Coverage:** 100%
### Test Execution
  - **Front end**
    - **Total Test Cases:** 19
    - **Passed:** 19
    - **Failed:** 0
    - **Skipped:** 0
    - **Back end**
    - **Total Test Cases:** 172
    - **Passed:** 172
    - **Failed:** 0
    - **Skipped:** 0
- **Total Test Cases:** 191

### Defect Metrics
- **Total Defects Found:** 0
- **Critical Defects:** 0
- **Major Defects:** 0
- **Minor Defects:** 0

### Test Efficiency
- **Test Execution Time:** 5-10 minutes

### Test Environment
- **Number of Test Environments:**
  - **Front end:** 1
  - **Back end:** 3
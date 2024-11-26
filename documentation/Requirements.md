# Requirements.md  

## Table of Contents  
- [Introduction](#introduction)  
- [Functional Requirements](#functional-requirements)  
  - [User Management](#user-management)  
  - [Book Management](#book-management)  
  - [Shopping Cart and Checkout](#shopping-cart-and-checkout)  
  - [Order Management](#order-management)  
  - [Admin Features](#admin-features)  
- [Non-Functional Requirements](#non-functional-requirements)  
  - [Performance](#performance)  
  - [Security](#security)  
  - [Usability](#usability)  
  - [Scalability](#scalability)  
  - [Maintainability](#maintainability)  
- [Assumptions](#assumptions)  
- [Limitations](#limitations)  

---

## Introduction  

This document outlines the functional and non-functional requirements for the **Online Bookstore Management System** front-end. The application enables users to browse, purchase, and manage books while providing a robust admin panel for inventory and user management. It is built using **React** for the front-end and **Spring Boot** for the back-end.

---

## Functional Requirements  

### User Management  
- **User Registration**:  
  - Allow users to register with a valid email and password.  
  - Provide error messages for invalid input.
  
- **Login/Logout**:  
  - Authenticate users using JWT.  
  - Display user-specific data (e.g., order history) post-login.  

- **Role-Based Access Control**:  
  - Restrict access to admin functionalities for regular users.  
  - Ensure roles are validated via backend APIs.  

### Book Management  
- **Browse Books**:  
  - Display books with their title, author, price, and description.  
  - Categorize books by genre or type.

- **Search Books**:  
  - Implement a search bar for finding books by title, author, or keyword.

- **Book Details**:  
  - Show detailed information about each book.

### Shopping Cart and Checkout  
- **Add to Cart**:  
  - Allow users to add books to their cart.  
  - Display the cart total dynamically.  

- **Update Cart**:  
  - Modify quantities or remove items from the cart.  

- **Checkout**:  
  - Provide a secure checkout process to finalize purchases.  
  - Save order details to the backend database.

### Order Management  
- **View Order History**:  
  - Display past orders for logged-in users.

- **Order Status Updates**:  
  - Allow admins to update order statuses (e.g., shipped, delivered).  

### Admin Features  
- **Inventory Management**:  
  - Add, update, or remove books from the inventory.  

- **User Management**:  
  - View and manage registered users.  

- **Order Management**:  
  - Process and monitor user orders.  

---

## Non-Functional Requirements  

### Performance  
- Ensure pages load within **2 seconds** under normal traffic.  
- Supports a multitude of languages.

### Security  
- Use **HTTPS** to secure communication between client and server.  
- Store passwords securely using **hashing** and **salting**.  
- Validate all user inputs to prevent **SQL injection** and **XSS attacks**.  

### Usability  
- Provide a **responsive design** for desktops, tablets, and mobile devices.  
- Ensure clear error messages for invalid actions.

### Scalability  
- Design the backend to handle increased traffic with **horizontal scaling**.  
- Enable efficient API calls for future features.

### Maintainability  
- Write modular and reusable **React components**.  
- Ensure comprehensive **documentation for API endpoints**.

---

## Assumptions  

- Users have a **stable internet connection**.  
- Admins are familiar with basic web navigation and form inputs.  
- The backend APIs are operational and conform to documented endpoints.  

---

## Limitations  

- The application does not support **offline mode**.  
- Payment gateway integration is **outside the scope** of the current implementation.


Requirements.md
Table of Contents
Introduction
Functional Requirements
User Management
Book Management
Shopping Cart and Checkout
Order Management
Admin Features
Non-Functional Requirements
Performance
Security
Usability
Scalability
Maintainability
Assumptions
Limitations
1. Introduction
This document outlines the functional and non-functional requirements for the Online Bookstore Management System front-end. The application enables users to browse, purchase, and manage books while providing a robust admin panel for inventory and user management. It is built using React for the front-end and Spring Boot for the back-end.

2. Functional Requirements
2.1 User Management
User Registration:
Allow users to register with a valid email and password.
Provide error messages for invalid input.
Login/Logout:
Authenticate users using JWT.
Display user-specific data (e.g., order history) post-login.
Role-Based Access Control:
Restrict access to admin functionalities for regular users.
Ensure roles are validated via backend APIs.
2.2 Book Management
Browse Books:
Display books with their title, author, price, and description.
Categorize books by genre or type.
Search Books:
Implement a search bar for finding books by title, author, or keyword.
Book Details:
Show detailed information about each book.
2.3 Shopping Cart and Checkout
Add to Cart:
Allow users to add books to their cart.
Display the cart total dynamically.
Update Cart:
Modify quantities or remove items from the cart.
Checkout:
Provide a secure checkout process to finalize purchases.
Save order details to the backend database.
2.4 Order Management
View Order History:
Display past orders for logged-in users.
Order Status Updates:
Allow admins to update order statuses (e.g., shipped, delivered).
2.5 Admin Features
Inventory Management:
Add, update, or remove books from the inventory.
User Management:
View and manage registered users.
Order Management:
Process and monitor user orders.
3. Non-Functional Requirements
3.1 Performance
Ensure pages load within 2 seconds under normal traffic.
Support up to 500 concurrent users.
3.2 Security
Use HTTPS to secure communication between client and server.
Store passwords securely using hashing and salting.
Validate all user inputs to prevent SQL injection and XSS attacks.
3.3 Usability
Provide a responsive design for seamless use on desktops, tablets, and mobile devices.
Ensure clear error messages for invalid actions.
3.4 Scalability
Design the backend to handle increased traffic with horizontal scaling.
Enable efficient API calls for future features.
3.5 Maintainability
Write modular and reusable React components.
Ensure comprehensive documentation for API endpoints.
4. Assumptions
Users have a stable internet connection.
Admins are familiar with basic web navigation and form inputs.
The backend APIs are operational and conform to documented endpoints.
5. Limitations
The application does not support offline mode.
Payment gateway integration is outside the scope of the current implementation.

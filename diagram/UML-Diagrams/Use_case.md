# Use Case Diagram
![asd](https://github.com/user-attachments/assets/b12ffffe-416d-41bd-a299-ae97f1711c38)

## User Roles

### 1. **Visitor**  
A visitor is a user who is not logged into the system. They can:  
- Browse books.  
- Search for books.  
- Register to create a user account.

### 2. **Registered User**  
A registered user is logged into the system. They can:  
- Browse books.  
- Search for books.  
- Add books to the shopping cart.  
- Proceed to checkout and confirm purchases.  
- Edit their own profile.

### 3. **Administrator**  
An administrator has all the permissions of a registered user, as well as additional rights to:  
- Manage users.  
- Manage books.  
- Manage orders.

---

## Use Cases

### 1. **Registration**  
- **Actors:** Visitor  
- Visitors can register to create a user account.

### 2. **Browse Books**  
- **Actors:** Visitor, Registered User  
- All users can browse the bookstore's catalog.

### 3. **Search for Books**  
- **Actors:** Visitor, Registered User  
- All users can search for specific books using the search feature.

### 4. **Login**  
- **Actors:** Visitor  
- Visitors can log in to gain access to the features available to registered users.  
  - This use case **extends** "Proceed to Checkout," as completing a purchase requires login.

### 5. **Add to Cart**  
- **Actors:** Registered User  
- Registered users can add books to their shopping cart in preparation for purchasing.

### 6. **Proceed to Checkout**  
- **Actors:** Registered User  
- Registered users can move forward in the shopping process by proceeding to checkout, which includes confirming the purchase.

### 7. **Edit Profile**  
- **Actors:** Registered User  
- Registered users can edit their own profile information.

### 8. **Manage Users/Books/Orders**  
- **Actors:** Administrator  
- Administrators can manage system users, books, and orders.

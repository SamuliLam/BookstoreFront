# **Architecture and Design**

## **System Components**

### **Frontend**
- **React.js**: React-based user interface for browsing and ordering books.

### **Backend**
- **Spring Boot**: Java-based framework for building the RESTful API for user management, book management, and order management.

### **Database**
- **MariaDB**: Relational database for storing user, book, and order data.

## **Diagram**

```mermaid
graph TD
    User_Interface --> Backend_API
    Backend_API --> Database
    Backend_API --> Email_Notification_Service
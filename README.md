# OnlineBookstoreManagementSystem

# **Bookstore Management System**

## **Project Overview**

The Book Management System is a comprehensive web application designed to manage and facilitate the sale of books. Built with a React frontend and a Java backend, this system provides a seamless experience for both customers and administrators. Customers can browse through an extensive collection of books, purchase them using a payment method. l. Administrators can efficiently manage the book inventory, track orders, and manage users.


## **Creators**

This project was collaboratively developed by:
- **Ismet Ymeri**
- **Samuli Lamminmäki**
- **Stefanos Thomas**
- **Onni Luova**

## **Features**

### **Customer Features**
- **Book Browsing**: Users can browse a wide range of books categorized by genre, author, and price.
- **Search Functionality**: Search functionality allows users to quickly find specific books.
- **Book Details**: Each book has a detailed page including the author, description, price, and availability.
- **Purchase**: Customers can buy books.

### **Admin Features**
- **Book Inventory Management**: Admins can add, update, and delete books from the inventory.
- **Order Management**: Detailed logs of all orders are maintained.
- **User Management**: Admins can manage user accounts and their orders.


## **Technologies Used**

### **Frontend**
- **React**: A JavaScript library for building user interfaces. The entire frontend is built using React, providing a dynamic and responsive experience.
- **Axios**: For making API requests from the frontend to the backend.

### **Backend**
- **Java**: The core backend logic is implemented in Java, ensuring a robust and scalable application.
- **Spring Boot**: Simplifies the development of the backend by providing pre-configured setups for the project.
- **JDBC**: Used for connecting to the MariaDB database and performing CRUD operations.
- **MariaDB**: The relational database used to store all the data related to books, users, and transactions.

### **Tools and Libraries**
- **Maven**: For managing the project's dependencies and building the application.
- **Hibernate**: An ORM tool for managing database operations in a more object-oriented manner.
- **Git**: Version control for collaborative development.
- **Tailwind CSS**: Stlying for frontend.


## **Setup Instructions**

### **Prerequisites**
- **Node.js**: Required for running the React frontend.
- **Java JDK 17+**: Required for running the Java backend.
- **MariaDB**: The database where all application data is stored.
- **Maven**: For managing dependencies and building the Java project.

### **Installation**

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/kismet85/OnlineBookstoreManagementSystem.git
   cd file/repo
2. **Setup Database**:
   - **Create a new database in MariaDB**:
     ```sql
     CREATE DATABASE bookstore;
     USE bookstore;
     ```
   - **Run the SQL script to create the tables**:
     ```sql
     source src/main/resources/sql/bookstore.sql;
     ```
   - **Update the database credentials in the application.properties file**:
     ```properties
     spring.datasource.url=jdbc:mariadb://localhost:3306/bookstore
     spring.datasource.username=root
     spring.datasource.password=password
     
     ```
     - Default Admin User: The database script creates a default admin user with the following credentials:
     - Email: admin@admin
     - Password: admin

3. **Setup Backend**:

***Navigate to the backend directory***:

**Install the required dependencies:**
**mvn clean install**
**Run the backend server**:

***mvn spring-boot:run***

1. **Setup Frontend**:
2. Clone the frontend repository and navigate to the frontend directory:
    ```bash
    git clone https://github.com/SamuliLam/BookstoreFront.git
    cd BookstoreFront
    ```
    
**Install the required dependencies:**
**npm install**
**Run the React development server:**

**npm run dev**

4. **Access the Application**:

### ***Open your browser and go to http://localhost:5173 for the frontend.***
## ***The backend should be running at http://localhost:8080.***
# Usage
**Customer Interface: Browse books, add them to your cart, and proceed to purchase them.
Admin Interface: Manage the book inventory, track sales and manage users.**


## Contact
**For any questions, feedback, or suggestions, please contact the project creators:**

# Ismet Ymeri
# Samuli Lamminmäki
# Stefanos Thomas
# Onni Luova
# Jan Nässling


## Front Page
![frontpage](https://github.com/user-attachments/assets/9ac73438-9a52-42bb-9d9e-b40f1374aac4)

## Profile Page
![Profilepage](https://github.com/user-attachments/assets/756e44c1-e699-41f4-9b4e-f4b763a7cf99)

## Admin Page
![adminpage](https://github.com/user-attachments/assets/1af7ca27-af2d-4bd2-9301-c57bf3167158)

## Shopping Cart
![ostoskori](https://github.com/user-attachments/assets/0fcb832b-e6cb-4615-96ce-0cc1981aa3aa)

## Order Page
![Orderpage](https://github.com/user-attachments/assets/92c8e31c-a661-4c9d-85ec-13d067c6bb26)


# ER diagram
![image](https://github.com/user-attachments/assets/7be685eb-e60d-4876-928c-da72d8143e47)

# Relational schema
![image (1)](https://github.com/user-attachments/assets/6bda09ab-d7cb-4713-b386-ee98fde9cfee)

## Entity Types and Their Relationships

### `users`  
This entity type represents a user registered in the bookstore. The `role` attribute specifies whether the user is a regular customer or an administrator. A user has a one-to-many relationship with orders, meaning a user can place multiple orders, but each order is associated with only one user.

### `orders`  
This entity type represents the orders placed by users. An order has attributes such as the order date, total price, and delivery cost. Orders have a many-to-one relationship with users and a many-to-many relationship with books. The many-to-many relationship creates a new table, `order-items`, which includes an additional attribute, `quantity`, indicating how many units of a specific product are purchased. The total order price is calculated based on the product quantities.

### `books`  
This entity type represents a book available for purchase in the bookstore. A book has a many-to-many relationship with orders, meaning a book can be ordered multiple times, and an order can include multiple books. Additionally, a book has a many-to-many relationship with authors, meaning a book can have multiple authors, and an author can write multiple books.  

A book also has a many-to-one relationship with publishers, meaning a book can have only one publisher, but a publisher can publish multiple books. Finally, a book has a many-to-one relationship with inventory, meaning a book belongs to a single inventory, but an inventory can include multiple books.

## `authors`  
This entity type represents the authors of books. Authors have a many-to-many relationship with books, as a book can have multiple authors, and an author can write multiple books.

### `publishers`  
This entity type represents the publisher of a book. Publishers have a one-to-many relationship with books, meaning a publisher can publish multiple books, but a book can only have one publisher. (In practice, a book could have multiple publishers, such as for translations, but this feature was not deemed important for our project.)

### `inventory`  
This entity type represents the inventory of books. Inventory has a one-to-many relationship with books, meaning an inventory can hold multiple books, but a book can belong to only one inventory.

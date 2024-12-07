# ER Diagram
![image](https://github.com/user-attachments/assets/7be685eb-e60d-4876-928c-da72d8143e47)

# Relational Schema
![image (1)](https://github.com/user-attachments/assets/6bda09ab-d7cb-4713-b386-ee98fde9cfee)

---

## Entity Types

### `users`  
This entity represents a user registered in the bookstore. It includes attributes such as `id`, `name`, and `role`, where `role` determines whether the user is a regular customer or an administrator.

### `orders`  
This entity represents orders placed by users. Attributes include `id`, `order_date`, `total_price`, and `delivery_cost`.

### `books`  
This entity represents a book available for purchase. Attributes include `id`, `title`, `price`, and other descriptive properties.

### `authors`  
This entity represents the authors of books. Attributes include `id` and `name`.

### `publishers`  
This entity represents a book's publisher. Attributes include `id` and `name`.

### `inventory`  
This entity represents the inventory of books. Attributes include `id` and details related to stock and storage.

---

## Relationship Types

### `users` ↔ `orders`  
**Type:** One-to-Many  
- A user can place multiple orders.  
- Each order is associated with only one user.

### `orders` ↔ `books`  
**Type:** Many-to-Many  
- A book can appear in multiple orders.  
- An order can include multiple books.  
- This relationship creates an additional entity, `order-items`, which includes the attribute `quantity` to indicate the number of each book purchased.

### `books` ↔ `authors`  
**Type:** Many-to-Many  
- A book can have multiple authors.  
- An author can write multiple books.

### `books` ↔ `publishers`  
**Type:** Many-to-One  
- A publisher can publish multiple books.  
- Each book can have only one publisher.  

### `books` ↔ `inventory`  
**Type:** Many-to-One  
- A single inventory can hold multiple books.  
- Each book belongs to only one inventory.

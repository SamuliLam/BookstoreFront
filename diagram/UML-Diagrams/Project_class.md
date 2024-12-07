# Project class diagram
![project_class_diagram](https://github.com/user-attachments/assets/ae46420d-27d4-48d8-b881-89d217bb8efd)

## Spring-Based Application Architecture

This diagram represents a Spring-based application structure with layers for repository, service, and controller. Below is a breakdown of the components:

### `Item`  
This class represents an entity with the following characteristics:  
- `id` property of type `Long`.  
- Basic getter and setter methods for its attributes.  

### `Repository`  
This interface extends `JpaRepository`, indicating that it handles database operations such as saving, deleting, and querying `Item` objects stored in the database.

### `Service`  
The service layer implements business logic and interacts with the repository for database operations. Key methods include:  
- `addItem()`  
- `getItem()`  
- `deleteItem()`  
- `updateItem()`  

The service layer also manages error handling by throwing custom exceptions (`CustomException`).

### `IService`  
An interface for the service layer, providing flexibility and enabling the use of different service-layer implementations.

### `Controller`  
The controller layer handles HTTP requests and responses, relying on the service layer to perform operations. It includes methods such as:  
- `create()`  
- `get()`  
- `update()`  
- `delete()`  

These methods correspond to traditional CRUD operations (Create, Read, Update, Delete).

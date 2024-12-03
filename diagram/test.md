```mermaid
graph TD
    User[User] -->|Browses, Orders| Frontend[Frontend (React)]
    Frontend -->|API Requests| Backend[Backend (Spring Boot)]
    Backend -->|CRUD Operations| Database[(Database (MariaDB))]

    subgraph "Frontend (React)"
        App[App Component] --> AppRoutes[Routing]
        AppRoutes --> Pages{Pages}
        Pages --> HomePage[Home Page]
        Pages --> AdminPage[Admin Page]
        Pages --> ProfilePage[Profile Page]
    end

    subgraph "Backend (Spring Boot)"
        Controllers[Controllers]
        Services[Services]
        Repositories[Repositories]
        Controllers --> Services
        Services --> Repositories
        Repositories --> Database
    end

    subgraph "Database (MariaDB)"
        BooksTable[Books Table]
        UsersTable[Users Table]
        OrdersTable[Orders Table]
        InventoryTable[Inventory Table]
    end

    Backend -->|Manages Data| BooksTable
    Backend -->|Manages Data| UsersTable
    Backend -->|Manages Data| OrdersTable
    Backend -->|Manages Data| InventoryTable

```mermaid
graph TD
    User[User Interface] -->|HTTP Requests| Frontend[React Frontend]
    Frontend -->|API Calls| Backend[Spring Boot Backend]
    Backend -->|SQL Queries| Database[(MariaDB Database)]
```
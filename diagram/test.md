```mermaid
graph TD
    Frontend[Presentation Layer React Frontend] -->|HTTP Requests| Backend[Spring Boot Backend]
    Backend -->|SQL Queries| Database[(MariaDB Database)]
```

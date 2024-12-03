```mermaid
graph TD
    User[User Interface] -->|HTTP Requests| Frontend[Frontend (React)]
    Frontend -->|API Calls| Backend[Backend (Spring Boot)]
    Backend -->|Queries| Database[(MariaDB)]
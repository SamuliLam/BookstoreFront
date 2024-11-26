# Deployment Diagram

```mermaid
    flowchart TD
    subgraph Client[Client Layer]
        B[Web Browser]
    end

    subgraph Server[Server Layer]
        WS[Spring Boot]
        subgraph Services
            AS[JDBC]
        end
        subgraph Services
            AUTH[Auth Service]
        end
    end

    subgraph DB[Database Layer]
        RDB[(MariaDB)]
    end

    B --> WS
    WS --> AS
    AS --> AUTH
    AUTH --> RDB
```mermaid
graph TD
%% Main Application
App[App Component] --> SR[SearchResultContextProvider]
SR --> UP[UserProvider]
UP --> CP[CartProvider]
CP --> FP[FilterProvider]
FP --> AR[AppRoutes]

    %% Routes and Pages
    AR --> Pages{Pages}
    Pages --> Home[HomePage]
    Pages --> Profile[ProfilePage]
    Pages --> Admin[AdminPage]
    Pages --> Signup[SignupPage]
    Pages --> Login[LoginPage]

    %% Components and Features
    Home --> PG[ProductGrid]
    Home --> FilterPanel
    
    Admin --> APB[AdminPanelButton]
    Admin --> APT[AdminPageTable]
    Admin --> CUBM[CreateOrUpdateBookModal]
    Admin --> CUUM[CreateOrUpdateUserModal]

    %% Context Providers
    UserContext[UserContext] -.-> UP
    CartContext[CartContext] -.-> CP
    FilterContext[FilterContext] -.-> FP
    SearchContext[SearchContext] -.-> SR

    %% External Services & Utilities
    API[API Utils] --> Backend[(Backend Server)]
    i18n[i18next] --> Translations[(Translation Files)]

    %% API Connections
    API --> UserAPI{User API}
    API --> BookAPI{Book API}
    API --> OrderAPI{Order API}
    API --> InventoryAPI{Inventory API}

    %% Utilities and Services Connection
    UserAPI --> Profile
    UserAPI --> Login
    UserAPI --> Signup
    BookAPI --> PG
    BookAPI --> Admin
    OrderAPI --> Profile
    OrderAPI --> Admin
    InventoryAPI --> Admin

    %% Database
    Backend --> DB[(Database)]
    DB --> Users[Users Table]
    DB --> Books[Books Table]
    DB --> Orders[Orders Table]
    DB --> Inventory[Inventory Table]

    %% Style Definitions
    classDef provider fill:#dff8ff,stroke:#0074cc,stroke-width:2px
    classDef page fill:#fef3d6,stroke:#e0a106,stroke-width:2px
    classDef component fill:#e8ffe8,stroke:#009400,stroke-width:2px
    classDef external fill:#ffe6e6,stroke:#d70000,stroke-width:2px
    classDef database fill:#f0f0f0,stroke:#666,stroke-width:2px

    %% Apply Styles
    class UP,CP,FP,SR provider
    class Home,Profile,Admin,Signup,Login page
    class PG,FilterPanel,APB,APT,CUBM,CUUM component
    class API,i18n,Backend,Translations external
    class DB,Users,Books,Orders,Inventory database

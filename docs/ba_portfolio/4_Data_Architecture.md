# Conceptual Data Architecture (ERD)

**Project:** LuxRoom E-commerce  
**Modeling Standard:** Entity-Relationship Diagram (ERD) represented via Mermaid.js  

This document outlines the conceptual data model required to support the LuxRoom frontend experience (Users, Products, Cart, Orders, and Addresses).

## Entity-Relationship Diagram

```mermaid
erDiagram
    USER ||--o{ ORDER : places
    USER ||--o{ ADDRESS : "manages (shipping/billing)"
    USER ||--o| CART : "owns (1 active cart)"
    
    PRODUCT ||--o{ CART_ITEM : "added as"
    PRODUCT ||--o{ ORDER_DETAIL : "purchased as"
    CATEGORY ||--|{ PRODUCT : contains

    CART ||--o{ CART_ITEM : contains
    ORDER ||--|{ ORDER_DETAIL : includes
    ORDER }|--|| ADDRESS : "ships to"

    %% Entity Attributes Definition
    USER {
        uuid id PK
        string email 
        string password_hash
        string first_name
        string last_name
        string phone
        datetime created_at
    }

    ADDRESS {
        uuid id PK
        uuid user_id FK
        string address_line_1
        string city
        string state
        string zip_code
        string country
        boolean is_default
    }

    CATEGORY {
        int id PK
        string name
        string description
        string slug
    }

    PRODUCT {
        uuid id PK
        int category_id FK
        string title
        string description
        decimal price
        int stock_quantity "Inventory tracking"
        string image_url
        boolean is_active
    }

    CART {
        uuid id PK
        uuid user_id FK "Null if guest"
        string session_id "For Guest Cart persistence"
        datetime updated_at
    }

    CART_ITEM {
        uuid id PK
        uuid cart_id FK
        uuid product_id FK
        int quantity
        datetime added_at
    }

    ORDER {
        uuid id PK
        uuid user_id FK "Null if guest"
        uuid shipping_address_id FK
        string order_status "e.g., PENDING, PAID, SHIPPED"
        string payment_method
        decimal total_amount
        string promo_code "Applied discount"
        datetime created_at
    }

    ORDER_DETAIL {
        uuid id PK
        uuid order_id FK
        uuid product_id FK
        int quantity
        decimal unit_price "Price at the time of purchase"
    }
```

## Data Dictionary Highlights

1.  **Products & Inventory:** The `PRODUCT` table contains `stock_quantity`. This drives the business rule outlined in the PRD where `"Add to Cart"` becomes disabled if `stock_quantity <= 0`.
2.  **Guest Checkout Support:** To support Guest checkouts without forcing registration, the `CART` and `ORDER` tables have a nullable `user_id`. For guests, Carts are tracked via `session_id`, and Orders simply store the `shipping_address_id` (which can be a disconnected record for non-registered users).
3.  **Historical Pricing Stability:** The `ORDER_DETAIL` table deliberately stores `unit_price`. This is a classic E-commerce DB design pattern ensuring that if a Product's price changes in the future, past Orders still reflect the exact price the user paid at the time.

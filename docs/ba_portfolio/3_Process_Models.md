# Business Process Models

**Project:** LuxRoom E-commerce  
**Modeling Standard:** BPMN (represented via Mermaid Flowcharts)

These process models illustrate the core user journeys within the LuxRoom platform.

---

## 1. End-to-End Shopping & Checkout Flow
This represents the primary happy path for a user (either registered or guest) adding items to their cart and completing a purchase, including out-of-stock validation check.

```mermaid
graph TD
    A([Start: User visits Homepage/Products]) --> B(Browse Product Catalog)
    B --> C{Selects Product for details?}
    
    C -- Yes --> D(View Product Detail Page - PDP)
    C -- No --> B
    
    D --> E{Item in stock?}
    E -- No --> F(Display 'Out of Stock' & Disable Add Button)
    E -- Yes --> G(Select Quantity & Click 'Add to Cart')
    
    G --> H(Update Cart Icon & Show Toast/Flyout)
    H --> I{Continue Shopping?}
    
    I -- Yes --> B
    I -- No --> J(Go to Cart Page)
    
    J --> K(Review Items, Quantities, Subtotal)
    K --> L(Click 'Proceed to Checkout')
    
    L --> M{Is User Logged In?}
    
    M -- Yes --> P(Load Saved Addresses & Details)
    M -- No --> N{Checkout as Guest?}
    
    N -- No --> O(Redirect to Login/Register)
    O --> P
    N -- Yes --> Q(Show Blank Checkout Form)
    
    P --> R
    Q --> R(Enter/Confirm Shipping Details)
    
    R --> S(Select Payment Method)
    S --> T[Validate Payment securely]
    
    T --> U{Payment Successful?}
    U -- No --> V(Display Payment Error & Retry)
    V --> S
    
    U -- Yes --> W(Generate Order ID & Clear Cart)
    W --> X([End: Show Order Success Page])
```

---

## 2. User Authentication Flow
This diagram illustrates how users authenticate into the system out of the standalone `auth.html` page, with robust error handling for invalid credentials.

```mermaid
graph TD
    A([Start: User clicks Login/Register]) --> B(Navigate to auth.html)
    B --> C{Existing Account?}
    
    %% Sign Up Flow
    C -- No --> D(Fill Registration Form)
    D --> E[Validate Email Format & Password Strength]
    E --> F{Is Input Valid?}
    F -- No --> G(Show Validation Errors)
    G --> D
    F -- Yes --> H[System Creates Account]
    H --> I(Send Welcome Email)
    I --> J(Auto-login & Redirect to Home)
    
    %% Login Flow
    C -- Yes --> K(Enter Email & Password)
    K --> L[Authenticate against Database]
    L --> M{Credentials Valid?}
    
    M -- No --> N(Display 'Invalid Credentials' Message)
    N --> K
    
    M -- Yes --> O[Create Session/Generate JWT token]
    O --> P(Redirect to intended page or Homepage)
    
    J -.-> Z([End: User is Authenticated])
    P -.-> Z
```

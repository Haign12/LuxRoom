# User Stories & Acceptance Criteria

**Project:** LuxRoom E-commerce  
**Format:** Agile User Stories with Gherkin Acceptance Criteria

---

## Epic 1: Product Discovery & Evaluation
**As a** potential customer,  
**I want to** browse and view detailed information about furniture pieces,  
**So that** I can make an informed purchasing decision.

### Story 1.1: View Product Details
**As a** customer,  
**I want to** view high-quality images, descriptions, and specifications of a product,  
**So that** I know exactly what I am buying.

**Acceptance Criteria:**
*   **Scenario 1: Successful navigation to Product Detail Page (PDP)**
    *   **Given** I am on the product listing page (`products.html`),
    *   **When** I click on a specific product card,
    *   **Then** I should be redirected to the product detail page (`detail.html`) showing the correct product title, price, description, and an image gallery.

*   **Scenario 2: Out of Stock display**
    *   **Given** I am on a PDP for a product with 0 inventory,
    *   **When** the page loads,
    *   **Then** the "Add to Cart" button should be disabled and visually grayed out.
    *   **And** a "Out of Stock" badge should be displayed prominently near the price.

---

## Epic 2: Shopping Cart Management
**As a** customer,  
**I want to** easily manage the items I intend to purchase,  
**So that** I can review my order and adjust quantities before checking out.

### Story 2.1: Add item to Cart
**As a** customer,  
**I want to** add a product from the PDP to my cart,  
**So that** it is saved for my final checkout.

**Acceptance Criteria:**
*   **Scenario 1: Adding a configurable item**
    *   **Given** I am on a PDP for a product in stock,
    *   **When** I select a quantity of `2` and click "Add to Cart",
    *   **Then** the cart icon counter in the header should increment by `2`,
    *   **And** a toast notification should appear confirming the addition.

### Story 2.2: Cart Quantity Adjustment
**As a** customer,  
**I want to** change the quantity of an item directly in my cart,  
**So that** I don't have to go back to the product page.

**Acceptance Criteria:**
*   **Scenario 1: Increasing quantity below max stock**
    *   **Given** I am on the Cart page (`cart.html`) with an item,
    *   **When** I click the `+` button to increase the quantity,
    *   **Then** the item's line price and the cart subtotal should dynamically recalculate and update on the screen.
*   **Scenario 2: Decreasing quantity to zero**
    *   **Given** I have 1 unit of an item in my cart,
    *   **When** I click the `-` button,
    *   **Then** the system should prompt me confirming if I want to remove the item from the cart.

---

## Epic 3: Checkout & Payment
**As a** shopper ready to buy,  
**I want to** securely provide my shipping and payment details,  
**So that** I can complete my purchase.

### Story 3.1: Guest Checkout Flow
**As an** unregistered customer,  
**I want to** checkout without creating an account,  
**So that** I can complete my purchase faster.

**Acceptance Criteria:**
*   **Scenario 1: Proceeding as Guest**
    *   **Given** I have items in my cart and click "Proceed to Checkout",
    *   **When** the system presents the login/guest gateway,
    *   **And** I select "Checkout as Guest",
    *   **Then** I should be taken to the Shipping Information form without needing a password.

### Story 3.2: Applying Promo Code
**As a** customer,  
**I want to** apply a discount code during checkout,  
**So that** I can save money on my order.

**Acceptance Criteria:**
*   **Scenario 1: Applying a valid code**
    *   **Given** I am on the checkout summary page,
    *   **When** I enter a valid code (e.g., `LUX10`) and click "Apply",
    *   **Then** the subtotal should reflect a 10% discount,
    *   **And** a success message "Promo code applied successfully" should appear.
*   **Scenario 2: Applying an invalid/expired code**
    *   **Given** I am on the checkout summary page,
    *   **When** I enter an invalid code and click "Apply",
    *   **Then** the subtotal should remain unchanged,
    *   **And** an inline error message "Invalid or expired promo code" should appear in red below the input field.

---

## Epic 4: User Authentication
**As a** returning customer,  
**I want to** log into my account securely,  
**So that** I can access my order history and saved addresses.

### Story 4.1: Secure User Login
**As a** registered customer,  
**I want to** log in with my email and password,  
**So that** the system recognizes me.

**Acceptance Criteria:**
*   **Scenario 1: Incorrect Login Credentials**
    *   **Given** I am on the Login page (`auth.html`),
    *   **When** I enter an invalid email/password combination and submit,
    *   **Then** an error message "The email or password you entered is incorrect" should be displayed,
    *   **And** the password field should be cleared.

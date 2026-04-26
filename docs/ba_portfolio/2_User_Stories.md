# User Stories & Acceptance Criteria

**Project:** LuxRoom E-commerce
**Format:** Agile User Stories with Gherkin Acceptance Criteria
**Version:** 1.1

---

## Epic 1: Product Discovery & Evaluation

**As a** potential customer,
**I want to** browse and view detailed information about furniture pieces,
**So that** I can make an informed purchasing decision.

---

### Story 1.1: View Product Details
**As a** customer,
**I want to** view high-quality images, descriptions, and specifications of a product,
**So that** I know exactly what I am buying.

| Scenario | Story Points | Priority |
|:---------|:------------:|:--------:|
| Happy path - successful navigation | 2 | Must Have |
| Out of stock display | 2 | Must Have |

**Acceptance Criteria:**
*   **Scenario 1: Successful navigation to PDP**
    *   **Given** I am on the product listing page (`products.html`),
    *   **When** I click on a specific product card,
    *   **Then** I should be redirected to `detail.html?product={id}` displaying correct product title, price, description, and image gallery.

*   **Scenario 2: Out of Stock display**
    *   **Given** I am on a PDP for a product with 0 inventory,
    *   **When** the page loads,
    *   **Then** the "Add to Cart" button should be disabled and visually grayed out.
    *   **And** a "Out of Stock" badge should be displayed prominently near the price.

*   **Scenario 3: Invalid product ID**
    *   **Given** I navigate to `detail.html?product=invalid`,
    *   **When** the page loads,
    *   **Then** a 404 "Product Not Found" message should be displayed.
    *   **And** a link to return to products page should be shown.

*   **Scenario 4: Low stock warning**
    *   **Given** I am on a PDP for a product with stock ≤ 3,
    *   **When** the page loads,
    *   **Then** a "Only {n} left" warning badge should be displayed.

---

### Story 1.2: Browse Product Catalog
**As a** customer,
**I want to** filter and sort products by category, price, and availability,
**So that** I can find items that match my criteria quickly.

| Scenario | Story Points | Priority |
|:---------|:------------:|:--------:|
| Filter by category | 3 | Must Have |
| Sort by price (low/high) | 2 | Must Have |
| Combined filters | 5 | Should Have |

**Acceptance Criteria:**
*   **Scenario 1: Filter by category**
    *   **Given** I am on the products page,
    *   **When** I click on "Living Room" category filter,
    *   **Then** only products in "Living Room" category should be displayed.
    *   **And** The filter should be visually highlighted as active.

*   **Scenario 2: Sort by price low to high**
    *   **Given** I am on the products page with multiple products,
    *   **When** I select "Price: Low to High" from sort dropdown,
    *   **Then** products should reorder with lowest price first.

*   **Scenario 3: Filter and sort combined**
    *   **Given** I have applied "Bedroom" category filter,
    *   **When** I then sort by "Price: High to Low",
    *   **Then** products should be filtered AND sorted correctly.

*   **Scenario 4: No results found**
    *   **Given** I apply a filter that matches no products,
    *   **Then** an empty state message "No products found" should be displayed.
    *   **And** a "Clear Filters" button should be shown.

---

### Story 1.3: Search Products
**As a** customer,
**I want to** search for products using keywords,
**So that** I can find specific items without browsing categories.

| Scenario | Story Points | Priority |
|:---------|:------------:|:--------:|
| Basic keyword search | 3 | Must Have |
| Search with no results | 2 | Must Have |
| Search suggestions | 5 | Should Have |

**Acceptance Criteria:**
*   **Scenario 1: Successful search**
    *   **Given** I enter "sofa" in the search box,
    *   **When** I press Enter or click search icon,
    *   **Then** all products containing "sofa" in title/description should be displayed.

*   **Scenario 2: No search results**
    *   **Given** I search for "xyz123nonexistent",
    *   **Then** "No products found for 'xyz123nonexistent'" should be displayed.
    *   **And** suggested popular categories should be shown.

*   **Scenario 3: Search input validation**
    *   **Given** I enter only whitespace in the search box,
    *   **When** I submit,
    *   **Then** the search should be ignored and no action taken.

---

## Epic 2: Shopping Cart Management

**As a** customer,
**I want to** easily manage the items I intend to purchase,
**So that** I can review my order and adjust quantities before checking out.

---

### Story 2.1: Add Item to Cart
**As a** customer,
**I want to** add a product from the PDP to my cart,
**So that** it is saved for my final checkout.

| Scenario | Story Points | Priority |
|:---------|:------------:|:--------:|
| Happy path - add item | 2 | Must Have |
| Add out of stock item | 2 | Must Have |
| Add item with quantity | 3 | Must Have |

**Acceptance Criteria:**
*   **Scenario 1: Adding a configurable item**
    *   **Given** I am on a PDP for a product in stock,
    *   **When** I select quantity of `2` and click "Add to Cart",
    *   **Then** cart icon counter in header should increment by `2`.
    *   **And** a toast notification "Added {Product Name} to cart" should appear.

*   **Scenario 2: Attempting to add out of stock item**
    *   **Given** I am on a PDP for an out-of-stock product,
    *   **When** I click "Add to Cart",
    *   **Then** an error message "This item is currently out of stock" should be displayed.
    *   **And** button should remain disabled.

*   **Scenario 3: Cart persistence across sessions**
    *   **Given** I have added items to my cart,
    *   **When** I close browser and reopen the site,
    *   **Then** my cart items should still be present (via localStorage).

*   **Scenario 4: Guest cart limit**
    *   **Given** I am a guest user,
    *   **When** I attempt to add more than 20 items to cart,
    *   **Then** a warning "Maximum 20 items per guest cart" should be displayed.

---

### Story 2.2: Cart Quantity Adjustment
**As a** customer,
**I want to** change the quantity of an item directly in my cart,
**So that** I don't have to go back to the product page.

| Scenario | Story Points | Priority |
|:---------|:------------:|:--------:|
| Increase quantity | 2 | Must Have |
| Decrease quantity | 2 | Must Have |
| Remove item | 1 | Must Have |
| Stock limit validation | 3 | Must Have |

**Acceptance Criteria:**
*   **Scenario 1: Increasing quantity below max stock**
    *   **Given** I am on Cart page with an item (quantity 1, stock 10),
    *   **When** I click the `+` button,
    *   **Then** quantity should update to `2`.
    *   **And** line price and subtotal should recalculate.

*   **Scenario 2: Decreasing quantity to zero**
    *   **Given** I have 1 unit of an item in cart,
    *   **When** I click the `-` button,
    *   **Then** item should be removed from cart.
    *   **And** a confirmation toast "Item removed from cart" should appear.

*   **Scenario 3: Attempting to exceed stock**
    *   **Given** I have an item with stock 5 in cart (quantity 5),
    *   **When** I click `+` to increase,
    *   **Then** a warning "Only 5 available" should be displayed.
    *   **And** quantity should remain at 5.

*   **Scenario 4: Bulk remove items**
    *   **Given** I am on the Cart page,
    *   **When** I click "Clear Cart",
    *   **Then** all items should be removed.
    *   **And** empty cart state should be displayed.

---

### Story 2.3: Apply Promo Code
**As a** customer,
**I want to** apply a discount code during checkout,
**So that** I can save money on my order.

| Scenario | Story Points | Priority |
|:---------|:------------:|:--------:|
| Valid promo code | 3 | Must Have |
| Invalid promo code | 2 | Must Have |
| Expired promo code | 2 | Must Have |

**Acceptance Criteria:**
*   **Scenario 1: Applying a valid code**
    *   **Given** I am on checkout with valid promo code `LUX10`,
    *   **When** I enter `LUX10` and click "Apply",
    *   **Then** 10% discount should be applied to subtotal.
    *   **And** success message "Promo code applied successfully" should appear.

*   **Scenario 2: Applying an invalid code**
    *   **Given** I enter an invalid code `INVALID`,
    *   **When** I click "Apply",
    *   **Then** error message "Invalid promo code" should appear.
    *   **And** subtotal should remain unchanged.

*   **Scenario 3: One promo per order (enforcement)**
    *   **Given** I already have promo `LUX10` applied,
    *   **When** I enter another code `SAVE5`,
    *   **Then** error "Only one promo code allowed per order" should appear.

---

## Epic 3: Checkout & Payment

**As a** shopper ready to buy,
**I want to** securely provide my shipping and payment details,
**So that** I can complete my purchase.

---

### Story 3.1: Guest Checkout Flow
**As an** unregistered customer,
**I want to** checkout without creating an account,
**So that** I can complete my purchase faster.

| Scenario | Story Points | Priority |
|:---------|:------------:|:--------:|
| Proceed as guest | 3 | Must Have |
| Guest cart to registered cart merge | 8 | Could Have |

**Acceptance Criteria:**
*   **Scenario 1: Proceeding as Guest**
    *   **Given** I have items in cart and click "Proceed to Checkout",
    *   **When** login/guest gateway is presented,
    *   **And** I select "Checkout as Guest",
    *   **Then** I should be taken to Shipping Information form without password requirement.

*   **Scenario 2: Guest checkout shipping form validation**
    *   **Given** I am on guest checkout shipping form,
    *   **When** I submit with missing required fields,
    *   **Then** inline validation errors should appear next to each empty required field.

---

### Story 3.2: Payment Processing
**As a** customer,
**I want to** enter my payment details securely,
**So that** I can complete my purchase.

| Scenario | Story Points | Priority |
|:---------|:------------:|:--------:|
| Happy path payment | 5 | Must Have |
| Payment declined | 3 | Must Have |
| Session timeout during payment | 5 | Must Have |

**Acceptance Criteria:**
*   **Scenario 1: Successful payment**
    *   **Given** I have completed shipping form and selected payment method,
    *   **When** I enter valid card details and submit,
    *   **Then** payment should be processed via Stripe.
    *   **And** Order Success page should be displayed.
    *   **And** Order ID should be shown.
    *   **And** cart should be cleared.

*   **Scenario 2: Payment declined**
    *   **Given** I enter invalid card details,
    *   **When** I submit payment,
    *   **Then** error "Payment declined. Please try another card." should be displayed.
    *   **And** cart items should remain intact.

*   **Scenario 3: Session timeout during payment**
    *   **Given** my session expires while on payment page,
    *   **When** I submit payment,
    *   **Then** redirect to login with message "Session expired. Please log in again."
    *   **And** cart should remain preserved.

*   **Scenario 4: Double-submit prevention**
    *   **Given** I am submitting payment,
    *   **When** I click submit button multiple times rapidly,
    *   **Then** only one payment should be processed.
    *   **And** button should be disabled after first click.

---

### Story 3.3: Order Confirmation
**As a** customer,
**I want to** receive confirmation of my order with details,
**So that** I know my purchase was successful.

| Scenario | Story Points | Priority |
|:---------|:------------:|:--------:|
| Order success display | 2 | Must Have |
| Order email confirmation | 5 | Must Have |

**Acceptance Criteria:**
*   **Scenario 1: Order success page**
    *   **Given** my payment is successful,
    *   **When** I am redirected to success page,
    *   **Then** Order ID, items purchased, shipping address, and total should be displayed.
    *   **And** "Continue Shopping" button should be available.

---

## Epic 4: User Authentication

**As a** returning customer,
**I want to** log into my account securely,
**So that** I can access my order history and saved addresses.

---

### Story 4.1: User Registration
**As a** new customer,
**I want to** create an account with email and password,
**So that** I can save my information for future purchases.

| Scenario | Story Points | Priority |
|:---------|:------------:|:--------:|
| Successful registration | 3 | Must Have |
| Email already exists | 2 | Must Have |
| Password strength validation | 3 | Must Have |

**Acceptance Criteria:**
*   **Scenario 1: Successful registration**
    *   **Given** I fill registration form with valid email and password,
    *   **When** I click "Create Account",
    *   **Then** account should be created in database.
    *   **And** welcome email should be sent.
    *   **And** I should be auto-logged in.

*   **Scenario 2: Email already registered**
    *   **Given** I enter an email that already exists,
    *   **When** I submit,
    *   **Then** error "An account with this email already exists" should be displayed.

*   **Scenario 3: Weak password**
    *   **Given** I enter password "123",
    *   **When** I submit,
    *   **Then** error "Password must be at least 8 characters with 1 uppercase and 1 number" should be displayed.

---

### Story 4.2: User Login
**As a** registered customer,
**I want to** log in with my email and password,
**So that** the system recognizes me.

| Scenario | Story Points | Priority |
|:---------|:------------:|:--------:|
| Successful login | 2 | Must Have |
| Incorrect credentials | 2 | Must Have |
| Account locked after failures | 5 | Should Have |

**Acceptance Criteria:**
*   **Scenario 1: Successful login**
    *   **Given** I am on Login page with valid credentials,
    *   **When** I enter correct email/password and submit,
    *   **Then** I should be authenticated.
    *   **And** redirected to previous page or homepage.

*   **Scenario 2: Incorrect credentials**
    *   **Given** I enter wrong password,
    *   **When** I submit,
    *   **Then** error "The email or password you entered is incorrect" should be displayed.
    *   **And** password field should be cleared.

*   **Scenario 3: Account lockout**
    *   **Given** I fail login 5 times in a row,
    *   **When** I attempt to login again,
    *   **Then** account should be locked for 15 minutes.
    *   **And** message "Account temporarily locked. Try again in 15 minutes." should be shown.

---

### Story 4.3: User Logout
**As a** logged-in customer,
**I want to** log out of my account,
**So that** I can secure my account on shared devices.

| Scenario | Story Points | Priority |
|:---------|:------------:|:--------:|
| Successful logout | 1 | Must Have |

**Acceptance Criteria:**
*   **Scenario 1: Logout**
    *   **Given** I am logged in,
    *   **When** I click "Logout",
    *   **Then** session should be destroyed.
    *   **And** I should be redirected to homepage.
    *   **And** cart should persist.

---

## Epic 5: User Profile Management

**As a** logged-in customer,
**I want to** manage my profile information,
**So that** I can keep my details up to date.

---

### Story 5.1: View Order History
**As a** returning customer,
**I want to** view my past orders,
**So that** I can track deliveries and reorder items.

| Scenario | Story Points | Priority |
|:---------|:------------:|:--------:|
| View order history | 5 | Must Have |
| Order detail view | 3 | Must Have |

**Acceptance Criteria:**
*   **Scenario 1: View order list**
    *   **Given** I am logged in,
    *   **When** I navigate to Order History,
    *   **Then** list of past orders should be displayed with date, order ID, status, and total.

*   **Scenario 2: View order details**
    *   **Given** I am on Order History,
    *   **When** I click on an order,
    *   **Then** full order details including items, shipping address, and payment info should be displayed.

---

## Non-Functional Requirements (NFRs)

### Performance
| ID | Requirement | Acceptance Criteria |
|:---|:------------|:--------------------|
| NFR-P01 | Page load time | First Contentful Paint < 2 seconds |
| NFR-P02 | API response time | GET requests < 200ms, POST requests < 500ms |
| NFR-P03 | Concurrent users | Support 1000+ simultaneous users |
| NFR-P04 | Cart operations | Add/update/remove < 100ms |

### Security
| ID | Requirement | Acceptance Criteria |
|:---|:------------|:--------------------|
| NFR-S01 | Password storage | bcrypt with cost factor ≥ 12 |
| NFR-S02 | Session management | JWT with 24h expiry, httpOnly cookies |
| NFR-S03 | Input validation | All user inputs sanitized server-side |
| NFR-S04 | HTTPS | TLS 1.3 mandatory for all traffic |

### Accessibility
| ID | Requirement | Acceptance Criteria |
|:---|:------------|:--------------------|
| NFR-A01 | WCAG compliance | WCAG 2.1 Level AA |
| NFR-A02 | Keyboard navigation | All interactive elements accessible via keyboard |
| NFR-A03 | Screen reader | Proper ARIA labels on all form elements |

### Compatibility
| ID | Requirement | Acceptance Criteria |
|:---|:------------|:--------------------|
| NFR-C01 | Browser support | Chrome 90+, Firefox 88+, Safari 14+, Edge 90+ |
| NFR-C02 | Mobile support | iOS Safari 14+, Chrome Android 90+ |
| NFR-C03 | Responsive | Optimal experience at 320px, 768px, 1024px, 1440px |

---

## Spike Stories (Technical Unknowns)

| ID | Spike | Purpose | Max Time |
|:---|:-----|:--------|:---------|
| SP-01 | Payment gateway webhook handling | Understand Stripe webhook reliability for order confirmation | 3 days |
| SP-02 | Image optimization strategy | Determine best CDN/caching strategy for high-res product images | 2 days |
| SP-03 | Search implementation | Evaluate Algolia vs native Elasticsearch for search | 3 days |

---

## Story Point Reference

| Point | Complexity | Description |
|:-----:|:----------:|:------------|
| 1 | trivial | Simple change, no logic, no testing needed |
| 2 | easy | Small change, minimal testing |
| 3 | medium | Standard feature, standard testing |
| 5 | complex | Multiple moving parts, significant testing |
| 8 | large | Complex feature requiring significant time |
| 13 | very large | Epic-sized, should be split |

---

## Document History

| Version | Date | Author | Changes |
|:--------|:-----|:-------|:--------|
| 1.0 | April 2026 | BA | Initial user stories |
| 1.1 | April 2026 | BA | Added: negative scenarios, NFRs, story points, spike stories, Epic 5 |

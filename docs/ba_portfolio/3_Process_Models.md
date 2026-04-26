# Business Process Models

**Project:** LuxRoom E-commerce
**Modeling Standard:** BPMN 2.0 (represented via Mermaid Flowcharts)
**Version:** 1.1

These process models illustrate the core user journeys within the LuxRoom platform, including swimlane diagrams for role clarity and comprehensive exception handling.

---

## 1. End-to-End Shopping & Checkout Flow

### 1.1 Swimlane Diagram (User vs System vs External)

```mermaid
graph LR
    subgraph Customer
        A([Start: User visits Homepage])
    end

    subgraph LuxRoom System
        B(Browse Product Catalog)
        C{View Product Details?}
        D(View PDP)
        E{Stock Available?}
        F[Out of Stock Message]
        G(Select Quantity)
        H(Add to Cart)
        I(Show Toast Notification)
        J(Review Cart)
        K{Checkout as Guest or Login?}
        L(Checkout Form)
        M(Select Shipping)
        N(Select Payment)
        O[Process Payment via Stripe]
        P{Payment Success?}
        Q[Order Confirmation]
    end

    subgraph External
        R((Stripe Payment Gateway))
        S((Email Service))
    end

    A --> B
    B --> C
    C -->|Yes| D
    C -->|No| B
    D --> E
    E -->|No| F
    F --> B
    E -->|Yes| G
    G --> H
    H --> I
    I --> J
    J --> K
    K -->|Guest| L
    K -->|Login| M
    L --> M
    M --> N
    N --> O
    O --> R
    R -->|Success| P
    R -->|Declined| P
    P -->|Yes| Q
    P -->|No| N
    Q --> S
```

### 1.2 Detailed Flow with Exception Handling

```mermaid
flowchart TD
    Start([Start: User visits Homepage/Products]) --> Browse

    Browse(Browse Product Catalog) --> SelectProduct{Selects Product for details?}

    SelectProduct -->|Yes| ViewPDP(View Product Detail Page)
    SelectProduct -->|No| Browse

    ViewPDP --> CheckStock{Item in stock?}

    CheckStock -->|No| OutOfStock(Display 'Out of Stock' & Disable Add Button)
    OutOfStock --> NotifyMe(Show 'Notify Me' Form)
    NotifyMe --> Browse

    CheckStock -->|Yes| SelectQty(Select Quantity & Click 'Add to Cart')

    SelectQty --> ValidateQty{Quantity valid?}
    ValidateQty -->|Exceeds Stock| StockWarning(Show 'Only {n} left' warning)
    StockWarning --> SelectQty

    ValidateQty -->|Valid| AddCart(Add Item to Cart)
    AddCart --> UpdateUI(Update Cart Icon Badge & Show Toast)

    UpdateUI --> Continue{Continue Shopping?}

    Continue -->|Yes| Browse
    Continue -->|No| GoCart(Go to Cart Page)

    GoCart --> ReviewCart(Review Items, Quantities, Subtotal)

    ReviewCart --> AdjustCart{Adjust Cart?}
    AdjustCart -->|Yes| EditCart(Edit Quantities or Remove Items)
    EditCart --> Recalculate(Calculate New Subtotal)
    Recalculate --> ReviewCart
    AdjustCart -->|No| ProceedCheckout

    ProceedCheckout --> CheckAuth{Is User Logged In?}

    CheckAuth -->|Yes| LoadProfile(Load Saved Addresses & Default Info)
    CheckAuth -->|No| GuestChoice{Guest Checkout?}

    GuestChoice -->|No| RedirectLogin(Redirect to Login/Register)
    RedirectLogin --> LoginPage[/Login Form/]
    LoginPage --> Authenticate[Authenticate User]
    Authenticate -->|Success| LoadProfile
    Authenticate -->|Failure| ShowAuthError(Show Error & Retry)
    ShowAuthError --> LoginPage

    GuestChoice -->|Yes| BlankForm(Show Blank Checkout Form)

    LoadProfile --> ShippingForm
    BlankForm --> ShippingForm[/Enter Shipping Details/]

    ShippingForm --> ValidateShipping{Shipping Valid?}
    ValidateShipping -->|Invalid| ShowShippingError(Show Field-level Errors)
    ShowShippingError --> ShippingForm

    ValidateShipping -->|Valid| PaymentStep

    PaymentStep --> SelectPayment(Select Payment Method)
    SelectPayment --> EnterPayment[/Enter Payment Details/]

    EnterPayment --> ProcessPayment[Process Payment securely via Stripe]

    ProcessPayment --> PaymentResult{Payment Successful?}

    PaymentResult -->|No| PaymentError(Display Payment Error Message)
    PaymentError --> RetryPayment{Retry Payment?}
    RetryPayment -->|Yes| SelectPayment
    RetryPayment -->|No| AbandonCart(Abandon Checkout)
    AbandonCart --> EndAbandon([End: User Abandoned])

    PaymentResult -->|Yes| GenerateOrder(Generate Order ID & Clear Cart)
    GenerateOrder --> SendEmail(Send Order Confirmation Email)
    SendEmail --> ShowSuccess(Show Order Success Page)
    ShowSuccess --> EndSuccess([End: Order Complete])
```

---

## 2. User Authentication Flow

### 2.1 Swimlane Diagram

```mermaid
graph LR
    subgraph Customer
        A([Start: User clicks Login/Register])
    end

    subgraph LuxRoom System
        B(Navigate to auth.html)
        C{Existing Account?}
        D(Registration Form)
        E(Login Form)
        F[Validate Input]
        G[Create Account in DB]
        H[Authenticate Credentials]
        I{Credentials Valid?}
        J[Generate JWT Session]
        K[Create Account Record]
    end

    subgraph External
        L((Email Service))
        M((Password Hashing Service))
    end

    A --> B
    B --> C
    C -->|No| D
    C -->|Yes| E
    D --> F
    E --> F
    F --> M
    M -->|Hash| K
    K --> G
    G --> L
    L -->|Welcome Email| J
    F --> H
    H --> I
    I -->|Yes| J
    J --> Redirect([End: Authenticated & Redirected])
    I -->|No| ErrorShow(Show Error Message)
    ErrorShow --> E
```

### 2.2 Registration Flow with Validation

```mermaid
flowchart TD
    Start([Start: User clicks Register]) --> OpenForm

    OpenForm(Open Registration Form) --> EnterDetails

    EnterDetails[/Enter: Email, Password, Confirm Password/] --> ValidateEmail

    ValidateEmail{Valid Email Format?}
    ValidateEmail -->|No| EmailError(Show 'Invalid email format')
    EmailError --> EnterDetails

    ValidateEmail -->|Yes| CheckEmailExists{Check if Email Exists in DB}

    CheckEmailExists{Email Already Registered?}
    CheckEmailExists -->|Yes| EmailExistsError(Show 'Email already registered')
    EmailExistsError --> EnterDetails

    CheckEmailExists -->|No| ValidatePassword

    ValidatePassword{Password Meets Requirements?}
    ValidatePassword -->|No| PasswordError(Show 'Password must be 8+ chars with uppercase and number')
    PasswordError --> EnterDetails

    ValidatePassword -->|Yes| CheckPasswordMatch{Passwords Match?}

    CheckPasswordMatch -->|No| MatchError(Show 'Passwords do not match')
    MatchError --> EnterDetails

    CheckPasswordMatch -->|Yes| CreateAccount

    CreateAccount(Hash Password with bcrypt) --> StoreUser

    StoreUser(Create User Record in Database) --> SendWelcome

    SendWelcome(Queue Welcome Email) --> EmailSent((External: SendGrid/SES))
    EmailSent --> AutoLogin

    AutoLogin(Generate JWT Token & Set Session) --> RedirectHome

    RedirectHome(Redirect to Homepage) --> End([End: Registration Complete])
```

### 2.3 Login Flow with Lockout

```mermaid
flowchart TD
    Start([Start: User clicks Login]) --> OpenLogin

    OpenLogin(Open Login Form) --> EnterCredentials[/Enter Email & Password/]

    EnterCredentials --> Authenticate

    Authenticate[Query Database for User] --> UserFound{User Found?}

    UserFound -->|No| UnknownUser(Show 'Invalid credentials')
    UnknownUser --> IncrementFailed
    IncrementFailed(Increment Failed Login Counter) --> CheckLockout

    UserFound -->|Yes| VerifyPassword
    VerifyPassword{Verify Password Hash} --> PasswordMatch{Match?}

    PasswordMatch -->|No| InvalidPassword(Show 'Invalid credentials')
    InvalidPassword --> IncrementFailed

    CheckLockout{Check Failed Login Count}
    CheckLockout -->|≥ 5| LockAccount(Show 'Account locked for 15 minutes')
    LockAccount --> EndLocked([End: Account Locked])

    CheckLockout -->|< 5| AllowRetry
    AllowRetry(Show remaining attempts) --> EndRetry([End: Show Error])

    PasswordMatch -->|Yes| ResetCounter(Reset Failed Login Counter to 0)
    ResetCounter --> GenerateSession

    GenerateSession(Generate JWT Token) --> SetCookie(Set httpOnly Session Cookie)
    SetCookie --> RedirectUser

    RedirectUser{Redirect to:}
    RedirectUser -->|Intended URL| IntendedPage
    RedirectUser -->|Homepage| Homepage[/Homepage/]
    RedirectUser -->|Checkout| CheckoutPage[/Checkout Page/]

    IntendedPage --> EndSuccess([End: Logged In])
    Homepage --> EndSuccess
    CheckoutPage --> EndSuccess
```

---

## 3. Cart Management Flow

```mermaid
flowchart TD
    Start([Start: User adds item to cart]) --> CheckStock

    CheckStock{Product in Stock?}
    CheckStock -->|No| OutOfStockError(Show 'Out of Stock' error)
    OutOfStockError --> EndError([End: Item not added])

    CheckStock -->|Yes| GetCart

    GetCart(Retrieve Cart from localStorage/DB) --> CheckCartExists{Cart Exists?}

    CheckCartExists -->|No| CreateNewCart
    CreateNewCart(Create New Cart Record) --> CheckLimit

    CheckCartExists -->|Yes| CheckItemInCart{Item Already in Cart?}

    CheckItemInCart -->|Yes| UpdateQuantity
    CheckItemInCart -->|No| AddNewItem

    UpdateQuantity(New Qty = Existing Qty + Selected Qty) --> CheckMaxStock
    AddNewItem(Add New Cart Item Record) --> CheckMaxStock

    CheckMaxStock{New Qty ≤ Stock?}
    CheckMaxStock -->|No| ExceedStockError(Show 'Only {n} available')
    ExceedStockError --> EndError

    CheckMaxStock -->|Yes| CheckGuestLimit{Is Guest User?}

    CheckGuestLimit -->|Yes| Check20Items{Cart Items ≥ 20?}
    CheckGuestLimit -->|No| SaveCart

    Check20Items -->|Yes| GuestLimitError(Show 'Max 20 items for guest cart')
    GuestLimitError --> EndError

    Check20Items -->|No| SaveCart

    SaveCart(Save Cart to localStorage/Database) --> UpdateBadge

    UpdateBadge(Update Cart Icon Counter) --> ShowToast

    ShowToast(Show 'Added to cart' toast) --> EndSuccess([End: Item added])
```

---

## 4. Payment Processing Flow

```mermaid
flowchart TD
    Start([Start: User submits payment]) --> Dedup{Check for duplicate submission?}

    Dedup{Already processing?}
    Dedup -->|Yes| DedupError(Show 'Payment already in progress')
    DedupError --> EndDuplicate([End: Prevent duplicate])

    Dedup -->|No| LockPayment(Lock payment button) --> ValidateCard

    ValidateCard{Validate Card Data?}
    ValidateCard -->|No| CardError(Show 'Invalid card details')
    CardError --> UnlockPayment
    UnlockPayment(Unlock payment button) --> EndError([End: Validation failed])

    ValidateCard -->|Yes| CheckStockPreFlight

    CheckStockPreFlight{Verify all items still in stock?}
    CheckStockPreFlight -->|No| StockIssue
    StockIssue(Show 'Some items no longer available')
    StockIssue --> RemoveUnavailable(Remove unavailable items from cart)
    RemoveUnavailable --> ShowUpdatedCart(Show updated cart with message)

    CheckStockPreFlight -->|Yes| CreatePaymentIntent

    CreatePaymentIntent(Create Stripe PaymentIntent) --> SendToStripe

    SendToStripe[Send payment data to Stripe] --> StripeResult

    StripeResult{Stripe Response}
    StripeResult -->|Success| ProcessSuccess
    StripeResult -->|Declined| ProcessDeclined
    StripeResult -->|Error| ProcessError

    ProcessSuccess(Record payment success in DB) --> GenerateOrder
    GenerateOrder(Create Order Record) --> ClearCart
    ClearCart(Clear Cart items) --> SendConfirmation
    SendConfirmation(Trigger confirmation email) --> EndSuccess([End: Order complete])

    ProcessDeclined(Record decline reason) --> ShowDecline
    ShowDecline(Show 'Payment declined. Try another card.') --> UnlockPayment

    ProcessError(Record error log) --> ShowError
    ShowError(Show 'Payment error. Please try again.') --> UnlockPayment
```

---

## 5. Order Fulfillment Flow (Backend)

```mermaid
flowchart TD
    Start([Start: Order Created]) --> CheckOrder

    CheckOrder{Order Valid?}
    CheckOrder -->|No| CancelOrder
    CancelOrder(Cancel Order, Release Stock) --> NotifyCustomer
    NotifyCustomer(Send cancellation email) --> EndCancel([End: Order cancelled])

    CheckOrder -->|Yes| ProcessPayment

    ProcessPayment{Payment Confirmed?}
    ProcessPayment -->|No| HoldOrder
    HoldOrder(Mark Order as PENDING_PAYMENT) --> WaitPayment
    WaitPayment(Wait for payment retry) --> CheckRetry

    CheckRetry{Retry within 24h?}
    CheckRetry -->|No| ExpireOrder
    ExpireOrder(Auto-cancel order) --> EndExpired

    CheckRetry -->|Yes| ProcessPayment

    ProcessPayment -->|Yes| ReserveStock

    ReserveStock(Reserve inventory for each item) --> StockOk{Stock Available?}

    StockOk -->|Partial| PartialStock
    PartialStock(Notify customer of partial availability)
    PartialStock --> FulfillAvailable(Fulfill available items)
    FulfillAvailable --> PartialEmail

    StockOk -->|No| NoStock
    NoStock(Full refund initiated) --> NoStockEmail(Send refund notification)
    NoStockEmail --> EndRefunded

    StockOk -->|Yes| FullFulfill

    FullFulfill(Mark Order as PROCESSING) --> NotifyShip

    NotifyShip(Notify warehouse) --> ShipOrder
    ShipOrder(Ship order & get tracking) --> SendTracking
    SendTracking(Send tracking email to customer) --> UpdateStatus

    UpdateStatus(Mark Order as SHIPPED) --> EndShipped([End: Order shipped])
```

---

## Document History

| Version | Date | Author | Changes |
|:--------|:-----|:-------|:--------|
| 1.0 | April 2026 | BA | Initial process models |
| 1.1 | April 2026 | BA | Added: Swimlane diagrams, exception handling flows, order fulfillment |

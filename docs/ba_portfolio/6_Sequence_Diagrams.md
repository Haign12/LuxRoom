# Sơ Đồ Sequence — LuxRoom E-commerce

**Project:** LuxRoom E-commerce
**Loại:** Sequence Diagram (UML)
**Version:** 1.0
**Mục đích:** Mô tả tương tác chi tiết theo thời gian giữa các thành phần

---

## 1. Tổng Quan Sequence Diagram

Sequence Diagram cho biết:
- **Thứ tự thời gian** các bước xảy ra
- **Ai** (Actor, System, Database) tham gia vào từng bước
- **Tin nhắn** (message) được gửi qua lại như thế nào
- **Thời gian chờ** và xử lý ở mỗi bước

---

## 2. Sequence: Thêm Vào Giỏ Hàng

**Mục đích:** Khi khách hàng thêm sản phẩm vào giỏ

```mermaid
sequenceDiagram
    autonumber
    participant Customer as "👤 Khách hàng"
    participant Browser as "🖥️ Trình duyệt"
    participant API as "⚙️ API LuxRoom"
    participant DB as "💾 Database"
    participant Redis as "⚡ Redis (Cache)"

    Customer->>Browser: 1. Click "Thêm vào giỏ"
    Browser->>API: 2. POST /cart/items {product_id, quantity}

    API->>DB: 3. Kiểm tra sản phẩm tồn tại
    DB-->>API: 4. Product info returned

    API->>DB: 5. Kiểm tra tồn kho (stock_quantity)
    DB-->>API: 6. Stock OK (qty=5)

    alt Hết hàng
        API-->>Browser: 7a. 400 OUT_OF_STOCK
        Browser->>Customer: 7b. Hiện thông báo "Hết hàng"
    else Vượt tồn kho
        API-->>Browser: 7c. 400 INSUFFICIENT_STOCK
        Browser->>Customer: 7d. Hiện "Chỉ còn 5 sản phẩm"
    else OK
        API->>DB: 8. INSERT cart_item
        DB-->>API: 9. Cart item created

        API->>Redis: 10. Cập nhật cart count cache
        Redis-->>API: 11. Cache updated

        API-->>Browser: 12. 201 Created {cart_item}
        Browser->>Customer: 13. Toast "Đã thêm vào giỏ"
        Browser->>Customer: 14. Cập nhật badge số lượng
    end
```

**Các bước chính:**
1. Khách click nút "Thêm vào giỏ"
2. Trình duyệt gửi yêu cầu đến API
3. API kiểm tra sản phẩm và tồn kho
4. Nếu OK → lưu vào database
5. Trả kết quả về trình duyệt và cập nhật UI

---

## 3. Sequence: Quy Trình Checkout (Thanh Toán)

**Mục đích:** Từ lúc bắt đầu thanh toán đến hoàn tất đơn hàng

```mermaid
sequenceDiagram
    autonumber
    participant Customer as "👤 Khách hàng"
    participant Browser as "🖥️ Trình duyệt"
    participant API as "⚙️ API LuxRoom"
    participant Stripe as "💳 Stripe"
    participant DB as "💾 Database"
    participant Email as "📧 Email Service"

    Customer->>Browser: 1. Click "Đặt hàng"
    Browser->>API: 2. GET /cart

    alt Giỏ trống
        API-->>Browser: 3a. 400 Empty Cart
        Browser->>Customer: 3b. Hiện "Giỏ hàng trống"
    else Có sản phẩm
        DB-->>Browser: 4. Cart data
        Browser->>Customer: 5. Hiển thị trang checkout
    end

    Customer->>Browser: 6. Điền thông tin giao hàng
    Customer->>Browser: 7. Chọn phương thức thanh toán
    Customer->>Browser: 8. Click "Thanh toán"

    Browser->>API: 9. POST /checkout/payment-intent
    API->>Stripe: 10. Create PaymentIntent

    alt Thanh toán bị từ chối
        Stripe-->>API: 11a. Payment declined
        API-->>Browser: 12a. 400 Payment Failed
        Browser->>Customer: 13a. Hiện lỗi, cho thử lại
    else Thanh toán thành công
        Stripe-->>API: 11b. Payment succeeded
        API->>DB: 12. Tạo ORDER record
        DB-->>API: 13. Order created

        API->>DB: 14. Cập nhật tồn kho (stock - qty)
        DB-->>API: 15. Stock updated

        API->>DB: 16. Xóa cart items
        DB-->>API: 17. Cart cleared

        API->>Email: 18. Gửi email xác nhận
        Email-->>API: 19. Email sent

        API-->>Browser: 20. 201 Order confirmed
        Browser->>Customer: 21. Hiển thị trang thành công
        Browser->>Customer: 22. Gửi email xác nhận
    end
```

**Các bước chính:**
1. Khách xem giỏ hàng và chuyển sang checkout
2. Điền thông tin giao hàng
3. Tạo PaymentIntent với Stripe
4. Stripe xử lý thanh toán
5. Nếu thành công → tạo đơn hàng, cập nhật kho
6. Gửi email xác nhận cho khách

---

## 4. Sequence: Đăng Ký Tài Khoản

**Mục đích:** Khi khách hàng mới tạo tài khoản

```mermaid
sequenceDiagram
    autonumber
    participant Customer as "👤 Khách hàng"
    participant Browser as "🖥️ Trình duyệt"
    participant API as "⚙️ API LuxRoom"
    participant DB as "💾 Database"
    participant bcrypt as "🔐 bcrypt (hash)"
    participant Email as "📧 Email Service"

    Customer->>Browser: 1. Click "Đăng ký"
    Browser->>Customer: 2. Hiển thị form đăng ký

    Customer->>Browser: 3. Nhập email, password
    Browser->>API: 4. POST /auth/register

    API->>DB: 5. Kiểm tra email đã tồn tại?
    DB-->>API: 6. Email chưa tồn tại

    API->>bcrypt: 7. Hash password
    bcrypt-->>API: 8. Password hash created

    API->>DB: 9. INSERT new user
    DB-->>API: 10. User created

    API->>Email: 11. Gửi welcome email
    Email-->>API: 12. Email queued

    API->>API: 13. Tạo JWT token

    API-->>Browser: 14. 201 {user, token}
    Browser->>Customer: 15. Redirect homepage
    Browser->>Customer: 16. Toast "Chào mừng!"

```

**Các bước chính:**
1. Khách điền form đăng ký
2. API kiểm tra email chưa tồn tại
3. Mã hóa password bằng bcrypt
4. Lưu user vào database
5. Gửi email chào mừng
6. Tạo token và đăng nhập tự động

---

## 5. Sequence: Đăng Nhập

**Mục đích:** Khi khách hàng đăng nhập vào tài khoản

```mermaid
sequenceDiagram
    autonumber
    participant Customer as "👤 Khách hàng"
    participant Browser as "🖥️ Trình duyệt"
    participant API as "⚙️ API LuxRoom"
    participant DB as "💾 Database"
    participant bcrypt as "🔐 bcrypt"

    Customer->>Browser: 1. Click "Đăng nhập"
    Browser->>Customer: 2. Hiển thị form đăng nhập

    Customer->>Browser: 3. Nhập email, password
    Browser->>API: 4. POST /auth/login

    API->>DB: 5. Tìm user theo email
    DB-->>API: 6. User found / User not found

    alt User không tồn tại
        API-->>Browser: 7a. 401 Invalid credentials
        Browser->>Customer: 7b. Hiện lỗi "Email không tồn tại"
    else User tồn tại
        API->>bcrypt: 8. So sánh password
        bcrypt-->>API: 9. Match / No match

        alt Password sai
            API-->>Browser: 10a. 401 Invalid credentials
            Browser->>Customer: 10b. Hiện lỗi "Sai mật khẩu"
        else Password đúng
            API->>API: 11. Reset failed login counter

            API->>API: 12. Tạo JWT access token
            API->>API: 13. Tạo refresh token

            API-->>Browser: 14. 200 {access_token, refresh_token}
            Browser->>Browser: 15. Lưu token vào cookie

            Browser->>Customer: 16. Redirect về trang trước đó
        end
    end
```

---

## 6. Sequence: Theo Dõi Trạng Thái Đơn Hàng

**Mục đích:** Khi khách xem tình trạng đơn hàng

```mermaid
sequenceDiagram
    autonumber
    participant Customer as "👤 Khách hàng"
    participant Browser as "🖥️ Trình duyệt"
    participant API as "⚙️ API LuxRoom"
    participant DB as "💾 Database"

    Customer->>Browser: 1. Vào trang "Đơn hàng của tôi"
    Browser->>API: 2. GET /orders
    API->>DB: 3. SELECT orders WHERE user_id = current_user

    DB-->>API: 4. List orders returned
    API-->>Browser: 5. 200 {orders: [...]}
    Browser->>Customer: 6. Hiển thị danh sách đơn hàng

    Customer->>Browser: 7. Click vào đơn hàng cụ thể
    Browser->>API: 8. GET /orders/{id}
    API->>DB: 9. SELECT order + order_details
    DB-->>API: 10. Full order details

    API-->>Browser: 11. 200 {order with items}
    Browser->>Customer: 12. Hiển thị chi tiết + timeline trạng thái

    Note over Customer,Browser: Trạng thái: PENDING → PAID → PROCESSING → SHIPPED → DELIVERED
```

---

## 7. Sequence: Quản Lý Tồn Kho (Admin)

**Mục đích:** Khi admin cập nhật số lượng tồn kho

```mermaid
sequenceDiagram
    autonumber
    participant Admin as "👤 Quản trị viên"
    participant Browser as "🖥️ Trình duyệt"
    participant API as "⚙️ API LuxRoom"
    participant DB as "💾 Database"

    Admin->>Browser: 1. Đăng nhập Admin Portal
    Browser->>API: 2. POST /auth/login (admin)
    API-->>Browser: 3. JWT admin token
    Browser->>Browser: 4. Redirect to /admin

    Admin->>Browser: 5. Click "Quản lý sản phẩm"
    Browser->>API: 6. GET /admin/products
    API->>DB: 7. SELECT all products
    DB-->>Browser: 8. Products list
    Browser->>Admin: 9. Hiển thị danh sách sản phẩm

    Admin->>Browser: 10. Chọn sản phẩm → Sửa số lượng
    Browser->>Admin: 11. Form cập nhật tồn kho

    Admin->>Browser: 12. Nhập số lượng mới (VD: 50)
    Admin->>Browser: 13. Click "Lưu"

    Browser->>API: 14. PUT /admin/products/{id}
    API->>DB: 15. UPDATE stock_quantity = 50
    DB-->>API: 16. Updated successfully

    API-->>Browser: 17. 200 Success
    Browser->>Admin: 18. Toast "Đã cập nhật tồn kho"
    Browser->>Admin: 19. Cập nhật số lượng trên giao diện
```

---

## 8. Bảng Tổng Hợp Sequence

| Sequence | Mục đích | Actors | Số bước |
|:---------|:---------|:-------|:--------|
| Thêm vào giỏ | Thêm sản phẩm vào cart | Customer → API → DB | 14 |
| Checkout | Thanh toán đơn hàng | Customer → Browser → API → Stripe → DB → Email | 22 |
| Đăng ký | Tạo tài khoản mới | Customer → API → DB → bcrypt → Email | 16 |
| Đăng nhập | Đăng nhập hệ thống | Customer → API → DB → bcrypt | 16 |
| Theo dõi đơn | Xem trạng thái đơn hàng | Customer → API → DB | 12 |
| Quản lý kho | Admin cập nhật tồn kho | Admin → API → DB | 19 |

---

## Document History

| Version | Date | Author | Changes |
|:--------|:-----|:-------|:---------|
| 1.0 | May 2026 | BA | Initial sequence diagrams |

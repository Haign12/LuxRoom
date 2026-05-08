# Sơ Đồ Kiến Trúc Hệ Thống — LuxRoom E-commerce

**Project:** LuxRoom E-commerce
**Loại:** Architecture Diagram
**Version:** 1.0
**Mục đích:** Mô tả tổng quan hệ thống được xây dựng trên nền tảng nào, các thành phần tương tác ra sao

---

## 1. Tổng Quan Kiến Trúc

Sơ đồ này cho biết:
- **Hệ thống gồm những phần nào** (layers/components)
- **Luồng dữ liệu** đi từ đâu đến đâu
- **Công nghệ** sử dụng cho mỗi phần
- **Hệ thống bên ngoài** nào được tích hợp

---

## 2. Sơ Đồ Kiến Trúc Tổng Quan

```mermaid
graph TB
    subgraph Client["🐚 LAYER 1: GIAO DIỆN NGƯỜI DÙNG"]
        W1["🌐 Website<br/>React / Next.js"]
        W2["📱 Mobile Web<br/>(Responsive)"]
        W3["⚙️ Admin Portal<br/>React Admin"]
    end

    subgraph CDN["📡 CDN & EDGE"]
        CDN1["☁️ Cloudflare<br/>Global CDN"]
        CDN2["🛡️ DDoS Protection"]
        CDN3["⚡ Edge Caching"]
    end

    subgraph Gateway["🚪 API GATEWAY"]
        GW1["🔄 Load Balancer<br/>(Vercel/Koyeb)"]
        GW2["🔒 Rate Limiting"]
        GW3["👤 Authentication<br/>(JWT validation)"]
    end

    subgraph Backend["⚙️ LAYER 2: BACKEND XỬ LÝ"]
        B1["🔐 Auth Service<br/>(Node.js/Express)"]
        B2["📦 Product Service<br/>(Node.js/Express)"]
        B3["🛒 Cart Service<br/>(Node.js/Express)"]
        B4["💳 Payment Service<br/>(Node.js/Express)"]
        B5["📋 Order Service<br/>(Node.js/Express)"]
        B6["📧 Notification Service<br/>(Node.js/Express)"]
    end

    subgraph External["🌐 DỊCH VỤ BÊN NGOÀI"]
        E1["💳 Stripe<br/>Thanh toán"]
        E2["📧 SendGrid/SES<br/>Email"]
        E3["📸 Cloudinary<br/>Hình ảnh"]
        E4["🗄️ S3<br/>Lưu trữ file"]
    end

    subgraph Data["💾 LAYER 3: DỮ LIỆU"]
        D1["🐘 PostgreSQL<br/>Database chính"]
        D2["⚡ Redis<br/>Cache & Session"]
        D3["🔌 Supabase<br/>(Backup & Realtime)"]
    end

    subgraph Deploy["🏗️ DEPLOYMENT"]
        DEP1["🚀 Vercel<br/>(Frontend)"]
        DEP2["☁️ Railway/Render<br/>(Backend)"]
        DEP3["🐳 Docker<br/>(Container)"]
    end

    %% Client connections
    W1 --> CDN1
    W2 --> CDN1
    W3 --> CDN1

    CDN1 --> GW1
    CDN2 -.-> CDN1
    CDN3 -.-> CDN1

    GW1 --> GW2
    GW2 --> GW3
    GW3 --> Backend

    %% Backend to External
    B4 --> E1
    B6 --> E2
    B2 --> E3
    B2 --> E4

    %% Backend to Data
    B1 --> D1
    B2 --> D1
    B3 --> D1
    B3 --> D2
    B4 --> D1
    B5 --> D1

    B1 --> D2
    B3 --> D2

    %% Deployment connections
    W1 -.部署.-> DEP1
    W2 -.部署.-> DEP1
    W3 -.部署.-> DEP2
    Backend -.部署.-> DEP2
    Backend -.部署.-> DEP3

    %% External to Data (rare)
    E1 -.-> D1
```

---

## 3. Sơ Đồ Luồng Dữ Liệu (Data Flow)

### 3.1 Luồng Người Dùng Mua Hàng

```mermaid
flowchart LR
    subgraph User["👤 Người dùng"]
        A[Trình duyệt Web]
    end

    subgraph Edge["📡 Edge Layer"]
        B[Cloudflare CDN]
        C[Cache tĩnh]
    end

    subgraph API["⚙️ Backend"]
        D[API Gateway]
        E[Auth Service]
        F[Product Service]
        G[Cart Service]
        H[Payment Service]
    end

    subgraph DB["💾 Dữ liệu"]
        I[(PostgreSQL)]
        J[(Redis)]
    end

    subgraph External["🌐 Bên ngoài"]
        K[Stripe]
        L[Email Service]
    end

    A -->|HTTPS| B
    B -->|Static assets| C
    B -->|API calls| D
    D -->|Validate| E
    E -->|Check| J
    D -->|Route| F
    D -->|Route| G
    D -->|Route| H

    F -->|Read| I
    G -->|Read/Write| I
    G -->|Cache| J
    H -->|Write| I
    H -->|Payment| K
    K -->|Webhook| H
    H -->|Notify| L
```

### 3.2 Luồng Xử Lý Đơn Hàng

```mermaid
flowchart TD
    subgraph Input["📥 Input"]
        A[Khách đặt hàng]
    end

    subgraph Process["⚙️ Xử lý"]
        B[Validate đơn hàng]
        C[Kiểm tra tồn kho]
        D[Tạo PaymentIntent]
        E[Stripe xử lý thanh toán]
        F[Tạo Order record]
        G[Cập nhật tồn kho]
        H[Xóa cart items]
    end

    subgraph Output["📤 Output"]
        I[Gửi email xác nhận]
        J[Trả kết quả về client]
    end

    A --> B
    B --> C
    C -->|OK| D
    C -->|Fail| J
    D --> E
    E -->|Success| F
    E -->|Fail| J
    F --> G
    G --> H
    H --> I
    I --> J
```

---

## 4. Kiến Trúc Chi Tiết Theo Layer

### 4.1 Layer 1: Giao Diện Người Dùng

| Component | Công nghệ | Mô tả |
|:----------|:---------|:-------|
| Website | Next.js / React | Giao diện chính cho khách hàng |
| Admin Portal | React Admin | Trang quản trị cho admin |
| Mobile Web | Responsive CSS | Giao diện tương thích điện thoại |

**Luồng hoạt động:**
```
User → Browser → Cloudflare CDN → Static assets (cached)
                         ↓
                   API Gateway → Backend Services
```

### 4.2 Layer 2: Backend Services

| Service | Port | Chức năng | Database |
|:--------|:-----|:---------|:---------|
| Auth Service | 3001 | Đăng nhập, đăng ký, JWT | PostgreSQL + Redis |
| Product Service | 3002 | Quản lý sản phẩm, danh mục | PostgreSQL |
| Cart Service | 3003 | Quản lý giỏ hàng | PostgreSQL + Redis |
| Payment Service | 3004 | Xử lý thanh toán Stripe | PostgreSQL |
| Order Service | 3005 | Quản lý đơn hàng | PostgreSQL |
| Notification Service | 3006 | Gửi email, notification | SendGrid |

### 4.3 Layer 3: Dữ Liệu

| Database | Mục đích | Dữ liệu |
|:---------|:---------|:---------|
| PostgreSQL | Database chính | Users, Products, Orders, Cart |
| Redis | Cache & Session | Session token, Cart cache, Rate limit |
| Cloudinary/S3 | Lưu trữ hình ảnh | Product images, Assets |

---

## 5. Bảng Tích Hợp Hệ Thống Bên Ngoài

| External Service | Mục đích | Data Exchange |
|:----------------|:---------|:-------------|
| Stripe | Thanh toán online | PaymentIntent, Webhooks |
| SendGrid/SES | Gửi email | Transactional emails |
| Cloudinary | CDN cho hình ảnh | Product image URLs |
| Vercel | Hosting frontend | Deploy trigger |
| Railway | Hosting backend | Container deployment |

---

## 6. Security Architecture

```mermaid
graph TB
    subgraph Security["🛡️ BẢO MẬT"]
        S1["🔒 TLS 1.3<br/>Mã hóa transport"]
        S2["🔑 JWT<br/>Access + Refresh token"]
        S3["⚡ Rate Limiting<br/>Ngăn chặn attack"]
        S4["🛡️ CORS<br/>Cross-origin policy"]
        S5["🔐 bcrypt<br/>Mã hóa password"]
        S6["📋 OWASP<br/>Security compliance"]
    end

    subgraph Monitoring["📊 MONITORING"]
        M1["📈 Sentry<br/>Error tracking"]
        M2["🖥️ Grafana<br/>Performance"]
        M3["🔔 PagerDuty<br/>Alerting"]
    end

    S1 --> S3
    S2 --> S5
    S3 --> S4
    S6 --> S1
```

---

## 7. Deployment Architecture

```mermaid
graph TB
    subgraph Production["🏭 Production"]
        P1["🌐 Vercel<br/>Frontend CDN"]
        P2["☁️ Railway<br/>Backend containers"]
        P3["🐘 PostgreSQL<br/>Primary DB"]
        P4["⚡ Redis<br/>Managed cache"]
    end

    subgraph Staging["🧪 Staging"]
        S1["🌐 Vercel Preview<br/>Frontend"]
        S2["☁️ Railway<br/>Backend"]
        S3["🐘 PostgreSQL<br/>Staging DB"]
    end

    subgraph Development["💻 Development"]
        D1["localhost:3000<br/>Frontend"]
        D2["localhost:3001<br/>Backend"]
        D3["🐘 PostgreSQL<br/>Local DB"]
        D4["⚡ Redis<br/>Local Redis"]
    end

    Developer(["👤 Developer"]) --> GitHub["🐙 GitHub"]
    GitHub --> CI["⚙️ CI/CD Pipeline"]
    CI --> Test["🧪 Run Tests"]
    Test --> Staging
    Staging -->|Approve| Production
```

---

## 8. Network Ports & Endpoints

| Service | Internal Port | Public Endpoint |
|:--------|:-------------|:----------------|
| Frontend | 3000 | luxroom.com |
| API Gateway | 8080 | api.luxroom.com |
| Auth Service | 3001 | api.luxroom.com/auth |
| Product Service | 3002 | api.luxroom.com/products |
| Cart Service | 3003 | api.luxroom.com/cart |
| Payment Service | 3004 | api.luxroom.com/checkout |
| Order Service | 3005 | api.luxroom.com/orders |
| Admin API | 3006 | admin.luxroom.com/api |

---

## Document History

| Version | Date | Author | Changes |
|:--------|:-----|:-------|:---------|
| 1.0 | May 2026 | BA | Initial architecture diagram |

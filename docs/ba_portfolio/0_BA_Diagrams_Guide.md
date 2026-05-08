# Hướng Dẫn Đọc Sơ Đồ Nghiệp Vụ BA — LuxRoom

**Dự án:** LuxRoom E-commerce
**Đối tượng:** Người không có chuyên môn công nghệ
**Mục đích:** Giúp mọi người hiểu được các sơ đồ trong bộ tài liệu BA

---

## Tổng Quan Bộ Tài Liệu

Bộ tài liệu BA LuxRoom gồm **9 phần**, mỗi phần phục vụ một mục đích khác nhau:

| # | Phần | Ai đọc | Câu hỏi trả lời |
|:---|:-----|:-------|:-----------------|
| 1 | PRD (Product Requirements) | Mọi người | Chúng ta đang xây gì? Tại sao? |
| 2 | User Stories | Product Owner, Dev | Người dùng cần gì? |
| 3 | Sơ đồ Quy trình (Process) | Dev, QA, BA | Quy trình hoạt động thế nào? |
| 4 | Sơ đồ Dữ liệu (ERD) | Dev, DBA | Dữ liệu được tổ chức ra sao? |
| 5 | Sơ đồ Use Case | Mọi người | Hệ thống có những chức năng gì? Ai tương tác? |
| 6 | Sơ đồ Sequence | Dev | Các bước tương tác chi tiết ra sao? |
| 7 | Sơ đồ Kiến trúc | Dev, Management | Hệ thống được xây dựng trên nền tảng nào? |
| 8 | Sơ đồ Trạng thái | Dev, BA | Một đối tượng thay đổi như thế nào qua thời gian? |
| 9 | Hướng dẫn đọc (file này) | Mọi người | Đọc sơ đồ như thế nào? |

---

## Các Ký Hiệu Phổ Biến Trong Sơ Đồ

### 1. Hình dạng và Ý nghĩa

```
┌─────────────────┐     ← Hình chữ nhật bo góc = MỘT BƯỚC/HÀNH ĐỘNG
│  Hành động 1     │       (ví dụ: Thêm vào giỏ hàng)
└─────────────────┘

◇─────────────────◇     ← Hình thoi = ĐIỂM QUYẾT ĐỊNH
│  Có hàng không?  │       (ví dụ: Kiểm tra tồn kho)
───────────────────

○──────────────────○     ← Hình tròn = SỰ KIỆN BẮT ĐẦU/KẾT THÚC
│    Bắt đầu       │       (● = bắt đầu, ◎ = kết thúc)
────────────────────

┌──┐                ← Hình bầu dục/sticky figure = NGƯỜI DÙNG
│👤│ Customer        (Actor)
└──┘

┌───────────────────┐
│   Ranh giới hệ    │  ← Hình chữ nhật lớn = RANH GIỚI HỆ THỐNG
│      thống        │    (System Boundary)
└───────────────────┘
```

### 2. Mũi tên và Đường Nối

```
───────→           ← Đường thẳng = Luồng thông thường
───────│           ← Đường có mũi tên một đầu = hướng đi

───Yes──→           ← Nhãn trên đường = ĐIỀU KIỆN
────No────→

---│---│---         ← Chữ V ngược = HỢP NHẤT các nhánh
     │              
─────┼─────         ← Chữ V = PHÂN NHÁNH
     │              
   ◇ Decision
```

### 3. Ký Hiệu Quan Hệ (ERD)

```
USER │──────┐ ORDER
      │      │
      │      └───→  USER places ORDER (1 user đặt nhiều order)
      │
      └───→  một user có nhiều địa chỉ

│ = đúng một (bắt buộc)
○ = không hoặc một (tùy chọn)
}o = một hoặc nhiều
}│ = nhiều (bắt buộc)
```

---

## Cách Đọc Từng Loại Sơ Đồ

### Sơ Đồ Use Case — "Hệ thống làm được gì?"

**Câu hỏi cần trả lời:** Ai có thể làm những chức năng nào?

**Cách đọc:**

```
            ┌─────────────────────────────────┐
            │      Ranh giới LuxRoom           │
            │                                 │
   👤       │  ┌─────────────┐                │
  Khách ────│──│ Duyệt sản phẩm │             │
  hàng      │  └─────────────┘                │
            │           │                     │
   👤       │  ┌─────────────┐                │
  Quản trị ─│──│ Quản lý sản phẩm │           │
   viên     │  └─────────────┘                │
            │                                 │
   💳       │              ┌─────────────┐    │
  Stripe ───│──────────────│ Thanh toán  │────│ (external)
  (bên     │              └─────────────┘       │
  ngoài)   │                                 │
            └─────────────────────────────────┘

Đọc: Khách hàng có thể duyệt sản phẩm, đặt hàng
     Quản trị viên có thể quản lý sản phẩm
     Stripe (bên ngoài) xử lý thanh toán
```

**Phân biệt Actor vs Use Case:**
- **Actor** (bên ngoài): Người dùng, hệ thống khác → đặt BÊN NGOÀI ranh giới
- **Use Case** (chức năng): Hành động người dùng có thể làm với hệ thống → đặt BÊN TRONG ranh giới

---

### Sơ Đồ Quy Trình — "Chuyện gì xảy ra khi..."

**Câu hỏi cần trả lời:** Bước nào xảy ra trước, bước nào sau?

**Cách đọc:**

```
Bắt đầu ──→ Duyệt sản phẩm ──→ Xem chi tiết ──→ Có hàng?
                                                  │
                                    ┌─────────────┼─────────────┐
                                    │             │             │
                                 Có hàng      Hết hàng     Còn ít
                                    │             │             │
                                    ▼             ▼             ▼
                               Thêm vào    Thông báo      Cảnh báo
                                giỏ        "Hết hàng"    "Chỉ còn n"
                                    │             │             │
                                    └─────────────┼─────────────┘
                                                  │
                                                  ▼
                                            Kết thúc
```

**Đọc từ trên xuống, theo mũi tên:**
1. User bắt đầu từ "Bắt đầu"
2. Duyệt sản phẩm trước
3. Khi xem chi tiết, hệ thống kiểm tra hàng tồn kho
4. Có 3 trường hợp: Có hàng → Thêm vào giỏ; Hết hàng → Thông báo; Còn ít → Cảnh báo
5. Mọi nhánh đều kết thúc ở "Kết thúc"

---

### Sơ Đồ Sequence — "Ai nói chuyện với ai, lần lượt?"

**Câu hỏi cần trả lời:** Khi thực hiện 1 chức năng, tin nhắn đi qua những bước nào?

**Cách đọc:**

```
Thời gian
    │
    ▼
┌──────────┐         ┌──────────┐         ┌──────────┐
│  Khách   │         │  Trình    │         │   API    │
│  hàng    │         │  duyệt   │         │  LuxRoom │
└────┬─────┘         └────┬─────┘         └────┬─────┘
     │                     │                     │
     │──── Click "Thêm" ──▶│                     │
     │                     │──── Gửi yêu cầu ──▶│
     │                     │                     │
     │                     │◀─── Phản hồi ──────│
     │◀─── Cập nhật ──────│                     │
     │                     │                     │
     │     Thêm vào giỏ   │                     │
```

**Đọc từ trên xuống theo thứ tự thời gian:**
1. Khách hàng click "Thêm vào giỏ" (mũi tên ▶ đi sang phải)
2. Trình duyệt gửi yêu cầu đến API
3. API xử lý và trả lời
4. Trình duyệt cập nhật giao diện cho khách

---

### Sơ Đồ ERD — "Dữ liệu được lưu ở đâu?"

**Câu hỏi cần trả lời:** Hệ thống cần những bảng nào? Chúng liên quan nhau thế nào?

**Cách đọc:**

```
┌─────────────────┐         ┌─────────────────┐
│      USER       │         │     ORDER       │
├─────────────────┤         ├─────────────────┤
│ id (PK) 🔑      │──┐      │ id (PK) 🔑      │
│ email           │  │      │ user_id (FK) ───┘
│ password        │  └──────▶│ total_amount    │
│ name            │         │ status           │
└─────────────────┘         └─────────────────┘
     │                           │
     │ 1 user                    │ 1 order
     │ có nhiều                  │ có nhiều
     │ orders                    │ items
     ▼                           ▼
┌─────────────────┐         ┌─────────────────┐
│   ORDER_ITEM    │         │    PRODUCT      │
├─────────────────┤         ├─────────────────┤
│ id (PK) 🔑      │         │ id (PK) 🔑      │
│ order_id (FK)───│──┐      │ title           │
│ product_id(FK)───│──┘      │ price           │
│ quantity        │         │ stock           │
└─────────────────┘         └─────────────────┘
```

**Ý nghĩa:**
- **PK** (Primary Key) = định danh duy nhất của mỗi dòng
- **FK** (Foreign Key) = liên kết sang bảng khác
- Đường nối cho biết quan hệ: 1 User có nhiều Order, 1 Order có nhiều Item

---

### Sơ Đồ Kiến Trúc — "Hệ thống gồm những phần nào?"

**Cách đọc từ trái sang phải (luồng dữ liệu):**

```
┌─────────────────────────────────────────────────────────────────┐
│                         GIAO DIỆN NGƯỜI DÙNG                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │   Website   │  │   Mobile    │  │    Admin    │            │
│  │  (React)    │  │    Web      │  │   Portal    │            │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘            │
└─────────┼────────────────┼────────────────┼────────────────────┘
          │                │                │
          ▼                ▼                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DỊCH VỤ TRUNG GIAN                         │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │              API Gateway / Load Balancer                 │  │
│  └─────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────────────────┐
│                        BACKEND XỬ LÝ                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │  Auth Svc   │  │ Product Svc │  │  Order Svc  │            │
│  │  (Node.js)  │  │  (Node.js)  │  │  (Node.js)  │            │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘            │
└─────────┼────────────────┼────────────────┼────────────────────┘
          │                │                │
          ▼                ▼                ▼
┌─────────────────────────────────────────────────────────────────┐
│                         DỮ LIỆU                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │ PostgreSQL  │  │    Redis    │  │    S3       │            │
│  │  (Chính)    │  │   (Cache)   │  │  (Images)   │            │
│  └─────────────┘  └─────────────┘  └─────────────┘            │
└─────────────────────────────────────────────────────────────────┘
```

**Luồng đọc:**
- Người dùng tương tác với Giao diện ( trái)
- Giao diện giao tiếp với Backend qua API (giữa)
- Backend xử lý logic và lưu dữ liệu (phải)

---

### Sơ Đồ Trạng thái — "Trạng thái thay đổi thế nào?"

**Câu hỏi cần trả lời:** Một đối tượng (ví dụ: Đơn hàng) trải qua những giai đoạn nào?

**Cách đọc:**

```
Trạng thái Đơn hàng trong LuxRoom:

     ┌────────────────────────────────────────────────────────┐
     │                                                        │
     ▼                                                        │
  ╔═══════╗                                                   │
  ║ BẮT   ║                                                   │
  ║ ĐẦU   ║                                                   │
  ╚═══╤═══╝                                                   │
      │ User đặt hàng                                         │
      ▼                                                        │
  ┌─────────┐     Thanh toán          ┌──────────────┐        │
  │ PENDING │─────thành công────────▶│     PAID      │        │
  │ (Chờ)   │                         │   (Đã trả)   │        │
  └─────────┘                         └───────┬──────┘        │
      │                                       │                │
      │ Thanh toán                            │ Admin xác nhận  │
      │ thất bại                              ▼                │
      │ (hủy sau 24h)                   ┌──────────────┐     │
      ▼                                   │  PROCESSING   │     │
  ╔═══════════╗                          │  (Đang xử lý) │     │
  ║  HỦY/THEO  ║                         └───────┬──────┘     │
  ║   DÕI      ║                                │             │
  ╚═══════════╝                                │ Giao hàng   │
                                                 ▼             │
                                          ┌──────────────┐     │
                                          │   SHIPPED    │     │
                                          │  (Đang giao) │     │
                                          └───────┬──────┘     │
                                                  │            │
                                                  │ Đã nhận    │
                                                  ▼            │
                                           ┌──────────────┐    │
                                           │  DELIVERED   │────│
                                           │  (Hoàn tất)  │    │
                                           └──────┬───────┘    │
                                                  │            │
                                                  ▼            │
                                           ╔════════════╗     │
                                           ║   KẾT      ║     │
                                           ║   THÚC     ║     │
                                           ╚════════════╝     │
```

**Đọc:**
- Mũi tên cho biết chuyển đổi từ trạng thái nào sang trạng thái nào
- Nhãn trên mũi tên = điều kiện chuyển đổi
- Một đơn hàng luôn đi theo 1 trong các đường: thành công hoặc bị hủy

---

## Bảng Tra Cứu Nhanh

| Ký hiệu | Ý nghĩa | Thường dùng trong |
|:--------|:--------|:------------------|
| ●      | Bắt đầu | Flow, State |
| ◎      | Kết thúc | Flow, State |
| ◇      | Quyết định | Flow |
| ┌─┐    | Hành động/Bước | Flow, Process |
| 👤     | Người dùng (Actor) | Use Case, Sequence |
| 💳     | Hệ thống ngoài | Use Case, Sequence |
| 🔑     | Khóa chính (PK) | ERD |
| ➜     | Gửi dữ liệu | Sequence |
| ╌     | Nhận dữ liệu | Sequence |
| ───▶   | Điều kiện "Có" | Flow |
| ───✗   | Điều kiện "Không" | Flow |

---

## Liên Kết Các Phần Trong Bộ Tài Liệu

```
PRD ──────────▶ Xác định WHAT (cần xây gì)
    │
    ▼
User Stories ──▶ Xác định WHO + WHAT (ai cần gì)
    │
    ▼
Use Case ──────▶ Xác định WHO + WHICH (ai làm gì)
    │
    ▼
Process Model ─▶ Xác định HOW (quy trình thế nào)
    │
    ▼
Sequence ─────▶ Xác định HOW STEP-BY-STEP (từng bước chi tiết)
    │
    ▼
ERD ──────────▶ Xác định WHERE (dữ liệu lưu đâu)
    │
    ▼
State Diagram▶ Xác định LIFECYCLE (trạng thái thay đổi ra sao)
    │
    ▼
Architecture ─▶ Xác định BUILD (xây trên nền tảng nào)
```

---

## Ghi Chú Kỹ Thuật

- **Mermaid** là công cụ tạo sơ đồ bằng code, được dùng trong các file `.md`
- Các sơ đồ trong tài liệu này được vẽ theo chuẩn **UML 2.0** và **BPMN 2.0**
- Nếu thấy sơ đồ khó đọc, hãy dùng **draw.io** để mở và chỉnh sửa trực quan
- Mọi sơ đồ đều có thể xuất ra **PNG** hoặc **SVG** để chèn vào slide/report

---

## Document History

| Version | Date | Author | Changes |
|:--------|:-----|:-------|:---------|
| 1.0 | May 2026 | BA | Initial guide creation |

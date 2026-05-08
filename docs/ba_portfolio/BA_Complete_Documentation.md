# SỔ TAY VẼ SƠ ĐỒ NGHIỆP VỤ — DÀNH CHO IT BA CHUYÊN NGHIỆP

**Tác giả:** IT Business Analyst  
**Phiên bản:** 1.0  
**Mục đích:** Bộ công thức tổng quát — áp dụng được cho MỌI dự án, MỌI bài toán  

---

> **Cách dùng tài liệu này:**  
> Đây là **bộ công thức chuẩn**. Mỗi loại sơ đồ có: Định nghĩa → Khi nào vẽ → Công thức bước → Ví dụ thực tế → Lỗi thường gặp.  
> Bạn chỉ cần đọc phần tương ứng, làm theo từng bước là vẽ được.
>
> **Quy ước viết tắt:** Mọi thuật ngữ viết tắt sẽ được giải thích đầy đủ khi xuất hiện lần đầu, theo dạng: `Tên tiếng Việt (Viết tắt — Tên đầy đủ tiếng Anh)`. Bảng từ điển thuật ngữ đầy đủ nằm ở **Phụ lục** cuối tài liệu.

---

# MỤC LỤC

| # | Loại Sơ Đồ | Câu hỏi trả lời | Trang |
|:--|:-----------|:----------------|:------|
| 1 | **Use Case Diagram** | Hệ thống làm được gì? Ai dùng? | Phần 1 |
| 2 | **Activity / Flowchart** | Quy trình diễn ra như thế nào? | Phần 2 |
| 3 | **Swimlane Diagram** | Ai chịu trách nhiệm từng bước? | Phần 3 |
| 4 | **Sequence Diagram** | Các thành phần giao tiếp thế nào? | Phần 4 |
| 5 | **ERD** | Dữ liệu được lưu như thế nào? | Phần 5 |
| 6 | **State Machine Diagram** | Trạng thái thay đổi ra sao? | Phần 6 |
| 7 | **Architecture Diagram** | Hệ thống gồm những tầng nào? | Phần 7 |
| 8 | **DFD** | Dữ liệu chạy qua đâu? | Phần 8 |
| 9 | **Sitemap & User Flow** | Cấu trúc trang & hành trình người dùng? | Phần 9 |
| 10 | **Wireframe** | Giao diện trông như thế nào? | Phần 10 |
| 11 | **Checklist & Anti-patterns** | Kiểm tra trước khi nộp | Phần 11 |

---

# PHẦN 1: USE CASE DIAGRAM — "HỆ THỐNG LÀM ĐƯỢC GÌ?"

## 1.1. Định Nghĩa & Mục Đích

Use Case Diagram (Sơ đồ ca sử dụng) trả lời **3 câu hỏi cốt lõi**:
- **AI** tương tác với hệ thống? (Tác nhân — Actors)
- Họ có thể làm **NHỮNG GÌ**? (Ca sử dụng — Use Cases)
- Hệ thống có **PHẠM VI** đến đâu? (Ranh giới hệ thống — System Boundary)

**Khi nào vẽ:** Giai đoạn đầu dự án — khi cần xác định phạm vi với các bên liên quan (Stakeholder).

---

## 1.2. Các Thành Phần Cần Biết

| Ký hiệu | Tên | Ý nghĩa |
|:--------|:----|:--------|
| `(oval)` | Ca sử dụng (Use Case) | Một chức năng hệ thống |
| `[hình người]` | Tác nhân (Actor) | Người dùng hoặc hệ thống bên ngoài |
| `[hình chữ nhật lớn]` | Ranh giới hệ thống (System Boundary) | Phạm vi hệ thống đang phân tích |
| `───────>` | Liên kết (Association) | Tác nhân kết nối với Ca sử dụng |
| `- - -><<include>>` | Bao gồm (Include) | Ca sử dụng này LUÔN gọi ca sử dụng kia |
| `- - -><<extend>>` | Mở rộng (Extend) | Ca sử dụng này CÓ THỂ gọi ca sử dụng kia (có điều kiện) |
| `──────>` | Khái quát hóa (Generalization) | Kế thừa (Tác nhân/Ca sử dụng cha → con) |

### Phân Biệt Bao gồm (Include) vs Mở rộng (Extend)

```
<<include>> (Bao gồm): BẮT BUỘC — luôn xảy ra
  Ví dụ: "Đặt hàng" LUÔN bao gồm "Xác thực người dùng"
  Hướng mũi tên: Ca sử dụng gốc ───> Ca sử dụng con
  
<<extend>> (Mở rộng): TÙY CHỌN — chỉ xảy ra khi có điều kiện
  Ví dụ: "Xem sản phẩm" CÓ THỂ mở rộng thêm "Áp dụng bộ lọc"
  Hướng mũi tên: Ca sử dụng mở rộng ───> Ca sử dụng gốc
```

---

## 1.3. Công Thức Vẽ Use Case (7 Bước)

```
BƯỚC 1: XÁC ĐỊNH ACTORS
─────────────────────────
Hỏi: "Ai tương tác với hệ thống?"
- Người dùng trực tiếp (Primary — Chính): Khách hàng, Quản trị viên, Nhân viên...
- Hệ thống ngoài (Secondary — Phụ): Cổng thanh toán, Dịch vụ gửi email, SMS...
- Hệ thống ở hậu trường (Offstage — Không trực tiếp): Báo cáo, Giám sát hệ thống...

Mẹo: Mỗi loại vai trò khác nhau = 1 Tác nhân riêng
     (Khách chưa đăng nhập ≠ Khách đã đăng nhập)

BƯỚC 2: LIỆT KÊ USE CASES
──────────────────────────
Hỏi: "Tác nhân X có thể làm gì với hệ thống?"
- Bắt đầu bằng động từ: Đăng nhập, Xem, Tạo, Cập nhật, Xóa...
- Mỗi Ca sử dụng = 1 mục tiêu hoàn chỉnh của người dùng
- Không quá chi tiết (tránh nhầm với luồng xử lý nội bộ của hệ thống)

BƯỚC 3: VẼ SYSTEM BOUNDARY
────────────────────────────
- Vẽ hình chữ nhật lớn = ranh giới hệ thống bạn đang làm
- UC nào trong hộp = hệ thống xử lý
- Actor nào ngoài hộp = người/hệ thống bên ngoài

BƯỚC 4: KẾT NỐI ACTOR — USE CASE
──────────────────────────────────
- Kéo đường thẳng từ Tác nhân đến Ca sử dụng họ thực hiện
- Theo chuẩn UML (Ngôn ngữ mô hình hóa thống nhất), đường liên kết không có chiều mũi tên

BƯỚC 5: THÊM QUAN HỆ INCLUDE/EXTEND (nếu cần)
────────────────────────────────────────────────
- Tìm Ca sử dụng nào LUÔN dùng chung 1 bước → dùng <<include>> (Bao gồm)
- Tìm Ca sử dụng nào CHỈ đôi khi mở rộng → dùng <<extend>> (Mở rộng)

BƯỚC 6: KIỂM TRA GENERALIZATION
─────────────────────────────────
- Tác nhân cha/con? (Quản trị viên kế thừa từ Người dùng?)
- Ca sử dụng cha/con? (Thanh toán thẻ / Thanh toán ví ← Thanh toán)

BƯỚC 7: REVIEW VỚI STAKEHOLDER
─────────────────────────────────
- Hỏi: "Đây có phải tất cả những gì hệ thống cần làm không?"
- Hỏi: "Có actor nào bị thiếu không?"
```

---

## 1.4. Template Use Case (Copy & Chỉnh Sửa)

```mermaid
graph LR
    subgraph System["[ TÊN HỆ THỐNG ]"]
        UC1(("Chức năng 1"))
        UC2(("Chức năng 2"))
        UC3(("Chức năng 3"))
        UC4(("Chức năng 4 (có phụ thuộc)"))
        UC5(("Chức năng chung"))
        UC4 -.->|include| UC5
    end

    A1["👤 Actor Chính"]
    A2["👤 Actor Phụ"]
    A3["⚙️ Hệ thống ngoài"]

    A1 --> UC1
    A1 --> UC2
    A2 --> UC3
    A2 --> UC4
    UC2 -.->|extend| UC3
    UC3 --> A3
```

### Ví Dụ Thực Tế — Hệ Thống Quản Lý Thư Viện

```mermaid
graph LR
    subgraph System["Hệ Thống Thư Viện"]
        UC1(("Tìm kiếm sách"))
        UC2(("Mượn sách"))
        UC3(("Trả sách"))
        UC4(("Gia hạn mượn"))
        UC5(("Xem lịch sử"))
        UC6(("Quản lý sách"))
        UC7(("Quản lý thành viên"))
        UC8(("Xác thực danh tính"))
        UC9(("Tính phí phạt"))

        UC2 -.->|include| UC8
        UC3 -.->|include| UC9
        UC4 -.->|include| UC8
    end

    DocGia["👤 Độc giả"]
    ThuThu["👤 Thủ thư"]

    DocGia --> UC1
    DocGia --> UC2
    DocGia --> UC3
    DocGia --> UC4
    DocGia --> UC5
    ThuThu --> UC6
    ThuThu --> UC7
    ThuThu --> UC3
```

---

## 1.5. Lỗi Thường Gặp & Cách Tránh

| Lỗi | Ví dụ sai | Cách sửa |
|:----|:----------|:---------|
| Ca sử dụng quá chi tiết | "Nhấn nút Gửi" | Phải là: "Gửi đơn đăng ký" |
| Ca sử dụng là bước kỹ thuật | "Mã hóa mật khẩu" | Không vẽ — đây là logic nội bộ |
| Quên Tác nhân ngoài | Không vẽ Dịch vụ gửi email | Thêm Tác nhân phụ cho hệ thống bên ngoài |
| Bao gồm/Mở rộng nhầm | Dùng Include khi là Extend | Include = BẮT BUỘC, Extend = TÙY CHỌN |
| Quá nhiều Ca sử dụng | 40+ ca sử dụng trong 1 sơ đồ | Nhóm theo nhóm tính năng lớn, vẽ nhiều sơ đồ |

---

# PHẦN 2: ACTIVITY DIAGRAM / FLOWCHART — "QUY TRÌNH DIỄN RA THẾ NÀO?"

## 2.1. Định Nghĩa & Mục Đích

Activity Diagram / Flowchart mô tả **luồng hoạt động** từ đầu đến cuối của một quy trình. Trả lời: **"Bước nào xảy ra trước, bước nào xảy ra sau, điều kiện nào dẫn đến đâu?"**

**Khi nào vẽ:**
- Mô tả quy trình nghiệp vụ
- Mô tả logic xử lý của một tính năng
- Làm rõ các luồng xử lý ngoại lệ (khi xảy ra lỗi hoặc tình huống bất thường)

---

## 2.2. Các Ký Hiệu Chuẩn

| Ký hiệu | Tên | Dùng khi |
|:--------|:----|:---------|
| `●` (tròn đặc) | Start Node | Điểm bắt đầu — mỗi flow CHỈ có 1 |
| `◎` (tròn viền đôi) | End Node | Điểm kết thúc — có thể có nhiều |
| `[ ]` (hình chữ nhật) | Action / Activity | Một hành động xảy ra |
| `< >` (hình thoi) | Decision | Điểm rẽ nhánh — có điều kiện |
| `═══` (thanh ngang) | Fork / Join | Tách nhánh song song / Gộp lại |
| `───>` | Flow | Hướng đi của luồng |

---

## 2.3. Công Thức Vẽ Activity Diagram (6 Bước)

```
BƯỚC 1: XÁC ĐỊNH PHẠM VI
──────────────────────────
Hỏi: "Quy trình này bắt đầu từ đâu và kết thúc ở đâu?"
- Điểm bắt đầu: Sự kiện kích hoạt quy trình
- Điểm kết thúc: Kết quả cuối cùng (có thể nhiều kết thúc)

BƯỚC 2: LIỆT KÊ CÁC BƯỚC CHÍNH (Luồng thành công — Happy Path)
────────────────────────────────────────────────────────────────
- Viết ra các bước khi mọi thứ diễn ra BÌNH THƯỜNG
- Dùng câu ngắn, bắt đầu bằng ĐỘNG TỪ
- Ví dụ: "Nhập thông tin" → "Kiểm tra hợp lệ" → "Lưu vào cơ sở dữ liệu"

BƯỚC 3: TÌM CÁC ĐIỂM QUYẾT ĐỊNH
──────────────────────────────────
- Bước nào có câu hỏi "Có/Không", "Thành công/Thất bại"?
- Mỗi điểm đó = 1 hình thoi (Decision)
- Gắn nhãn rõ cho từng nhánh: [Có] [Không] [Thành công] [Thất bại]

BƯỚC 4: XỬ LÝ CÁC TRƯỜNG HỢP NGOẠI LỆ
──────────────────────────────────────────
- Khi điều kiện KHÔNG thỏa mãn → dẫn đến đâu?
- Có vòng lặp (retry) không?
- Có điểm kết thúc sớm (early exit) không?

BƯỚC 5: KIỂM TRA HOẠT ĐỘNG SONG SONG
────────────────────────────────────────
- Có bước nào xảy ra ĐỒNG THỜI không?
  Ví dụ: "Gửi email" và "Cập nhật DB" chạy song song
- Dùng Fork (═══) để tách và Join (═══) để gộp

BƯỚC 6: REVIEW LUỒNG
──────────────────────
- Mọi nhánh đều phải đến một điểm kết thúc
- Không có vòng lặp vô tận (cần điều kiện thoát)
- Mỗi Decision phải có ≥ 2 nhánh ra
```

---

## 2.4. Template Flowchart (Copy & Chỉnh Sửa)

```mermaid
flowchart TD
    Start([● Bắt đầu: TÊN SỰ KIỆN KÍCH HOẠT]) --> Step1

    Step1[Bước 1: Mô tả hành động] --> Decision1

    Decision1{Điều kiện?\nCâu hỏi?}
    Decision1 -->|Có / Thành công| Step2
    Decision1 -->|Không / Thất bại| ErrorStep

    ErrorStep[Xử lý lỗi / Thông báo] --> Retry{Thử lại?}
    Retry -->|Có| Step1
    Retry -->|Không| EndFail([◎ Kết thúc: Thất bại])

    Step2[Bước 2: Hành động tiếp theo] --> Decision2

    Decision2{Điều kiện 2?}
    Decision2 -->|Nhánh A| Step3A[Xử lý A]
    Decision2 -->|Nhánh B| Step3B[Xử lý B]

    Step3A --> FinalStep
    Step3B --> FinalStep

    FinalStep[Bước cuối: Hoàn thành] --> EndSuccess([◎ Kết thúc: Thành công])
```

---

## 2.5. Ví Dụ — Quy Trình Duyệt Đơn Xin Việc

```mermaid
flowchart TD
    Start([● Ứng viên nộp CV]) --> Receive

    Receive[HR nhận và phân loại CV] --> Screen

    Screen{CV đạt yêu cầu\ncơ bản?}
    Screen -->|Không| Reject1[Gửi email từ chối lịch sự]
    Reject1 --> End1([◎ Kết thúc: Loại vòng CV])

    Screen -->|Có| Phone

    Phone[Gọi điện phỏng vấn sơ bộ\n15 phút] --> PhoneResult

    PhoneResult{Ứng viên\nphù hợp?}
    PhoneResult -->|Không| Reject2[Gửi email cảm ơn]
    Reject2 --> End2([◎ Kết thúc: Loại vòng phone])

    PhoneResult -->|Có| Schedule

    Schedule[Lên lịch phỏng vấn\ntechnical + culture fit] --> Interview

    Interview[Phỏng vấn trực tiếp\n60 phút] --> InterviewResult

    InterviewResult{Kết quả?}
    InterviewResult -->|Không đạt| Reject3[Gửi phản hồi chi tiết]
    Reject3 --> End3([◎ Kết thúc: Loại vòng phỏng vấn])

    InterviewResult -->|Đạt| Offer

    Offer[Gửi thư offer\nvà thương lượng lương] --> OfferResult

    OfferResult{Ứng viên\nchấp nhận?}
    OfferResult -->|Không| Negotiate[Thương lượng lại]
    Negotiate --> OfferResult
    OfferResult -->|Có| Onboard

    Onboard[Chuẩn bị hợp đồng\nvà onboarding] --> End4([◎ Kết thúc: Tuyển dụng thành công])
```

---

## 2.6. Lỗi Thường Gặp & Cách Tránh

| Lỗi | Vấn đề | Cách sửa |
|:----|:-------|:---------|
| Thiếu điểm kết thúc | Một nhánh không đến đâu | Mọi nhánh PHẢI có End Node |
| Decision > 2 nhánh không gắn nhãn | Không biết điều kiện nào | Gắn nhãn RÕ RÀNG mỗi nhánh |
| Quá nhiều bước nhỏ | Diagram rối | Gộp 3-4 bước nhỏ thành 1 Activity |
| Vòng lặp vô tận | Không có điều kiện thoát | Luôn thêm nhánh "Bỏ qua / Hủy" |
| Happy path thiếu exception | Diagram quá đơn giản | Luôn hỏi "Nếu lỗi thì sao?" |

---

# PHẦN 3: SWIMLANE DIAGRAM — "AI CHỊU TRÁCH NHIỆM TỪNG BƯỚC?"

## 3.1. Định Nghĩa & Mục Đích

Swimlane (Sơ đồ làn bơi) là Flowchart được chia theo **vai trò chịu trách nhiệm**. Mỗi "làn" = một người/bộ phận/hệ thống. Trả lời: **"Bước này do AI làm?"**

**Khi nào vẽ:**
- Quy trình có nhiều bộ phận tham gia
- Cần làm rõ trách nhiệm & bàn giao (handoff)
- Phân tích bottleneck (nút thắt cổ chai)

---

## 3.2. Công Thức Vẽ Swimlane (5 Bước)

```
BƯỚC 1: XÁC ĐỊNH CÁC "LÀN"
─────────────────────────────
Hỏi: "Có bao nhiêu vai trò khác nhau tham gia quy trình này?"
- Mỗi vai trò = 1 làn (lane)
- Thường có 3-6 làn là hợp lý
- Ít nhất: Actor chính + Hệ thống + DB
- Nhiều nhất: Chia theo phòng ban / microservice

Ví dụ làn phổ biến:
  • Người dùng / Khách hàng
  • Giao diện (Frontend)
  • Xử lý (Backend / API)
  • Cơ sở dữ liệu
  • Hệ thống bên ngoài (Stripe, Email...)
  • Bộ phận nội bộ (Kho, Kế toán, QA...)

BƯỚC 2: VẼ QUY TRÌNH TRƯỚC (KHÔNG CÓ LÀN)
────────────────────────────────────────────
- Trước tiên liệt kê tất cả các bước theo thứ tự
- Không cần lo về ai làm — cứ liệt kê hết

BƯỚC 3: GÁN TỪNG BƯỚC VÀO LÀN ĐÚNG
────────────────────────────────────────
- Đặt mỗi bước vào làn của vai trò thực hiện bước đó
- Khi bước chuyển từ làn này sang làn kia = điểm HANDOFF (bàn giao)

BƯỚC 4: VẼ MŨI TÊN KẾT NỐI
──────────────────────────────
- Kết nối các bước theo thứ tự
- Mũi tên cắt qua ranh giới làn = thấy rõ điểm giao tiếp

BƯỚC 5: PHÂN TÍCH HANDOFF
───────────────────────────
- Đếm số lần bàn giao giữa các làn
- Nhiều handoff = nhiều rủi ro delay / lỗi
- Có thể tối ưu bằng cách gộp bước hoặc tự động hóa
```

---

## 3.3. Template Swimlane (Copy & Chỉnh Sửa)

```mermaid
flowchart TD
    subgraph Lane1["👤 VAI TRÒ 1 (VD: Người dùng)"]
        A1([Bắt đầu]) --> A2[Hành động 1]
        A2 --> A3[Hành động 2]
    end

    subgraph Lane2["🖥️ VAI TRÒ 2 (VD: Hệ thống / Frontend)"]
        B1[Nhận yêu cầu] --> B2{Kiểm tra điều kiện}
        B2 -->|Hợp lệ| B3[Xử lý]
        B2 -->|Không hợp lệ| B4[Trả lỗi]
    end

    subgraph Lane3["⚙️ VAI TRÒ 3 (VD: Backend / API)"]
        C1[Nhận request] --> C2[Xử lý logic] --> C3[Trả kết quả]
    end

    subgraph Lane4["💾 VAI TRÒ 4 (VD: Database)"]
        D1[(Lưu dữ liệu)] --> D2[(Xác nhận)]
    end

    A3 --> B1
    B3 --> C1
    B4 --> A2
    C2 --> D1
    D2 --> C3
    C3 --> B3
    B3 --> A3
```

---

## 3.4. Bảng RACI — Công Cụ Bổ Sung Cho Swimlane

> **RACI** = Responsible (Thực hiện) / Accountable (Chịu trách nhiệm) / Consulted (Tham vấn) / Informed (Được thông báo)

**Template RACI:**

| Hoạt động | Vai trò A | Vai trò B | Vai trò C | Vai trò D |
|:----------|:----------|:----------|:----------|:----------|
| Bước 1    | **R**     | A         | C         | I         |
| Bước 2    | I         | **R/A**   | -         | I         |
| Bước 3    | -         | A         | **R**     | I         |

**Quy tắc RACI:**
- Mỗi hàng CHỈ có đúng 1 **A** (người chịu trách nhiệm cuối cùng)
- Có thể có nhiều **R** (nhiều người cùng thực hiện)
- **C** = hỏi ý kiến TRƯỚC khi làm
- **I** = thông báo SAU khi làm xong

---

# PHẦN 4: SEQUENCE DIAGRAM — "CÁC THÀNH PHẦN GIAO TIẾP THẾ NÀO?"

## 4.1. Định Nghĩa & Mục Đích

Sequence Diagram mô tả **thứ tự các tin nhắn** được gửi qua lại giữa các thành phần theo **trục thời gian** (từ trên xuống dưới). Trả lời: **"Khi thực hiện chức năng X, tin nhắn đi qua những đâu, theo thứ tự nào?"**

**Khi nào vẽ:**
- Mô tả chi tiết cách các thành phần giao tiếp với nhau qua giao diện lập trình (API — Application Programming Interface)
- Làm rõ luồng xác thực người dùng
- Gỡ lỗi / phân tích một tính năng phức tạp
- Tài liệu cho lập trình viên

---

## 4.2. Các Ký Hiệu Cần Biết

| Ký hiệu | Tên | Ý nghĩa |
|:--------|:----|:--------|
| `[hộp trên]` | Thành phần tham gia (Participant) | Một đối tượng trong luồng giao tiếp |
| `│` | Đường thời gian (Lifeline) | Trục thời gian của mỗi thành phần |
| `──────>` | Tin nhắn đồng bộ (Synchronous) | Gửi tin nhắn và CHỜ phản hồi |
| `- - - ->` | Tin nhắn phản hồi (Return) | Kết quả trả về |
| `──────>>` | Tin nhắn bất đồng bộ (Asynchronous) | Gửi tin nhắn và KHÔNG chờ |
| `alt / else` | Nhánh điều kiện (Alternative) | Rẽ nhánh nếu/ngược lại |
| `loop` | Vòng lặp (Loop) | Lặp lại một nhóm bước |
| `opt` | Tùy chọn (Optional) | Chỉ xảy ra khi có điều kiện |
| `par` | Song song (Parallel) | Xảy ra đồng thời |
| `Note` | Ghi chú (Note) | Giải thích thêm |

---

## 4.3. Công Thức Vẽ Sequence Diagram (6 Bước)

```
BƯỚC 1: XÁC ĐỊNH PARTICIPANTS
───────────────────────────────
Hỏi: "Những thành phần nào tham gia vào chức năng này?"

Danh sách thành phần thường gặp:
  • Người dùng (người kích hoạt)
  • Trình duyệt / Ứng dụng di động (giao diện)
  • Cổng API / Máy chủ xử lý (Backend)
  • Cơ sở dữ liệu (Database)
  • Bộ nhớ đệm (Cache — lưu tạm để truy xuất nhanh)
  • Dịch vụ bên ngoài (Thanh toán, SMS, Email...)
  • Dịch vụ xác thực

Sắp xếp từ TRÁI sang PHẢI theo chiều luồng:
User → UI → API → DB → External

BƯỚC 2: XÁC ĐỊNH SỰ KIỆN KÍCH HOẠT (ĐIỂM BẮT ĐẦU)
──────────────────────────────────────────────────────
- Hành động đầu tiên là gì?
- Ai thực hiện? (thường là Người dùng hoặc Hệ thống)

BƯỚC 3: VẼ LUỒNG THÀNH CÔNG (LUỒNG BÌNH THƯỜNG)
──────────────────────────────────────────────────
- Liệt kê từng bước theo thứ tự thời gian
- Mỗi tin nhắn = 1 mũi tên nằm ngang
- Dùng autonumber (đánh số tự động) HOẶC gắn số thủ công — không dùng cả hai
- Tin nhắn đi = ──────>, phản hồi = - - - ->

BƯỚC 4: THÊM CÁC TRƯỜNG HỢP ĐẶC BIỆT
────────────────────────────────────────
- Dùng alt/else cho các nhánh điều kiện
- Dùng loop khi có vòng lặp
- Dùng opt khi có bước tùy chọn

BƯỚC 5: THÊM GHI CHÚ (NOTE)
──────────────────────────────
- Giải thích các bước phức tạp
- Ghi rõ phương thức gọi + mã trạng thái phản hồi (VD: POST /api/v1/... → 200 OK)
- Ghi thời gian chờ tối đa, quy tắc thử lại nếu có

BƯỚC 6: KIỂM TRA
──────────────────
- Mỗi tin nhắn đồng bộ phải có tin nhắn phản hồi
- Số bước không quá 20 (nếu hơn → tách thành nhiều sơ đồ)
- Sơ đồ phải khớp với đặc tả API thực tế
```

---

## 4.4. Template Sequence Diagram (Copy & Chỉnh Sửa)

```mermaid
sequenceDiagram
    autonumber
    participant U as "👤 Người dùng"
    participant UI as "🖥️ Giao diện"
    participant API as "⚙️ Backend API"
    participant DB as "💾 Cơ sở dữ liệu"
    participant EXT as "🔌 Dịch vụ ngoài"

    U->>UI: Hành động kích hoạt (click, gửi...)
    UI->>API: Gửi yêu cầu (METHOD /endpoint)

    API->>DB: Truy vấn / Kiểm tra dữ liệu
    DB-->>API: 4. Kết quả truy vấn

    alt Trường hợp thành công
        API->>EXT: 5a. Gọi dịch vụ ngoài (nếu cần)
        EXT-->>API: 6a. Phản hồi từ dịch vụ ngoài

        API->>DB: 7a. Lưu kết quả
        DB-->>API: 8a. Xác nhận lưu thành công

        API-->>UI: 9a. 200 OK {data}
        UI->>U: 10a. Hiển thị kết quả thành công

    else Trường hợp thất bại
        API-->>UI: 5b. 4xx/5xx Error {message}
        UI->>U: 6b. Hiển thị thông báo lỗi
    end
```

---

## 4.5. Ví Dụ — Sequence: Đăng Nhập Hệ Thống

```mermaid
sequenceDiagram
    autonumber
    participant U as "👤 Người dùng"
    participant UI as "🖥️ Giao diện"
    participant API as "⚙️ API Server"
    participant DB as "💾 Database"
    participant Cache as "⚡ Cache"

    U->>UI: Nhập email + mật khẩu
    UI->>UI: Kiểm tra định dạng (phía giao diện)
    UI->>API: POST /auth/login {email, password}

    API->>Cache: Kiểm tra tài khoản có bị khóa?
    Cache-->>API: Trạng thái khóa

    alt Tài khoản đang bị khóa
        API-->>UI: 423 Locked {retry_after: 15min}
        UI->>U: Hiện thông báo tài khoản bị khóa
    else Tài khoản bình thường
        API->>DB: SELECT user WHERE email = ?
        DB-->>API: User record (hoặc null)

        alt Không tìm thấy user
            API-->>UI: 401 Unauthorized
            UI->>U: Hiện lỗi chung chung (không tiết lộ email sai hay pass sai)
        else Tìm thấy user
            API->>API: So sánh mật khẩu đã mã hóa

            alt Mật khẩu sai
                API->>Cache: Tăng failed_attempts + 1
                Cache-->>API: failed_attempts = N

                alt N >= 5
                    API->>Cache: Khóa tài khoản 15 phút
                end

                API-->>UI: 401 Unauthorized
                UI->>U: Hiện lỗi đăng nhập
            else Mật khẩu đúng
                API->>Cache: Reset failed_attempts = 0
                API->>API: Tạo mã xác thực JWT (JSON Web Token, hiệu lực 24h)
                API-->>UI: 200 OK {access_token, user_info}
                UI->>UI: Lưu token vào httpOnly cookie
                UI->>U: Chuyển hướng đến Dashboard
            end
        end
    end
```

---

## 4.6. Lỗi Thường Gặp & Cách Tránh

| Lỗi | Vấn đề | Cách sửa |
|:----|:-------|:---------|
| Quá nhiều thành phần | Sơ đồ chật, khó đọc | Tối đa 6-7 thành phần; tách sơ đồ nếu nhiều hơn |
| Thiếu tin nhắn phản hồi | Đường một chiều, không rõ kết quả | Mỗi yêu cầu đồng bộ PHẢI có phản hồi |
| Không đánh số | Khó theo dõi thứ tự | Luôn dùng đánh số tự động (autonumber) |
| Không xử lý lỗi | Chỉ có luồng thành công | Luôn thêm nhánh điều kiện cho trường hợp lỗi |
| Quá chi tiết | Mô tả từng dòng mã nguồn | Sơ đồ là thiết kế, không phải mã nguồn |

---

# PHẦN 5: ERD — "DỮ LIỆU ĐƯỢC LƯU NHƯ THẾ NÀO?"

## 5.1. Định Nghĩa & Mục Đích

Sơ đồ thực thể quan hệ (ERD — Entity-Relationship Diagram) mô tả **cấu trúc dữ liệu** của hệ thống: có những "bảng" nào, mỗi bảng có những "cột" gì, và các bảng liên quan với nhau thế nào.

**Khi nào vẽ:**
- Thiết kế cơ sở dữ liệu trước khi viết mã
- Làm tài liệu hóa cơ sở dữ liệu hiện có
- Phân tích yêu cầu dữ liệu từ nghiệp vụ

---

## 5.2. Các Ký Hiệu Quan Trọng

| Ký hiệu | Ý nghĩa |
|:--------|:--------|
| **PK** | Khóa chính (Primary Key) — định danh duy nhất của một bản ghi |
| **FK** | Khóa ngoại (Foreign Key) — liên kết sang bảng khác |
| **NK** | Khóa tự nhiên (Natural Key) — dùng giá trị có sẵn như mã, email... |
| `\|\|` | Đúng một (exactly one) — bắt buộc |
| `\|o` | Không hoặc một (zero or one) — tùy chọn |
| `\|{` | Một hoặc nhiều (one or many) — bắt buộc có ít nhất 1 |
| `o{` | Không hoặc nhiều (zero or many) — tùy chọn |

### Đọc Quan Hệ:

```
USER ||--o{ ORDER : "đặt"
Đọc: Một USER đặt không hoặc nhiều ORDER
     Mỗi ORDER thuộc đúng một USER

PRODUCT ||--|{ ORDER_ITEM : "có trong"
Đọc: Một PRODUCT có trong một hoặc nhiều ORDER_ITEM (bắt buộc)
     Mỗi ORDER_ITEM chứa đúng một PRODUCT
```

---

## 5.3. Công Thức Vẽ ERD (7 Bước)

```
BƯỚC 1: XÁC ĐỊNH CÁC THỰC THỂ (ENTITIES)
──────────────────────────────────────────
Hỏi: "Hệ thống cần lưu trữ thông tin về những ĐỐI TƯỢNG nào?"
- Danh từ quan trọng trong yêu cầu = có thể là thực thể
- Ví dụ: Người dùng, Sản phẩm, Đơn hàng, Phòng, Nhân viên...
- Mỗi thực thể sẽ thành một bảng trong cơ sở dữ liệu

BƯỚC 2: XÁC ĐỊNH THUỘC TÍNH (ATTRIBUTES)
──────────────────────────────────────────
Hỏi: "Cần lưu thông tin GÌ về đối tượng này?"
- Mỗi thuộc tính = một cột trong bảng
- Xác định kiểu dữ liệu: chuỗi ký tự, số nguyên, số thập phân, ngày giờ, đúng/sai...
- Phân biệt: Bắt buộc (không được để trống) vs Tùy chọn (có thể để trống)

BƯỚC 3: XÁC ĐỊNH KHÓA CHÍNH (PRIMARY KEY)
────────────────────────────────────────────
- Mỗi thực thể cần 1 khóa chính (PK) duy nhất
- Nên dùng: mã định danh tự tạo (UUID hoặc số tự tăng)
- Không dùng thông tin có thể thay đổi làm khóa chính (email, số điện thoại)

BƯỚC 4: XÁC ĐỊNH QUAN HỆ GIỮA CÁC ENTITY
────────────────────────────────────────────
Hỏi cho mỗi cặp entity:
  "1 [A] liên quan đến bao nhiêu [B]?"
  "1 [B] liên quan đến bao nhiêu [A]?"

3 loại quan hệ:
  • 1-1: Một người có đúng 1 hộ chiếu
  • 1-N: Một người có nhiều đơn hàng
  • M-N: Nhiều sinh viên học nhiều môn học (cần bảng trung gian!)

BƯỚC 5: XỬ LÝ QUAN HỆ M-N
────────────────────────────
- Không vẽ M-N trực tiếp → cần tạo bảng TRUNG GIAN (bảng nối giữa hai bảng chính)
- Bảng trung gian có 2 FK + có thể có thuộc tính riêng

Ví dụ:
  STUDENT (M) ──── ENROLLMENT ──── (N) COURSE
  ENROLLMENT có: student_id (FK), course_id (FK), enrolled_date, grade

BƯỚC 6: THÊM KHÓA NGOẠI (FOREIGN KEY)
────────────────────────────────────────
- Phía "nhiều" (N) giữ FK trỏ về phía "một" (1)
- Ví dụ: ORDER có user_id FK → USER.id

BƯỚC 7: RÀ SOÁT VỚI QUẢN TRỊ CƠ SỞ DỮ LIỆU / LẬP TRÌNH VIÊN
─────────────────────────────────────────────────────────────────
- Có thiếu thực thể nào không?
- Có thuộc tính nào chưa chuẩn hóa (tách riêng dữ liệu lặp lại)?
- Chỉ mục tìm kiếm (Index) cần thiết ở đâu? (cột nào hay tìm kiếm)
```

---

## 5.4. Template ERD (Copy & Chỉnh Sửa)

```mermaid
erDiagram
    ENTITY_A ||--o{ ENTITY_B : "quan he 1-N"
    ENTITY_A ||--|| ENTITY_C : "quan he 1-1"
    ENTITY_B }o--o{ ENTITY_D : "quan he M-N (qua junction)"
    ENTITY_B ||--|{ ENTITY_E : "quan he 1-N bat buoc"

    ENTITY_A {
        uuid id PK
        string ten_truong_1
        string ten_truong_2
        int    ten_truong_so
        boolean la_hoat_dong
        datetime tao_luc
        datetime cap_nhat_luc
    }

    ENTITY_B {
        uuid id PK
        uuid entity_a_id FK
        string mo_ta
        decimal gia_tri
        string trang_thai "PENDING, ACTIVE, CLOSED"
    }

    ENTITY_C {
        uuid id PK
        uuid entity_a_id FK
        string thong_tin
    }

    ENTITY_D {
        uuid id PK
        string ten
    }

    ENTITY_E {
        uuid id PK
        uuid entity_b_id FK
        int so_luong
        decimal don_gia
        string snapshot_json "Lưu snapshot tại thời điểm tạo"
    }
```

---

## 5.5. Checklist Thuộc Tính Cần Có Cho Mỗi Entity

```
Thuộc tính BẮT BUỘC (gần như luôn cần):
  ✅ id          — Mã định danh duy nhất (khóa chính)
  ✅ created_at  — Thời điểm tạo bản ghi
  ✅ updated_at  — Thời điểm cập nhật cuối

Thuộc tính NÊN CÓ:
  ✅ is_active / is_deleted — Xóa mềm (đánh dấu xóa thay vì xóa thật khỏi cơ sở dữ liệu)
  ✅ created_by / updated_by — Ai tạo/sửa (nhật ký theo dõi thay đổi)
  ✅ version — Khóa lạc quan (tránh xung đột khi nhiều người cùng sửa một bản ghi)

Thuộc tính TRÁNH:
  ❌ Mật khẩu lưu thẳng → Luôn lưu mật khẩu đã mã hóa
  ❌ Dữ liệu thẻ ngân hàng → Vi phạm tiêu chuẩn bảo mật thẻ thanh toán (PCI DSS)
  ❌ Dữ liệu quan hệ lưu trong 1 cột dạng chuỗi → Vi phạm nguyên tắc chuẩn hóa dữ liệu
```

---

## 5.6. Lỗi Thường Gặp & Cách Tránh

| Lỗi | Vấn đề | Cách sửa |
|:----|:-------|:---------|
| Dùng email làm khóa chính | Email có thể thay đổi | Dùng mã định danh tự tạo làm khóa chính |
| Không tách quan hệ M-N | Cơ sở dữ liệu không hỗ trợ trực tiếp | Tạo bảng trung gian |
| Thuộc tính tính toán được | Lưu "tuổi" thay vì "ngày sinh" | Lưu dữ liệu gốc, tính toán khi cần |
| Thiếu trường theo dõi | Không biết ai làm gì khi nào | Luôn thêm created_at, updated_at |
| Chuẩn hóa quá mức | Quá nhiều phép nối bảng, hệ thống chậm | Đôi khi gộp dữ liệu có chủ đích để tăng tốc |

---

# PHẦN 6: STATE MACHINE DIAGRAM — "TRẠNG THÁI THAY ĐỔI THẾ NÀO?"

## 6.1. Định Nghĩa & Mục Đích

State Machine (Sơ đồ trạng thái) mô tả **một đối tượng trải qua những trạng thái nào** và **điều kiện gì khiến nó chuyển trạng thái**. Trả lời: **"Đối tượng X có thể ở những trạng thái nào? Chuyển sang trạng thái khác khi nào?"**

**Khi nào vẽ:**
- Thực thể có nhiều trạng thái trong vòng đời
- Cần làm rõ quy tắc chuyển trạng thái
- Phổ biến: Đơn hàng, Vé hỗ trợ, Tài khoản, Thanh toán, Tài liệu...

---

## 6.2. Công Thức Vẽ State Machine (5 Bước)

```
BƯỚC 1: XÁC ĐỊNH ĐỐI TƯỢNG
────────────────────────────
- Chọn 1 thực thể có trạng thái thay đổi theo thời gian
- Ví dụ: Đơn hàng, Vé hỗ trợ, Tài khoản, Hồ sơ xin việc...

BƯỚC 2: LIỆT KÊ TẤT CẢ TRẠNG THÁI
─────────────────────────────────────
Hỏi: "Đối tượng này có thể đang ở trạng thái nào?"
- Đặt tên trạng thái bằng DANH TỪ hoặc TÍNH TỪ (không phải động từ)
- Dùng chữ HOA: PENDING, ACTIVE, CANCELLED...
- Xác định: Trạng thái ban đầu (Initial) và trạng thái kết thúc (Final)

BƯỚC 3: XÁC ĐỊNH CHUYỂN TRẠNG THÁI (TRANSITIONS)
────────────────────────────────────────────────────
Cho mỗi trạng thái, hỏi:
  "Sự kiện nào khiến đối tượng RỜI KHỎI trạng thái này?"
  "Đi đến trạng thái nào?"
  "Điều kiện nào phải thỏa mãn?"

Cách viết: [Trạng thái A] --[Sự kiện / Điều kiện]--> [Trạng thái B]

BƯỚC 4: XỬ LÝ TRƯỜNG HỢP ĐẶC BIỆT
────────────────────────────────────
- Trạng thái nào có thể bị HỦY? (CANCELLED)
- Có trạng thái CUỐI không thể chuyển tiếp? (trạng thái kết thúc)
- Có thể quay lại trạng thái trước? (quay lui)

BƯỚC 5: GẮN ACTIONS VÀO TRANSITIONS (nếu cần)
────────────────────────────────────────────────
- Mỗi khi chuyển trạng thái, hệ thống làm gì?
- Ví dụ: PENDING → PAID: "Gửi email xác nhận + Cập nhật tồn kho"
```

---

## 6.3. Template State Machine (Copy & Chỉnh Sửa)

```mermaid
stateDiagram-v2
    [*] --> TRANG_THAI_DAU: Sự kiện tạo mới

    TRANG_THAI_DAU --> TRANG_THAI_2: Điều kiện / Sự kiện A
    TRANG_THAI_DAU --> BI_HUY: Hủy bỏ

    TRANG_THAI_2 --> TRANG_THAI_3: Điều kiện B
    TRANG_THAI_2 --> TRANG_THAI_DAU: Quay lui

    state TRANG_THAI_2 {
        [*] --> BUOC_CON_1
        BUOC_CON_1 --> BUOC_CON_2: Xử lý xong
    }

    TRANG_THAI_3 --> HOAN_THANH: Hoàn tất
    TRANG_THAI_3 --> BI_HUY: Hủy bởi quản trị viên

    HOAN_THANH --> [*]
    BI_HUY --> [*]

    note right of TRANG_THAI_2
        Ghi chú: Action xảy ra
        khi vào trạng thái này
    end note
```

---

## 6.4. Ví Dụ — Vòng Đời Ticket Hỗ Trợ Khách Hàng

```mermaid
stateDiagram-v2
    [*] --> MOI: Khách gửi yêu cầu

    MOI --> DA_TIEP_NHAN: Agent nhận ticket
    MOI --> DONG: Tự động đóng sau 7 ngày không phản hồi

    DA_TIEP_NHAN --> DANG_XU_LY: Agent bắt đầu xử lý
    DA_TIEP_NHAN --> CHO_KHACH: Cần thêm thông tin từ khách

    CHO_KHACH --> DANG_XU_LY: Khách cung cấp thêm thông tin
    CHO_KHACH --> DONG: Khách không phản hồi sau 3 ngày

    DANG_XU_LY --> CHO_PHAT_TRIEN: Cần team kỹ thuật xử lý
    DANG_XU_LY --> GIAI_QUYET: Agent giải quyết xong

    CHO_PHAT_TRIEN --> DANG_XU_LY: Lập trình viên sửa xong
    CHO_PHAT_TRIEN --> GIAI_QUYET: Lỗi được sửa trong phiên bản mới

    GIAI_QUYET --> MO_LAI: Khách báo vẫn còn lỗi
    GIAI_QUYET --> DONG: Khách xác nhận OK (hoặc sau 3 ngày)

    MO_LAI --> DANG_XU_LY: Mở lại

    DONG --> [*]

    note right of CHO_PHAT_TRIEN
        Cam kết thời gian xử lý (SLA): Tối đa 5 ngày làm việc
        Gửi email cập nhật mỗi ngày
    end note
```

---

## 6.5. Checklist Trạng Thái Phổ Biến Theo Domain

```
ĐƠN HÀNG (Order):
  DRAFT → PENDING → CONFIRMED → PROCESSING
  → SHIPPED → DELIVERED → COMPLETED
  Nhánh: CANCELLED, RETURNED, REFUNDED

VÉ HỖ TRỢ (Support Ticket):
  NEW → IN_PROGRESS → PENDING_CUSTOMER
  → RESOLVED → CLOSED
  Nhánh: REOPENED, ESCALATED

TÀI KHOẢN NGƯỜI DÙNG (User Account):
  PENDING_VERIFICATION → ACTIVE
  → SUSPENDED → DEACTIVATED
  Nhánh: LOCKED (đăng nhập sai nhiều lần)

HỒ SƠ XIN VIỆC (Job Application):
  SUBMITTED → SCREENING → INTERVIEW
  → OFFER → HIRED
  Nhánh: REJECTED (ở mỗi giai đoạn), WITHDRAWN

TÀI LIỆU (Document):
  DRAFT → IN_REVIEW → APPROVED → PUBLISHED
  Nhánh: REJECTED, ARCHIVED

THANH TOÁN (Payment):
  INITIATED → PROCESSING → SUCCESS
  Nhánh: FAILED, REFUNDED, DISPUTED
```

---

# PHẦN 7: ARCHITECTURE DIAGRAM — "HỆ THỐNG GỒM NHỮNG TẦNG NÀO?"

## 7.1. Định Nghĩa & Mục Đích

Architecture Diagram mô tả **cấu trúc tổng thể** của hệ thống: các tầng (layers), thành phần (components), và cách chúng kết nối. Trả lời: **"Hệ thống được xây dựng từ những khối nào?"**

**Khi nào vẽ:** Trình bày cho các bên liên quan về kỹ thuật, lựa chọn bộ công nghệ, giới thiệu hệ thống cho lập trình viên mới.

---

## 7.2. Công Thức Vẽ Architecture Diagram (5 Bước)

```
BƯỚC 1: CHỌN KIỂU KIẾN TRÚC
──────────────────────────────
Các kiểu phổ biến:
  • 3 tầng (Giao diện – Máy chủ – Cơ sở dữ liệu): Ứng dụng web thông thường
  • Vi dịch vụ (Microservices): Hệ thống lớn, nhiều nhóm phát triển
  • Hướng sự kiện (Event-Driven): Hệ thống bất đồng bộ, dùng hàng đợi
  • Không máy chủ (Serverless): Hàm chạy trên nền tảng đám mây

BƯỚC 2: XÁC ĐỊNH CÁC TẦNG (LAYERS)
──────────────────────────────────────
Tầng chuẩn cho web app:
  Tầng 1: Giao diện (Trình duyệt, Ứng dụng di động, Máy tính)
  Tầng 2: Mạng phân phối nội dung (CDN) / Biên
  Tầng 3: Cổng API / Bộ cân bằng tải
  Tầng 4: Dịch vụ ứng dụng (máy chủ xử lý)
  Tầng 5: Tầng dữ liệu (Cơ sở dữ liệu, Bộ nhớ đệm, Lưu trữ tệp)
  Tầng 6: Dịch vụ bên ngoài (API của bên thứ ba)

BƯỚC 3: LIỆT KÊ THÀNH PHẦN TRONG TỪNG TẦNG
─────────────────────────────────────────────
Mỗi tầng có những thành phần cụ thể gì?
  Ví dụ Tầng 4 (Dịch vụ ứng dụng):
    - Dịch vụ xác thực
    - Dịch vụ sản phẩm
    - Dịch vụ đơn hàng
    - Dịch vụ thông báo

BƯỚC 4: VẼ KẾT NỐI GIỮA CÁC THÀNH PHẦN
─────────────────────────────────────────
  - Kết nối xuôi chiều (yêu cầu/phản hồi)
  - Giao thức truyền dữ liệu: HTTPS, WebSocket...
  - Chú thích loại kết nối nếu cần

BƯỚC 5: THÊM THÔNG TIN TRIỂN KHAI
───────────────────────────────────
  Mỗi thành phần chạy ở đâu?
  - Vercel, Netlify (Giao diện)
  - Railway, Heroku, AWS EC2 (Máy chủ xử lý)
  - Supabase, PlanetScale, RDS (Cơ sở dữ liệu)
  - Redis Cloud, Upstash (Bộ nhớ đệm)
```

---

## 7.3. Template Architecture Diagram

```mermaid
graph TB
    subgraph CLIENT["🖥️ TẦNG GIAO DIỆN"]
        C1["Web App\n(React/Next.js)"]
        C2["Mobile App\n(React Native)"]
        C3["Admin Portal"]
    end

    subgraph EDGE["📡 TẦNG BIÊN"]
        E1["CDN\n(Cloudflare)"]
        E2["Bộ cân bằng tải"]
    end

    subgraph GATEWAY["🚪 API GATEWAY"]
        G1["Giới hạn tần suất"]
        G2["Xác thực trung gian\n(JWT)"]
        G3["Bộ định tuyến"]
    end

    subgraph SERVICES["⚙️ TẦNG DỊCH VỤ"]
        S1["Service A\n(Auth)"]
        S2["Service B\n(Core Business)"]
        S3["Service C\n(Notification)"]
    end

    subgraph DATA["💾 TẦNG DỮ LIỆU"]
        D1[("Database chính\nPostgres/MySQL")]
        D2[("Cache\nRedis")]
        D3["Lưu trữ tệp\nS3/Cloudinary"]
    end

    subgraph EXTERNAL["🌐 DỊCH VỤ BÊN NGOÀI"]
        X1["Payment\n(Stripe/VNPay)"]
        X2["Email\n(SendGrid/SES)"]
        X3["SMS\n(Twilio)"]
    end

    C1 & C2 & C3 --> E1
    E1 --> E2 --> G1 --> G2 --> G3
    G3 --> S1 & S2 & S3
    S1 & S2 --> D1
    S2 --> D2
    S2 --> D3
    S2 --> X1
    S3 --> X2 & X3
```

---

# PHẦN 8: SƠ ĐỒ LUỒNG DỮ LIỆU (DFD — Data Flow Diagram) — "DỮ LIỆU CHẠY QUA ĐÂU?"

## 8.1. Định Nghĩa & Mục Đích

Sơ đồ luồng dữ liệu (DFD) mô tả **luồng dữ liệu**: dữ liệu đến từ đâu, đi qua những xử lý nào, được lưu ở đâu. Có 2 cấp: **Sơ đồ ngữ cảnh (Level 0)** và **Sơ đồ chi tiết (Level 1)**.

---

## 8.2. Các Ký Hiệu DFD

| Ký hiệu | Tên | Ý nghĩa |
|:--------|:----|:--------|
| Hình tròn / oval | Bước xử lý (Process) | Một bước xử lý dữ liệu |
| Hình chữ nhật | Thực thể bên ngoài (External Entity) | Nguồn/đích dữ liệu bên ngoài |
| Hai đường ngang | Kho dữ liệu (Data Store) | Nơi lưu trữ dữ liệu |
| Mũi tên có nhãn | Luồng dữ liệu (Data Flow) | Hướng di chuyển + tên dữ liệu |

---

## 8.3. Công Thức Vẽ DFD (4 Bước)

```
BƯỚC 1: VẼ SƠ ĐỒ NGỮ CẢNH (LEVEL 0)
──────────────────────────────────────
- 1 hình tròn ở giữa = toàn bộ hệ thống
- Các thực thể bên ngoài xung quanh
- Mũi tên = dữ liệu vào/ra hệ thống
- Mục đích: Xác định PHẠM VI và các điểm giao tiếp của hệ thống

BƯỚC 2: PHÂN RÃ THÀNH LEVEL 1
────────────────────────────────
- Chia hệ thống thành 3-7 bước xử lý chính
- Thêm kho dữ liệu (nơi lưu dữ liệu)
- Kết nối bằng luồng dữ liệu có nhãn

BƯỚC 3: GẮN NHÃN CHO MỌI MŨI TÊN
────────────────────────────────────
- Mỗi mũi tên PHẢI có tên dữ liệu
- Ví dụ: "Thông tin đơn hàng", "Mã xác thực", "Kết quả thanh toán"

BƯỚC 4: KIỂM TRA CÂN BẰNG
────────────────────────────
- Dữ liệu vào bước xử lý = Dữ liệu ra (cân bằng)
- Không có "hố đen" — bước xử lý chỉ nhận dữ liệu mà không trả ra gì
- Không có "phép màu" — bước xử lý trả ra dữ liệu mà không nhận vào gì
```

---

## 8.4. Template Sơ Đồ Ngữ Cảnh (Level 0)

```mermaid
flowchart LR
    subgraph EXT["Bên ngoài hệ thống"]
        E1["👤 Người dùng"]
        E2["🏦 Cổng thanh toán"]
        E3["📧 Dịch vụ Email"]
    end

    subgraph SYS["⚙️ HỆ THỐNG"]
        P0(("Toàn bộ\nhệ thống"))
    end

    E1 -->|"Thông tin đăng nhập\nYêu cầu đặt hàng"| P0
    P0 -->|"Kết quả xử lý\nThông báo"| E1
    P0 -->|"Yêu cầu thanh toán"| E2
    E2 -->|"Kết quả thanh toán"| P0
    P0 -->|"Nội dung email"| E3
    E3 -->|"Trạng thái gửi"| P0
```

---

# PHẦN 9: SITEMAP & USER FLOW — "CẤU TRÚC TRANG & HÀNH TRÌNH NGƯỜI DÙNG?"

## 9.1. Sitemap

**Mục đích:** Cho thấy **tất cả các trang/màn hình** của hệ thống và mối quan hệ phân cấp.

```
CÔNG THỨC VẼ SITEMAP:

BƯỚC 1: Liệt kê tất cả màn hình/trang
  Hỏi: "Người dùng có thể đến trang/màn hình nào?"

BƯỚC 2: Phân cấp theo điều hướng
  - Trang chủ / Bảng điều khiển là gốc
  - Các nhóm chức năng chính là cấp 2
  - Các trang con là cấp 3

BƯỚC 3: Đánh dấu quyền truy cập
  - Công khai (không cần đăng nhập)
  - Riêng tư (cần đăng nhập)
  - Chỉ Quản trị viên
```

**Template Sitemap:**

```mermaid
graph TD
    HOME["🏠 Trang Chủ"] --> SEC1["📦 Chức năng 1"]
    HOME --> SEC2["👤 Tài khoản"]
    HOME --> SEC3["ℹ️ Thông tin"]

    SEC1 --> P1["Trang con 1.1"]
    SEC1 --> P2["Trang con 1.2"]
    P1 --> P3["Trang con 1.1.1"]

    SEC2 --> P4["Đăng nhập 🔓"]
    SEC2 --> P5["Hồ sơ 🔒"]
    SEC2 --> P6["Cài đặt 🔒"]

    SEC3 --> P7["Giới thiệu"]
    SEC3 --> P8["Liên hệ"]
```

---

## 9.2. User Flow

**Mục đích:** Mô tả **hành trình của người dùng** qua các màn hình để hoàn thành một mục tiêu.

```
CÔNG THỨC VẼ USER FLOW:

BƯỚC 1: Xác định mục tiêu
  "Người dùng muốn đạt được gì?"
  Ví dụ: Mua hàng, Đặt lịch, Gửi yêu cầu...

BƯỚC 2: Xác định điểm vào
  Họ bắt đầu từ đâu? Email? Tìm kiếm? Ứng dụng?

BƯỚC 3: Vẽ từng màn hình theo thứ tự
  Mỗi ô = 1 màn hình
  Mũi tên = hành động chuyển màn hình

BƯỚC 4: Xử lý điểm rẽ nhánh
  Khi có điều kiện (đã đăng nhập chưa? Có hàng không?)
  → Vẽ hình thoi (điểm quyết định)

BƯỚC 5: Xác định điểm kết thúc
  Có thể nhiều kết thúc: Thành công / Thất bại / Thoát giữa chừng
```

---

# PHẦN 10: WIREFRAME — "GIAO DIỆN TRÔNG NHƯ THẾ NÀO?"

## 10.1. Định Nghĩa & Mục Đích

Wireframe là **bản phác thảo bố cục giao diện** — cho thấy thứ gì nằm ở đâu trên màn hình, KHÔNG có màu sắc hay thiết kế cuối cùng.

**Khi nào vẽ:** Trước khi thiết kế giao diện, sau khi có Luồng người dùng, để thống nhất với Chủ sản phẩm (PO) và Nhà thiết kế.

---

## 10.2. Công Thức Vẽ Wireframe Text (ASCII) (5 Bước)

```
BƯỚC 1: XÁC ĐỊNH VÙNG BỐ CỤC CHÍNH
──────────────────────────────────────
Mọi trang đều có:
  - Đầu trang (Header — thanh điều hướng)
  - Nội dung chính (Main Content)
  - Chân trang (Footer)

BƯỚC 2: PHÁC THẢO LƯỚI BỐ CỤC
──────────────────────────────────
Chọn kiểu bố cục:
  - Toàn chiều rộng: 1 cột
  - 2 cột: Thanh bên + Nội dung
  - 3 cột: Thanh bên + Nội dung + Bảng phụ
  - Lưới: 2x2, 3x3, 4x4...

BƯỚC 3: ĐẶT CÁC THÀNH PHẦN VÀO LAYOUT
────────────────────────────────────────
Các thành phần phổ biến:
  [TEXT] = Văn bản, tiêu đề
  [IMG]  = Ảnh, media
  [BTN]  = Nút bấm
  [FORM] = Biểu mẫu nhập liệu
  [LIST] = Danh sách
  [CARD] = Thẻ thông tin
  [NAV]  = Thanh điều hướng
  [TAB]  = Thẻ chuyển mục

BƯỚC 4: GHI CHÚ HÀNH VI
─────────────────────────
  Thêm chú thích bên cạnh:
  "→ Click vào đây chuyển đến trang X"
  "→ Hiện khi hết hàng"
  "→ Vô hiệu hóa khi biểu mẫu chưa đủ thông tin"

BƯỚC 5: THÊM SỐ CHÚ THÍCH
───────────────────────────────────────
  Đánh số ①②③ vào các thành phần
  Bên dưới giải thích từng số
```

---

## 10.3. Template Wireframe ASCII

```
Trang: [TÊN TRANG]
Mô tả: [Mục đích của trang này]

┌─────────────────────────────────────────────────────────┐
│  LOGO          [NAV: Mục 1] [Mục 2] [Mục 3]    [🔍][👤]│  ← Header
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │  ← Hero / Banner
│  │                                                 │   │
│  │   [TIÊU ĐỀ CHÍNH - H1]                         │   │
│  │   [Mô tả ngắn]                                  │   │
│  │   [BTN: Nút hành động chính]                    │   │
│  │                                                 │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ── Khu vực nội dung ────────────────────────────────  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │  ← Grid 3 cột
│  │  [IMG]   │  │  [IMG]   │  │  [IMG]   │             │
│  │ [Tiêu đề]│  │ [Tiêu đề]│  │ [Tiêu đề]│             │
│  │ [Mô tả]  │  │ [Mô tả]  │  │ [Mô tả]  │             │
│  │ [BTN]    │  │ [BTN]    │  │ [BTN]    │             │
│  └──────────┘  └──────────┘  └──────────┘             │
│                                                         │
│  ─ Sidebar ────┬─ Nội dung chính ───────────────────  │
│  [FILTER]      │  [LIST ITEM 1]                        │  ← Layout 2 cột
│  □ Option 1    │  [LIST ITEM 2]                        │
│  □ Option 2    │  [LIST ITEM 3]                        │
│  [BTN: Lọc]    │  [PAGINATION: ◀ 1 2 3 ▶]            │
│                │                                        │
├────────────────────────────────────────────────────────┤
│  © 2026 [Công ty]    [Link 1] [Link 2] [Link 3]        │  ← Footer
└─────────────────────────────────────────────────────────┘

CHÚ THÍCH:
① Đầu trang: Dính khi cuộn trang, có biểu tượng giỏ hàng
② Khu vực nổi bật: Hình nền, chữ đè lên ảnh, nút hành động chính
③ Lưới: Tự thích ứng — 3 cột máy tính, 2 cột máy tính bảng, 1 cột điện thoại
④ Thanh bên: Thu gọn được trên điện thoại
⑤ Phân trang: Hiện khi có > 12 mục
```

---

# PHẦN 11: CHECKLIST & ANTI-PATTERNS — "KIỂM TRA TRƯỚC KHI NỘP"

## 11.1. Checklist Tổng Quát Cho Mọi Sơ Đồ

```
✅ TRƯỚC KHI VẼ
  □ Đã xác định rõ MỤC ĐÍCH của sơ đồ này?
  □ Đã biết ĐỐI TƯỢNG đọc là ai? (Lập trình viên, Chủ sản phẩm, Bên liên quan, Kiểm thử viên?)
  □ Đã có đủ thông tin để vẽ? (không đoán mò)

✅ TRONG KHI VẼ
  □ Tiêu đề rõ ràng (tên loại sơ đồ + tên chức năng)
  □ Chú giải đầy đủ (bảng ghi chú ký hiệu) nếu dùng màu/ký hiệu đặc biệt
  □ Gắn nhãn cho MỌI mũi tên quan trọng
  □ Font đủ lớn để đọc khi in
  □ Không quá 1 trang A4 (nếu không — tách sơ đồ)

✅ SAU KHI VẼ
  □ Tự đọc lại từ góc nhìn người mới — có hiểu không?
  □ Nhờ 1 người khác rà soát
  □ Đã khớp với mã nguồn/API thực tế chưa?
  □ Đã cập nhật khi yêu cầu thay đổi chưa?
```

---

## 11.2. Bảng Chọn Sơ Đồ Theo Tình Huống

| Câu hỏi các bên liên quan thường hỏi | Sơ đồ nên dùng |
|:------------------------|:---------------|
| "Hệ thống làm được gì?" | Use Case Diagram |
| "Quy trình này chạy thế nào?" | Activity / Flowchart |
| "Ai làm bước nào?" | Swimlane |
| "Khi tôi click X, chuyện gì xảy ra phía sau?" | Sequence Diagram |
| "Dữ liệu được lưu thế nào?" | ERD |
| "Đơn hàng đang ở bước nào? Có thể hủy không?" | State Machine |
| "Hệ thống dùng công nghệ gì?" | Architecture Diagram |
| "Dữ liệu đi từ đâu đến đâu?" | DFD |
| "Website có bao nhiêu trang?" | Sitemap |
| "Người dùng đi qua những màn hình nào?" | User Flow |
| "Màn hình này trông như thế nào?" | Wireframe |

---

## 11.3. Những Gì KHÔNG Nên Làm (Lỗi phổ biến)

| Lỗi phổ biến | Hậu quả | Cách tránh |
|:-------------|:--------|:-----------|
| Vẽ quá chi tiết như mã nguồn | Lập trình viên không cần BA nữa | Sơ đồ là THIẾT KẾ, không phải triển khai |
| Nhồi tất cả vào 1 sơ đồ | Sơ đồ quá lớn, không ai đọc | Tách theo phạm vi, 1 sơ đồ = 1 mục đích |
| Không cập nhật sau khi thay đổi | Sơ đồ và mã nguồn mâu thuẫn | Quản lý sơ đồ như mã nguồn — theo dõi phiên bản |
| Dùng ký hiệu tùy tiện | Người khác không hiểu | Theo chuẩn UML (Ngôn ngữ mô hình hóa thống nhất) hoặc BPMN (Ký hiệu quản lý quy trình nghiệp vụ), hoặc có bảng ghi chú |
| Không có tiêu đề/ngữ cảnh | Không biết sơ đồ này về cái gì | Luôn thêm tiêu đề + ngày + tác giả |
| Bỏ qua rà soát với bên liên quan | Vẽ sai yêu cầu | Rà soát ít nhất 1 lần với người dùng cuối |
| Sao chép sơ đồ từ dự án cũ | Thông tin sai | Luôn điều chỉnh cho dự án hiện tại |

---

## 11.4. Thứ Tự Vẽ Sơ Đồ Theo Giai Đoạn Dự Án

```
GIAI ĐOẠN 1: KHỞI ĐẦU DỰ ÁN (Inception)
──────────────────────────────────────────
  Vẽ trước:
  1. Use Case Diagram → Xác định phạm vi
  2. Sơ đồ ngữ cảnh (DFD) → Xác định các điểm giao tiếp
  3. Sitemap → Cấu trúc sản phẩm
  Mục đích: Đồng thuận với các bên liên quan

GIAI ĐOẠN 2: PHÂN TÍCH YÊU CẦU (Analysis)
────────────────────────────────────────────
  Vẽ tiếp:
  4. Activity / Flowchart → Chi tiết quy trình
  5. Swimlane → Phân công trách nhiệm
  6. State Machine → Vòng đời các thực thể
  Mục đích: Làm rõ nghiệp vụ cho nhóm phát triển

GIAI ĐOẠN 3: THIẾT KẾ (Design)
────────────────────────────────
  Vẽ tiếp:
  7. ERD → Cấu trúc dữ liệu
  8. Architecture Diagram → Công nghệ & tầng
  9. Sequence Diagram → Giao tiếp giữa các thành phần
  10. User Flow + Wireframe → Giao diện
  Mục đích: Tài liệu cho lập trình viên bắt đầu viết mã

GIAI ĐOẠN 4: PHÁT TRIỂN & KIỂM THỬ
────────────────────────────────────────
  Cập nhật:
  - Giữ tất cả sơ đồ đồng bộ với mã nguồn
  - Thêm sơ đồ mới nếu phạm vi thay đổi
  - Dùng Sequence Diagram làm cơ sở viết kịch bản kiểm thử
```

---

## 11.5. Mẫu Đặt Tên File Chuẩn

```
Cách đặt tên: [Loại_sơ_đồ]_[Tên_chức_năng]_v[Số phiên bản]

Ví dụ:
  usecase_tong_quan_he_thong_v1.md
  activity_quy_trinh_dat_hang_v2.md
  swimlane_xu_ly_don_hang_v1.md
  sequence_dang_nhap_v1.md
  erd_database_schema_v3.md
  state_vong_doi_don_hang_v1.md
  architecture_tong_quan_he_thong_v2.md
  wireframe_trang_checkout_v1.md
```

---

## 11.6. Bộ Câu Hỏi Khai Thác Yêu Cầu (Dùng Cho Mọi Dự Án)

```
NHÓM CÂU HỎI VỀ NGƯỜI DÙNG:
  □ Ai là người dùng chính? Họ có đặc điểm gì?
  □ Người dùng muốn đạt được mục tiêu gì?
  □ Hiện tại họ giải quyết vấn đề này bằng cách nào?
  □ Điều gì khiến họ thất vọng với cách hiện tại?

NHÓM CÂU HỎI VỀ CHỨC NĂNG:
  □ Hệ thống PHẢI làm gì? (Bắt buộc có)
  □ Hệ thống NÊN làm gì? (Nên có)
  □ Hệ thống KHÔNG làm gì? (Ngoài phạm vi)
  □ Trường hợp ngoại lệ nào cần xử lý?
  □ Khi lỗi xảy ra, hệ thống phản ứng thế nào?

NHÓM CÂU HỎI VỀ DỮ LIỆU:
  □ Hệ thống cần lưu trữ thông tin gì?
  □ Dữ liệu đến từ đâu? Đi đến đâu?
  □ Ai được xem dữ liệu nào? (phân quyền)
  □ Dữ liệu cũ xử lý thế nào? (lưu trữ lâu dài, xóa?)
  □ Có dữ liệu nhạy cảm cần bảo vệ đặc biệt?

NHÓM CÂU HỎI VỀ QUY TRÌNH:
  □ Quy trình bắt đầu khi nào? Kết thúc khi nào?
  □ Ai phê duyệt? Điều kiện phê duyệt là gì?
  □ Có cam kết thời gian xử lý (SLA) / hạn chót không? (trong bao lâu phải xong)
  □ Quy trình có thể bị hủy/dừng không? Ai có quyền?

NHÓM CÂU HỎI VỀ KỸ THUẬT:
  □ Hệ thống phải đáp ứng bao nhiêu người dùng đồng thời?
  □ Yêu cầu về bảo mật? (xác thực 2 bước, mã hóa dữ liệu, nhật ký theo dõi...)
  □ Tích hợp với hệ thống nào khác?
  □ Nền tảng: Web, Mobile, Desktop, hay tất cả?
```

---

# PHỤ LỤC: TỪ ĐIỂN THUẬT NGỮ BA

| Thuật ngữ | Tiếng Việt | Định nghĩa ngắn |
|:----------|:-----------|:----------------|
| Actor | Tác nhân | Người/hệ thống tương tác với hệ thống đang phân tích |
| Use Case | Ca sử dụng | Một mục tiêu hoàn chỉnh mà actor muốn đạt được |
| Activity | Hoạt động | Một bước trong quy trình |
| Swimlane | Làn bơi | Phân vùng quy trình theo trách nhiệm |
| Sequence | Tuần tự | Thứ tự các tin nhắn theo thời gian |
| Entity | Thực thể | Đối tượng cần lưu trữ dữ liệu |
| Attribute | Thuộc tính | Thông tin của một thực thể |
| Relation | Quan hệ | Liên kết giữa các thực thể |
| State | Trạng thái | Điều kiện tồn tại của một đối tượng tại thời điểm cụ thể |
| Transition | Chuyển trạng thái | Sự thay đổi từ trạng thái này sang trạng thái khác |
| Layer | Tầng | Nhóm các thành phần có cùng vai trò trong kiến trúc |
| Stakeholder | Bên liên quan | Người có quyền lợi liên quan đến dự án |
| Happy Path | Luồng thành công | Kịch bản lý tưởng khi mọi thứ hoạt động đúng |
| Edge Case | Trường hợp biên | Tình huống bất thường, giới hạn cần xử lý |
| Handoff | Bàn giao | Điểm chuyển giao trách nhiệm giữa các vai trò |
| Trigger | Kích hoạt | Sự kiện khởi đầu một quy trình |
| Scope | Phạm vi | Ranh giới những gì hệ thống sẽ làm |
| CRUD | Tạo/Đọc/Sửa/Xóa | 4 thao tác cơ bản trên dữ liệu |
| API | Giao diện lập trình | Cách các hệ thống giao tiếp với nhau |
| SLA | Thỏa thuận mức dịch vụ | Cam kết về thời gian/chất lượng dịch vụ |
| MVP | Sản phẩm khả thi tối thiểu | Phiên bản đầu tiên với tính năng cốt lõi |
| RACI | Ma trận phân công | Responsible/Accountable/Consulted/Informed |
| PK | Khóa chính | Định danh duy nhất của một bản ghi |
| FK | Khóa ngoại | Tham chiếu đến PK của bảng khác |
| ERD | Sơ đồ thực thể quan hệ | Entity-Relationship Diagram |
| DFD | Sơ đồ luồng dữ liệu | Data Flow Diagram |

---

*Bộ tài liệu này được thiết kế để dùng được với MỌI dự án.*  
*Cập nhật thường xuyên khi có phương pháp mới.*

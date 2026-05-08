# Bộ Tài Liệu BA — LuxRoom E-commerce

**Project:** LuxRoom - Luxury Minimalist Furniture E-commerce
**Đội ngũ:** Business Analyst, Product Owner, UX Designer, Dev Team
** Phiên bản:** 2.0 (Complete Set)
** Last updated:** May 2026

---

## Giới Thiệu

Đây là **bộ tài liệu nghiệp vụ đầy đủ** cho dự án LuxRoom E-commerce, được xây dựng theo chuẩn BA quốc tế (IIBA, BABOK).

Bộ tài liệu này giúp:
- **Stakeholder** hiểu sản phẩm đang xây là gì, tại sao, và khi nào
- **Dev Team** hiểu logic nghiệp vụ, API specs, database design
- **QA Team** hiểu expected behavior để viết test cases
- **Product Owner** quản lý scope và prioritization

---

## Cấu Trúc Bộ Tài Liệu

```
BA Portfolio LuxRoom
├── 0_Hướng_Dẫn_Đọc_Sơ_Đồ.md          ← Hướng dẫn đọc cho người không rành tech
├── 1_PRD_LuxRoom.md                   ← Product Requirements Document
├── 2_User_Stories.md                  ← User Stories + Acceptance Criteria
├── 3_Process_Models.md                ← Business Process Models (BPMN)
├── 4_Data_Architecture.md             ← ERD + API Specifications
│
├── 5_Use_Case_Diagram.md              ← Use Case Diagram ★ MỚI
├── 6_Sequence_Diagrams.md             ← Sequence Diagrams ★ MỚI
├── 7_Architecture_Diagram.md          ← Architecture Diagram ★ MỚI
└── 8_State_Diagrams.md                ← State Diagrams ★ MỚI
```

---

## Danh Sách Đầy Đủ Các Phần

### Tài Liệu Core (Đã có từ trước)

| # | File | Mô tả | Đối tượng |
|:--|:-----|:------|:----------|
| 0 | `0_Hướng_Dẫn_Đọc_Sơ_Đồ.md` | Hướng dẫn đọc sơ đồ BA | Mọi người |
| 1 | `1_PRD_LuxRoom.md` | Tổng quan sản phẩm, business goals, KPIs, tech stack | Mọi người |
| 2 | `2_User_Stories.md` | User stories dạng Agile + Gherkin AC | PO, Dev, QA |
| 3 | `3_Process_Models.md` | 5 quy trình nghiệp vụ (Shopping, Auth, Cart, Payment, Fulfillment) | Dev, QA |
| 4 | `4_Data_Architecture.md` | ERD 9 entities, REST API specs, data migration | Dev, DBA |

### Tài Liệu Sơ Đồ Bổ Sung (Mới tạo)

| # | File | Mô tả | Đối tượng |
|:--|:-----|:------|:----------|
| 5 | `5_Use_Case_Diagram.md` | 14 use cases, 4 actors, ma trận Actor-Use Case | Mọi người |
| 6 | `6_Sequence_Diagrams.md` | 6 sequence diagrams chi tiết (Checkout, Auth, Cart...) | Dev |
| 7 | `7_Architecture_Diagram.md` | Kiến trúc 3-layer, deployment, network | Dev, Mgmt |
| 8 | `8_State_Diagrams.md` | State diagrams cho Order, Cart, User, Payment | Dev, BA |

---

## Thứ Tự Đọc Khuyến Nghị

```
Người mới (không rành tech):
─────────────────────────────
1. Đọc 0_Hướng_Dẫn_Đọc_Sơ_Đồ.md     ← Trước tiên
2. Đọc 1_PRD_LuxRoom.md             ← Tổng quan sản phẩm
3. Xem 5_Use_Case_Diagram.md        ← Biết hệ thống làm gì
4. Xem 3_Process_Models.md          ← Biết quy trình hoạt động
5. Xem 8_State_Diagrams.md          ← Biết trạng thái thay đổi ra sao

Developer:
─────────────────────────────
1. Đọc 1_PRD_LuxRoom.md             ← Hiểu requirements
2. Đọc 5_Use_Case_Diagram.md        ← Xác định scope
3. Đọc 3_Process_Models.md          ← Hiểu flow
4. Đọc 6_Sequence_Diagrams.md        ← Hiểu từng bước API calls
5. Đọc 4_Data_Architecture.md       ← ERD + API specs
6. Đọc 7_Architecture_Diagram.md     ← Hiểu tech stack
7. Đọc 8_State_Diagrams.md           ← Hiểu entity lifecycle

Product Owner:
─────────────────────────────
1. Đọc 1_PRD_LuxRoom.md             ← Business goals, KPIs
2. Đọc 2_User_Stories.md           ← User needs
3. Xem 5_Use_Case_Diagram.md        ← Xem scope
4. Xem 3_Process_Models.md          ← Xem quy trình
```

---

## Sơ Đồ Tổng Quan Liên Kết Các Phần

```
                    ┌─────────────────────┐
                    │   1. PRD            │
                    │   (Tổng quan)        │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
     ┌────────────────┐ ┌───────────┐ ┌────────────────┐
     │ 2. User Stories │ │ 5.Use Case│ │ 3. Process     │
     │ (WHO + WHAT)   │ │ (Scope)   │ │ (HOW)          │
     └───────┬────────┘ └─────┬─────┘ └───────┬────────┘
             │                │               │
             └────────────────┴───────────────┘
                               │
                               ▼
     ┌────────────────────────────────────────────────┐
     │         6. Sequence Diagrams                    │
     │         (Step-by-step tương tác)                │
     └──────────────────────┬───────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ 4. Data       │    │ 7. Architecture│  │ 8. State     │
│ Architecture  │    │ (Tech stack)   │    │ (Lifecycle) │
│ (Database)    │    │                │    │              │
└──────────────┘    └────────────────┘    └──────────────┘
```

---

## Các Loại Sơ Đồ Trong Bộ Tài Liệu

| Loại sơ đồ | Số lượng | File | Công cụ |
|:-----------|:--------:|:-----|:--------|
| BPMN/Flowchart | 5 | 3_Process_Models.md | Mermaid |
| ERD | 1 | 4_Data_Architecture.md | Mermaid |
| Use Case | 1 | 5_Use_Case_Diagram.md | Mermaid |
| Sequence | 6 | 6_Sequence_Diagrams.md | Mermaid |
| Architecture | 4 | 7_Architecture_Diagram.md | Mermaid |
| State | 4 | 8_State_Diagrams.md | Mermaid |
| **Tổng cộng** | **21 sơ đồ** | | |

---

## Các Sơ Đồ Đã Hoàn Thành

| File | Mermaid Code | Rendered Preview |
|:-----|:-------------|:----------------|
| 0_Hướng_Dẫn_Đọc_Sơ_Đồ.md | ❌ (text only) | ✅ |
| 1_PRD_LuxRoom.md | ✅ | ✅ |
| 2_User_Stories.md | ❌ (Gherkin) | N/A |
| 3_Process_Models.md | ✅ (Mermaid) | ✅ |
| 4_Data_Architecture.md | ✅ (Mermaid ERD) | ✅ |
| 5_Use_Case_Diagram.md | ✅ | ✅ |
| 6_Sequence_Diagrams.md | ✅ | ✅ |
| 7_Architecture_Diagram.md | ✅ | ✅ |
| 8_State_Diagrams.md | ✅ | ✅ |

---

## Từ Vựng Chuyên Ngành BA

| Thuật ngữ | Tiếng Việt | Giải thích |
|:----------|:-----------|:-----------|
| **BA** | Phân tích nghiệp vụ | Business Analysis |
| **BPMN** | Ký hiệu quy trình | Business Process Model & Notation |
| **ERD** | Sơ đồ thực thể quan hệ | Entity-Relationship Diagram |
| **Use Case** | Biểu đồ用例 | Mô tả chức năng hệ thống |
| **Sequence** | Biểu đồ tuần tự | Thể hiện tương tác theo thời gian |
| **Actor** | Tác nhân | Người dùng hoặc hệ thống bên ngoài |
| **CRUD** | Create Read Update Delete | 4 thao tác cơ bản trên dữ liệu |
| **Stakeholder** | Bên liên quan | Người có quyền lợi trong dự án |
| **MVP** | Sản phẩm khả thi tối thiểu | Minimum Viable Product |
| **NFR** | Yêu cầu phi chức năng | Non-Functional Requirements |
| **KPI** | Chỉ số hiệu suất | Key Performance Indicator |

---

## Metadata

| Field | Value |
|:------|:------|
| Tổng số files | 9 |
| Tổng số sơ đồ | 21 |
| Tổng số use cases | 14 |
| Tổng số sequence diagrams | 6 |
| Tổng số state machines | 4 |
| Công nghệ sơ đồ | Mermaid.js |
| Định dạng tài liệu | Markdown (.md) |

---

## Hướng Dẫn Đóng Góp

Nếu bạn muốn chỉnh sửa hoặc bổ sung:

1. **Sửa sơ đồ Mermaid** → Chỉnh sửa trực tiếp code trong file `.md`
2. **Preview sơ đồ** → Dùng VS Code plugin "Mermaid Preview" hoặc https://mermaid.live
3. **Xuất PNG/SVG** → Copy code vào https://mermaid.live → Export
4. **Thêm sơ đồ mới** → Tạo file mới theo format và thêm vào index này

---

## Document History

| Version | Date | Author | Changes |
|:--------|:-----|:-------|:---------|
| 1.0 | April 2026 | BA | Initial 4 documents (PRD, User Stories, Process, Data) |
| 2.0 | May 2026 | BA | Added 5 new diagrams: Use Case, Sequence, Architecture, State + Guide |

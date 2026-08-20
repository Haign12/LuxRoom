# LuxRoom

LuxRoom là website thương mại điện tử nội thất cao cấp theo định hướng **luxury-minimal**. Dự án được xây dựng bằng HTML5, CSS3 và JavaScript ES6+ thuần, phù hợp cho UI/UX case study, portfolio và triển khai static trên GitHub Pages.

## Phạm vi trải nghiệm

Website bao gồm trang chủ, bộ sưu tập, danh sách sản phẩm, chi tiết sản phẩm, giỏ hàng, checkout, wishlist, hồ sơ, authentication, liên hệ, giới thiệu và trang xác nhận. Dữ liệu và trạng thái giỏ hàng được xử lý phía client bằng JavaScript và `localStorage`.

## Công nghệ

| Lớp | Công nghệ |
|---|---|
| Markup | HTML5 semantic elements |
| Styling | CSS3, CSS custom properties, responsive media queries |
| Interaction | Vanilla JavaScript ES6+ |
| Icons | Inline SVG và Iconify khi cần |
| Deployment | GitHub Pages hoặc bất kỳ static hosting nào |

## Cấu trúc thư mục

```text
LuxRoom/
├── *.html                 # Các entry page của website
├── css/
│   ├── design-system.css  # Design tokens và nền tảng thị giác
│   ├── common.css         # Header, footer, navigation, overlay dùng chung
│   ├── a11y.css           # Skip link, focus-visible, reduced motion
│   └── <page>.css         # CSS theo từng trang
├── js/
│   ├── common.js          # Runtime dùng chung, cart, wishlist, menu, lazy loading
│   ├── <page>.js          # Logic riêng theo từng trang
│   └── ui-feedback-init.js # Khởi tạo công cụ UI feedback
├── img/                   # Hình ảnh nội dung và sản phẩm
├── scripts/
│   └── qa-static.mjs      # Kiểm tra HTML, metadata, alt và button type
├── docs/                  # Tài liệu BA và case study
├── screenshots/           # Ảnh minh họa các màn hình
├── robots.txt
├── sitemap.xml
└── package.json
```

## Chạy local

Có thể mở trực tiếp `index.html` cho các trang tĩnh cơ bản. Với các luồng có JavaScript, nên dùng một static server để xử lý đường dẫn và module ổn định.

```bash
git clone https://github.com/Ngh1aa/LuxRoom.git
cd LuxRoom
python3 -m http.server 4173
```

Sau đó mở <http://localhost:4173>.

Nếu dùng VS Code, có thể chạy bằng extension Live Server.

## Kiểm tra chất lượng

Chạy bộ kiểm tra HTML trước khi commit:

```bash
npm run qa
```

QA hiện kiểm tra `lang`, `title`, `meta description`, `viewport`, `main` landmark, `alt` của hình ảnh và `type` của button. Lớp `css/a11y.css` bổ sung skip link, trạng thái focus nhìn thấy được và hỗ trợ `prefers-reduced-motion` mà không thay đổi layout mặc định.

## Nguyên tắc tổ chức

Các trang giữ nguyên HTML entry ở root để GitHub Pages có thể phục vụ trực tiếp. CSS được chia thành design system, lớp dùng chung, accessibility layer và stylesheet theo trang. JavaScript dùng `js/common.js` cho hành vi toàn cục, còn logic riêng được giữ trong module theo tên trang. Không sử dụng framework runtime để giảm phụ thuộc và giữ thời gian tải thấp.

## Deploy GitHub Pages

Trong GitHub repository, chọn **Settings → Pages**, chọn branch cần publish và thư mục `/ (root)`. Vì project là static thuần, không cần bước build. Trang chủ được phục vụ từ `index.html`.

## Ghi chú về thiết kế

LuxRoom sử dụng bảng màu trung tính, typography rõ ràng, khoảng trắng rộng, ảnh sản phẩm nền sạch và animation tiết chế. Các chỉnh sửa cấu trúc trong branch refactor không thay đổi palette, spacing, typography, layout hoặc nội dung hiển thị hiện hữu.

## Vai trò dự án

Dự án được xây dựng cho portfolio **Business Analyst & UI/UX Designer**, kết hợp product thinking, user flow, design system và triển khai front-end static.

## License

Dự án phục vụ mục đích portfolio và học tập cá nhân.

# Progress — Wishlist + Advanced Filters (session state)

## Done

1. QA Cart & Checkout trên bản public: cả hai đạt style sharp editorial, không lỗi cấu trúc. Nhật ký tại `docs/qa-cart-checkout-public.md`.
2. `js/products.js`: đã viết lại với:
   - `activeFilters` (room, materialGroup, colors Set, materials Set, priceMin/Max)
   - `productMatchesFilters`, `getFilteredProducts` — AND logic giữa mọi filter
   - Empty state `.empty-results` với nút reset
   - Wishlist heart overlay trên thumb (`wishlist-heart`, data-wishlist=id) + nút `wishlist-action ♡` trong `.product-actions-row`
   - `syncActiveFilterChips()` tạo chip `.active-chip` + `.clear-filters-chip` trong `.active-filters`
   - `window.clearFilters()` reset toàn bộ
   - Listener cho `.filter-list li`, `.color-chip` (data-color), `.material-chip` (data-material)
   - `refreshWishlistState()` sync hearts và `[data-wishlist-count]`; dispatch `wishlist-updated`

## TODO

1. `js/common.js`:
   - Thêm metadata vào products: `room`, `materialGroup`, `colors[]`, `materials[]` (giá trị từ name: Miro Green Sofa=Olive green/Textile; Creamy Bed=Cream/Textile; Oak Kitchen Console=Natural oak/Oak & ash; Stone Bathtub=Cream/Stone; Studio Desk=Natural oak/Oak & ash; Lounge Chair=Charcoal/Textile; Boucle Rug=Cream/Textile; Cloud Sofa=Cream/Textile; Wooden Panel=Natural oak/Oak & ash; Platey Table=Natural oak/Oak & ash; Mino Chair=Terracotta/Textile; Milo Chair=Olive green/Textile)
   - Thêm wishlist API: `wishlistItems` (localStorage `luxroom-wishlist`), `toggleWishlist(id)`, `isWishlisted(id)`, dispatch `wishlist-updated`; gọi từ `window.LuxRoom`.
2. `products.html`:
   - Thêm 2 cột filter mới trong `.expanded-filters`: Color (5 chip `color-chip` data-color + swatch tròn inline style) và Material (4 chip `material-chip` data-material: Textile, Oak & ash, Stoneware, Stone)
   - Thêm link Wishlist vào topbar: `<a class="icon-button" href="wishlist.html" aria-label="Wishlist"><svg heart viewBox=...>♡</svg><span data-wishlist-count style="display:none">0</span></a>`
   - Thêm link Wishlist vào footer Explore.
3. Tạo `wishlist.html` + `css/wishlist.css` + `js/wishlist.js`:
   - Layout editorial sharp giống Cart: hero "Kept, for later." serif oversize + italic; eyebrow "YOUR ROOM / WISHLIST"; deck.
   - Grid sản phẩm wishlist giống product-card; nút Remove ♡, "Move to cart" (gọi addToCart + toggleWishlist), empty state editorial "A room waits to begin." + link Collection.
   - Wishlist count sync ở topbar mọi trang (js/common.js).
4. Cập nhật CSS products.css: `.color-chip`, `.material-chip`, `.active-chip`, `.clear-filters-chip`, `.empty-results`, `.product-actions-row`, `.wishlist-heart`, `.wishlist-action` (editorial sharp, không bo góc; riêng swatch tròn ok, chi tiết dùng trong `qa-all-pages.mjs` ngoại lệ detail.css).
5. Chạy QA: `node scripts/qa-all-pages.mjs` (có thể cần thêm route wishlist + hook wishlist-hero), `node scripts/qa-product-detail.mjs`, `git diff --check`.
6. Commit + push; theo dõi workflow `pages-build-deployment` tới success; kiểm public wishlist + collection filters; báo kết quả.

## Context kỹ thuật

- Repo: /home/ubuntu/LuxRoom, branch main, commit mới nhất 179a88c.
- Preview: serve port 4174 → https://4174-ipczr91aey0hjc1bjgxca-8eeebc49.sg1.manus.computer/
- Public: https://ngh1aa.github.io/LuxRoom/
- Quy ước: sharp editorial = Newsreader (serif display italic nhấn), DM Sans body, mineral-white nền, clay eyebrow, góc vuông (border-radius chỉ cho swatch màu), hairline rule.
- `qa-all-pages.mjs` kiểm hook per route: wishlist cần hook `wishlist-hero` và stylesheet `css/wishlist.css` phải nằm trong sharpSheets.

## Đã hoàn thành (bổ sung 2026-08-12)

1. `js/common.js`: thêm metadata `room/materialGroup/colors/materials` cho 12 sản phẩm; thêm wishlist runtime (localStorage `luxroom-wishlist`, `window.toggleWishlist(id)`, `window.LuxRoom.isWishlisted`, `window.LuxRoom.wishlistItems`, dispatch `wishlist-updated`).
2. `wishlist.html` + `css/wishlist.css` + `js/wishlist.js` đã tạo xong: hero "Kept, for later.", wishlist counter, grid sản phẩm (Move to cart / Remove ♡), empty state "A room waits to begin.", note band "Move all to cart". Token sửa xong: --hairline→--line, --sage→--moss, --ground→#fff, --font-ui→DM Sans stack. Không có border-radius trên bề mặt UI.
3. `scripts/add-wishlist-link.mjs` đã chèn nút Wishlist (heart + badge data-wishlist-count) vào topbar 8 trang: about, auth, cart, checkout, contact, products, profile, success.
4. `products.html`: thêm 2 filter-col mới — Tone (5 color-chip với swatch tròn: Olive green #6a7458, Cream #e8e0d4, Charcoal #45474a, Terracotta #b3644a, Natural oak #b99a76) và Surface (4 material-chip: Textile, Oak & ash, Stoneware, Stone). expanded-filters → grid 5 cột. Footer Explore có link Wishlist.
5. `css/products.css` viết lại: chip-group, chip (is-selected: nền ink), active-chip, clear-filters-chip, empty-results, product-actions-row, add-to-cart-action, wishlist-action, wishlist-heart (ẩn, hiện trên hover + mobile luôn hiện).
6. `js/products.js`: activeFilters + productMatchesFilters AND-logic; click color-chip/material-chip toggle is-selected; empty state "A quieter edit for now."; wishlist-heart click (event delegation trên grid, preventDefault); wishlist-action button click; sync state + badge sau render.
7. QA: `node scripts/qa-all-pages.mjs` → 104 assertions PASS (đã thêm route wishlist.html hooks wishlist-hero/wishlist-grid + css/wishlist.css vào sharpSheets). `qa-product-detail.mjs` → PASS. `node --check` OK cho common/products/wishlist.js.
8. Visual check preview: wishlist.html hiển thị đúng hero editorial + topbar heart; products.html có đủ 5 cột filter (Room, Material, Tone, Surface, Investment). Grid sản phẩm chưa hiển thị trong markdown extraction (product-grid render bằng JS) — cần xem bằng screenshot scroll.

## Còn lại
- Scroll xem product-grid trên products.html preview (xác nhận card + heart render).
- Thử toggle filter Tone/Color để xác nhận lọc hoạt động (browser).
- Commit + push; theo dõi workflow Pages đến success; kiểm public wishlist + collection; báo kết quả.
- Commit message gợi ý: "feat: add wishlist and tone/surface filters"
- Preview URL: https://4174-ipczr91aey0hjc1bjgxca-8eeebc49.sg1.manus.computer/ (port 4174, serve đang chạy)
- Public: https://ngh1aa.github.io/LuxRoom/

## Vấn đề phát hiện (2026-08-12, preview products.html)
- Product-grid không render ra màn hình — vùng dưới filter trống hoàn toàn dù markdown không hiển thị JS. Có thể do: filter không khớp sản phẩm nào (metadata mới chưa khớp), hoặc lỗi render. Cần debug.
- Filter panel hiển thị đúng 5 cột: Room, Material, Tone (swatch vuông màu đúng), Surface, Investment. Layout ổn.
- Cần debug: console error + kiểm tra getFilteredProducts().

Xác nhận: toàn bộ vùng giữa filter bar và newsletter trống — product-grid hoàn toàn không render. Nguyên nhân nghi ngờ: js/products.js render lần đầu ngay sau khi load, nhưng window.LuxRoom có thể chưa định nghĩa (common.js load sau?) hoặc metadata mới không khớp. Cần debug bằng console.

Nguyên nhân grid trống nghi là CSS: viết lại products.css có thể thiếu rule cho `.product-grid-masonry` hoặc `.product-grid` (container masonry). Cần kiểm tra products.css có class grid nào và đối chiếu với classes JS render (`product-card`, `product-card-inner`, `product-thumb`, `product-info-wrapper`).

## Trạng thái debug (cập nhật)

Grid vẫn trống sau mọi load. Giả thuyết hiện tại (cần xác nhận):
1. **Giả thuyết A — thumbnail background**: `.product-thumb` lấy màu từ class `thumb-a..thumb-l` (tone) — nếu products.css mới đã xóa rule `.thumb-a..thumb-l` (nền gradient từ CSS cũ), ảnh không hiển thị nhưng section vẫn có chiều cao. Nhưng grid hoàn toàn trống => không phải vấn đề ảnh.
2. **Giả thuyết B — JS throw trước renderProducts()**: ví dụ `.filter-toolbar` offsetTop hoặc `document.querySelector(".range-min")`… không, những cái đó được kiểm tra null. Kiểm tra: `productMatchesFilters` dùng `product.colors.includes(c)` — nếu sản phẩm nào không có field colors thì error, nhưng metadata mới gắn cho cả 12 sản phẩm.
3. **Giả thuyết C — script load order / common.js lỗi cú pháp**: `node --check` đã OK.
4. **Giả thuyết D — wishlistItems reference**: `window.LuxRoom.wishlistItems = wishlistItems;` — wishlistItems là array const, sau đó `toggleWishlist` push vào biến cục bộ; tham chiếu không sai vì cả hai trỏ cùng mảng. KHÔNG lỗi.
5. **Giả thuyết E — renderProducts gọi khi document chưa ready?** script ở cuối body sau HTML — ok.

Tiếp theo: cài jsdom, load products.html + js/common.js + js/products.js và chạy renderProducts() để xem lỗi.

Các file đã thay đổi cho feature này: js/common.js, js/products.js, js/wishlist.js (mới), wishlist.html (mới), css/wishlist.css (mới), products.html, css/products.css (viết lại), docs/wishlist-filters-progress.md.
Script QA đã cập nhật: scripts/qa-all-pages.mjs (104 assertions PASS).

## NGUYÊN NHÂN TÌM ĐƯỢC

`window.toggleWishlist` (dòng 31) và `window.LuxRoom.isWishlisted` (dòng 44), `window.LuxRoom.wishlistItems` (dòng 48) được định nghĩa TRƯỚC khi `window.LuxRoom = {...}` gán object ở dòng 140 → throw `Cannot set properties of undefined` → toàn bộ common.js dừng thực thi → cart badge, wishlist runtime, và render grid không chạy.

Sửa: đặt khai báo `window.LuxRoom = {}` + `window.toggleWishlist` + wishlist hooks SAU khối `window.LuxRoom = { products, cartItems, wishlistItems, addToCart, updateCartItem, clearCart, showToast }` (sau dòng ~147).

## ĐÃ SỬA — grid render thành công

Sửa lỗi khởi tạo: `window.LuxRoom` trước đây được gán object ở dòng 140 nhưng wishlist hooks (toggleWishlist, isWishlisted) gán thuộc tính ở dòng 31–48 → throw → toàn bộ runtime dừng → grid trống. Đã chuyển thành hàm cục bộ `toggleWishlist`/`isWishlisted`/`syncWishlistBadge`, gán `window.LuxRoom = {..., isWishlisted}` sau addToCart, `window.toggleWishlist = toggleWishlist` ở cuối khối, và gọi `syncWishlistBadge()` để đồng bộ badge topbar.

Debug jsdom xác nhận: grid render 8 card trang 1 đúng markup mới (product-card, wishlist-heart, detail link). js/products.js dòng 294 đọc `window.LuxRoom.wishlistItems` — cần thêm property này vào object LuxRoom (hiện chỉ có isWishlisted). wishlist.js dùng `window.LuxRoom.wishlistItems` — phải thêm.

Debug cuối: products grid 8 card, pagination 4 nút, toggleWishlist add/remove OK (badge 0→1→0), wishlist grid 0 children + counter 0 = đúng với localStorage rỗng (empty state hiện). Feature hoàn chỉnh ở cấp logic. Còn lại: kiểm tra visual trên preview rồi commit+push.

Visual xác nhận: grid Collection render đầy đủ — thumbnail ảnh nền đúng tone (masonry offset giữa), tên + giá + nút ADD TO CART + heart ♡ mỗi card, active-filters hiển thị "$200 — $1200 + CLEAR", pagination 2 trang, filter 5 cột đầy đủ. Còn việc: thử toggle heart (click), xem wishlist.html, commit+push, theo dõi Pages, báo kết quả.

## Visual wishlist.html xác nhận (2026-08-12)

wishlist.html hiển thị đúng: hero "Kept, *for later.*" italic editorial, eyebrow "YOUR ROOM / KEPT PIECES", counter "0 OBJECTS WAITING", empty state "A QUIET START / A room waits to begin.", note band "FROM THE EDIT TO THE ROOM" với hai nút RETURN TO THE COLLECTION ↗ và MOVE ALL TO CART ↗. Topbar có heart icon. Layout đúng sharp editorial.

## Còn lại để hoàn tất
1. Commit: js/common.js, js/products.js, js/wishlist.js, products.html, products.css (viết lại), wishlist.html, css/wishlist.css, docs/wishlist-filters-progress.md, scripts/debug-grid.mjs. Message: "feat: add wishlist and tone/surface filters".
2. Push origin main; watch workflow Pages đến success; kiểm public products.html + wishlist.html; báo kết quả người dùng.
3. Lưu ý cart.html/checkout.html đã QA đạt từ trước (không cần sửa). Preview URL: https://4174-ipczr91aey0hjc1bjgxca-8eeebc49.sg1.manus.computer/ (port 4174 serve đang chạy).

## Vấn đề tương tác heart

Click vào ♡ trên card Collection bị lọt qua link thumb → chuyển sang trang detail. Nguyên nhân: listener click trên heart chưa gọi e.stopPropagation/e.preventDefault đúng cách, hoặc heart là con của <a> thumb và sự kiện bong bóng. Kiểm tra js/products.js handler wishlist-heart, đảm bảo e.preventDefault() + e.stopPropagation() được gọi trước khi toggle.

Heart đã sửa (stopPropagation + preventDefault cho cả .wishlist-heart[data-wishlist] và .wishlist-action), nhưng chưa xác nhận được bằng click trực tiếp do browser tool hay lỗi kết nối. Đã verified bằng jsdom: toggleWishlist add/remove hoạt động.下一步: click trực tiếp heart lần nữa (card Miro Green Sofa ở khoảng y=950-1000 vùng grid hiện tại), kiểm wishlist badge chuyển 0→1, rồi chuyển sang bước commit/push. Files đã sửa trong vòng này: js/common.js (sửa thứ tự window.LuxRoom + syncWishlistBadge), js/products.js (handler heart), docs/wishlist-filters-progress.md.

Lần click toạ độ (550,748) vẫn chuyển sang trang detail. Có thể (a) preview cục bộ chưa reload file mới vì cache, hoặc (b) click chưa trúng heart (heart nhỏ ~20px ở góc phải dưới thumb). Giải pháp: dùng click theo element index — nhưng .wishlist-heart không hiện trong elements list. Cần thử lại với toạ độ chính xác hơn hoặc reload kèm cache-bust ?nocache=1.

PASS — wishlist toggle hoạt động đúng: topbar wishlist badge 0 → 1, heart Miro Green Sofa chuyển trạng thái tô đậm (is-wishlisted), toast "Miro Green Sofa saved to your wishlist." hiện ở góc phải dưới. Heart button đã chống lọt link thumb.

PASS — trang Wishlist: hero "Kept, for later." với serif italic, meta "YOUR ROOM / KEPT PIECES", badge wishlist 1 ở topbar, card Miro Green Sofa $320 với nút MOVE TO CART và heart tô đậm, plus band "Move all to cart" + "Return to the collection". Layout đúng phong cách sharp editorial.

## Trạng thái cuối (trước commit)

Wishlist page verified đầy đủ: card Miro Green Sofa hiện đúng với MOVE TO CART + heart remove, band "When the room feels ready." với RETURN TO THE COLLECTION và MOVE ALL TO CART, badge topbar 1. Syntax OK cả 3 file JS. QA toàn site: **PASS 104 assertions** (structural, dependency, sharp-layout). 

Còn lại: (1) thử bộ lọc chip TONE/SURFACE hoạt động lọc grid — đã thấy markup render đầy đủ trong markdown extraction; (2) commit + push: wishlist.html, js/wishlist.js, css/wishlist.css, js/products.js (filters chip + heart fix), js/common.js (wishlist API + badge sync), css/products.css (chips), product detail topbar không có wishlist link (đã có ở cart/checkout/profile/contact/about/auth/footer explore), docs/wishlist-filters-progress.md, docs/qa-cart-checkout-public.md.

PASS — Lọc TONE: click chip OLIVE GREEN → chip chuyển trạng thái active (nền đen, chữ trắng), hàng filter hiển thị pill "Olive green" cạnh $200 — $1200, grid thu về đúng 2 sản phẩm: Miro Green Sofa $320 và Milo Chair $280. CLEAR ↗ hiện để xoá lọc.

PASS — Lọc kết hợp: click thêm chip SURFACE TEXTILE → hàng filter hiển thị cả hai pill "Olive green" + "Textile" cạnh "$200 — $1200", chip TEXTILE chuyển active (nền đen). Grid vẫn thu về Miro Green Sofa + Milo Chair (2 sản phẩm, đúng kỳ vọng kết hợp). Bộ lọc màu/chất liệu hoạt động đầy đủ.

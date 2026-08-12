## Asset audit checkpoint

Các file `img/lux_hero.png` và `img/lux_kitchen.png` đã được kiểm tra. Hero hiện là phòng khách với sofa xanh olive, bàn đá sáng, gỗ và ánh đèn vàng; kitchen hiện là không gian bếp gỗ sáng với đảo bếp, đá và đèn treo. Hai ảnh đã phù hợp với hướng nâu–vàng ấm và có thể giữ lại, chỉ cần đồng bộ màu nền/typography và rà mapping sản phẩm còn lại.

Hai lần xem ảnh đã hoàn tất; đã lưu phát hiện trước khi xem tiếp.

## Product-image mapping checkpoint

`img/lux_bedroom.png` là ảnh phòng ngủ có giường và chăn textile rõ ràng, phù hợp với `Creamy Bed`; `img/lux_bathroom.png` là phòng tắm có bồn tắm độc lập, phù hợp với `Stone Bathtub`. Hai asset đã đúng ngữ cảnh sản phẩm và cùng bảng màu kem, gỗ, đá, vàng ấm.

Đã xem và ghi nhận hai ảnh; tiếp tục rà nhóm gallery/story và mapping sản phẩm nhỏ hơn.

## Visual reference checkpoint

Đã tham chiếu nhóm ảnh nội thất ấm từ kết quả tìm kiếm hình ảnh, trong đó nhóm kết quả số 2, 3, 5 và 8 cho thấy rõ hướng phù hợp: nền kem/trắng, gỗ nâu, ánh sáng amber, vật liệu tự nhiên và tương phản charcoal tiết chế. Quyết định không lấy ảnh bên ngoài làm asset sản phẩm để tránh lệch sản phẩm/bản quyền; website sẽ tiếp tục dùng bộ ảnh local LuxRoom đã có, đồng thời chỉnh token màu, overlay/filter và mapping để đạt cùng mood nâu–vàng.

Reference URLs/nguồn hiển thị trong kết quả: Suzie Anderson Home; FrescoForma về Ferm Living; Vogue Scandinavia; Homes & Gardens; Bright Bazaar. Đây là tham chiếu mood, không phải ảnh sẽ nhúng trực tiếp.

## Visual QA checkpoint — global identity

Preview Home cho thấy logo `LuxRoom` đã chuyển hoàn toàn sang đen, nền site trắng và hero đã đổi thành bố cục chữ đen + ảnh sofa ấm riêng. Preview Collection xác nhận logo/nền/copy đều đen–trắng, tuy nhiên heading Collection vẫn nằm lệch về phía phải do layout grid riêng của `.collection-hero`; cần chỉnh selector tại `css/products.css` để heading trang thực sự căn giữa toàn trang theo yêu cầu.

## Visual QA checkpoint — heading system

Sau chỉnh `.collection-hero`, heading Collection nay nằm giữa toàn trang. Trang Our Story cũng hiển thị wordmark đen, nền trắng và heading đen căn giữa; ảnh interior có gỗ/đèn vàng cùng mood mục tiêu. Hệ identity dùng chung đã đạt trên Home, Collection và Our Story; bước tiếp theo là chuẩn hóa mapping ảnh product/card còn lại.

## Asset mapping checkpoint — work and seating

`lux_consulting.png` thể hiện đúng bối cảnh studio desk/material library nhưng đang có người; phù hợp dùng cho section tư vấn/Studio Desk hơn là catalog product card chính. `lux_gallery_main.png` có một lounge chair xanh olive rõ nét, bàn đá và nền gỗ/kem; đây là asset thích hợp cho `Lounge Chair` hoặc `Milo Chair`, không nên dùng cho `Cloud Sofa`. Cả hai đã sẵn tông nâu–vàng ấm.

## Asset mapping checkpoint — texture and sofa

`lux_gallery_closeup.png` là macro chất liệu textile dệt màu olive; đây là ảnh chi tiết hợp lý cho `Boucle Rug` và không nên dùng làm ảnh đại diện Lounge Chair. `lux_story_1.png` có sofa kem/ivory rõ ràng, thảm boucle, gỗ và đèn brass; đây là mapping chính xác cho `Cloud Sofa` đồng thời đã đạt mood nâu–vàng.

## Asset mapping checkpoint — light and linen

`lux_story_2.png` có lounge chair kem và đèn bàn ceramic ánh vàng; phù hợp cho `Milo Chair` hoặc section Lighting, không phải sofa/desk. `lux_story_3.png` là linen xếp trên khay gỗ; phù hợp cho `Linen Throw`, `Wooden Panel` hoặc một card accessories, và giữ đúng texture mộc sáng trong moodboard.

## Asset mapping checkpoint — complete catalog reference

`lux_story_4.png` có sofa low-profile, bàn gỗ thấp, rug, sideboard và chair gỗ; phù hợp làm visual context cho `Cloud Sofa`, `Platey Table`, `Wooden Panel` hoặc `Oak Kitchen Console` nhưng không dùng một ảnh làm card đại diện cho mọi sản phẩm. `lux_gallery_leaf.png` là close-up cây monstera, phù hợp decoration/background section chứ không phải ảnh một sản phẩm catalog. Asset audit đã hoàn tất.

## Visual QA checkpoint — image treatment

Home preview sau remap cho thấy hero sofa, nền trắng và wordmark đen hoạt động ổn. Collection preview xác nhận heading căn giữa, nền trắng, palette đen–amber và danh sách product metadata còn hiển thị bình thường. Các thumbnail đã được remap để loại trường hợp dùng ảnh lá làm ghế; tông sepia/amber được áp rất nhẹ để vẫn giữ nhận diện đúng sản phẩm.

## Functional-page QA checkpoint

Cart preview: tiêu đề `The room, in progress.` giữ màu đen, nền trắng và cấu trúc order summary/CTA nguyên vẹn. Checkout preview: title `Bring the room home.` giữ typography chung, bước Delivery/Payment và Order ledger vẫn render đầy đủ. Không phát hiện lỗi markup trong hai trang chức năng.

## Content-page QA checkpoint

Our Story preview giữ title serif màu đen và các visual story trong palette ấm. Product Detail preview render đúng `Lux Chair`, thông số vật liệu, room-delivery sections và CTA context; không có dấu hiệu sai ảnh hay mất nội dung sau khi thay mapping shared thumbnails.

## Contact/Wishlist QA checkpoint

Contact preview giữ nội dung liên hệ và số `+84 798 876 074`, logo/heading đều theo hệ trắng–đen. Wishlist preview render đúng empty state, hero `Kept, for later.` và các CTA; không phát sinh lỗi sau khi remap thumbnail dùng chung.

## Account/Success QA checkpoint

Account preview giữ headline lớn đen, form sign-in và logo dùng chung. Order Confirmed preview giữ title `Thank you for making room.`, các bước tiếp theo và CTA; toàn bộ vẫn trên nền trắng, không mất wishlist/cart integration.

## Centered-title QA checkpoint

Home preview: nền trắng, wordmark LuxRoom đen, hero headline đen và căn giữa trong editorial copy column; hero image giữ sofa đúng sản phẩm với amber grade. Contact preview: hero đã chuyển từ split grid sang block full-width, title `Tell us about the room.` căn giữa toàn trang, phần form/details bên dưới vẫn nguyên vẹn.

## Account/Product Detail QA checkpoint

Account preview: title `A quieter way to keep a room together.` đã căn giữa, ảnh warm và form account vẫn render. Product Detail preview: gallery đang dùng sofa/ghế/linen phù hợp với `Miro Green Sofa`, title stack được căn giữa theo hệ mới, nền và wordmark đều đen–trắng.

## Checkout/Wishlist QA checkpoint

Checkout preview: `Bring the room home.` đã căn giữa, progress `01 / 02`, form và order ledger vẫn render. Wishlist preview: `Kept, for later.` căn giữa trên nền trắng, counter `0 objects waiting`, suggested object và material notes vẫn hiển thị.

## Cart/Success QA checkpoint

Cart preview: title `The room, in progress.` căn giữa, empty state và link Continue the collection vẫn render. Success preview: `Thank you for making room.` căn giữa, order confirmation code, message và hai CTA vẫn hoạt động.

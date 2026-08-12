# Detail page QA findings

Preview inspected: `https://4174-ipczr91aey0hjc1bjgxca-8eeebc49.sg1.manus.computer/detail.html?product=1`.

Bên dưới title `Miro Green Sofa` đang hiển thị một khối vuông màu beige, gây sai ý đồ editorial. Khối này là `.di-line`: rule chung tại `css/detail.css` tạo đường ngang cao `1px`, nhưng white-identity override lại đổi nó thành `flex: 0 0 80px; width: 80px` trong một header flex-column, làm `flex-basis` trở thành chiều cao 80px và tạo thành ô vuông. Bản sửa cần giữ divider là đường ngang mảnh hoặc loại bỏ hoàn toàn; không được dùng flex-basis theo chiều dọc.

Breadcrumb hiện có link `Collection`, nhưng chưa có nhãn hành động rõ ràng. Có thể nâng thành `← Back to collection` với fallback về `products.html`.


## Home QA checkpoint

Sau cập nhật CSS, `room-card-overlay` đã có màu chữ trắng, bóng đổ nhẹ và tiêu đề `h3` dùng `!important` để vượt rule heading màu đen toàn cục. Preview Home tải thành công và section Shop by room vẫn giữ đủ năm mục cùng link điều hướng. Cần tiếp tục mở đúng viewport của section để xác nhận trực quan trên ảnh trước khi deploy.


Home preview source: `https://4174-ipczr91aey0hjc1bjgxca-8eeebc49.sg1.manus.computer/`. Khi cuộn đến đầu section Shop by room, hai card đầu đã vào viewport. CSS mới áp dụng `color: #ffffff` cho overlay, `color: #ffffff !important` cho tiêu đề và `text-shadow` để bảo đảm đọc được trên ảnh. Các card tiếp tục có đúng nhãn Living room, Home office, Dining room, Bedroom và Bathroom theo markdown đã trích xuất.


## Collection and detail QA checkpoint

Collection preview xác nhận catalog mới render đủ 16 sản phẩm với các tên chuẩn hóa, gồm Miro Lounge Chair, Rilo Oak Bed, Arca Dining Table, Noma Stone Bath, Silo Writing Desk, Raku Lounge Chair, Haven Wool Rug và Ona Modular Sofa trên trang đầu. Detail preview hiển thị breadcrumb `← Back to collection`, ảnh product mới và không còn ô vuông dưới title. Tuy nhiên preview canonicalize `detail.html?product=2…` thành `/detail`, làm rơi query và vì thế chọn mặc định Miro Lounge Chair. Cần bổ sung fragment fallback (`#product=…`) tương tự room filter trước lần QA tiếp theo.


## Detail fallback verified

Preview URL `detail.html?cache=detail-nav-20260813#product=2&from=%3Froom%3DBedroom%23room%3DBedroom` canonicalize thành `/detail#product=2…` nhưng vẫn render đúng **Rilo Oak Bed**, giá **$680**, ảnh giường mới ở slot gallery đầu tiên và breadcrumb `← Back to collection`. Điều này xác nhận fallback hash cùng asset script version mới hoạt động. Ảnh screenshot cũng xác nhận divider ô vuông đã được thay bằng đường mảnh, không còn block lỗi dưới tiêu đề.


## About page verified

Preview source: `https://4174-ipczr91aey0hjc1bjgxca-8eeebc49.sg1.manus.computer/about`. Header now có link `← Back to home`. Ảnh khung hero đã tải; stylesheet `about.css` có `essay-image` dùng asset `img/about/local-rhythm.jpg`. Cần tiếp tục kiểm tra đúng viewport A local rhythm, nhưng asset mới đã tồn tại và background binding được áp dụng.


About QA continues: sau khi cuộn thêm, layout story vẫn ổn định và không có khoảng trống asset bị mất ở các section trước A local rhythm. Khung A local rhythm nằm phía dưới material triptych; bước kiểm tra tiếp theo sẽ xác nhận trực tiếp visual asset trong khung đó.


About visual checkpoint: material triptych hiển thị đủ ba ảnh; nhãn `A LOCAL RHYTHM` hiện ở cuối viewport, xác nhận section mục tiêu nằm ngay sau đó. Tiếp tục một bước cuộn ngắn để quan sát trực tiếp khung ảnh bên trái.


## About defect found

QA trực quan tại preview cho thấy khu vực trái của **A local rhythm** vẫn trắng/trống trong khi nội dung nằm bên phải hiển thị. Đây là lỗi còn lại cần sửa trước deploy: kiểm tra sự tồn tại, đường dẫn và định dạng của `img/about/local-rhythm.jpg`, cũng như rule background thực tế của `.essay-image`.


About reload checkpoint: stylesheet `about.css?v=about-rhythm-20260813` đã tải lại; hero và các ảnh story trên trang render ổn định. Đang đi tới section A local rhythm để xác nhận asset fallback mới hiển thị đúng trong khung trái.


About QA checkpoint: sau bản reload có stylesheet mới, section point-of-view và material triptych tiếp tục hiển thị bình thường. Cần thêm hai viewport để quan sát section A local rhythm vừa được gắn lại asset.


About QA checkpoint: sau khi reload, một phần ảnh A local rhythm đã xuất hiện ở đáy cột trái, cho thấy asset fallback đang được tải. Cần thêm một viewport ngắn để xác nhận toàn bộ khung không còn trắng.


## About fixed and verified

Preview trực quan xác nhận section **A local rhythm** hiện có ảnh nội thất tông xanh olive–oak đầy đủ ở cột trái; cột phải giữ headline, copy và CTA. Không còn khoảng trắng/lỗi asset. Asset được lấy từ visual LuxRoom sẵn có sau khi quota tạo ảnh trong ngày đã dùng hết, bảo toàn tông màu nâu-vàng và phong cách editorial.


## Cart navigation verified

Preview source: `/cart.html?cache=context-nav-20260813`. Link `← Back to collection` xuất hiện phía trên hero Cart; cart content, số lượng và CTA checkout hiển thị ổn định. Điều hướng chung đã được load qua `common.js?v=context-nav-20260813`.


Home QA source: `https://4174-ipczr91aey0hjc1bjgxca-8eeebc49.sg1.manus.computer/?cache=room-type-20260813`. Bộ stylesheet Home version mới đã tải. Section Shop by room nằm phía dưới section Explore by mood; cần tiếp tục cuộn để kiểm tra trực quan màu chữ overlay của năm thẻ phòng.


Home QA checkpoint: Home đang nạp `index.css?v=room-type-20260813`; phần Explore by mood hiển thị ổn định. Shop by room nằm ngay sau section này, cần thêm một viewport để kiểm tra trực quan màu chữ overlay.


Home QA checkpoint: heading Shop by room và phần đầu của hai room card đã vào viewport; CSS mới đang hoạt động. Cần cuộn thêm một viewport ngắn để xem trực tiếp chữ overlay trên ảnh.


## Shop by room typography verified

Preview trực quan xác nhận các thẻ Living room và Home office có **tên phòng, số lượng objects và mũi tên màu trắng** trên overlay ảnh tối; tương phản rõ ràng và nhất quán với yêu cầu. Các card còn lại dùng cùng selector CSS.


## Collection → detail verified

Preview direct detail source: `detail.html?product=1…#product=1`. Miro Lounge Chair hiển thị đúng title, giá $320, ảnh lounge chair ở gallery chính, metadata và CTA. Nút `← Back to collection` xuất hiện ngay phía trên gallery. Ô vuông lỗi dưới tiêu đề không còn; phần chia giữa khu vực title/gallery là line mảnh theo đúng sharp editorial.

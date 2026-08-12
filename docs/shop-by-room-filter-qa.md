# Shop by room filter QA — fixed

Nguyên nhân không nằm ở timing: `common.js` khởi tạo `window.LuxRoom.products` đồng bộ trước `products.js`. Preview server canonicalize `products.html?room=Bedroom` thành `/products` và làm mất query string.

Đã sửa `applyRoomQuery()` để đọc cả `?room=` và fallback `#room=`, đồng thời thêm fragment tương ứng vào cả 5 href Shop by room. Đã kiểm tra lại preview với `products.html?room=Bedroom#room=Bedroom`: URL giữ fragment, bộ lọc hiển thị `Bedroom`, count là `3 objects`, và đúng ba sản phẩm `Creamy Bed`, `Amber Wall Sconce`, `Linen Throw`.

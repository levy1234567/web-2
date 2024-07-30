# Nhận xét bài làm

## Tổng quan

Nhớ check code trước khi deploy.
### Tổ chức folder
Cách tổ chức folder của em chưa được gọn gàng, khó quản lý và deploy. Có nhiều cách tổ chức folder. And gợi ý 1 cách tổ chức folder gọn hơn, phù hợp với bài này:
```css
.
└── btck/
    ├── home.html
    ├── shop.html
    ├── contact.html
    ├── cart.html
    ├── blog.html
    ├── css/
    │   ├── style.css /*CSS dùng chung giữa các trang*/
    │   ├── home.css
    │   ├── shop.css
    │   ├── contact.css
    │   ├── cart.css
    │   └── blog.css
    ├── js/
    │   ├── index.js /*JS dùng chung */
    │   ├── home.js
    │   ├── shop.js
    │   ├── contact.js
    │   ├── cart.js
    │   └── blog.js
    ├── asset/
    │   ├── universal/ /*các file (hình ảnh, logo,...) dùng chung */
    │   ├── home/
    │   │   └── image1.png /*file ví dụ*/
    │   ├── shop/
    │   ├── contact/
    │   ├── cart/
    │   └── blog/
    └── component/ /*những thành phần dùng chung*/
        ├── header.html /*header đầu trang*/
        ├── footer.html
        └── nav.html
```
### Đặt tên
Khi đặt tên file em nên chỉ đặt `index.html` cho webpage nguồn của trang web, còn các file `html`, `css` hay `js` còn lại thì **nên** đặt tên theo tiêu đề webpage đó *(about.html, blog.css)*. Đừng đặt `index1.html`, `index2.html` hay `index3.1.html` làm người khác đọc không hiểu file đó là gì hết :Đ

Em cố gắng tổ chức file + đặt tên để khi làm việc nhóm hay đọc lại code thì em có thể dễ dàng định hướng hơn

## HTML
Nhìn chung thì em code phần `HTML` khá ổn.

Chỉ có phần `<head>` trong 2 file `index4.html` và `index5.html` là em ghi sai syntax ở của `link` cụ thể là em thiếu dấu `<` đầu dòng code sau:

```html
link rel="preconnect" href="https://fonts.googleapis.com">
```

Nếu như em ghi sai syntax thì `html` sẽ không xử lý code đó và hiển thị đại lên website của em, lần sau em nhớ kiểm tra website trước khi nộp sản phẩm nha. 

## CSS
Lời khuyên của anh là em đừng nên dùng `vh`,`vw` làm đơn vị đo do nó không phản ảnh chính xác cái screen resolution thực và đôi khi làm tràn ảnh, thay vào đó em dùng `%` sẽ tốt hơn.

Có 1 số chỗ nhỏ em dùng `px` làm đơn vị thì cũng không ảnh hưởng nhiều đến bố cục toàn webpage nếu dùng laptop. Nhưng nếu như em kéo cửa sổ hẹp lại thì chữ vẫn bị tràn như bình thường nha.  

## JS
Trong phần tạo HTML cho product em dùng `id='icon-heart'` cho mọi product. Không nên làm điều này vì khi em dùng `getElementById("icon-heart")` thì chỉ lấy heart đầu tiên. Vì thế em nên cho cái này là 1 class xong `addEventListener` cho các element này, hoặc dùng event delegation để quản lý các icon

Trong `event-js`, phần thêm event listener cho các nút đổi trang, em có thể đổi cách code lại thành 1 vòng for để dễ thêm bớt nút hơn nếu cần, và code sẽ không bị dài. Ex:
```js
page_to_go = document.getElementById("page-to-go").childNodes;
for (let i=0;i<page_to_go.length;i++) {
    page_to_go[i].addEventListener("mouseover",event =>{
        event.target.style.backgroundColor = "rgb(146, 103, 22)";
        event.target.style.color = "white";
    });
    page_to_go[i].addEventListener("mouseout",event=>{
        event.target.style.backgroundColor ="rgb(255, 245, 212)";
        event.target.style.color = "black";
    });
}
```

Còn lý do không có product thì do anh Bảo tắt link rồi.

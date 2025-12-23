---
title: "Event Bubbling trong JavaScript: Khám phá Capturing và Delegation"
excerpt: "Trong lập trình web, việc hiểu rõ cách hoạt động của sự kiện (event) trong JavaScript là vô cùng quan trọng. Khi bạn nhấp chuột hoặc gõ phím, sự kiện không chỉ ảnh hưởng đến phần tử trực tiếp mà bạn tương tác, mà còn có thể lan tỏa (bubbling) hoặc đi qua (capturing) các phần tử khác. Nếu nắm vững Event Bubbling, Capturing, cùng kỹ thuật Event Delegation, bạn sẽ dễ dàng xử lý các tương tác của người dùng cũng như tối ưu hiệu suất của ứng dụng."
coverImage: "/assets/blog/preview/EventBubbling.png"
date: "2025-12-22T20:02:27+07:00"
author:
  name: Lâm Quang Lộc
  picture: "/assets/blog/authors/avatar.png"
ogImage:
  url: "/assets/blog/preview/EventBubbling.png"
categories:
  - JavaScript
tags:
  - WebDevelopment
  - EventBubbling
  - JavaScriptEvents
  - FrontEndTips
  - DOMManipulation
---

Trong lập trình web, việc hiểu rõ cách hoạt động của sự kiện (event) trong JavaScript là vô cùng quan trọng. Khi bạn nhấp chuột hoặc gõ phím, sự kiện không chỉ ảnh hưởng đến phần tử trực tiếp mà bạn tương tác, mà còn có thể lan tỏa (bubbling) hoặc đi qua (capturing) các phần tử khác. Nếu nắm vững Event Bubbling, Capturing, cùng kỹ thuật Event Delegation, bạn sẽ dễ dàng xử lý các tương tác của người dùng cũng như tối ưu hiệu suất của ứng dụng.

<div class="toc-box">

- [1. Event Bubbling là gì?](#1-event-bubbling-là-gì)
  - [1.1. Tại sao Event Bubbling quan trọng?](#11-tại-sao-event-bubbling-quan-trọng)
  - [1.2. Ví dụ đơn giản về Event Bubbling](#12-ví-dụ-đơn-giản-về-event-bubbling)
- [2. Cơ chế Capturing và Bubbling](#2-cơ-chế-capturing-và-bubbling)
  - [2.1. Giai đoạn Capturing](#21-giai-đoạn-capturing)
  - [2.2. Giai đoạn Target](#22-giai-đoạn-target)
  - [2.3. Giai đoạn Bubbling](#23-giai-đoạn-bubbling)
- [3. Event Delegation](#3-event-delegation)
  - [3.1. Cách áp dụng Event Delegation](#31-cách-áp-dụng-event-delegation)
- [4. Các lỗi thường gặp và cách tối ưu](#4-các-lỗi-thường-gặp-và-cách-tối-ưu)
  - [4.1. Gán quá nhiều Listener không cần thiết](#41-gán-quá-nhiều-listener-không-cần-thiết)
  - [4.2. Dừng sự kiện sớm (stopPropagation)](#42-dừng-sự-kiện-sớm-stoppropagation)
  - [4.3. Chặn hành vi mặc định (preventDefault)](#43-chặn-hành-vi-mặc-định-preventdefault)
- [5. Kết luận](#5-kết-luận)

</div>

## 1. Event Bubbling là gì?

### 1.1. Tại sao Event Bubbling quan trọng?

Event Bubbling (sự kiện nổi bọt) là hiện tượng một sự kiện được bắn ra ở phần tử con (child element) và sau đó tiếp tục “nổi lên” (bubble up) các phần tử cha. Hiểu đúng về Event Bubbling giúp chúng ta:

- Tránh lỗi xử lý sự kiện chồng chéo.
- Tối ưu hóa hiệu suất khi quản lý nhiều phần tử giống nhau.
- Giảm code thừa và giúp dự án gọn gàng hơn.

### 1.2. Ví dụ đơn giản về Event Bubbling

Hãy xem ví dụ nhỏ sau:

```html
<!DOCTYPE html>
<html>
<body>
  <div id="parent" style="padding: 20px; border: 2px solid blue;">
    Parent
    <button id="child" style="margin-left: 20px;">Child Button</button>
  </div>

  <script>
    const parent = document.getElementById('parent');
    const child = document.getElementById('child');

    parent.addEventListener('click', () => {
      console.log('Parent clicked');
    });

    child.addEventListener('click', () => {
      console.log('Child clicked');
    });
  </script>
</body>
</html>
```

#### Kết quả:

- Khi bạn nhấp vào nút **Child Button**, console in ra:
  1. “Child clicked”
  2. “Parent clicked”

Đây chính là hiện tượng **Event Bubbling**: sự kiện xảy ra ở phần tử con và sau đó “nổi lên” phần tử cha.

## 2. Cơ chế Capturing và Bubbling

JavaScript chia quá trình xử lý sự kiện trên DOM thành ba giai đoạn chính: **Capturing** (giai đoạn bắt sự kiện), **Target** (giai đoạn mục tiêu), và **Bubbling** (giai đoạn nổi bọt).

### 2.1. Giai đoạn Capturing

- Bắt đầu từ phần tử gốc của DOM (document), sự kiện “đi xuống” (capture) qua các phần tử con.
- Nếu sử dụng `addEventListener(type, listener, true)`, hàm `listener` sẽ lắng nghe ở giai đoạn này.

#### Ví dụ về Capturing

```html
<!DOCTYPE html>
<html>
<body>
  <div id="outer" style="padding: 20px; border: 2px solid green;">
    Outer
    <div id="middle" style="padding: 20px; border: 2px solid red;">
      Middle
      <button id="inner">Inner Button</button>
    </div>
  </div>

  <script>
    const outer = document.getElementById('outer');
    const middle = document.getElementById('middle');
    const inner = document.getElementById('inner');

    outer.addEventListener('click', () => {
      console.log('Outer capturing handler');
    }, true);

    middle.addEventListener('click', () => {
      console.log('Middle capturing handler');
    }, true);

    inner.addEventListener('click', () => {
      console.log('Inner capturing handler');
    }, true);
  </script>
</body>
</html>
```

#### Giải thích:

- Vì đều truyền `true` ở tham số thứ ba của `addEventListener`, tất cả các sự kiện ở đây sẽ được lắng nghe trong giai đoạn **Capturing**.
- Khi bấm vào nút **Inner Button**, thứ tự in ra trên console là:
  1. “Outer capturing handler”
  2. “Middle capturing handler”
  3. “Inner capturing handler”

Điều này cho thấy sự kiện được phát hiện bắt đầu từ phần tử cha (outer) rồi đến phần tử con (middle), và cuối cùng tới phần tử mục tiêu (inner).

### 2.2. Giai đoạn Target

- Đây là giai đoạn sự kiện diễn ra trực tiếp trên phần tử mục tiêu (nơi người dùng tương tác).

### 2.3. Giai đoạn Bubbling

- Sau khi sự kiện kết thúc ở Target, sự kiện “nổi lên” (bubble) trở lại qua các phần tử cha.
- Nếu sử dụng `addEventListener(type, listener, false)` hoặc không truyền đối số thứ ba, bạn đang sử dụng Bubbling.

Dưới đây là bảng so sánh ngắn về hai khái niệm Capturing và Bubbling:

| Thuộc tính | Capturing (true) | Bubbling (false) |
| :--- | :--- | :--- |
| Hướng lan tỏa sự kiện | Từ phần tử cha xuống phần tử con (top → down) | Từ phần tử con ngược lên phần tử cha (down → up) |
| Cách đăng ký sự kiện | `addEventListener("click", handler, true)` | `addEventListener("click", handler, false)` |
| Ưu điểm | Kiểm soát sự kiện sớm, ngăn chặn logic kịp thời | Xử lý sự kiện cục bộ, rõ ràng với phần tử mục tiêu |
| Khi nên dùng | Cần can thiệp, ngăn chặn hành vi ngay từ gốc | Xử lý logic sau khi biết chính xác phần tử nhắm đến |

## 3. Event Delegation

Event Delegation là kỹ thuật giúp quản lý nhiều sự kiện trên các phần tử con chỉ bằng một trình lắng nghe (listener) duy nhất đặt ở phần tử cha. Thay vì gán sự kiện cho từng phần tử con, bạn để sự kiện “nổi bọt” lên cha và xác định mục tiêu bằng thuộc tính `event.target`.

### 3.1. Cách áp dụng Event Delegation

Ví dụ, bạn có một danh sách các nút bấm:

```html
<!DOCTYPE html>
<html>
<body>
  <ul id="menu">
    <li><button>Home</button></li>
    <li><button>About</button></li>
    <li><button>Contact</button></li>
  </ul>

  <script>
    const menu = document.getElementById('menu');
    menu.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
        console.log('You clicked on:', e.target.textContent);
      }
    });
  </script>
</body>
</html>
```

#### Giải thích:

- Bạn chỉ cần đặt một sự kiện `click` duy nhất trên phần tử `ul#menu`.
- Khi người dùng nhấp vào bất kỳ nút nào bên trong `ul`, sự kiện sẽ “nổi bọt” lên `ul`.
- Dựa vào `e.target` (mục tiêu thật sự), bạn biết chính xác người dùng nhấn vào nút nào.

**Ưu điểm**:

- Giảm số lượng listeners, tối ưu tài nguyên.
- Dễ bảo trì: chỉ cần thay đổi một chỗ khi cập nhật logic.

## 4. Các lỗi thường gặp và cách tối ưu

### 4.1. Gán quá nhiều Listener không cần thiết

Khi dự án có nhiều phần tử động, gán từng listener cho mỗi phần tử có thể làm chậm hiệu năng và khó kiểm soát. Sử dụng **Event Delegation** sẽ giúp cải thiện đáng kể.

### 4.2. Dừng sự kiện sớm (stopPropagation)

Đôi khi bạn không muốn sự kiện tiếp tục lan tỏa sang các phần tử cha hay con khác. Khi đó, hãy sử dụng **`event.stopPropagation()`** để dừng sự kiện ngay tại chỗ.

```html
<!DOCTYPE html>
<html>
<body>
  <div id="container" style="padding: 20px; border: 2px solid gray;">
    Container
    <button id="stopBtn">Click to Stop</button>
  </div>

  <script>
    const container = document.getElementById('container');
    const stopBtn = document.getElementById('stopBtn');

    container.addEventListener('click', () => {
      console.log('Container clicked!');
    });

    stopBtn.addEventListener('click', (event) => {
      console.log('Button clicked, stopping propagation...');
      event.stopPropagation();
    });
  </script>
</body>
</html>
```

#### Kết quả:

- Khi bạn bấm vào **stopBtn**, chỉ có `"Button clicked, stopping propagation..."` được in ra, **container** sẽ không in `"Container clicked!"`.

**Giải thích sâu hơn về “dừng lan tỏa đến phần tử cha hoặc con”**

- Trong **giai đoạn Capturing (true)**, sự kiện di chuyển từ document xuống các phần tử con (cha → con). Nếu bạn gọi `stopPropagation()` trong lúc sự kiện còn “đi xuống”, các phần tử con nằm sâu hơn trong cây DOM sẽ **không nhận** được sự kiện nữa.
- Trong **giai đoạn Bubbling (false)**, sự kiện di chuyển từ phần tử mục tiêu quay ngược lên cha (con → cha). Nếu bạn gọi `stopPropagation()` lúc sự kiện đang “nổi lên”, các phần tử cha bên trên sẽ **không nhận** được sự kiện nữa.

Vì vậy, “con” ở đây chỉ các phần tử DOM **chưa được lắng nghe sự kiện** ở giai đoạn Capturing (nếu sự kiện bị dừng trước khi đến chúng). “Cha” là các phần tử bọc ngoài, nằm trên đường “nổi lên” sự kiện ở giai đoạn Bubbling.

### 4.3. Chặn hành vi mặc định (preventDefault)

Ngoài việc dừng sự lan tỏa của sự kiện, đôi khi bạn cũng cần ngăn chặn hành vi mặc định của trình duyệt. Phương thức **`event.preventDefault()`** sẽ chặn hành vi mặc định, chẳng hạn như:

- Nhấp vào đường dẫn (link) sẽ điều hướng sang trang khác.
- Nhấn nút Submit trong Form sẽ tải lại trang.

Ví dụ bên dưới minh họa việc **ngăn cản điều hướng** khi nhấp vào một thẻ `<a>`:

```html
<!DOCTYPE html>
<html>
<body>
  <a href="https://www.google.com" id="blockLink">Click Me</a>

  <script>
    const blockLink = document.getElementById('blockLink');
    blockLink.addEventListener('click', (event) => {
      event.preventDefault();
      console.log('Link was clicked, but navigation is prevented.');
    });
  </script>
</body>
</html>
```

#### Kết quả:

- Khi bạn nhấp vào **Click Me**, console in ra “Link was clicked, but navigation is prevented.” và trình duyệt **không chuyển** đến trang Google.

**Phân biệt `stopPropagation()` và `preventDefault()`**:

- `stopPropagation()`: Dừng việc sự kiện lan tỏa đến các phần tử cha hoặc con chưa đến lượt nhận sự kiện (tùy theo giai đoạn capturing hay bubbling).
- `preventDefault()`: Ngăn chặn hành vi mặc định của sự kiện (như chuyển trang, submit form), nhưng **không** dừng lan tỏa sự kiện.

Bạn có thể sử dụng cả hai trong cùng một hàm xử lý sự kiện nếu muốn vừa chặn hành vi mặc định, vừa dừng sự kiện lan tỏa.

## 5. Kết luận

Qua bài viết này, bạn đã nắm được:

- **Event Bubbling**: Sự kiện nổi bọt lên các phần tử cha.
- **Capturing**: Giai đoạn sự kiện “đi xuống” từ cha đến con.
- **Event Delegation**: Kỹ thuật quan trọng giúp tối ưu việc lắng nghe sự kiện.
- **stopPropagation**: Phương thức dừng sự kiện, tránh tiếp tục lan tỏa khi không cần thiết.
- **preventDefault**: Chặn hành vi mặc định của trình duyệt, như chặn mở link hoặc ngăn submit form.

Việc hiểu đúng về các cơ chế sự kiện và những phương thức hỗ trợ sẽ giúp bạn xử lý tốt hơn các tương tác của người dùng, đồng thời tối ưu hiệu năng và cấu trúc dự án. Hãy thử áp dụng **Event Delegation**, **stopPropagation()** và **preventDefault()** trong dự án tiếp theo để thấy sự khác biệt rõ rệt.

#### Bài tập/Tự kiểm tra:

1. Tạo một danh sách `<ul>` với nhiều `<li>` con, mỗi `<li>` chứa một nút bấm. Áp dụng Event Delegation để xử lý sự kiện thay vì gán trực tiếp cho từng nút.
2. Cho biết sự khác nhau giữa việc dùng `addEventListener("click", handler, true)` và `addEventListener("click", handler, false)` với ví dụ cụ thể.
3. Tìm hiểu xem, ngoài Capturing và Bubbling, DOM Events còn có giai đoạn nào khác hay không?
4. Thử áp dụng `stopPropagation()` trong ví dụ trên và quan sát sự khác biệt.
5. Tạo một form với nút Submit, dùng `preventDefault()` để không gửi form và in ra một thông báo lên console.

---
title: "Hiểu Default Parameters Trong JavaScript: Tối Ưu Mã Nguồn Hiệu Quả"
excerpt: "Khi chúng ta làm việc với JavaScript, việc xác định các giá trị mặc định cho tham số hàm (default parameters) là một kỹ thuật quan trọng, giúp mã ngắn gọn hơn và hạn chế lỗi. Điều này đặc biệt hữu ích khi bạn xây dựng các hàm phức tạp hoặc xử lý nhiều tham số từ người dùng. Việc hiểu rõ default parameters không chỉ tăng tính linh hoạt của mã, mà còn giúp bạn dễ dàng kiểm soát luồng dữ liệu, tránh các lỗi không mong muốn như undefined hoặc null."
coverImage: "/assets/blog/preview/DefaultParameters.jpg"
date: "2025-12-22T20:11:34+07:00"
author:
  name: Lâm Quang Lộc
  picture: "/assets/blog/authors/avatar.png"
ogImage:
  url: "/assets/blog/preview/DefaultParameters.jpg"
categories:
  - JavaScript
tags:
  - JavaScriptES6
  - ExecutionContext
  - DefaultParameters
  - WebDevelopment
  - OptimizedCode
---

Khi chúng ta làm việc với JavaScript, việc xác định các giá trị mặc định cho tham số hàm (default parameters) là một kỹ thuật quan trọng, giúp mã ngắn gọn hơn và hạn chế lỗi. Điều này đặc biệt hữu ích khi bạn xây dựng các hàm phức tạp hoặc xử lý nhiều tham số từ người dùng. Việc hiểu rõ default parameters không chỉ tăng tính linh hoạt của mã, mà còn giúp bạn dễ dàng kiểm soát luồng dữ liệu, tránh các lỗi không mong muốn như `undefined` hoặc `null`.

<div class="toc-box">

- [1. Default Parameters là gì?](#1-default-parameters-là-gì)
  - [1.1. Cú pháp cơ bản](#11-cú-pháp-cơ-bản)
  - [1.2. Ví dụ nâng cao](#12-ví-dụ-nâng-cao)
- [2. Lợi ích và Ứng dụng Thực tế](#2-lợi-ích-và-ứng-dụng-thực-tế)
  - [2.1. Giảm thiểu Lỗi Thường Gặp](#21-giảm-thiểu-lỗi-thường-gặp)
  - [2.2. Dễ Dàng Mở Rộng và Bảo Trì Mã](#22-dễ-dàng-mở-rộng-và-bảo-trì-mã)
- [3. Những Lỗi Phổ Biến và Cách Khắc Phục](#3-những-lỗi-phổ-biến-và-cách-khắc-phục)
  - [3.1. Thiếu Giá trị Mặc định](#31-thiếu-giá-trị-mặc-định)
  - [3.2. Phòng Tránh Vòng Lặp Vô Hạn](#32-phòng-tránh-vòng-lặp-vô-hạn)
  - [3.3. Lỗi Liên Quan đến Phạm vi Biến (Scope) và Execution Context](#33-lỗi-liên-quan-đến-phạm-vi-biến-scope-và-execution-context)
- [4. Các Tình Huống Ứng Dụng trong Dự Án Thực Tế](#4-các-tình-huống-ứng-dụng-trong-dự-án-thực-tế)
  - [4.1. Tối Ưu Hàm Xử Lý API](#41-tối-ưu-hàm-xử-lý-api)
  - [4.2. Phòng tránh vòng lặp vô hạn](#42-phòng-tránh-vòng-lặp-vô-hạn)
- [5. Bài Tập và Tự Kiểm Tra](#5-bài-tập-và-tự-kiểm-tra)
- [6. Kết luận](#6-kết-luận)

</div>

## 1. Default Parameters là gì?

Default parameters là tính năng cho phép bạn gán giá trị mặc định cho tham số của hàm. Khi hàm được gọi mà không truyền vào đủ tham số, giá trị mặc định sẽ được sử dụng thay vì để chúng là `undefined`. Điều này làm cho mã trở nên dễ đọc, dễ bảo trì, và giảm số dòng code phải kiểm tra điều kiện.

### 1.1. Cú pháp cơ bản

Trước khi default parameters xuất hiện (từ ES6 trở lên), bạn thường phải viết:

```javascript
function greet(name) {
  if (!name) {
    name = 'Guest';
  }
  console.log('Hello ' + name);
}

greet(); // Kết quả: "Hello Guest"
```

Với default parameters, bạn có thể đơn giản hóa:

```javascript
function greet(name = 'Guest') {
  console.log(`Hello ${name}`);
}

greet(); // Kết quả: "Hello Guest"
```

Ở đây, giá trị ‘Guest’ được dùng làm mặc định khi hàm không nhận được tham số nào.

### 1.2. Ví dụ nâng cao

Giả sử bạn có một hàm `test` với hai tham số, một là tên, hai là hàm chào:

```javascript
function test(name = 'Andy', welcome = () => { return `Hi ${name}`; }) {
  return welcome();
}

console.log(test());          // Kết quả: "Hi Andy"
console.log(test('Brian'));   // Kết quả: "Hi Brian"
```

#### Ý nghĩa

Trong ví dụ trên, nếu bạn không truyền vào tham số `name` hay `welcome`, chúng sẽ tự nhận giá trị mặc định là `'Andy'` và hàm `() => { return "Hi Andy" }`. Điều này giúp bạn kiểm soát và đảm bảo chương trình luôn chạy đúng, ngay cả khi người dùng không cung cấp đầy đủ thông tin.

## 2. Lợi ích và Ứng dụng Thực tế

### 2.1. Giảm thiểu Lỗi Thường Gặp

Một trong những lỗi phổ biến là quên truyền tham số, dẫn đến `undefined`. Điều này dễ gây ra các lỗi logic hoặc ngoại lệ. Với default parameters, bạn hạn chế đáng kể các trường hợp này:

```javascript
function calculatePrice(price, tax = 0.1) {
  return price + price * tax;
}

console.log(calculatePrice(100)); // Kết quả: 110
// Không cần kiểm tra if (!tax) vì tax đã có giá trị mặc định.
```

### 2.2. Dễ Dàng Mở Rộng và Bảo Trì Mã

Khi mở rộng một hàm với nhiều tham số mới, bạn có thể đưa ra giá trị mặc định giúp không phá vỡ mã cũ. Điều này hữu ích trong các dự án lớn, khi nhiều lập trình viên làm việc cùng nhau và cần đảm bảo tính tương thích ngược.

## 3. Những Lỗi Phổ Biến và Cách Khắc Phục

### 3.1. Thiếu Giá trị Mặc định

Nếu bạn quên đặt giá trị mặc định, hàm có thể trả về kết quả không mong đợi:

```javascript
function printMessage(message) {
  console.log(`Message: ${message}`);
}

printMessage(); // Kết quả: "Message: undefined"
```

Cách khắc phục:

```javascript
function printMessage(message = 'No Data') {
  console.log(`Message: ${message}`);
}

printMessage(); // Kết quả: "Message: No Data"
```

### 3.2. Phòng Tránh Vòng Lặp Vô Hạn

#### Ví dụ

Nếu bạn viết một hàm đệ quy mà quên gán giá trị mặc định hoặc quên kiểm tra điều kiện dừng, bạn có thể vô tình tạo ra vòng lặp vô hạn:

```javascript
function countdown(num = 3) {
  if (num <= 0) {
    return 'Done!';
  }
  console.log(num);
  return countdown(num - 1);
}

console.log(countdown());
// Kết quả: 3, 2, 1, "Done!"
```

Ở đây, default parameters kết hợp với logic kiểm tra điều kiện giúp tránh vô hạn. Nếu không cẩn thận, thiếu điều kiện dừng có thể dẫn đến lỗi stack overflow.

### 3.3. Lỗi Liên Quan đến Phạm vi Biến (Scope) và Execution Context

Khi sử dụng hàm làm giá trị mặc định, bạn cần hiểu Execution Context (ngữ cảnh thực thi) và Call Stack (ngăn xếp lời gọi hàm). Nếu hàm mặc định tham chiếu đến biến bên ngoài không đúng cách, có thể gây ra lỗi logic khó phát hiện:

```javascript
let globalName = 'Global';

function demo(name = globalName) {
  return `Hello ${name}`;
}

console.log(demo()); // Kết quả: "Hello Global"
globalName = 'Changed';
console.log(demo()); // Kết quả: "Hello Changed"
```

Trong trường hợp này, giá trị mặc định được đánh giá tại thời điểm thực thi hàm, do đó việc hiểu Execution Context và Call Stack giúp bạn dự đoán được kết quả cuối cùng.

## 4. Các Tình Huống Ứng Dụng trong Dự Án Thực Tế

### 4.1. Tối Ưu Hàm Xử Lý API

Khi gọi các API, đôi khi bạn không nhận được tất cả các dữ liệu cần thiết. Default parameters giúp đảm bảo hàm xử lý dữ liệu từ API không bị “gãy”:

```javascript
function formatUser(userData = {name: 'Unknown', age: 0}) {
  return `${userData.name}, ${userData.age} tuổi`;
}

// Kết quả khi không có dữ liệu: "Unknown, 0 tuổi"
console.log(formatUser());
```

### 4.2. Phòng tránh vòng lặp vô hạn

Như đã đề cập, việc kết hợp default parameters với kiểm tra điều kiện dừng trong hàm đệ quy giúp bạn tránh vòng lặp vô hạn, giảm thiểu nguy cơ khiến chương trình bị treo.

## 5. Bài Tập và Tự Kiểm Tra

- **Bài tập 1**: Tạo một hàm tính tổng ba số với hai số cuối có giá trị mặc định là 1. Gọi hàm mà không truyền vào đủ ba tham số, xem kết quả có như mong đợi không?

- **Bài tập 2**: Viết một hàm đệ quy sử dụng default parameters để đếm ngược từ một số nhất định về 0. Thử thay đổi giá trị mặc định để kiểm chứng hàm.

- **Bài tập 3**: Kết hợp default parameters với việc gọi API giả lập. Nếu dữ liệu trả về thiếu trường “age”, hãy mặc định nó là 18.

## 6. Kết luận

Việc hiểu và sử dụng default parameters trong JavaScript không chỉ giúp mã ngắn gọn, dễ đọc, mà còn giảm thiểu khả năng lỗi. Hơn nữa, hiểu về Execution Context và Call Stack cho phép bạn dự đoán và kiểm soát hành vi của mã trong những tình huống phức tạp, tối ưu hóa hiệu năng và độ tin cậy của ứng dụng. Trong các dự án thực tế, kiến thức này là công cụ quan trọng, giúp bạn xây dựng mã linh hoạt, giảm thiểu lỗi và nâng cao chất lượng sản phẩm cuối cùng.

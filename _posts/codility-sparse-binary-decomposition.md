---
title: "Codility - SparseBinaryDecomposition"
excerpt: "Trong quá trình lập trình JavaScript, việc hiểu rõ cách dữ liệu nhị phân được biểu diễn và xử lý là rất quan trọng. Sparse Binary Decomposition (phân rã nhị phân thưa) giúp bạn nắm vững cách kiểm tra và tạo ra các số nhị phân dạng “thưa” (không có hai bit 1 liền kề). Từ đó, bạn có thể sử dụng toán tử bitwise một cách tối ưu, giảm thiểu lỗi và tăng hiệu năng. Bài viết này không chỉ đưa ra lý thuyết mà còn kèm theo ví dụ mã nguồn, giải thích kết quả, cũng như cách áp dụng trong tình huống thực tế."
coverImage: "/assets/blog/preview/SparseBinary.jpg"
date: "2025-12-22T19:43:02+07:00"
author:
  name: Lâm Quang Lộc
  picture: "/assets/blog/authors/avatar.png"
ogImage:
  url: "/assets/blog/preview/SparseBinary.jpg"
categories:
  - Algorithms
tags:
  - SparseBinaryDecomposition
  - JavaScriptES5
  - Bitwise
  - Optimization
  - Performance
---

Trong quá trình lập trình JavaScript, việc hiểu rõ cách dữ liệu nhị phân được biểu diễn và xử lý là rất quan trọng. **Sparse Binary Decomposition** (phân rã nhị phân thưa) giúp bạn nắm vững cách kiểm tra và tạo ra các số nhị phân dạng “thưa” (không có hai bit `1` liền kề). Từ đó, bạn có thể sử dụng **toán tử bitwise** một cách tối ưu, giảm thiểu lỗi và tăng hiệu năng. Bài viết này không chỉ đưa ra lý thuyết mà còn kèm theo ví dụ mã nguồn, giải thích kết quả, cũng như cách áp dụng trong tình huống thực tế.

<div class="toc-box">

- [1. Sparse Binary Decomposition là gì?](#1-sparse-binary-decomposition-là-gì)
  - [Khái niệm quan trọng](#khái-niệm-quan-trọng)
- [2. Cách tiếp cận bài toán](#2-cách-tiếp-cận-bài-toán)
  - [2.1. Phân tích từng bước](#21-phân-tích-từng-bước)
  - [2.2. Lỗi thường gặp và cách khắc phục](#22-lỗi-thường-gặp-và-cách-khắc-phục)
- [3. Ví dụ mã nguồn và giải thích](#3-ví-dụ-mã-nguồn-và-giải-thích)
  - [3.1. Kết quả hiển thị](#31-kết-quả-hiển-thị)
- [4. Kết quả thực tế](#4-kết-quả-thực-tế)
- [5. Ứng dụng thực tế](#5-ứng-dụng-thực-tế)
- [6. Bài tập và tự kiểm tra](#6-bài-tập-và-tự-kiểm-tra)
- [7. Kết luận](#7-kết-luận)

</div>

## 1. Sparse Binary Decomposition là gì?

#### Khái niệm quan trọng

- **Sparse Binary**: Là dạng số nhị phân không có hai bit `1` liền kề.
- Ví dụ:
  - **Hợp lệ**: `1010` (thập phân 10), `1001` (9)
  - **Không hợp lệ**: `1100` (12), `1011` (11)

Để giải bài toán, ta cần tìm một số `Q` ≤ `N` sao cho `Q` là Sparse Binary và `P = N - Q` cũng là Sparse Binary. Nếu không tìm được, trả về `-1`.

## 2. Cách tiếp cận bài toán

### 2.1. Phân tích từng bước

1. **Kiểm tra Sparse Binary**: Kiểm tra xem một số có phải là Sparse Binary hay không.
2. **Tìm số Sparse gần nhất**: Nếu `N` không phải Sparse Binary, ta tìm số gần nhất (nhỏ hơn hoặc bằng `N`) là Sparse Binary.
3. **Ghép cặp `Q` và `P`**: Sau khi tìm được `Q`, kiểm tra `P = N - Q`. Nếu `P` là Sparse Binary, ta có đáp án.

### 2.2. Lỗi thường gặp và cách khắc phục

- **Lặp vô hạn**: Khi kiểm tra hay thao tác bit, nếu bạn không dịch bit đúng cách, có thể xảy ra vòng lặp vô hạn, ảnh hưởng đến **Call Stack** (ngăn xếp lời gọi hàm).

  **Cách khắc phục**:
  - Đảm bảo có điều kiện dừng rõ ràng.
  - Hiểu Execution Context (ngữ cảnh thực thi) để kiểm soát phạm vi biến và thứ tự thực thi, tránh các lỗi logic.

## 3. Ví dụ mã nguồn và giải thích

Dưới đây là một đoạn mã minh họa. Tên biến và hàm dùng tiếng Anh để dễ đọc và tái sử dụng.

```javascript
function checkIsBinarySparse(N) {
  while (N) {
    if ((N & 1) === 0) {
      N >>= 1;
      continue;
    }
    if ((N >> 1) & 1) {
      return false;
    }
    N >>= 2;
  }
  return true;
}

function findSparseNumber(N) {
  let original = N;
  let currentBit = 0;
  let decreaseValue = 0;

  while (N) {
    if ((N & 1) === 0) {
      currentBit++;
      N >>= 1;
      continue;
    }
    if ((N >> 1) & 1) {
      decreaseValue += 2 ** (currentBit + 1);
    }
    currentBit += 2;
    N >>= 2;
  }

  return original - decreaseValue;
}

function execute(N) {
  let Q = N;
  if (!checkIsBinarySparse(Q)) Q = findSparseNumber(Q);

  let P = N - Q;
  if (checkIsBinarySparse(P)) {
    return Q;
  }
  return -1;
}

// Ví dụ minh họa
console.log(execute(24)); // Kết quả: 16
console.log(execute(20)); // Kết quả: 16
console.log(execute(10)); // Kết quả: 10
console.log(execute(5));  // Kết quả: 5
```

**Giải thích ngắn gọn**:

- `checkIsBinarySparse(N)`: Kiểm tra xem `N` có phải số Sparse Binary không.
- `findSparseNumber(N)`: Tìm số Sparse Binary nhỏ hơn hoặc bằng `N`.
- `execute(N)`: Tìm `Q` và `P` sao cho `Q` và `P` đều là Sparse Binary.

### 3.1. Kết quả hiển thị

- `execute(24)` trả về `16` vì `24` không phải Sparse Binary, nhưng `16` (10000 nhị phân) là Sparse Binary. Đồng thời, `P = 24 - 16 = 8` cũng Sparse Binary.
- Tương tự, `execute(20)` → `16`, `execute(10)` → `10`, `execute(5)` → `5`.

## 4. Kết quả thực tế

<img src="/assets/images/codility/SparseBinaryDecomposition-tests.jpg" alt="Test cases" />
<img src="/assets/images/codility/SparseBinaryDecomposition-performance.jpg" alt="Performance tests" />

## 5. Ứng dụng thực tế

Hiểu rõ Sparse Binary Decomposition và toán tử bitwise giúp bạn:

- **Tối ưu hiệu suất**: Xử lý dữ liệu nhị phân nhanh hơn, giảm tải cho hệ thống.
- **Đảm bảo tính ổn định của mã**: Hạn chế lỗi logic khi làm việc với dữ liệu nhị phân phức tạp.
- **Khai thác Execution Context và Call Stack**: Nhờ nắm vững ngữ cảnh thực thi và thứ tự lời gọi hàm, bạn sẽ giảm thiểu khả năng gặp phải vòng lặp vô hạn hoặc lỗi stack overflow.

## 6. Bài tập và tự kiểm tra

1. **Bài tập**:
   - Cho một số `N`, hãy viết hàm `isSparse(N)` kiểm tra xem `N` có phải số Sparse Binary hay không.
   - Gợi ý: Bạn có thể tái sử dụng logic từ hàm `checkIsBinarySparse` trong ví dụ trên.

2. **Câu hỏi tự kiểm tra**:
   - Sparse Binary là gì?
   - Làm thế nào để tìm số Sparse Binary gần nhất nhỏ hơn hoặc bằng `N`?
   - Vì sao hiểu Execution Context và Call Stack giúp bạn tối ưu mã và hạn chế lỗi?

## 7. Kết luận

Sparse Binary Decomposition không chỉ là một bài toán nhị phân thú vị, mà còn giúp bạn hiểu sâu hơn về cách dữ liệu được xử lý ở mức bit. Khi hiểu rõ cơ chế này, bạn có thể tối ưu mã nguồn, giảm thiểu lỗi và cải thiện hiệu năng trong dự án. Hơn nữa, việc nắm vững **Execution Context** và **Call Stack** giúp bạn điều hướng luồng thực thi, tránh lỗi tràn ngăn xếp và viết mã tối ưu, dễ bảo trì trong dài hạn.

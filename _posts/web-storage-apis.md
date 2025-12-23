---
title: "Web Storage APIs: localStorage, sessionStorage, IndexedDB, Cookies, Cache Storage"
excerpt: "Việc lưu trữ dữ liệu trên trình duyệt đóng vai trò rất quan trọng đối với bất kỳ ứng dụng web hiện đại nào. Nó giúp chúng ta giảm tải cho máy chủ, tối ưu trải nghiệm người dùng và mở ra nhiều khả năng tương tác ngoại tuyến."
coverImage: "/assets/blog/preview/WebStorage.png"
date: "2025-12-22T17:16:48.000Z"
author:
  name: Lâm Quang Lộc
  picture: "/assets/blog/authors/avatar.png"
ogImage:
  url: "/assets/blog/preview/WebStorage.png"
categories:
  - JavaScript
tags:
  - WebStorage
  - LocalStorage
  - SessionStorage
  - IndexedDB
  - ServiceWorker
---

Việc lưu trữ dữ liệu trên trình duyệt đóng vai trò rất quan trọng đối với bất kỳ ứng dụng web hiện đại nào. Nó giúp chúng ta giảm tải cho máy chủ, tối ưu trải nghiệm người dùng và mở ra nhiều khả năng tương tác ngoại tuyến. Trong bài viết này, chúng ta sẽ cùng tìm hiểu về các Web Storage APIs phổ biến: **localStorage**, **sessionStorage**, **IndexedDB**, **Cookies**, **Cache Storage** và **File System Access API**. Mỗi công nghệ sẽ có cách triển khai, ưu nhược điểm khác nhau cũng như các trường hợp nên sử dụng. Ngoài ra, mình sẽ chia sẻ một bảng so sánh nhanh để bạn tiện tham khảo và áp dụng trong dự án thực tế.

## Mục lục

<div class="toc-box">

- [1. localStorage](#1-localstorage)
  - [1.1. Cách hoạt động](#11-cách-hoạt-động)
  - [1.2. Ví dụ](#12-ví-dụ)
- [2. sessionStorage](#2-sessionstorage)
  - [2.1. Cách hoạt động](#21-cách-hoạt-động)
  - [2.2. Ví dụ](#22-ví-dụ)
- [3. Cookies](#3-cookies)
  - [3.1. Cách hoạt động](#31-cách-hoạt-động)
  - [3.2. Ví dụ](#32-ví-dụ)
- [4. IndexedDB](#4-indexeddb)
  - [4.1. Cách hoạt động](#41-cách-hoạt-động)
  - [4.2. Ví dụ (TypeScript)](#42-ví-dụ-typescript)
- [5. Cache Storage](#5-cache-storage)
  - [5.1. Service Worker là gì?](#51-service-worker-là-gì)
  - [5.2. Cách hoạt động](#52-cách-hoạt-động)
  - [5.3. Ví dụ](#53-ví-dụ)
- [6. File System Access API](#6-file-system-access-api)
  - [6.1. Cách hoạt động](#61-cách-hoạt-động)
  - [6.2. Ví dụ](#62-ví-dụ)
- [7. Bảng so sánh](#7-bảng-so-sánh)
- [8. Kết luận](#8-kết-luận)

</div>

---

## 1. localStorage

### 1.1. Cách hoạt động

**localStorage** là một dạng lưu trữ dữ liệu dạng key-value (cặp khóa-giá trị) trên trình duyệt, cho phép giữ dữ liệu lâu dài, ngay cả khi bạn đóng trình duyệt. Dữ liệu chỉ mất khi người dùng xóa thủ công hoặc khi code xóa nó. Dung lượng của localStorage thường lên đến khoảng 5MB (tùy trình duyệt).

- Mỗi trang web chỉ có quyền truy cập vào localStorage của chính nó (theo domain).
- Chỉ chấp nhận kiểu dữ liệu chuỗi (string). Muốn lưu đối tượng, bạn cần chuỗi hóa (`JSON.stringify`) và khi lấy ra cần chuyển ngược về đối tượng (`JSON.parse`).

### 1.2. Ví dụ

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Ví dụ localStorage</title>
</head>
<body>
  <input type="text" id="myInput" placeholder="Nhập tên của bạn">
  <button id="saveBtn">Lưu vào localStorage</button>
  <button id="getBtn">Hiển thị tên</button>
  <p id="result"></p>

  <script>
    const input = document.getElementById("myInput");
    const saveBtn = document.getElementById("saveBtn");
    const getBtn = document.getElementById("getBtn");
    const result = document.getElementById("result");

    saveBtn.addEventListener("click", () => {
      const nameValue = input.value;
      localStorage.setItem("username", nameValue);
      alert("Đã lưu!");
    });

    getBtn.addEventListener("click", () => {
      const savedName = localStorage.getItem("username");
      if (savedName) {
        result.textContent = "Tên đã lưu: " + savedName;
      } else {
        result.textContent = "Chưa có tên được lưu.";
      }
    });
  </script>
</body>
</html>
```

Khi bạn nhấn nút "Lưu vào localStorage", giá trị trong ô input sẽ được lưu lại. Dù đóng tab hay tắt trình duyệt, giá trị này vẫn còn cho đến khi bạn xóa nó đi.

#### Lỗi thường gặp:

- **Quên chuyển đổi dữ liệu sang chuỗi**: Bạn cần dùng `JSON.stringify()` nếu lưu đối tượng.
- **Quá dung lượng cho phép**: Nếu dữ liệu vượt quá 5MB (trong một số trường hợp), việc lưu sẽ thất bại.

---

## 2. sessionStorage

### 2.1. Cách hoạt động

**sessionStorage** cũng tương tự localStorage, nhưng dữ liệu sẽ chỉ tồn tại trong **phiên làm việc** (tab) hiện tại. Một khi bạn đóng tab hoặc tải lại trang trong một tab mới, dữ liệu sẽ mất.

- Cùng site, nhưng **mỗi tab** có sessionStorage riêng.
- Dung lượng cũng ở mức vài MB (tùy trình duyệt).
- Chỉ lưu trữ dưới dạng chuỗi.
- **Lưu ý**: Nếu bạn **duplicate (nhân đôi) tab**, một số trình duyệt sẽ copy dữ liệu sessionStorage của tab cũ sang tab mới, khiến bạn có cảm giác "nhân đôi" session. Hành vi này có thể khác nhau tùy vào từng trình duyệt.

### 2.2. Ví dụ

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Ví dụ sessionStorage</title>
</head>
<body>
  <input type="text" id="myInputSession" placeholder="Nhập tuổi của bạn">
  <button id="saveBtnSession">Lưu vào sessionStorage</button>
  <button id="getBtnSession">Hiển thị tuổi</button>
  <p id="resultSession"></p>

  <script>
    const inputSession = document.getElementById("myInputSession");
    const saveBtnSession = document.getElementById("saveBtnSession");
    const getBtnSession = document.getElementById("getBtnSession");
    const resultSession = document.getElementById("resultSession");

    saveBtnSession.addEventListener("click", () => {
      sessionStorage.setItem("userAge", inputSession.value);
      alert("Tuổi đã được lưu!");
    });

    getBtnSession.addEventListener("click", () => {
      const savedAge = sessionStorage.getItem("userAge");
      if (savedAge) {
        resultSession.textContent = "Tuổi đã lưu trong phiên: " + savedAge;
      } else {
        resultSession.textContent = "Chưa có tuổi nào được lưu.";
      }
    });
  </script>
</body>
</html>
```

Nếu bạn mở tab mới, sessionStorage sẽ không còn dữ liệu trước đó, vì nó gắn với phiên (session) của tab đang mở. Tuy nhiên, trong trường hợp bạn **nhân bản (duplicate) tab**, một số trình duyệt có thể sao chép sessionStorage sang tab mới.

---

## 3. Cookies

### 3.1. Cách hoạt động

**Cookies** là cách lưu trữ dữ liệu nhỏ trên trình duyệt từ những ngày đầu của web. Thông thường, cookies được gửi kèm với mỗi request đến máy chủ, giúp theo dõi phiên đăng nhập, phân tích hành vi người dùng, v.v.

- Mỗi cookie có thể thiết lập thời gian hết hạn (expires), đường dẫn (path) và domain.
- Dung lượng tối đa ~4KB trên mỗi cookie.
- Thường sử dụng cho mục đích xác thực (login session), theo dõi người dùng (tracking), cài đặt người dùng (preferences).

### 3.2. Ví dụ

```javascript
// Tạo cookie
document.cookie = "username=NguyenVanA; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";

// Đọc cookie
console.log(document.cookie);
// Kết quả: "username=NguyenVanA; ..."

// Cập nhật hoặc xóa cookie bằng cách gán lại với expires trong quá khứ
document.cookie = "username=NguyenVanA; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/";
```

#### Lưu ý quan trọng:

- **Bảo mật**: Cookies hay bị lạm dụng để đánh cắp thông tin đăng nhập nếu không dùng HTTPS và các cờ bảo mật (HttpOnly, Secure).
- **Giới hạn dung lượng**: Chỉ nên dùng cookies cho những thông tin thật sự cần thiết (chủ yếu cho xác thực).

---

## 4. IndexedDB

### 4.1. Cách hoạt động

**IndexedDB** là một cơ sở dữ liệu (NoSQL) hoạt động trong trình duyệt. Nó cho phép lưu trữ lượng dữ liệu lớn hơn so với localStorage, có khả năng index, truy vấn và quản lý cấu trúc dữ liệu phức tạp.

- Có thể lưu trữ nhiều dạng dữ liệu, bao gồm cả BLOB (Binary Large Object).
- Thích hợp cho ứng dụng web cần hoạt động ngoại tuyến hoặc thao tác dữ liệu lớn.
- Giao thức bất đồng bộ (asynchronous), tương tác qua Promise hoặc callback.

### 4.2. Ví dụ (TypeScript)

```typescript
interface User {
  id?: number;
  name: string;
  age: number;
}

class MyIndexedDB {
  private static db: IDBDatabase | null = null;

  public static init(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      // Nếu đã có db, trả về ngay
      if (MyIndexedDB.db) {
        return resolve(MyIndexedDB.db);
      }

      // Mở (hoặc tạo) DB "MyDatabase" phiên bản 1
      const request: IDBOpenDBRequest = indexedDB.open("MyDatabase", 1);

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const dbInstance = (event.target as IDBOpenDBRequest).result;

        // Tạo object store (bảng "users") nếu chưa có
        if (!dbInstance.objectStoreNames.contains("users")) {
          dbInstance.createObjectStore("users", {
            keyPath: "id",
            autoIncrement: true
          });
        }
      };

      request.onsuccess = (event: Event) => {
        MyIndexedDB.db = (event.target as IDBOpenDBRequest).result;
        console.log("Đã mở IndexedDB thành công (Singleton).");
        resolve(MyIndexedDB.db);
      };

      request.onerror = () => {
        reject("Không thể mở IndexedDB.");
      };
    });
  }

  private static async getDB(): Promise<IDBDatabase> {
    if (MyIndexedDB.db) {
      return MyIndexedDB.db;
    }
    return this.init();
  }

  public static async addUser(user: Omit<User, "id">): Promise<number> {
    const db = await MyIndexedDB.getDB();

    return new Promise((resolve, reject) => {
      const transaction: IDBTransaction = db.transaction("users", "readwrite");
      const store: IDBObjectStore = transaction.objectStore("users");
      const request: IDBRequest<IDBValidKey> = store.add(user);

      request.onsuccess = () => {
        // request.result chính là khóa chính (id) được auto-increment
        resolve(request.result as number);
      };
      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  public static async getAllUsers(): Promise<User[]> {
    const db = await MyIndexedDB.getDB();

    return new Promise((resolve, reject) => {
      const transaction: IDBTransaction = db.transaction("users", "readonly");
      const store: IDBObjectStore = transaction.objectStore("users");
      const request: IDBRequest<User[]> = store.getAll() as IDBRequest<User[]>;

      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  public static async getUserById(id: number): Promise<User | null> {
    const db = await MyIndexedDB.getDB();

    return new Promise((resolve, reject) => {
      const transaction: IDBTransaction = db.transaction("users", "readonly");
      const store: IDBObjectStore = transaction.objectStore("users");
      const request: IDBRequest<User> = store.get(id) as IDBRequest<User>;

      request.onsuccess = () => {
        // Nếu không tìm thấy, request.result = undefined => trả về null
        resolve(request.result || null);
      };
      request.onerror = () => {
        reject(request.error);
      };
    });
  }
}

async function main() {
  try {
    // 1. Khởi tạo (mở) DB (chỉ cần gọi 1 lần khi app khởi chạy)
    await MyIndexedDB.init();

    // 2. Thêm user
    const newUserId = await MyIndexedDB.addUser({ name: "Nguyen Van B", age: 25 });
    console.log("User mới có ID:", newUserId);

    // 3. Lấy toàn bộ user
    const allUsers = await MyIndexedDB.getAllUsers();
    console.log("Danh sách users:", allUsers);

    // 4. Lấy user theo ID
    const user = await MyIndexedDB.getUserById(newUserId);
    console.log("User vừa thêm:", user);

    // ... Tiếp tục các thao tác khác
  } catch (error) {
    console.error("Đã xảy ra lỗi:", error);
  }
}

main();
```

**Kết quả:**

```text
Đã mở IndexedDB thành công (Singleton).
User mới có ID: 1
Danh sách users: [{name: 'Nguyen Van B', age: 25, id: 1}]
User vừa thêm: {name: 'Nguyen Van B', age: 25, id: 1}
```

**Ưu điểm**: Quản lý dữ liệu hiệu quả, linh hoạt.
**Nhược điểm**: API phức tạp, cần nhiều bước xử lý.

---

## 5. Cache Storage

### 5.1. Service Worker là gì?

**Service Worker** là một script chạy dưới nền trong trình duyệt, tách biệt với trang web chính. Nó có thể can thiệp vào luồng request/response, cho phép lưu trữ file tĩnh (HTML, CSS, JS, ảnh…) vào bộ nhớ đệm (cache) để hỗ trợ chức năng ngoại tuyến (offline).

### 5.2. Cách hoạt động

**Cache Storage** thường được quản lý thông qua Service Worker. Khi browser gửi request, Service Worker sẽ kiểm tra cache trước, nếu có thì trả về từ cache, nếu không mới gọi network. Bạn có thể tùy chỉnh cơ chế này (cache-first, network-first, stale-while-revalidate, v.v.).

### 5.3. Ví dụ

**File index.html:**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Cache Storage</title>
  <link rel="stylesheet" href="styles.css">
  <script src="main.js"></script>
</head>
<body>
  <h1>Cache Storage</h1>
  <button id="clearCache">Xóa cache trong service workers</button>
  <script>
    // Đăng ký Service Worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("service-worker.js")
        .then(() => console.log("Service Worker đã đăng ký!"))
        .catch(err => console.error("Lỗi SW:", err));
    }

    const clearCacheButton = document.getElementById('clearCache');
    clearCacheButton.addEventListener('click', function(){
      navigator.serviceWorker.controller?.postMessage({ type: "CLEAR_OLD_CACHE" });
      setTimeout(() => {
        location.reload();
      }, 1000)
    });
  </script>
</body>
</html>
```

**File styles.css:**

```css
h1 {
  color: red;
}
```

**File main.js:**

```javascript
console.log('Hello');
```

**File service-worker.js:**

```javascript
const CACHE_NAME = "my-cache-v1";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(["/", "/index.html", "/styles.css", "/main.js"]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "CLEAR_OLD_CACHE") {
    caches.delete(CACHE_NAME).then((wasDeleted) => {
      console.log(`Xóa ${CACHE_NAME}:`, wasDeleted);
    });
  }
});
```

Các file `index.html`, `styles.css` và `main.js` sẽ được lưu vào Cache Storage. Khi offline, trình duyệt vẫn có thể tải những file này từ cache, nâng cao trải nghiệm người dùng.

---

## 6. File System Access API

### 6.1. Cách hoạt động

**File System Access API** (trước đây là Native File System API) cho phép trang web tương tác với tệp trên máy tính người dùng gần giống như ứng dụng desktop. Bạn có thể mở, ghi, sửa tệp trực tiếp, tạo trải nghiệm mạnh mẽ trên web.

- Được hỗ trợ tốt trên Chrome, Edge, nhưng chưa phổ biến trên các trình duyệt khác.
- Cần thao tác đồng ý từ người dùng (permission) để truy cập thư mục hoặc tệp trên máy tính.

### 6.2. Ví dụ

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Ví dụ File System Access API</title>
</head>
<body>
  <button id="chooseFileButton">Chọn File</button>

  <script>
    async function openFile() {
      try {
        const [fileHandle] = await window.showOpenFilePicker();
        const fileData = await fileHandle.getFile();
        const content = await fileData.text();
        console.log("Nội dung file:", content);
      } catch (err) {
        console.error("Lỗi:", err);
      }
    }

    const chooseFileButton = document.getElementById("chooseFileButton");
    chooseFileButton.addEventListener("click", () => {
      openFile();
    });
  </script>
</body>
</html>
```

#### Thực tế:

Bạn có thể dùng API này để xây dựng trình chỉnh sửa văn bản, quản lý ảnh, v.v. Tuy nhiên, hãy cẩn thận về bảo mật và quyền truy cập của người dùng.

---

## 7. Bảng so sánh

Dưới đây là bảng so sánh nhanh các công nghệ Web Storage:

| Công nghệ | Use Cases | Ưu điểm | Nhược điểm | Khi nào nên dùng? |
| :--- | :--- | :--- | :--- | :--- |
| **localStorage** | Lưu dữ liệu nhỏ, cấu hình người dùng | Đơn giản, dễ sử dụng, dung lượng tầm 5MB | Chỉ lưu dạng chuỗi, đồng bộ | Cài đặt giao diện, token tạm thời, thông tin form v.v. |
| **sessionStorage** | Lưu dữ liệu trong 1 phiên (tab) | Dữ liệu chỉ tồn tại trong tab, hạn chế xung đột giữa các tab | Chỉ lưu dạng chuỗi, dung lượng tầm vài MB, mất dữ liệu khi đóng tab. Lưu ý duplicate tab có thể sao chép session. | Khi cần lưu dữ liệu tạm theo từng tab, ví dụ giỏ hàng, thông tin xem nhanh |
| **Cookies** | Dữ liệu nhỏ, thường dùng để xác thực | Tương thích rộng, tự động gửi lên server | Giới hạn 4KB, bảo mật cần HTTPS, gửi lên server mọi request | Lưu session đăng nhập, tùy chọn người dùng (remember me) |
| **IndexedDB** | Ứng dụng offline, lưu nhiều dữ liệu phức tạp | Khả năng lưu trữ lớn, hỗ trợ indexing | API phức tạp, cần xử lý bất đồng bộ | Ứng dụng lớn, cần lưu dữ liệu cục bộ, chế độ offline |
| **Cache Storage** | Lưu file tĩnh (HTML, CSS, JS, ảnh) | Phù hợp với Service Worker, tối ưu ngoại tuyến | Cần cài đặt Service Worker, quản lý phiên bản cache phức tạp | Tạo PWA, tăng tốc độ tải, hỗ trợ offline |
| **File System Access API** | Tương tác tệp hệ thống | Trải nghiệm như ứng dụng desktop, đọc/ghi file trực tiếp | Chưa hỗ trợ trên tất cả trình duyệt, yêu cầu quyền người dùng | Ứng dụng chỉnh sửa ảnh, nhạc, văn bản trực tiếp trên máy |

---

## 8. Kết luận

Nhìn chung, mỗi loại lưu trữ đều có ưu nhược điểm riêng. Việc lựa chọn phụ thuộc vào mục đích sử dụng và khối lượng dữ liệu bạn cần quản lý:

- `localStorage`, `sessionStorage` và Cookies đơn giản nhưng giới hạn dung lượng và chỉ lưu dạng chuỗi.
- `IndexedDB` linh hoạt, có thể lưu trữ dữ liệu lớn nhưng API phức tạp.
- `Cache Storage` kết hợp với Service Worker giúp tối ưu trải nghiệm người dùng, đặc biệt cho ứng dụng PWA.
- `File System Access API` còn mới và chưa đồng bộ trên mọi trình duyệt, nhưng nó mở ra cơ hội xây dựng các ứng dụng web có khả năng tương tác sâu với tệp tin cục bộ.

Hãy thử triển khai và kết hợp những công nghệ này trong các dự án thực tế của bạn. Sự kết hợp đúng cách sẽ nâng cao hiệu suất và trải nghiệm cho người dùng, đồng thời tiết kiệm chi phí máy chủ.

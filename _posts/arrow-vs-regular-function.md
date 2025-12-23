---
title: "Arrow Function vs Regular Function trong JavaScript: Phân biệt và Ứng dụng"
excerpt: "Trong JavaScript, việc chọn sai giữa arrow function và regular function có thể khiến bạn gặp lỗi mất this, dẫn đến bug khó debug và ảnh hưởng đến logic ứng dụng. Hiểu rõ sự khác biệt sẽ giúp bạn viết code rõ ràng hơn, dễ bảo trì và tránh được nhiều “cạm bẫy” không đáng có."
coverImage: "/assets/blog/preview/ArrowRegular.png"
date: "2025-12-22T17:57:44+07:00"
author:
  name: Lâm Quang Lộc
  picture: "/assets/blog/authors/avatar.png"
ogImage:
  url: "/assets/blog/preview/ArrowRegular.png"
categories:
  - JavaScript
tags:
  - WebDevelopment
  - ArrowFunction
  - RegularFunction
  - JavaScriptThis
  - JavaScriptTutorial
---

Trong JavaScript, việc chọn sai giữa **arrow function** và **regular function** có thể khiến bạn gặp lỗi mất `this`, dẫn đến bug khó debug và ảnh hưởng đến logic ứng dụng. Hiểu rõ sự khác biệt sẽ giúp bạn viết code rõ ràng hơn, dễ bảo trì và tránh được nhiều “cạm bẫy” không đáng có.

<div class="toc-box">

- [1. Khái niệm cơ bản](#1-khái-niệm-cơ-bản)
  - [1.1. Regular Function](#11-regular-function)
  - [1.2. Arrow Function](#12-arrow-function)
  - [1.3. Cú pháp ngắn gọn và implicit return](#13-cú-pháp-ngắn-gọn-và-implicit-return)
- [2. Hoisting và Temporal Dead Zone](#2-hoisting-và-temporal-dead-zone)
- [3. `this` hoạt động khác nhau như thế nào?](#3-this-hoạt-động-khác-nhau-như-thế-nào)
  - [3.1. Trong global context](#31-trong-global-context)
  - [3.2. Callback & Promise](#32-callback--promise)
  - [3.3. Phương thức (Method) của Object](#33-phương-thức-method-của-object)
  - [3.4. Phương thức trong Class](#34-phương-thức-trong-class)
  - [3.5. DOM Event Handler](#35-dom-event-handler)
- [4. Tự luyện và kiểm tra](#4-tự-luyện-và-kiểm-tra)
- [5. Kết luận](#5-kết-luận)
  - [Khi nào nên dùng?](#khi-nào-nên-dùng)

</div>

## 1. Khái niệm cơ bản

### 1.1. Regular Function

```javascript
greet('Paolo'); // Hello, Paolo
function greet(name) {
  console.log('Hello, ' + name);
}

sayHi('Hannah'); // Arguments: Arguments ['Hannah', callee: ƒ, Symbol(Symbol.iterator): ƒ]
function sayHi(name) {
  console.log('Arguments: ', arguments );
}
```

Regular function có những đặc điểm sau:

- Có thể dùng để tạo constructor (bằng `new`).
- Truy cập được biến `arguments` – chứa toàn bộ tham số truyền vào.
- Được hoisting – có thể gọi trước khi định nghĩa.

### 1.2. Arrow Function

```javascript
const greet = (name) => console.log(`Hello, ${name}`);
greet('Paolo'); // Hello, Paolo
```

Arrow function sinh ra để viết function ngắn gọn và giữ nguyên `this` của ngữ cảnh bên ngoài (lexical `this`). Tuy nhiên, điều này dẫn đến vài khác biệt đáng lưu ý:

1. **Không có `arguments` riêng**

Arrow function không tạo ra biến `arguments`. Nếu cần lấy danh sách tham số, bạn phải dùng cú pháp rest:

```javascript
const fn = (...args) => {
  console.log(args);
};
```

2. **Không có `new.target`**

`new.target` là một meta property chỉ xuất hiện khi hàm được gọi bằng từ khóa `new`, dùng để kiểm tra xem hàm có đang được khởi tạo như một constructor hay không.

```javascript
function A() {
  if (!new.target) {
    throw new Error('Phải dùng new A() để khởi tạo');
  }
  console.log('Đang khởi tạo bằng new');
}

new A(); // OK
A();     // Error: Phải dùng new A() để khởi tạo
```

Tuy nhiên, arrow function không có `new.target` vì bản thân nó không được thiết kế để làm constructor, và không có ngữ cảnh khởi tạo (construct context) riêng.

**Nếu bạn cố gọi arrow function với `new`:**

```javascript
const Arrow = () => {
  console.log(new.target); // SyntaxError: new.target expression is not allowed here
};

new Arrow();
```

Bạn sẽ nhận lỗi ngay: `"new.target expression is not allowed here"` – vì arrow function không có `execution context` riêng, nên không được phép truy cập `new.target`.

3. **Không thể làm constructor**

- Vì arrow function không có `[[Construct]]` và không có `prototype`, nên không thể dùng để tạo object:

```javascript
const F = () => {};
new F(); // TypeError: F is not a constructor
```

### 1.3. Cú pháp ngắn gọn và `implicit return`

```javascript
const square = n => n * n;
```

**Ghi nhớ:** Nếu function chỉ có một biểu thức, bạn có thể bỏ `{}` và `return`. Kết quả của biểu thức sẽ được trả về ngầm định.

## 2. Hoisting và Temporal Dead Zone

```javascript
console.log(fn);  // ƒ fn(){}
console.log(foo); // undefined
console.log(bar); // ReferenceError

function fn() {}             // Hoisting hoàn toàn
var foo = function () {};    // Hoisting biến, không gán giá trị
const bar = () => {};        // Không hoisting, bị TDZ
```

**Giải thích:**

- `fn` là function declaration → được hoisting đầy đủ cả tên và thân hàm.
- `foo` khai báo bằng `var` → được hoisting biến, nhưng gán sau nên in ra `undefined`.
- `bar` dùng `const` → nằm trong **Temporal Dead Zone**, truy cập trước khi định nghĩa sẽ lỗi.

## 3. `this` hoạt động khác nhau như thế nào?

### 3.1. Trong global context

```javascript
function regularFunc() { console.log(this); }
const arrowFunc = () => { console.log(this); };

regularFunc(); // window (hoặc undefined nếu dùng strict mode)
arrowFunc();   // window (kế thừa outer scope)
```

**Tóm lại:**

- `regularFunc()` có `this` linh hoạt, phụ thuộc cách gọi.
- `arrowFunc()` luôn giữ `this` của ngữ cảnh bên ngoài (ở đây là global).

### 3.2. Callback & Promise

#### 3.2.1. Callback với `setTimeout`

```javascript
const user = {
  name: 'Hannah',
  show() {
    setTimeout(function () {
      console.log(this.name || 'No name 1');
    }, 0);

    setTimeout(() => {
      console.log(this.name || 'No name 2');
    }, 0);
  }
};
user.show();
```

- `function() {}` có `this` là `window` → in `No name 1`.
- `() => {}` giữ `this` là `user` → in `Hannah`.

#### 3.2.2. Callback trong `Promise`

```javascript
class API {
  constructor() {
    this.data = 42;
  }

  fetch() {
    Promise.resolve().then(function () {
      console.log(this?.data); // undefined
    });
  }
}
new API().fetch();
```

Callback bằng regular function không giữ được `this`, nên in ra `undefined`.

```javascript
class APIFixed {
  constructor() {
    this.data = 42;
  }

  fetch() {
    Promise.resolve().then(() => {
      console.log(this?.data); // 42
    });
  }
}
new APIFixed().fetch();
```

Dùng arrow function → `this` là instance của `APIFixed`.

### 3.3. Phương thức (Method) của Object

```javascript
const counter = {
  value: 0,
  incrementRegular() {
    this.value++;
    console.log(this.value);
  },
  incrementArrow: () => {
    this.value++;
    console.log(this.value);
  }
};

counter.incrementRegular(); // 1
counter.incrementArrow();   // NaN
```

**Lưu ý:**

- `incrementRegular` được gọi qua `counter.incrementRegular()`, nên `this` trỏ đến `counter`, cập nhật `value`.
- `incrementArrow` có `this` là outer scope (không phải object `counter`), nên `this.value` là `undefined`, `undefined++` sẽ cho kết quả `NaN`.

### 3.4. Phương thức trong Class

```javascript
class A {
  name = 'Paolo';

  regular() {
    console.log('regular:', this.name);
  }

  arrow = () => {
    console.log('arrow:', this.name);
  }
}

const a = new A();
a.regular(); // regular: Paolo
a.arrow();   // arrow: Paolo
```

**Tuy nhiên**, sự khác biệt chỉ thể hiện rõ khi bạn truyền các method này làm callback:

```javascript
setTimeout(a.regular, 100); // undefined (mất `this`)
setTimeout(a.arrow, 100);   // Paolo (giữ nguyên `this`)
```

**Giải thích:**

- `regular()` là method nằm trên `A.prototype`. Khi truyền vào callback, `this` không còn trỏ tới instance nữa trừ khi dùng `.bind(this)`.
- `arrow()` là instance property, được tạo mới mỗi khi khởi tạo object, và giữ nguyên `this` từ nơi định nghĩa (tức là instance `a`).

### 3.5. DOM Event Handler

```javascript
button.addEventListener('click', function () {
  console.log(this); // element
});

button.addEventListener('click', () => {
  console.log(this); // outer scope (window)
});
```

- Dùng regular function → `this` là element đang click.
- Dùng arrow function → `this` không phải element, thường là `window`.

## 4. Tự luyện và kiểm tra

1. Đoán kết quả:

```javascript
const obj = {
  x: 10,
  foo: () => console.log(this.x),
  bar() { console.log(this.x); }
};
obj.foo(); // ???
obj.bar(); // ???
```

2. Sửa `foo` để in ra `10`:

```javascript
const obj = {
  x: 10,
  foo() { console.log(this.x); }
};
obj.foo(); // 10
```

3. Vì sao arrow function không có `arguments`, `new.target` và không dùng để làm constructor?
**Trả lời:** Vì arrow function không tạo ra execution context riêng. Nó dùng lại context của scope chứa nó nên không khởi tạo `this`, `arguments`, hay `new.target`.

## 5. Kết luận

| Tiêu chí | Regular Function | Arrow Function |
| :--- | :--- | :--- |
| Có `this` riêng | ✅ Có, thay đổi theo cách gọi | ❌ Không, kế thừa từ outer scope |
| Có `arguments` | ✅ Có | ❌ Không |
| Có `super` | ✅ Có | ❌ Không hỗ trợ `super` |
| Có `prototype` (class) | ✅ Có, nằm trên prototype | ❌ Không, là property của instance |
| Dùng làm constructor (`new`) | ✅ Có thể | ❌ Không |
| Dùng làm method | ✅ Chuẩn ES6 | ❌ Không phải method thực sự |
| Gọi làm callback (setTimeout, map) | ❌ Dễ mất `this` nếu không bind | ✅ Tự giữ `this` |
| Hiệu suất (class nhiều instance) | ✅ Tốt (dùng chung prototype) | ❌ Tốn bộ nhớ (tạo mỗi instance) |

#### Khi nào nên dùng?

| Trường hợp | Nên dùng |
| :--- | :--- |
| Cần `super`, `arguments`, hoặc kế thừa logic | ✅ Regular Function |
| Dùng làm method thật sự, tối ưu hiệu suất | ✅ Regular Function |
| Callback hoặc truyền function ra ngoài class | ✅ Arrow Function |
| Tránh `.bind(this)` thủ công khi làm callback | ✅ Arrow Function |

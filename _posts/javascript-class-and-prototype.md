---
title: "Hiểu Sâu Class Và Prototype JavaScript: Tối Ưu Hiệu Suất Và Giảm Thiểu Lỗi"
excerpt: "JavaScript là một trong những ngôn ngữ lập trình phổ biến nhất trong lập trình front-end trên trình duyệt. Việc hiểu rõ cách hoạt động của Class và Prototype không chỉ giúp bạn viết mã sáng sủa, dễ bảo trì mà còn tối ưu hiệu suất, giảm thiểu lỗi trong các dự án phức tạp. Hãy cùng đi sâu vào cách JavaScript quản lý Prototype và lý do vì sao điều này lại quan trọng đến vậy."
coverImage: "/assets/blog/preview/Prototype.jpg"
date: "2025-12-22T20:06:03+07:00"
author:
  name: Lâm Quang Lộc
  picture: "/assets/blog/authors/avatar.png"
ogImage:
  url: "/assets/blog/preview/Prototype.jpg"
categories:
  - JavaScript
tags:
  - JavaScriptES6
  - CodeOptimization
  - JavaScriptES5
  - Prototype
  - ClassES6
---

JavaScript là một trong những ngôn ngữ lập trình phổ biến nhất trong lập trình front-end trên trình duyệt. Việc hiểu rõ cách hoạt động của **Class** và <strong>Prototype</strong> không chỉ giúp bạn viết mã sáng sủa, dễ bảo trì mà còn tối ưu hiệu suất, giảm thiểu lỗi trong các dự án phức tạp. Hãy cùng đi sâu vào cách JavaScript quản lý Prototype và lý do vì sao điều này lại quan trọng đến vậy.

<div class="toc-box">

- [1. Khái quát về Class và Prototype](#1-khái-quát-về-class-và-prototype)
  - [1.1. Tại sao cần hiểu Class và Prototype?](#11-tại-sao-cần-hiểu-class-và-prototype)
  - [1.2. Prototype được dùng chung như thế nào?](#12-prototype-được-dùng-chung-như-thế-nào)
  - [1.3. Biến `this` được hiểu như thế nào?](#13-biến-this-được-hiểu-như-thế-nào)
- [2. So sánh Class (ES6) với Function Constructor (ES5)](#2-so-sánh-class-es6-với-function-constructor-es5)
  - [2.1. Ví dụ với ES5 (Function Constructor)](#21-ví-dụ-với-es5-function-constructor)
  - [2.2. Ví dụ với ES6 (Class)](#22-ví-dụ-với-es6-class)
  - [2.3. Mở rộng class (extends) trong ES6 so với ES5](#23-mở-rộng-class-extends-trong-es6-so-với-es5)
- [3. Lỗi thường gặp và cách tối ưu](#3-lỗi-thường-gặp-và-cách-tối-ưu)
  - [3.1. Gọi sai ngữ cảnh `this`](#31-gọi-sai-ngữ-cảnh-this)
  - [3.2. Phòng tránh vòng lặp vô hạn](#32-phòng-tránh-vòng-lặp-vô-hạn)
- [4. Bài tập và câu hỏi tự kiểm tra](#4-bài-tập-và-câu-hỏi-tự-kiểm-tra)
  - [4.1. Bài tập](#41-bài-tập)
  - [4.2. Câu hỏi ôn tập](#42-câu-hỏi-ôn-tập)
- [5. Kết luận](#5-kết-luận)

</div>

## 1. Khái quát về Class và Prototype

### 1.1. Tại sao cần hiểu Class và Prototype?

Trong JavaScript, khái niệm **Class** (từ phiên bản ES6) được giới thiệu để giúp lập trình viên mô phỏng tư tưởng lập trình hướng đối tượng (OOP) một cách trực quan hơn. Tuy nhiên, JavaScript thực chất vẫn hoạt động dựa trên **Prototype**. Việc hiểu rõ **Prototype** giúp bạn:

- Xác định cách các thuộc tính và phương thức được chia sẻ giữa nhiều đối tượng.
- Tiết kiệm bộ nhớ và tối ưu hiệu suất khi tạo nhiều đối tượng cùng loại.
- Giải quyết những lỗi thường gặp liên quan đến ngữ cảnh (`this`) và quá trình kế thừa (inheritance).

### 1.2. Prototype được dùng chung như thế nào?

Khi bạn tạo một đối tượng mới từ một hàm tạo (constructor) hoặc từ một class (ES6), JavaScript sẽ gắn đối tượng này với **prototype** của nó. Tất cả các phương thức chung được đặt trong đối tượng prototype. Điều này có nghĩa là bất kỳ thuộc tính hoặc phương thức nào nằm trong prototype sẽ được **tất cả** đối tượng con (instances) cùng chia sẻ.

Ví dụ ngắn với hàm tạo ES5:

```js
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  console.log("Hello, my name is " + this.name);
};

var person1 = new Person("Alice");
var person2 = new Person("Bob");

person1.greet(); // "Hello, my name is Alice"
person2.greet(); // "Hello, my name is Bob"
```

Trong ví dụ này, cả `person1` và `person2` đều chia sẻ chung phương thức `greet` trong `Person.prototype`. Nhờ đó, bạn không phải khai báo phương thức `greet` lặp lại trong từng đối tượng.

### 1.3. Biến `this` được hiểu như thế nào?

Trong JavaScript, **`this`** trỏ tới đối tượng gọi phương thức tại **thời điểm phương thức được gọi**. Nguyên tắc xác định ngữ cảnh của `this` có thể hiểu nôm na là “đối tượng nằm ở bên trái dấu chấm (`.`) khi gọi hàm sẽ là `this`”.

- Ví dụ: `instance1.doSomething()` => `this` trong `doSomething` chính là `instance1`.

Phần khó của JavaScript nằm ở chỗ `this` không cố định, nó phụ thuộc cách bạn gọi hàm. Ví dụ, nếu tách rời hàm `doSomething` ra một biến, rồi gọi hàm đó độc lập, `this` lúc đó có thể trở thành `undefined` (trong strict mode) hoặc `window` (trong non-strict mode).

## 2. So sánh Class (ES6) với Function Constructor (ES5)

### 2.1. Ví dụ với ES5 (Function Constructor)

Trước ES6, lập trình viên thường khai báo hàm tạo (function constructor) và gán phương thức vào `prototype`:

```js
function Animal(name) {
  this.name = name;
}

// Gán phương thức vào Animal.prototype
Animal.prototype.speak = function() {
  console.log(this.name + " is speaking...");
};

var dog = new Animal("Lucky");
dog.speak(); // "Lucky is speaking..."
```

- Ở đây, tất cả phương thức dùng chung (trong ví dụ là `speak`) được đặt vào `Animal.prototype`.
- Khi gọi `dog.speak()`, JavaScript sẽ tìm phương thức `speak` trong đối tượng `dog`. Không thấy, nó sẽ **tra cứu** (lookup) trong `Animal.prototype`.
- `this` sẽ được ràng buộc về đối tượng `dog` tại thời điểm gọi `dog.speak()`.

### 2.2. Ví dụ với ES6 (Class)

Từ ES6, JavaScript bổ sung cú pháp **class** để mô phỏng OOP rõ ràng hơn. Tuy nhiên, **về bản chất**, nó vẫn hoạt động dựa trên prototype:

```js
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} is speaking...`);
  }
}

const cat = new Animal("Mimi");
cat.speak(); // "Mimi is speaking..."
```

- Cú pháp `class` chỉ là **“đường tắt”** để định nghĩa function constructor và các phương thức prototype.
- Phía sau, JavaScript vẫn tạo một hàm constructor tên `Animal` và gán các phương thức `speak` vào `Animal.prototype` tương tự như ở ES5.

#### Quan sát Prototype

Bạn có thể kiểm tra prototype của một đối tượng bằng thuộc tính `__proto__` (chỉ nên dùng để debug) hoặc dùng phương thức `Object.getPrototypeOf(cat)`:

```js
console.log(Object.getPrototypeOf(cat) === Animal.prototype);
// true
```

#### Ứng dụng thực tế

Trong dự án thực tế trên trình duyệt, sử dụng class ES6 giúp mã dễ đọc hơn và giảm thiểu nhầm lẫn so với function constructor ES5. Tuy nhiên, việc nắm chắc prototype và `this` vẫn rất quan trọng khi cần tối ưu hoặc gỡ lỗi.

### 2.3. Mở rộng class (extends) trong ES6 so với ES5

Một trong những tính năng quan trọng nhất của OOP là **kế thừa** (inheritance). Trong JavaScript, chúng ta cũng có thể kế thừa từ một “lớp cha” (hay hàm tạo cha) để tạo ra “lớp con” (hay hàm tạo con) và chia sẻ các phương thức chung.

#### Kế thừa trong ES5 (Function Constructor)

Trước ES6, bạn có thể “kế thừa” thủ công bằng cách:

1. Gọi constructor của lớp cha trong constructor của lớp con (sử dụng `call` hoặc `apply`).
2. Tạo mới prototype của lớp con dựa trên prototype của lớp cha (`Object.create`).
3. Đặt lại thuộc tính `constructor` cho prototype của lớp con.

Ví dụ:

```js
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  console.log(this.name + " is speaking...");
};

function Dog(name, breed) {
  // Gọi constructor của Animal
  Animal.call(this, name);
  this.breed = breed;
}

// Thiết lập prototype của Dog kế thừa từ Animal
Dog.prototype = Object.create(Animal.prototype);
// Đặt lại constructor, nếu không sẽ là Animal
Dog.prototype.constructor = Dog;

// Thêm phương thức mới cho Dog
Dog.prototype.bark = function() {
  console.log("Woof! I'm a " + this.breed);
};

var dog1 = new Dog("Buddy", "Golden Retriever");
dog1.speak(); // "Buddy is speaking..."
dog1.bark();  // "Woof! I'm a Golden Retriever"
```

- Ở đây, `Dog` “thừa kế” các phương thức từ `Animal.prototype`.
- Nhờ đó, chúng ta có thể gọi `dog1.speak()` và cả `dog1.bark()`.

#### Kế thừa trong ES6 (Class)

Với cú pháp `class`, bạn có thể kế thừa dễ dàng hơn bằng từ khóa `extends`. Để gọi constructor của lớp cha, bạn dùng từ khóa `super()` trong constructor của lớp con:

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(`${this.name} is speaking...`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    // gọi đến lớp cha
    super(name);
    this.breed = breed;
  }

  bark() {
    console.log(`Woof! I'm a ${this.breed}`);
  }
}

const dog2 = new Dog("Buddy", "Golden Retriever");
dog2.speak(); // "Buddy is speaking..."
dog2.bark();  // "Woof! I'm a Golden Retriever"
```

- `extends` cho phép `Dog` kế thừa các phương thức từ `Animal` một cách rõ ràng, không cần thao tác thủ công như ES5.
- Bên trong constructor của lớp con, bạn **bắt buộc** gọi `super(...)` trước khi truy cập `this`, nếu không sẽ bị lỗi.
- Phía dưới “bộ máy” JavaScript, `Dog.prototype` vẫn kế thừa từ `Animal.prototype`, tương tự cách chúng ta làm thủ công trong ES5.

#### Tính thực tiễn

- Dùng cú pháp `class` và `extends` giúp mã ngắn gọn, dễ đọc, giảm thiểu sai sót.
- Khi làm việc với các dự án lớn, kế thừa là mô hình quan trọng để tổ chức code, chia sẻ logic giữa các đối tượng.
- Việc hiểu rõ nguyên lý kế thừa thông qua prototype giúp bạn debug và tối ưu hơn, đặc biệt nếu cần thao tác nâng cao hoặc bắt gặp những đoạn code ES5 cũ.

## 3. Lỗi thường gặp và cách tối ưu

### 3.1. Gọi sai ngữ cảnh `this`

Một lỗi phổ biến là khi bạn tách phương thức khỏi đối tượng, sau đó gọi nó ở ngữ cảnh khác:

```js
const someMethod = dog2.speak;
someMethod();
// 'this' không còn là dog2, có thể dẫn đến lỗi "Cannot read property 'name'..."
```

#### Cách khắc phục:

- Dùng `bind` hoặc arrow function (nếu phù hợp) để cố định ngữ cảnh `this`.
- Hoặc luôn gọi qua đối tượng: `dog2.speak()`.

### 3.2. Phòng tránh vòng lặp vô hạn

Ví dụ, nếu trong constructor hay phương thức prototype, bạn vô tình gọi chính phương thức đang thực thi nhưng không có điều kiện dừng, có thể dẫn đến vòng lặp vô hạn và treo trình duyệt.

```js
function Circle(radius) {
  this.radius = radius;
}

Circle.prototype.draw = function() {
  // Sai lầm: Gọi lại chính mình không điều kiện
  // this.draw();
  console.log("Drawing a circle with radius " + this.radius);
};
```

#### Cách khắc phục:

- Kiểm tra logic kỹ càng, tránh tự gọi lại chính hàm mà không có điều kiện dừng rõ ràng.
- Sử dụng kỹ thuật debug (như `console.log`) hoặc breakpoints trên trình duyệt để theo dõi luồng chương trình.

## 4. Bài tập và câu hỏi tự kiểm tra

### 4.1. Bài tập

1. **Refactor function constructor từ ES5 sang ES6 Class**
   - Bạn có sẵn một function constructor tên `Product` (ES5) có thuộc tính `title`, `price` và một phương thức `getSummary()`.
   - Hãy viết lại bằng cú pháp Class (ES6) với logic tương tự.
   - Kiểm tra xem kết quả có giống nhau không khi gọi `getSummary()` trên cùng dữ liệu.

2. **Quản lý giỏ hàng (Cart) với Prototype trong ES5**
   - Tạo function constructor `Cart` với thuộc tính `items` là một mảng rỗng.
   - Thêm phương thức `addItem(productName)` vào `Cart.prototype` để đẩy một chuỗi `productName` vào `items`.
   - Thêm phương thức `getItems()` trả về mảng `items`.
   - Tạo hai giỏ hàng `cartA` và `cartB`. Thử thêm các sản phẩm khác nhau vào mỗi giỏ hàng và in ra kết quả.

3. **Kiểm tra ngữ cảnh `this` khi tách phương thức**
   - Tạo một đối tượng `menu` với một phương thức `showMenu()` in ra `"Display main menu"`.
   - Gán phương thức này vào biến `displayMenu = menu.showMenu`.
   - Gọi `displayMenu()` và quan sát kết quả, có lỗi hay không? Tại sao?
   - Áp dụng `bind` hoặc arrow function để sửa lỗi (nếu có).

### 4.2. Câu hỏi ôn tập

1. **Vì sao cú pháp ES6 Class chỉ là “đường tắt” của prototype?**
   - Chỉ ra các điểm tương đồng khi so sánh code ES5 (function constructor + prototype) và code ES6 (class).

2. **Bạn hiểu như thế nào về nguyên tắc “prototype chain”?**
   - Cho ví dụ về việc tra cứu phương thức qua nhiều cấp prototype.

3. **Trình bày cách khắc phục lỗi “Cannot read property ‘xxx’ of undefined” khi gọi hàm mà không có đối tượng đứng trước dấu chấm.**
   - Nêu ít nhất hai cách giải quyết.

4. **Tại sao `__proto__` bị xem là không khuyến khích, và nên dùng phương thức nào thay thế?**
   - Lợi ích của việc dùng `Object.getPrototypeOf()` và `Object.setPrototypeOf()` là gì?

5. **Nếu bạn muốn chuyển một class sang một module (ES Module) để dùng trong nhiều trang khác nhau, bạn cần làm gì?**
   - Gợi ý: sử dụng `export` và `import`.

## 5. Kết luận

Hiểu rõ **Class** và **Prototype** trong JavaScript không chỉ giúp bạn viết mã sạch và dễ bảo trì, mà còn mang lại lợi ích lâu dài về mặt hiệu suất và khả năng mở rộng. Khi các dự án trở nên lớn và phức tạp, kiến thức này sẽ giúp bạn **tối ưu hóa mã** và **giảm thiểu lỗi** hiệu quả hơn. Hãy áp dụng những kiến thức này vào thực tế qua các ví dụ, bài tập để làm chủ JavaScript cả về lý thuyết lẫn thực hành.

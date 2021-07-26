---
title: 关于 JavaScript 作用域问题
description: 作用域不同语言的答案不一样
redirect: 2019-01-02-javascript-use
---

> description: 作用域不同语言的答案不一样

## 简介

```JavaScript
//block
console.log("foo() --------------------------------------------------")

var a = 1;
function foo() {
    var a = 2;
    console.log(a);
}
foo();  // 2
console.log(a); // 1 

console.log("bar() --------------------------------------------------")

// function block
var b;
function bar() {
    var b = 1;
    if (true) {
      var b = 2;  // same variable!
      console.log(b);  // 2
    }
    console.log(b);  // 2
}
bar();

console.log("foobar() --------------------------------------------------")

var c;
function foobar() {
    var c = 1;
    if (true) {
      let c = 2;  // 
      console.log(c);  // 2
    }
    console.log(c);  // 1
}
foobar();
```
---
## 问题
- 语句作用域与函数作用域的区别？
---
## 思考
- 同是 var 定义
    - foo(){} 外的 a 不等价于 foo(){} 里的 a(function 外的代码块)
    - boo()->if{} 里的  a 等价于 boo()->if{} 外的 a
- 一个是 var 定义，另一个是 let 定义
    - foo(){} 外的 a 不等价于 foo(){} 里的 a(function 外的代码块)
    - boo()->if{} 里的  a 不等价于 boo()->if{} 外的 a



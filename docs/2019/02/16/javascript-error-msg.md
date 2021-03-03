---
title: JavaScript 错误参考
description: 从 MDN 拷贝下来的，Javascript 错误参考
redirect: 2019-02-16-javascript-error-msg
---

> description: 从 MDN 拷贝下来的，Javascript 错误参考

## 简介

[JavaScript 错误参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Errors)

## 错误

- Error: Permission denied to access property "x"
`没有权限访问 x 属性`
尝试访问无权访问的对象。这很可能出现在使用 iframe 元素时加载了一个不同域名下的页面，这在访问子页面时会违背同源策略。

## 内部错误

- InternalError: too much recursion
`递归太深`
一个调用自身的函数被称作递归函数。一些情况下，递归函数类似于一个循环，都重复地执行一个代码段许多次，都需要一个条件（用于避免无尽循环或此处的无尽递归）。当出现过于深层的递归或无尽递归时，JavaScript将会抛出此错误。

## 范围错误

- RangeError: argument is not a valid code point
`参数不是一个有效的代码点`
String.fromCodePoint() 这个方法只能接受有效的码位（code point） 。
码位（ code point）是组成码空间（或代码页）的数值，范围是 0 到 0x10FFFF。
NaN，负整数（-1），非整数（3.14），或编号大于0x10FFFF (1114111) 的字符，无法使该方法。

- RangeError: invalid array length
`无效的数组长度`
无效的数组错误长度通常会在以下情形中出现：
    - 当创建一个长度为负数或者长度大于等于232 的 Array 或者 ArrayBuffer 时。
    - 当设置 Array.length 属性为负数或者长度大于等于232 时。

    为什么 Array（数组） 和 ArrayBuffer（数组缓冲区） 的长度会受到限制？
    - 因为 Array 和 ArrayBuffer 的 length（长度） 属性被定义为一个32位无符号整形（unsigned 32-bit integer）的值，所以它只能存储 0 - 232-1 之间的数。
    - 当你使用构造函数来创建一个数组的时候，你可能想使用字面值的形式，第一个参数会被解释为数组的长度。
或者说，你想要在设置数组之前确定它的长度，或把它作为一个构造函数的参数。

- RangeError: invalid date
`非法数据`
为 Date 或 Date.parse() 提供了一个会导致无效日期的字符串。

- RangeError: precision is out of range
`精度越界`
以下的某个方法传入了一个超出精度范围的参数：
    - Number.prototype.toExponential()
    - Number.prototype.toFixed()
    - Number.prototype.toPrecision()
通常这些方法允许的参数范围介于0和20（或21）之间。需要注意的是，ECMAScript标准是允许扩展这个范围的。

| Method 	| Firefox (SpiderMonkey) 	| Chrome, Opera (V8) 	|
|----------------------------------	|------------------------	|--------------------	|
| Number.prototype.toExponential() 	| 0 to 100 	| 0 to 20 	|
| Number.prototype.toFixed() 	| -20 to 100 	| 0 to 20 	|
| Number.prototype.toPrecision() 	| 1 to 100 	| 1 to 21 	|

- RangeError: radix must be an integer
`基数必须是一个整数`
在使用Number.prototype.toString()方法时使用了可选的基数参数，参数应该为一个2到36之间的整型(数字)，返回对应数字的转换为字符串时表示的该进制对应的数字量。
为什么小于36呢？因为一个大于(包含等于)10的基数在使用时需要用一个字母表字符来代替。不能超过36是因为拉丁字母表中只有26个字符。

- RangeError: repeat count must be less than infinity
`重复数必须小于无穷`
代码中使用了 String.prototype.repeat()方法。它有一个计数参数，表示重复该字符串的次数。该参数必须在 0 及正 Infinity 之间，且不能为负数。该值的合法范围可以这样表示： [0, +∞)。
其结果字符串也不能长于最大字符串，不同 JavaScript 引擎中可能有所不同。 在 Firefox (SpiderMonkey) 里最大字符串大小为 228 -1 (0xFFFFFFF)。

- RangeError: repeat count must be non-negative
`重复计数必须是非负数`
代码中使用了 String.prototype.repeat()方法。它有一个计数参数，表示重复该字符串的次数。该参数必须在 0 及正 Infinity 之间，且不能为负数。该值的合法范围可以这样表示： [0, +∞)。

## 错误类型

- ReferenceError: "x" is not defined
`x 没有定义`
在某些地方引用一个不存的的变量的时候。当你使用变量的时候，这个变量必须是已经被声明的，或者你可以确保它在你当前的脚本或作用域 (scope) 中可用。

- ReferenceError: assignment to undeclared variable "x"
`分配了未声明的 x`
在代码里赋值了一个未声明的变量。换句话说，有处没有带着 var 关键字的赋值。事实上已声明的和未声明的变量之间有一些差异，这可能会导致意想不到的结果，这就是为什么 JavaScript 在严格模式打印出这种错误。
关于已声明和未声明的变量，其有三个注意事项：
    - 已声明的变量被约束在其执行上下文中。未声明的变量总是全局的。
    - 已声明的变量在执行任何代码之前就创建了。未声明的变量则不存在，直到执行相关的代码。
    - 已声明的变量是其执行上下文（函数或全局）的不可配置属性。而未声明的变量是可配置的（例如可以删除）。

    更多信息及例子，请参考 var 页面。
    关于未声明变量的赋值的错误仅在严格模式里出现。在非严格模式中，这些将被忽略。

- ReferenceError: can't access lexical declaration`X' before initialization
`不能再定义前初始化`
词法变量在初始化之前被访问。该错误可以发生于任何语句块中，当使用 let 或 const 修饰的变量在初始化之前被访问的时候。

- ReferenceError: deprecated caller or arguments usage
`弃用调用者或参数使用`
在 strict mode 中，Function.caller 和 Function.arguments 属性是不该使用的。它们都是已经被废弃的了，因为这两者泄露了函数的调用者，是不标准的，难于优化和有这潜在的性能问题。

- ReferenceError: invalid assignment left-hand side
`左手边任务无效`
在 strict mode 中，Function.caller 和 Function.arguments 属性是不该使用的。它们都是已经被废弃的了，因为这两者泄露了函数的调用者，是不标准的，难于优化和有这潜在的性能问题。

- ReferenceError: reference to undefined property "x"
`引用未定义的属性x`
脚本尝试去访问一个不存在的对象属性。property accessors 页面描述了两种访问属性的方法。
引用未定义属性的错误仅出现在 strict mode 代码中。在非严格代码中，对不存在的属性的访问将被忽略。

## 语法错误

- SyntaxError: "0"-prefixed octal literals and octal escape seq. are deprecated
`“0” - 前缀八进制文字和八进制转义序列号。不推荐使用`

- SyntaxError: "use strict" not allowed in function with non-simple parameters
`在非简单参数的函数中不允许使用“use strict”`

- SyntaxError: "x" is a reserved identifier
`“x”是保留标识符`

- SyntaxError: "x" is not a legal ECMA-262 octal constant
`“x”不是合法的ECMA-262八进制常量`

- SyntaxError: JSON.parse: bad parsing
`JSON.parse：解析错误`

- SyntaxError: Malformed formal parameter
`格式错误的形式参数`

- SyntaxError: Unexpected token
`意外的令牌`

- SyntaxError: Using //@ to indicate sourceURL pragmas is deprecated. Use //# instead
`不建议使用// @来表示sourceURL pragma。使用//＃代替`

- SyntaxError: a declaration in the head of a for-of loop can't have an initializer
`for-of循环头部的声明不能有初始化器`

- SyntaxError: applying the 'delete' operator to an unqualified name is deprecated
`不建议将'delete'运算符应用于非限定名称`

- SyntaxError: for-in loop head declarations may not have initializers
`for-in循环头声明可能没有初始值设定项`

- SyntaxError: function statement requires a name
`函数语句需要一个名称`

- SyntaxError: identifier starts immediately after numeric literal
`标识符在数字文字后立即开始`

- SyntaxError: illegal character
`非法字符`

- SyntaxError: invalid regular expression flag "x"
`无效的正则表达式标志“x”`

## 语法错误-缺失

- SyntaxError: missing ) after argument list
`参数列表后面`

- SyntaxError: missing ) after condition
`条件之后`

- SyntaxError: missing : after property id
`id 属性之后`

- SyntaxError: missing ; before statement
`在声明之前`

- SyntaxError: missing = in const declaration
`const 声明中的`

- SyntaxError: missing ] after element list
`元素列表后面的`

- SyntaxError: missing formal parameter
`缺少形式参数`

- SyntaxError: missing name after . operator
`之后缺少名称。操作者`

- SyntaxError: missing variable name
`缺少变量名`

- SyntaxError: missing } after function body
`函数主体后缺失 }`
- SyntaxError: missing } after property list
`属性键与属性值后缺失 }`

## 语法错误

- SyntaxError: redeclaration of formal parameter "x"
`重复声明参数`
某个变量名称已经作为函数参数出现了，但是又使用了 let 在函数体里重声明了。在JavaScript 中不允许使用let在相同的函数或块范围内重新声明相同的变量。

- SyntaxError: return not in function
`不是在函数里返回`
return 返回的或者 yield 语句在函数 function 外被调用. 或许是少了一个花括号， return 返回的和 yield 语句必须是在一个函数里，因为它们会停止（暂停或恢复）函数的继续执行，然后返回。

- SyntaxError: test for equality (\=\=) mistyped as assignment (=)?
`赋值符号出现在错误的位置`
在通常期望进行相等判定（==）的地方出现了赋值（=）。 为了帮助调试，JavaScript（在开启严格模式的情况下）会对这种情况进行警告。

- SyntaxError: unterminated string literal
`未结束的字符串`

## 类型错误

- TypeError: "x" has no properties
 null 和 undefined中，没有你需要的属性。

- TypeError: "x" is (not) "y"
出现了与期望不符的类型。 这个错误常常由 undefined 或 null 值引起。
此外，某些方法，例如 Object.create() 或 Symbol.keyFor()， 要求必须提供特定类型的参数。
- TypeError: "x" is not a constructor
是因为尝试将不是构造器的对象或者变量来作为构造器使用。参考 constructor 或者 new operator 来了解什么是构造器。
有很多的全局对象比如 String、Array 等等都是可以使用 new 操作符的构造器。但是有一些全局对象并不是，且其属性和方法都是静态的。下面的 JavaScript 标准内置对象都不是构造器：Math，JSON，Symbol，Reflect，Intl，SIMD，Atomics。
Generator functions 也不能作为构造器来使用。
- TypeError: "x" is not a function
问题出在你试图去调用一个像函数一样的值，但是该值实际上不是函数，有时候你的代码需要调用一些函数，但是那种值并不能当作函数来被调用。
也许函数名称上有错别字？ 也许你正在调用Object对象没有这个方法？ 例如，在JavaScript中单纯的对象(Object)没有map函数，但是JavaScript数组(Array)对象却有这个函数。
- TypeError: "x" is not a non-null object
在期待出现对象类型的值的地方而没有提供。null 不是对象类型，因此不起作用。必须在给定的场景下提供一个合适的对象。
- TypeError: "x" is read-only
全局变量或对象属性被设置为只读 (专业点讲，就是这条数据属性禁止写入.)
这条错误值发生在strict mode code(俗称严格模式). 正常情况下，是没有报错的。
- TypeError: 'x' is not iterable
这个值作为 for…of  的表达式右值，或者作为一个函数的参数，如 Promise.all 或者 TypedArray.from, 不是一个 可迭代对象.  一个可迭代对象可以是一个内置可迭代类型，如Array, String 或 Map, 一个 generator 生成结果, 或者一个实现了 可迭代协议 的对象
- TypeError: More arguments needed
调用函数的时候出现了错误。需要提供更多的参数。
- TypeError: can't access dead object
为了提高内存使用效率以及防止内存泄露，Firefox 浏览器不允许插件在 DOM 所在的父页面被销毁后对 DOM 对象保持强引用。死对象指的是在 DOM 被销毁后依然持有对 DOM 元素的强引用(处于活跃状态)。为了避免这样的问题，对处于外部文档中的 DOM 节点的引用应该被存储于一个专属于那个文档的对象当中，并且在文档卸载的时候将其清理，或者使用弱引用方式进行存储。

- TypeError: can't define property "x": "obj" is not extensible
通常情况下，对象是可以进行扩展的，即可以向其添加新的属性。然而当使用 Object.preventExtensions() 将一个对象标记为不再可以扩展的情况下，就无法对该对象添加在其被标记为不可扩展之前所拥有的属性之外的新属性了。

- TypeError: can't delete non-configurable array element
这个错误提示发生于当试图缩短一个数组的长度的时候，其中有元素是不可配置的（non-configurable）。正常情况下，缩短数组的长度，则超出限度的元素会被删除，而这里指的是这种操作失效的情况。
configurable  特性控制着属性是否可以从对象中删除，以及它的特性（除了 writable 之外）是否可以发生改变。
通常，使用数组初始化语句创建的对象是可配置的，而通过 Object.defineProperty() 创建的属性，默认则是不可配置的。

- TypeError: can't redefine non-configurable property "x"
这种错误的起因在于试图给对象重新定义一个属性，但是该属性是不可配置的。 configurable 特性控制着该属性是否可以从对象中删除，以及它的各个特性（除 writable 之外）是否可以修改。通常使用对象初始化语句定义的对象属性是可配置的。而使用 Object.defineProperty() 定义的属性则默认不可配置。

- TypeError: cyclic object value
当调用 JSON.stringify() 方法时，循环对象引用结构不能被转换为字符串。

- TypeError: invalid 'in' operand "x"
in 操作符只可以用来检测对象中是否存在某个属性，而不能用来在字符串、数字或者其他基本类型的数据中进行检索。

- TypeError: invalid 'instanceof' operand 'x'
instanceof 操作符 希望右边的操作数为一个构造对象，即一个有 prototype 属性且可以调用的对象。

- TypeError: invalid Array.prototype.sort argument
Array.prototype.sort() 的参数预期为 undefined 或者是一个比较操作数的函数。

- TypeError: invalid arguments
`无效的参数`

- TypeError: invalid assignment to const "x"
`对 const “x” 的赋值无效`

- TypeError: property "x" is non-configurable and can't be deleted
`属性 “x” 不可配置且无法删除`

- TypeError: setting getter-only property "x"
`设置 getter-only 属性 “x”`

- TypeError: variable "x" redeclares argument
`变量 x 重复声明参数`

## 路径错误

- URIError: malformed URI sequence
`格式错误的 URI 序列`

## 警告

- Warning: -file- is being assigned a //# sourceMappingURL, but already has one
`-file-正被分配//＃sourceMappingURL，但已经有一个`

- Warning: Date.prototype.toLocaleFormat is deprecated
`不推荐使用 Date.prototype.toLocaleFormat`

- Warning: JavaScript 1.6's for-each-in loops are deprecated
`不推荐使用 JavaScript 1.6 for-each-in 循环`

- Warning: String.x is deprecated; use String.prototype.x instead
`不推荐使用 String.x;请改用 String.prototype.x`

- Warning: expression closures are deprecated
`不推荐使用表达式闭包`

- Warning: unreachable code after return statement
`返回语句后无法访问代码`

- X.prototype.y called on incompatible type
`X.prototype.y调用了不兼容的类型`

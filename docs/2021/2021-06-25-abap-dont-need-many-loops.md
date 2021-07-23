# 关于 ABAP 或许不需要那么多的循环

## ABAP is dope ~~/doge~~

先吐槽下 ABAP 这门语言：

1. ABAP 的代码看起来像写英文文章一样，写一段代码使用的关键字非常多。

比如：`DATA itab TYPE STANDAR TABLE OF t_itab WITH EMPTY KEY.`

2. ABAP 的新语法许多都是跟随其他语言的潮流的，但是因为历史语法原因导致最后出来的语法看起来很奇怪。

比如函数调用需要写成这样 ~~/doge~~

```abap
CALL FUNCTION 'DO_SOMETHING'
    EXPORTINFG
        input = input.
```


再来看看 Pyhton 的 `do_something(input=input)`

---

ABAP 的 REDUCE 的语法定义：

```
Syntax 

... REDUCE type( 
      [let_exp] 
      INIT {x1 = rhs1}|{<x1> = wrexpr1}|{x1|<x1> TYPE dtype1} 
           {x2 = rhs2}|{<x2> = wrexpr2}|{x2|<x2> TYPE dtype2} 
           ... 
      FOR for_exp1 
      FOR for_exp2 
      ... 
      NEXT ... 
           {x1 = rhs1}|{<x1> = wrexpr1} 
           {x2 = rhs2}|{<x2> = wrexpr2} 
           ... ) ... 
```

再来看看 JavaScript 关于 REDUCE 的使用：

```js
const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));
// expected output: 10

// 5 + 1 + 2 + 3 + 4
console.log(array1.reduce(reducer, 5));
// expected output: 15
```

## The new syntax or the old syntax

最近在社交媒体上看到一个帖子对一段 JavaScript 代码的讨论：

```js
if (condition) {
    func()
}

// that => this

conditon && func()
```

首先，我不对这段代码语义上是否等价做讨论。

我关注的点在于 Junnior developer 和 Senior developer 对这种代码的不同看法。

大概率上，Junnior developer 喜欢用新的写法，Senior developer 喜欢用原本的语法

当然：

1. 这些 Junnior developers 都很厉害， respeat
2. 替换 IF 在这里不是一个很好的例子，如果 IF 换 CASE 或 LOOP 换 MAP 需要讨论的点或许不一样

其实我判断的点在于，代码是否能够更适合表达执行的内容。如果是团队的人看不懂就不能写这也没必要，比如在 Java 团队里一些人还看不懂箭头表达式的时候。

像下面这种代码：

```js

if( condition == 1 ) {
    a()
} else if( condition == 2 ) {
    b()
} else if( condition == 3 ) {
    c()
}
```

我认为用 SWITCH CASE 会更好

我觉得最好的判断使用新写法的代码是否「绕」、「能流行」、「可通用」

## Back to square one, you don't need to use LOOP syntax

定义初始数组

```abap
TYPES:
    BEGIN OF line,
        a TYPE i,
        b TYPE i,
        c TYPE i,
    END OF line,

    BEGIN OF dummy,
        a TYPE i,
        b TYPE i,
        d TYPE i,
    END OF dummy,

    array TYPE TABLE OF line,
    dummy_array TYPE TABLE OF dummy.

DATA a TYPE array.
DATA d TYPE dummy_array.

a = VALUE #( 
    ( a = 1 b = 1 c = 1 ) 
    ( a = 1 b = 1 c = 2 )
    ( a = 1 b = 1 c = 3 ) 
).
```

**将不同结构的数组，随意映射同类型的不同字段，不需要改值**

```abap
d = CORRESPONDING #( a MAPPING a = a b = b d = c ).

" d => 
"     ( a = 1 b = 1 d = 1 ) 
"     ( a = 1 b = 1 d = 2 )
"     ( a = 1 b = 1 d = 3 )
```

**将不同结构的数组，随意映射同类型的不同字段，需要改值**

```abap
d = VALUE #( FOR line IN a ( a = line-a b = line-b c = 99 ) ).
```

**更新内表中一列的值**

```abap
DATA(pseudo_line) = VALUE dummy( d = 999 ).

MODIFY d FROM pseudo_line TRANSPORTING d WHERE d = 1.

" you don't need like this
LOOP AT d ASSIGN FIELD-SYMBOLS(<line>) WHERE d = 1.
    <line>-d = 999.
ENDLOOP.
```

## About collection

关于 `REDUCE` 和 `LOOP GROUP AT` 和 `LOOP ... COOLECT` 的一些使用场景的区别。

在做内表汇总操作的时候（SELECT ... SUM 时候对数据库表操作）:

1. `REDUCE` 适合对固定汇总字段处理复杂自定义汇总逻辑
2. `LOOP GROUP AT` 适合对固定汇总字段处理简单的汇总逻辑（性能上一般比 REDUCE 快）
3. `LOOP ... COOLECT` 适合对不固定汇总字段做操作

## References

- [https://answers.sap.com/questions/11258830/how-to-change-the-value-of-an-internal-table-witho.html](https://answers.sap.com/questions/11258830/how-to-change-the-value-of-an-internal-table-witho.html)
- [https://blogs.sap.com/2017/05/14/a-real-case-to-use-reduce-to-finish-a-task-in-daily-work/](https://blogs.sap.com/2017/05/14/a-real-case-to-use-reduce-to-finish-a-task-in-daily-work/)

# one-python-craftsman

> https://github.com/piglei/one-python-craftsman

## Python 工匠：善用变量来改善代码质量

### 变量名最好让人能猜出类型

```txt
is_superuser：『是否超级用户』，只会有两种值：是/不是
has_error：『有没有错误』，只会有两种值：有/没有
allow_vip：『是否允许 VIP』，只会有两种值：允许/不允许
use_msgpack：『是否使用 msgpack』，只会有两种值：使用/不使用
debug：『是否开启调试模式』，被当做 bool 主要是因为约定俗成
```

## Python 工匠：编写条件分支代码的技巧

### 德摩根定律

not A or not B 等价于 not (A and B)

### 自定义对象的“布尔真假”

比如，Python 的所有对象都有自己的“布尔真假”：

布尔值为假的对象：None, 0, False, [], (), {}, set(), frozenset(), ... ...
布尔值为真的对象：非 0 的数值、True，非空的序列、元组，普通的用户类实例，... ...


```python
>>> bool(object())
True
```

重点来了，虽然所有用户类实例的布尔值都是真。但是 Python 提供了改变这个行为的办法：自定义类的 __bool__ 魔法方法 （在 Python 2.X 版本中为 __nonzero__）。当类定义了 __bool__ 方法后，它的返回值将会被当作类实例的布尔值。

另外，__bool__ 不是影响实例布尔真假的唯一方法。如果类没有定义 __bool__ 方法，Python 还会尝试调用 __len__ 方法*（也就是对任何序列对象调用 len 函数）*，通过结果是否为 0 判断实例真假。

### 在条件判断中使用 all() / any()

### 与 None 值的比较

在 Python 中，有两种比较变量的方法：== 和 is，二者在含义上有着根本的区别：

==：表示二者所指向的的值是否一致
is：表示二者是否指向内存中的同一份内容，也就是 id(x) 是否等于 id(y)

## Python 工匠：使用数字与字符串的技巧

### dis 模块

```python
def f1(delta_seconds):
    if delta_seconds < 11 * 24 * 3600:
        return

import dis
dis.dis(f1)

# dis 执行结果
  5           0 LOAD_FAST                0 (delta_seconds)
              2 LOAD_CONST               1 (950400)
              4 COMPARE_OP               0 (<)
              6 POP_JUMP_IF_FALSE       12

  6           8 LOAD_CONST               0 (None)
             10 RETURN_VALUE
        >>   12 LOAD_CONST               0 (None)
             14 RETURN_VALUE
```

### 别忘了那些 “r” 开头的内建字符串函数

### 使用“无穷大” float("inf")

## Python 工匠：容器的门道

### 底层看容器

在 Python 2 中，如果你调用 range(100000000)，需要等待好几秒才能拿到结果，因为它需要返回一个巨大的列表，花费了非常多的时间在内存分配与计算上。但在 Python 3 中，同样的调用马上就能拿到结果。因为函数返回的不再是列表，而是一个类型为 range 的懒惰对象，只有在你迭代它、或是对它进行切片时，它才会返回真正的数字给你。

我们的函数同样也需要变懒，这包括：

更多的使用 yield 关键字，返回生成器对象
尽量使用生成器表达式替代列表推导表达式
    1. 生成器表达式：(i for i in range(100)) 👍
    2. 列表推导表达式：[i for i in range(100)]

尽量使用模块提供的懒惰对象：
    - 使用 re.finditer 替代 re.findall
    - 直接使用可迭代的文件对象： for line in fp，而不是 for line in fp.readlines()

### 使用元组改善分支代码

```python
import bisect


# BREAKPOINTS 必须是已经排好序的，不然无法进行二分查找
BREAKPOINTS = (1, 60, 3600, 3600 * 24)
TMPLS = (
    # unit, template
    (1, "less than 1 second ago"),
    (1, "{units} seconds ago"),
    (60, "{units} minutes ago"),
    (3600, "{units} hours ago"),
    (3600 * 24, "{units} days ago"),
)


def from_now(ts):
    """接收一个过去的时间戳，返回距离当前时间的相对时间文字描述
    """
    seconds_delta = int(time.time() - ts)
    unit, tmpl = TMPLS[bisect.bisect(BREAKPOINTS, seconds_delta)]
    return tmpl.format(units=seconds_delta // unit)
```

### 在更多地方使用动态解包

```user = {**{"name": "piglei"}, **{"movies": ["Fight Club"]}}```

## Python 工匠：让函数返回结果的技巧

### 编程建议

1. 单个函数不要返回多种类型
2. partial 构造新函数

partial(func, *args, **kwargs) 基于传入的函数与可变（位置/关键字）参数来构造一个新函数。所有对新函数的调用，都会在合并了当前调用参数与构造参数后，代理给原始函数处理。

3. 异常

```python
class CreateItemError(Exception):
    """创建 Item 失败时抛出的异常"""
```

## Python 工匠： 异常处理的三个好习惯

## Python 工匠：编写地道循环的两个建议

### 什么是“地道”的循环？

```python
for i, name in enumerate(names):
    print(i, name)
```

### 使用 islice 实现循环内隔行处理

> itertools.islice(iterable, start, stop[, step])

创建一个迭代器，返回从 iterable 里选中的元素。如果 start 不是0，跳过 iterable 中的元素，直到到达 start 这个位置。之后迭代器连续返回元素，除非 step 设置的值很高导致被跳过。如果 stop 为 None，迭代器耗光为止；否则，在指定的位置停止。与普通的切片不同，islice() 不支持将 start ， stop ，或 step 设为负值。可用来从内部数据结构被压平的数据中提取相关字段（例如一个多行报告，它的名称字段出现在每三行上）


### 使用 takewhile 替代 break 语句

```diff
- for user in users:
-     # 当第一个不合格的用户出现后，不再进行后面的处理
-     if not is_qualified(user):
-         break
- 
-     # 进行处理 ... ...

+ from itertools import takewhile
+ 
+ for user in takewhile(is_qualified, users):
+     # 进行处理 ... ...
```

使用 chain 函数扁平化双层嵌套循环
使用 zip_longest 函数一次同时循环多个对象

## Python 工匠：使用装饰器的技巧

使用 callable 可以检测某个对象是否“可被调用”

### 尝试用类来实现装饰器

```python
import time
import functools


class DelayFunc:
    def __init__(self,  duration, func):
        self.duration = duration
        self.func = func

    def __call__(self, *args, **kwargs):
        print(f'Wait for {self.duration} seconds...')
        time.sleep(self.duration)
        return self.func(*args, **kwargs)

    def eager_call(self, *args, **kwargs):
        print('Call without delay')
        return self.func(*args, **kwargs)


def delay(duration):
    """装饰器：推迟某个函数的执行。同时提供 .eager_call 方法立即执行
    """
    # 此处为了避免定义额外函数，直接使用 functools.partial 帮助构造
    # DelayFunc 实例
    return functools.partial(DelayFunc, duration)


@delay(duration=2)
def add(a, b):
    return a + b


# 这次调用将会延迟 2 秒
add(1, 2)
# 这次调用将会立即执行
add.eager_call(1, 2)
```






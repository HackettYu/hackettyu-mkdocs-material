---
title: 聊一聊 Python enum 的使用
description: 呃，这个 enum...
redirect: 2020-11-02-python-enum
---

> description: 呃，这个 enum...

## Why

先看一下日常代码中用常量处理逻辑的代码写法

```python
# Example 1
if index == 10:
    dosomething()
# Example 2
MAX_INDEX = 10
if index = MAX_INDEX:
    dosomething()
# Example 
from enum import IntEnum
class Index(IntEnum):
    MAX = 10
    MIN = 0
if index = Index.MAX:
    dosomething()
```

如果你对你的 code 有一定的要求, 有时候你会用枚举类来替代一些数字字面量

## Python Enum

> enum 是 Python 自 3.4 版本引入的内置模块

创建一个 Enum

```pyhton
from enum import Enum
class Color(Enum):
    RED = 1
    GREEN = 2
    BLUE = 3
```

使用

```python
>>> Color.RED
<Color.RED>
>>> Color.RED.name
Color
>>> Color.RED.value
1
```

确保唯一的枚举值

> 使用装饰器 @enum.uniqu

```python
from enum import Enum, unique
@unique
class Mistake(Enum):
    ONE = 1
    TWO = 2
    THREE = 3
    FOUR = 3
```

使用自动设置的值

```python
from enum import Enum, auto
class Color(Enum):
    RED = auto()
    BLUE = auto()
    GREEN = auto()

list(Color)
```

使用 `_generate_next_value_()` 重载 `auto()` 赋值

```python
class AutoName(Enum):
    def _generate_next_value_(name, start, count, last_values):
        return name

class Ordinal(AutoName):
    NORTH = auto()
    SOUTH = auto()
    EAST = auto()
    WEST = auto()

list(Ordinal)
```

## References

- [https://github.com/piglei/one-python-craftsman/blob/master/zh_CN/3-tips-on-numbers-and-strings.md](https://github.com/piglei/one-python-craftsman/blob/master/zh_CN/3-tips-on-numbers-and-strings.md)
- [https://docs.python.org/zh-cn/3/library/enum.html](https://docs.python.org/zh-cn/3/library/enum.html)
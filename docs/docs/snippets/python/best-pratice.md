# python 最佳实践

> VIA:[https://towardsdatascience.com/30-python-best-practices-tips-and-tricks-caefb9f8c5f5](https://towardsdatascience.com/30-python-best-practices-tips-and-tricks-caefb9f8c5f5)

## 检查 Python 版本的最低要求

``` python
if not sys.version_info > (2, 7):
   # berate your user for running a 10 year
   # python version
elif not sys.version_info >= (3, 5):
   # Kindly tell your user (s)he needs to upgrade
   # because you're using 3.5 features
```

## use list

``` python
squares = [x**2 for x in range(10)]
print(squares)
# [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
```

## 检查对象的内存使用情况

``` python
import sys

mylist = range(0, 10000)
print(sys.getsizeof(mylist)) # only use in range
# 48
myreallist = [x for x in range(0, 10000)]
print(sys.getsizeof(myreallist))
# 87632
```

## return multi values

``` python
def get_user(id):
    # fetch user from database
    # ....
    return name, birthdate

name, birthdate = get_user(4)
```

## use data class

``` python
from dataclasses import dataclass

@dataclass
class Card:
    rank: str
    suit: str

card = Card("Q", "hearts")

print(card == card)
# True

print(card.rank)
# 'Q'

print(card)
# Card(rank='Q', suit='hearts')
```

## 变量交换

``` python
a = 1
b = 2
a, b = b, a
print (a)
# 2
print (b)
# 1
```

## merge dict

``` python
dict1 = { 'a': 1, 'b': 2 }
dict2 = { 'b': 3, 'c': 4 }
merged = { **dict1, **dict2 }
print (merged)
# {'a': 1, 'b': 3, 'c': 4}
```

## list 2 str

``` python
mylist = ['The', 'quick', 'brown', 'fox']
mystring = " ".join(mylist)
print(mystring)
# 'The quick brown fox'
```

## recover list

``` python
revstring = "abcdefg"[::-1]
print(revstring)
# 'gfedcba'

revarray = [1, 2, 3, 4, 5][::-1]
print(revarray)
# [5, 4, 3, 2, 1]
```

## 从列表或字符串中获取唯一的元素

``` python
mylist = [1, 1, 2, 3, 4, 5, 5, 5, 6, 6]
print (set(mylist))
# {1, 2, 3, 4, 5, 6}

# And since a string can be treated like a 
# list of letters, you can also get the 
# unique letters from a string this way:
print (set("aaabbbcccdddeeefff"))
# {'a', 'b', 'c', 'd', 'e', 'f'}
```

## 查找列表或字符串中最常出现的值

``` python
test = [1, 2, 3, 4, 2, 2, 3, 1, 4, 4, 4]
print(max(set(test), key = test.count))
# 4
```

> max() will return the highest value in a list. The key argument takes a single argument function to customize the sort order, in this case, it’s test.count. The function is applied to each item on the iterable.
test.count is a built-in function of list. It takes an argument and will count the number of occurrences for that argument. So test.count(1) will return 2 and test.count(4) returns 4.
set(test) returns all the unique values from test, so {1, 2, 3, 4}

## 创建进度条

``` python
from progress.bar import Bar

bar = Bar('Processing', max=20)
for i in range(20):
    # Do some work
    bar.next()
bar.finish()
```

## 多行字符串

``` python
s1 = """Multi line strings can be put
        between triple quotes. It's not ideal
        when formatting your code though"""

print (s1)
# Multi line strings can be put
#         between triple quotes. It's not ideal
#         when formatting your code though

s2 = ("You can also concatenate multiple\n" +
        "strings this way, but you'll have to\n"
        "explicitly put in the newlines")

print(s2)
# You can also concatenate multiple
# strings this way, but you'll have to
# explicitly put in the newlines
```

## 统计出现的次数

``` python
from collections import Counter

mylist = [1, 1, 2, 3, 4, 5, 5, 5, 6, 6]
c = Counter(mylist)
print(c)
# Counter({1: 2, 2: 1, 3: 1, 4: 1, 5: 3, 6: 2})

# And it works on strings too:
print(Counter("aaaaabbbbbccccc"))
# Counter({'a': 5, 'b': 5, 'c': 5})
```

## 添加一些颜色

``` python
from colorama import Fore, Back, Style

print(Fore.RED + 'some red text')
print(Back.GREEN + 'and with a green background')
print(Style.DIM + 'and in dim text')
print(Style.RESET_ALL)
print('back to normal now')
```

## 日期处理

``` python
# pip3 install python-dateutil 
from dateutil.parser import parse

logline = 'INFO 2020-01-01T00:00:01 Happy new year, human.'
timestamp = parse(log_line, fuzzy=True)
print(timestamp)
# 2020-01-01 00:00:01
```

## 整数除法

``` python
5 / 2 = 2.5
5 // 2 = 2
```

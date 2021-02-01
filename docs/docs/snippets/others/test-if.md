---
title: and operator 的妙用
description: [hackettyu'snippets] 
---

> description: [hackettyu'snippets]


例如下面两种写法是等价的
```python
if 1 != 2 and 2 != 1 and 1 == 1:
    print(1)


if 1 != 2:
    print(1)
elif 2 != 1:
    print(1)
elif 1 == 1:
    print(1)
elif 1 != 2 and 2 != 1
    print(1)
elif 1 != 2 and 2 != 1 and 1 == 1:
    print(1) 
```

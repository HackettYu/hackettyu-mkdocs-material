# Python lambda

**example1**

```python
func = lambda x: x + 1
func(1)
# 2
```

**example2**

```python
excute_list = list(map(lambda x:x+1, [1, 2]))
```

**example3**

```python
lambda x: x+1 if x > 2 else 0
# equal
def func(x):
    if not x > 2:
        return 0
    return x + 1
```

**exmaple3**

```python
lambda x:x*i for in range(3)
```
---
title: Python decorator
description: [hackettyu'snippets] 
---

> description: [hackettyu'snippets]

`demo`

```python
import functools


def log(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print('call %s():' % func.__name__)
        print('args = {}'.format(*args))
        return func(*args, **kwargs)

    return wrapper


# call
@log
def test(p):
    print(test.__name__ + " param: " + p)
    
test("I'm a param")
```

`add a paramater`

```python
import functools

def log_with_param(text):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            print('call %s():' % func.__name__)
            print('args = {}'.format(*args))
            print('log_param = {}'.format(text))
            return func(*args, **kwargs)

        return wrapper

    return decorator
    
@log_with_param("param")
def test_with_param(p):
    print(test_with_param.__name__)


decorator = log_with_param("param")
wrapper = decorator(test_with_param)
```
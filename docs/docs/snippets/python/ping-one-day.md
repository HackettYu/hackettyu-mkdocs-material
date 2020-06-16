# ping one day

```python
"""ping a web one day

@ Author hackettyu
@ Date 2020-05-28

600 is mean of 10 min
144 * 600 is one day
"""
list(map(lambda x: __import__("os").system(f"ping {x}") if x else __import__("time").sleep(600),['baidu.com',False]*144))
```
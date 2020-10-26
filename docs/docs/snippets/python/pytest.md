# Pytest snippets

```python
# List of snippets
# praises
with pytest.raises(Exception):
    pass
# fixture
@pytest.fixture
def name(request):
    pass
# mark
@pytest.mark
# parametrize
@pytest.mark.parametrize('foo', ['bar'])
a==
assert 1 == 1
# afalse
assert False is False
# atrue
assert True is True
# a>
assert 2 > 1
# a>=
assert 1 >= 1
# ain
assert 'a' in ['a']
# anotin
assert 1 not in [2]
# ais
assert 1 is 1
# aisnot
assert 'a' is not 1
# a<
assert 1 < 2
# a<=
assert 1 <= 1
# a!=
assert 1 != 2
```
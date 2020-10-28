# [hackettyu'snippets] Python Builder

```python
from abc import ABC

from abc import ABCMeta, abstractmethod

class TestAbstract(ABC):

    @abstractmethod
    def add(self, value):
        pass
    
    @abstractmethod
    def init(self):
        pass

    @abstractmethod
    # @init.setter
    def set(self, value):
        pass


class Test(TestAbstract):

    def __init__(self):
        self.test = []

    def add(self, value):
        self.test.append(value)
        return self
    
    def init(self):
        return self
    
    def set(self, value):
        self.test = {}
        return self

test = Test()

test.add(1).add(2)

print(test.test[0], test.test[1])
```
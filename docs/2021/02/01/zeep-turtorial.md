---
title: Python SOAP client zeep 使用指南
description: Zeep 是一个 Python SOAP client. |
             使用 SOAP client 能更好解析 WebService 的 WSDL(Schema)，当然 HTTP 一般情况下都会比 SOAP client 快
---

## Why use zeep?

Zeep 是一个 Python SOAP client.

使用 SOAP client 能更好解析 WebService 的 WSDL(Schema)，当然 HTTP 一般情况下都会比 SOAP client 快

## 获取 WSDL

1. CLI

```bash
python -mzeep "https://{{username}}:{{password}}@example?wsdl"
```

2. Code

```python
client = zeep.Client(
    wsdl=wsdl_url,
    transport=transport_with_basic_auth
)
client.wsdl.dump()
```

## Demo

**使用 get_type**

```python
from collections import OrderedDict
from requests import Session
from requests.auth import HTTPBasicAuth
import zeep
from zeep.transports import Transport

def foo() -> OrderedDict:
    username = '{{USERNAME}}'
    password = '{{PASSWORD}}'
    wsdl_url = ('https://example.com/',
                'URI?wsdl')
    session = Session()
    session.auth = HTTPBasicAuth(username, password)
    transport_with_basic_auth = Transport(session=session)

    client = zeep.Client(
        wsdl=wsdl_url,
        transport=transport_with_basic_auth
    )

    # client.wsdl.dump()

    request_informations = client.get_type('ns0:foo')()
    request_requestinfo = client.get_type('ns0:bar')()

    foo_dict = {
        # ...
    }

    request_informations.__values__ = OrderedDict(request_dict)

    bar_dict = {
        # ...
    }

    request_requestinfo.__values__ = OrderedDict(bar_dict)

    resp_to_dict = OrderedDict()

    with transport_with_basic_auth.settings(timeout=2000):
        resp = client.service.execute(
            foo=request_informations, bar=request_requestinfo)

        resp_to_dict = resp.__dict__['__values__']

    return resp_to_dict
```

**使用解构**

```python
def use_esb_soap_use_case(
    url: str,
    username: str,
    password: str,
    case: dict
) -> OrderedDict:
    user = User()
    user.username = username
    user.password = password
    transport_with_basic_auth = auth.add_zeep_auth(
        user, context.CONTENT_TYPE_ZEEP_SOAP)
    client = Client(wsdl=url, transport=transport_with_basic_auth)

    resp_to_dict = OrderedDict()
    # case['some_filed'].update(field=value)

    with transport_with_basic_auth.settings(timeout=context.TIMEOUT_ZEEP_SOAP):
        try:
            resp = client.service.execute(**case)
            resp_to_dict = resp.__dict__['__values__']
        except ValidationError as validationError:
            logger.warn((validationError.message, "请检查 Body 是否有新增字段"))

    return resp_to_dict
```

## 构建类型

1. **Client.get_element(name)**

> Return the element for the given qualified name.

-> Return type:	zeep.xsd.Element

---

2. **Client.get_type(name)**

> Return the type for the given qualified name.

-> Return type: zeep.xsd.ComplexType or zeep.xsd.AnySimpleType

3. **type_factory(namespace)**

> Return a type factory for the given namespace.

Example:

```python
factory = client.type_factory('ns0')
user = factory.User(name='John')
Return type: Factory
```

4. AnyObject

class zeep.AnyObject(xsd_object, value)
    - Create an any object

Parameters:	
    - xsd_object – the xsd type
    - value – The value

5. 使用解构

## 添加 header

给 session 添加

```python
headers = {
    'Authorization': auth,
    'Content-Type': context.CONTENT_TYPE_APPLICATION_JSON
}
session = Session()
session.auth = HTTPBasicAuth(user.username, user.password)
session.headers.update(header)
```

## SkipValue

执行 service method 的时候所有参数会自动校验（不管 WSDL 设置）

可以使用下面的方式跳过参数校验

```python
from zeep import Client
from zeep import xsd

client = Client('http://my-entrprisy-endpoint.com')
client.service.submit_something(user_id=1, my_string=xsd.SkipValue)
```

## 关于 WSDL

```bash

Prefixes:
     xsd: http://www.w3.org/2001/XMLSchema
     ns0: urn:...

Global elements:
     
     ns0:Element_foo(attr1: ns0:{{element or type}})
     ...

Global types:
     xsd:anyType
     ...

Bindings:
     Soap11Binding: {urn:***}***
     Soap12Binding: {urn:***}***

Service: {{some_method}}
     Port: *** (Soap11Binding: {urn***}***)
         Operations:
            FOO -> BAR
     ...
```

`Global elements` 是可以用 get_element 获取的元素
`Global types` 是可以用 get_type 获取的类型

`Service` 是 method 名称，`Operations` 描述了输入参数和返回值，如果没有声明元素或类型可以直接用解构的方式赋值


> minOccurs：表示 XML 文档中某个[元素节点] 是否可以不出现，默认值为 1，表示必须出现
> nillable：表示 XML 文档中某个[元素取值] 是否可以为空(形如：<name xsi:nil="true" />)，默认值为false，表示不能为空

## Reference 

- [https://github.com/mvantellingen/python-zeep/issues/78](https://github.com/mvantellingen/python-zeep/issues/78)
- [https://docs.python-zeep.org/en/master/datastructures.html#creating-objects](https://docs.python-zeep.org/en/master/datastructures.html#creating-objects)
- [https://docs.python-zeep.org/en/master/api.html](https://docs.python-zeep.org/en/master/api.html)
- [https://github.com/mvantellingen/python-zeep](https://github.com/mvantellingen/python-zeep)
# Github Action

## 关于工作流程的 YAML 语法

> Learn YAML in 5 minutes: https://www.codeproject.com/Articles/1214409/Learn-YAML-in-five-minutes

**name**

> unrequired default: workflow name

**on**

> https://docs.github.com/cn/actions/reference/events-that-trigger-workflows


**on.schedule**

> cron: https://pubs.opengroup.org/onlinepubs/9699919799/utilities/crontab.html#tag_20_25_07

`*` is a special character in YAML so you have to quote this string


## 属性

要使用属性解除参考语法，属性名称必须：

以 a-Z 或 _ 开头。
后跟 a-Z 0-9 - 或 _

## 表达式和函数

- if
- contains
- startWith
- endWith
- formart: https://docs.github.com/cn/actions/reference/context-and-expression-syntax-for-github-actions#%E9%80%B8%E5%87%BA%E6%8B%AC%E5%8F%B7%E7%A4%BA%E4%BE%8B
- join
- toJson
- fromJson
- hashFiles
- success
- always
- cancelled
- failure
- 对象过滤器：https://docs.github.com/cn/actions/reference/context-and-expression-syntax-for-github-actions#%E5%AF%B9%E8%B1%A1%E8%BF%87%E6%BB%A4%E5%99%A8


### Reference

- https://docs.github.com/cn/actions/reference/workflow-syntax-for-github-actions#filter-pattern-cheat-sheet
- https://docs.github.com/cn/actions/reference/context-and-expression-syntax-for-github-actions
- https://docs.github.com/cn/actions/reference/workflow-commands-for-github-actions


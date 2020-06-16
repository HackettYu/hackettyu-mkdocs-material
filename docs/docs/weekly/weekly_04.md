---
title: 每周分享第 4 期
date: 2018-12-31 23:59:59
category:
- weekly
tag:
- weekly
---

## 文摘
---
1、[CSS属性值定义语法](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Value_definition_syntax#%E6%80%BB%E7%BB%93)
`|` => `\`

| 符号 	| 名称 	| 描述 	| 示例 	|
|----------	|--------------	|--------------------------------------	|---------------------------------------------------	|
| 组合符号 	|  	|  	|  	|
|  	| 并置 	| 各部分必须出现且按顺序出现 	| solid `<length>`	|
| && 	| “与”组合符 	| 各部分必须出现，但可以不按顺序 	| `<length>` && `<string>` 	|
| \\ 	| “或”组合符 	| 各部分至少出现一个，可以不按顺序 	| `<'border-image-outset'>` \\ `<'border-image-slice'>` 	|
| \ 	| “互斥”组合符 	| 各部分恰好出现一个 	| smaller \ small \ normal \ big \ bigger 	|
| [ ] 	| 方括号 	| 强调优先级 	| bold [ thin && `<length>` ] 	|
| 数量符号 	|  	|  	|  	|
|  	| 无数量符号 	| 恰好一次 	| solid 	|
| * 	| 星号 	| 零次、一次或多次 	| bold smaller* 	|
| +  	| 加号 	| 一次或多次 	| bold smaller+ 	|
| ？ 	| 问号 	| 零次或一次（即可选） 	| bold smaller？ 	|
| {A,B} 	| 大括号 	| 至少A次，至多B次 	| bold smaller{1,3} 	|
| # 	| 井号 	| 一次或多次，但多次出现必须以逗号分隔 	| bold smaller# 	|

2、python3 打印圣诞树
```bash
python -c "for i in list(range(0, 5)) + list(range(2, 8)) + list(range(3, 12)) + [2, 2]: print(' ' * int((40-2*i-i/2)) + '*' * int((4*i+1+i)))"
```
3、python3 开启内置服务器
```bash
python -m http.server
```
4、windows 装 python2 和 python3 后安装 python2 的 pip 包
```bash
python2 -m pip install <package>
```
5、windows 修改 dns command
- netsh interface ip set dns "以太网" static 114.114.114.114    # 设置 dns 管理员权限下
6、全球 BGP
```bash
telnet route-server.ip.att.NET
username: rviews
password: rviews
show route all
```

## 结语

----&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;----&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;---&nbsp;&nbsp;&nbsp;&nbsp;----
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|
----&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;----
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|
----&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;----&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;---&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;----

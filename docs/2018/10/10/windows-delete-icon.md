---
title: 删除 Windows 下磁盘多余的图标
description: 已经买 mac
---

> description: 已经买 mac

## 快速入门

在注册表里打开下面两个路径看除了默认是否还有其它的，网上的方法只有第一条：
```bash
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace
HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace
```
## 附录
- 第一条是系统的。
- 第二条是用户的。
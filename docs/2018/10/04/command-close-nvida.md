---
title: 用命令行操作 window 显卡
description: 有时候想关闭 Navida 的独立显卡，但是感觉去控制板里面点有点无聊，找了一个 trick 的方式
---

> description: 有时候想关闭 Navida 的独立显卡，但是感觉去控制板里面点有点无聊，找了一个 trick 的方式

## 简介

> 环境：WIN10

寻找一种命令行开关驱动的方式以及关闭独显省电。

## 快速入门

### 软件安装

> 安装 devcon :
https://docs.microsoft.com/zh-cn/windows-hardware/drivers/download-the-wdk

### 使用

管理员运行，进入你的安装路径（`C:\Program Files (x86)\Windows Kits\10\Tools\x64>
`这是 64 位的）下：

```powershell
devcon find * > driver.txt
```

例如要关闭 NVIDIA 显卡：

`PCI\VEN_10DE&DEV_139B&SUBSYS_01521558&REV_A2\4&BED9AB3&0&0008: NVIDIA GeForce GTX 960M
`

截取一段编号查询并查询到唯一驱动：

```powershell
devcon find *VEN_10DE
```

运行：

```powershell
// 关闭
devcon disacble *VEN_10DE
// 打开
// devcon enable *VEN_10DE
```

## 附录

查询服务的命令 `sc`:

```powershell
// New-Alias -Name Run-SC -Value 'C:\Windows\System32\sc.exe'
// Run-SC query ALG
sc query type= driver | findstr NVIDIA
```

打开图形驱动管理界面：

```powershell
start devmgmt.msc
```

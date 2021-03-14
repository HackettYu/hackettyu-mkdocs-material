---
title: Windows 下使用 git bash 自带的功能配置终端主题
description: 意外发现 git bash 里自带跳转到一个配置终端主题颜色的 Web
redirect: 2018-12-02-windows-git-bash
---

> description: 意外发现 git bash 里自带跳转到一个配置终端主题颜色的 Web

## 简介
在使用 git 配置时点击了颜色配置工具跳转到了一个 [github page](http://ciembor.github.io/4bit/#) 里，发现是一个可视化配置的工具，它可以生成多种终端的颜色主题文件。

## 快速入门
windows 下的 git bash 的响应配置文件是 `c/${username}/.minttyrc` 或者 `~\.minttyrc`，所以你现在项目导出的文件类型也应该是 mintty 的，不过好像要右键打开新的链接，自身不会跳转（主要是浏览器会拦截 `data://` 这种 URL ）。

## 附录
下面是我的配置文件，导出的文件是下半部分，上半部是其它配置。

```r
BoldAsFont=-1
Locale=zh_CN
Charset=UTF-8
Language=zh_CN
FontHeight=12
Font=Consolas

BackgroundColour=10,20,30
ForegroundColour=166,196,225
CursorColour=166,196,225
Black=61,61,61
BoldBlack=83,83,83
Red=210,63,105
BoldRed=229,144,168
Green=105,210,63
BoldGreen=168,229,144
Yellow=210,168,63
BoldYellow=229,205,144
Blue=63,105,210
BoldBlue=144,168,229
Magenta=168,63,210
BoldMagenta=205,144,229
Cyan=63,210,168
BoldCyan=144,229,205
White=233,233,233
BoldWhite=255,255,255
```
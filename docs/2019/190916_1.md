---
title: Chrome 解决第三方扩展安装的问题
date: 2019-09-16 12:00:00
category:
- note
tag:
- Chrome
---

## 简介
---
Chrome 在后面新的版本不支持第三方扩展了，这使得我自己去下载一些开发者的扩展安装时有点感到不方便，`百度经验`上到多数都是用开发者模式的方法安装，其实最完美的方法是 policy whitelist

## 快速上手
---

### windows 添加 policy

使用注册表添加的方式（懒得写了）

### mac 命令行添加 policy
```bash
# add
defaults write com.google.Chrome ExtensionInstallWhitelist -array {id}
# delete
defaults delete com.google.Chrome ExtensionInstallWhitelist
```

## 进阶篇
---
- 利用链接下载 Chrome extension
```bash
# example
# wget https://chrome.google.com/webstore/detail/cookies/{id}?hl=en
wegt https://chrome.google.com/webstore/detail/cookies/iphcomljdfghbkdcfndaijbokpgddeno?hl=en
 ```

- 查看 policy 是否添加
```bash
start chrome://policy/
```

## 附录
---

- [Policy List](https://www.chromium.org/administrators/policy-list-3#ExtensionInstallWhitelist)
- [chromium mac-quick-start](https://www.chromium.org/administrators/mac-quick-start)

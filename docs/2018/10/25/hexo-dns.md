---
title: hexo 配置 dns 分流的问题处理
description: 之前一直都是国外 IP 走 Github page，国内 IP 走 Coding page，但在认证 HTTPS 的时候发现了这个问题 
---

> description: 之前一直都是国外 IP 走 Github page，国内 IP 走 Coding page，但在认证 HTTPS 的时候发现了这个问题

## 简介
hexo 同时部署在 coding page 和 github page 后，在域名服务器设置 dns 分流后发现 coding 一直无法申请 ssl。

## 快速入门
网上说的把 dns 设置境外线路和国内线路让 dns 分流让国内访问 coding 国外访问 github 加速网页加载，不过分流要看用户配置的 dns 不是看 ip。
这导致 我的 coding ssl 证书 申请不成功 因为域名验证成功的必要条件还是要让证书服务提供方能读取到申请者（即 Coding Pages 服务器）所提供的验证信息
所以要先暂停境外的分流再申请 coding 的 ssl。

## 附录
我一直找不到问题的原因是我使用的 dns 是 `1.1.1.1`，这是国外的 dns，导致我一直使用的是 github page，没有加载到 coding page。

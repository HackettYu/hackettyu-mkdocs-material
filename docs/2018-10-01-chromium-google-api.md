---
title: 解决 Chromium 浏览器缺少 Google API 密钥无法登录问题
description: Ops
redirect: 2018-10-01-chromium-google-api
---

> description: Ops

管理员命令运行：

```shell
setx GOOGLE_API_KEY “AIzaSyAUoSnO_8k-3D4-fOp-CFopA_NQAkoVCLw”
setx GOOGLE_DEFAULT_CLIENT_ID “6307505647-6knmr84r2pj2leudg3pp1j0h1licd6b9.apps.googleusercontent.com”
setx GOOGLE_DEFAULT_CLIENT_SECRET “rbeWhXTLgU8oLiUeefPsEL9c”
```

这三行分别是：API密钥、客户端ID、客户端密钥
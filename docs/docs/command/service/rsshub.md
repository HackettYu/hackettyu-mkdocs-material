---
title: rsshub
description: [hakcettyu's cheetsheet]
---

> description: [hakcettyu's cheetsheet]

- npm start  `start rsshub`
- docker run -d --name rsshub -p 1200:1200 diygod/rsshub  `start rsshub by docker`
- docker stop rsshub  `stop rsshub docker`
- docker run -d -p 1200:1200 diygod/rsshub `启动 rsshub`

- 关闭 rsshub

```bash
netstat -tunlp| grep 1200
ps -ef | grep npm
ps -ef | grep node
kill -9 10532
nphub npm start &  # 后台运行
```



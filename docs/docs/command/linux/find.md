---
title: find
description: [hakcettyu's cheetsheet]
---

> description: [hakcettyu's cheetsheet]

- find . -name \*.c | xargs wc -l | tail -1 | awk '{print $1}' `统计代码行数`
- find . -type f -name "*.html" -print `输出当前目录下的所有 html 格式的文件`

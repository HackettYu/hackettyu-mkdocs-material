---
title: dd
description: [hakcettyu's cheetsheet]
---

> description: [hakcettyu's cheetsheet]

- dd if=/dev/urandom of={{随机的文件}} bs=100 count=1
使用内核随机驱动程序生成一个 100 个随机字节的文件

- dd if=/dev/zere of={{file_1GB}} bs=1024 count=1000000
测试一块硬盘的写入性能

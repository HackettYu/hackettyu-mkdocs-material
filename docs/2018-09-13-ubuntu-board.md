---
title: Ubuntu 打字时停用触摸板
description: 我在使用 Ubuntu 16.04 的时候打字，手总是会碰到触摸板。体验不太爽，所以找了文档处理下
redirect: 2018-09-13-ubuntu-board
---

> description: 我在使用 Ubuntu 16.04 的时候打字，手总是会碰到触摸板。体验不太爽，所以找了文档处理下

## 快速入门

### 使用 syndaemon 程序

- 名称：syndaemon - 一个程序，用于监视键盘活动并在使用键盘时禁用触摸板。
- 概要：syndaemon [ -i idle-time ] [ -m poll-inverval ] [ -d ] [ -p pid-file ] [ -t ] [ -k ] [ -K ] [ -R ]
- 描述：键入时禁用触摸板可避免不必要的指针移动，从而导致焦点偏向错误的窗口。
- 选项

| 参数 | 说明 |
|-|-|
| -i < 空闲时间 > | 在启用触摸板之前最后一次按键后等待的秒数。（默认为2.0秒）  |
| -m < poll-interval > | 在两个轮询间隔之间等待多少毫秒。如果此值太低，将导致不必要的唤醒。如果该值太高，则可能不会注意到某些按键（在两个间隔之间发生按下和释放）。使用-R运行时，此开关无效。默认值为200毫秒 |
| -d | 从守护进程开始，即在后台运行 |
| -p < pid-file > | 创建具有指定文件名的pid文件。只有在守护程序模式下启动程序时才会创建pid文件 |
| -t | 仅响应键盘活动，禁用点击和滚动，而不禁用鼠标移动 |
| -k | 监视键盘活动时忽略修饰键 |
| -K | 像-k一样，但也忽略了Modifier + Key组合 |
| -R | 使用XRecord扩展来检测键盘活动，而不是轮询键盘状态 |

- 使用 syndaemon

``` bash
# syndaemon 可以监控键盘活动并在打字时禁用触摸板，有多个选项可以控制禁用条件。可以通过下面命令查看帮助：
$ syndaemon -h
# 例如要在打字 0.5 秒后禁用点击和滚动，忽略 Ctrl 等修饰键，使用
$ syndaemon -i 0.5 -t -K -R
```

---

### 设置开机启动脚本（利用 rc.local）

> https://www.linuxidc.com/Linux/2017-09/147166.htm

rc.local脚本是一个Ubuntu开机后会自动执行的脚本，我们可以在该脚本内添加命令行指令。该脚本位于/etc/路径下，需要root权限才能修改。

该脚本具体格式如下：

``` bash
#!/bin/sh -e
#
# rc.local
#
# This script is executed at the end of each multiuser runlevel.
# Make sure that the script will "exit 0" on success or any other
# value on error.
#
# In order to enable or disable this script just change the execution
# bits.
#
# By default this script does nothing.
exit 0
```

在 exit 0 前添加如下代码：

``` bash
syndaemon -i 1 -t -K -R
```

注意: 一定要将命令添加在exit 0之前。里面可以直接写命令或者执行Shell脚本文件sh

---

### 参考

- [在打字时禁用触摸板](https://wiki.archlinux.org/index.php/Touchpad_Synaptics_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)#.E5.9C.A8.E6.89.93.E5.AD.97.E6.97.B6.E7.A6.81.E7.94.A8.E8.A7.A6.E6.91.B8.E6.9D.BF)

- [syndaemon(1) - Linux man page](https://linux.die.net/man/1/syndaemon)

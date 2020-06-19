---
title: 切换 eclipse 编译版本
date: 2018-12-15 12:00:00
category:
- note
tag:
- eclipse
- java
---

## 简介
---
导入其它编译器或别人的项目的时候，有时候 jre 会不一样

## 快速上手
---
- 查看你的工程编译版本：
    - 命令行：
    ```bash
    javap -verbose src/source.class
    ```
    可以直接看前面显示的 version
    - eclipse 打开 src/*.class

- 对应信息：

| 版本号 	| 对应十进制 	| jdk 版本号 	|
|:------:	|:----------:	|:----------:	|
|   2E   	|     46     	|     1.2    	|
|   2F   	|     47     	|     1.3    	|
|   30   	|     48     	|     1.4    	|
|   31   	|     49     	|     1.5    	|
|   32   	|     50     	|     1.6    	|
|   33   	|     51     	|     1.7    	|
|   34   	|     52     	|     1.8    	|

- 切换 eclipse 编译版本
    - 全局
    `Preferences-->Java-->Compiler->Compiler compliance level`
    - 局部
    `工程右键-->属性-->Java Compiler`


## 附录
---
> https://blog.csdn.net/gnail_oug/article/details/47145047
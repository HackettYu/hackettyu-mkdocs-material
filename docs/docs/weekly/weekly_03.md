---
title: 每周分享第 3 期
date: 2018-12-23 12:00:00
category:
- weekly
tag:
- weekly
---

## 教程
---
1、[html2docset](https://segmentfault.com/a/1190000000721142)
html 文件转 docset

## 文摘
---
1、镜像网站
```
wget --recursive --no-clobber --page-requisites --html-extension --convert-links --restrict-file-names=windows --domains \<name> --no-parent \<url>
wget -m \<url>    
wget -r -p -k -np \<url>
```

2、python 2.x to python 3.x
```python
#!/usr/bin/env python
import sys
from lib2to3.main import main
sys.exit(main("lib2to3.fixes"))
```
## 结语
---
> http://www.ruanyifeng.com/blog/2018/12/weekly-issue-36.html

美国一个编程培训班的老板，写了一篇文章。他说自己很担忧。现在，那么多人学习编程，他的公司全靠培训赚钱，将来会不会程序员过剩？

培训班的目的，就是让那些没有受过四年计算机教育的人，经过四个月的培训，找到一份软件开发的工作。某种程度上，这种做法是可行的，大量的程序员就是通过这种模式生产出来。

但是，人工智能正变得越来越强，终有一天，简单代码都会由计算机自已生成，低级程序员的需求将会大量减少。另一方面，云服务的兴起，使得很多任务不需要自己编程，可以购买云服务，这也减少了程序员的需求。

同时，由于不断的抽象和封装，应用层的软件开发正变得越来越简单，如果只是简单地遵循在线教程，就能编写软件，或者将一系列API混合在一起，就能做出一个服务，有必要向开发人员支付高额薪水吗？毕竟开发过程是那么简单。

他认为，学习编程是值得的，它可以帮助你理解世界。但是，梦想仅仅学会软件开发，就能解决你的人生问题是不现实的。"只是能够编写一个安卓程序，不会为你赢得竞争优势，也没法在这个超级饱和的科技世界里，获得自己的一席之地。这个世界里，每个想法都已由十位企业家在你前面完成了。"

由于其他行业不景气，大量年轻人正在转向软件业就业。但是，程序员的淘汰也很厉害，上车的人多，下车的人也多。大家应该对这一点有清醒的认识。

（完）
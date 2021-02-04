---
title: 给 hexo 添加 send to kindle 链接
description: 看到一个[博客](https://blog.lilydjwg.me/2019/8/16/gh-check.214730.html)里面有一个添加了 send to kindle 链接，准备在自己 hexo 博客中也搞一个
---

> description: 看到一个[博客](https://blog.lilydjwg.me/2019/8/16/gh-check.214730.html)里面有一个添加了 send to kindle 链接，准备在自己 hexo 博客中也搞一个

## Quick Start

找到文件`theme\next\layout\_macro\post.swig`

找到一个你想添加的位置

``` diff
+ <a href="https://pushtokindle.fivefilters.org/send.php?url=&#123&#123 page.permalink &#125&#125">send to kindle</a>
```

注意一下文档里变量赋值是`&#123%- %&#125`,我的版本是是用`&#123&#123&#125&#125`作为操作符
还有不要`&#123&#123 page.permalink | json &#125&#125`这样写，这样写会多一对引号

请忽略 `\`

## 附录

---

- [hexo 变量](https://hexo.io/zh-cn/docs/variables.html#%E7%BD%91%E7%AB%99%E5%8F%98%E9%87%8F)
- [寻找最快的 GitHub IP - 依云's Blog](https://blog.lilydjwg.me/2019/8/16/gh-check.214730.html)
- [Hexo 特殊符号的转义问题](https://wxnacy.com/2018/01/12/hexo-specific-symbol/)
---
title: 给 hexo 博客添加 OGP 支持
description: 最近了解到有一种预览网址的协议叫 [OGP](https://ogp.me/)，想在 hexo 博客里添加，找到了这个[插件](https://github.com/minamo173/hexo-tag-link-preview)
redirect: 2019-10-30-hexo-ogp
---

> description: 最近了解到有一种预览网址的协议叫 [OGP](https://ogp.me/)，想在 hexo 博客里添加，找到了这个[插件](https://github.com/minamo173/hexo-tag-link-preview)

## 安装

``` bash
yarn add hexo-tag-link-preview

# usage

在文章中添加 \{\% linkPreview https://www.amazon.com/ _blank nofollow \%\}
```

## 预览

> 想要好看的预览需要如下的标签

- Title 最长 65 个字符，否则 Google 结果就会被截断
- Meta description 最好小于 155 字符
- og:title 最好不超过 35 个字符，否则预览会截断
- og:description 65 字符
- og:url 页面 url
- og: image JPG 或者 PNG，最小分辨率 300 × 200 像素
- favicon 网站 logo， 32 × 32 像素

上面的网站目前支持很多聊天工具，比如 WhatsApp, Telegram, Skype ，还有社交网站 Facebook，Twitter 等等。

``` sh

# 可以用下面的代码内嵌到 hexo 的文章中
{% linkPreview https://www.amazon.com/ _blank nofollow %}

{% linkPreview https://hackettyu.com/ _blank nofollow %}

{% linkPreview https://baidu.com/ _blank nofollow %}
```

在 `.\themes\next\layout\_partials\head.swig` 下添加了下面代码

``` swig
<meta property="og:title" content="hackettyu.com" />
<meta property="og:description" content="OGP" />
<meta property="og:url" content="http://hackettyu.com/" />
<meta property="og:image" content="http://richpreview.com/richpreview.jpg" />
<link rel="shortcut icon" href="https://hy-picgo.oss-cn-shenzhen.aliyuncs.com/img/blog-hackettyu-com/weekly_01_falling_through_code.gif" type="image/x-icon" />
```

感觉没用 :smile:

## 使用 hexo 自带的 open graph 参数

插入 open graph 资源。

> <%- open_graph([options]) %>

``` diff
+ {{ open_graph([options]) %> }}
- <%- open_graph([options]) %>
```

| 参数 | 描述 | 默认值 |
| --- | --- | --- |
| title | 页面标题 | (og:title) page.title |
| type | 页面类型 (og:type) | blog |
| url | 页面网址 (og:url) | url |
| image | 页面图片 (og:image) | 内容中的图片 |
| site_name | 网站名称 (og:site_name) | config.title |
| description | 页面描述 (og:description) | 内容摘要或前 200 字 |
| twitter_card | Twitter 卡片类型 (twitter:card) | summary |
| twitter_id | Twitter ID (twitter:creator) |
| twitter_site | Twitter 网站 (twitter:site |
| google_plus | Google+ 个人资料链接 |
| fb_admins | Facebook 管理者 ID |
| fb_app_id | Facebook 应用程序 ID |

## 附录

- [OGP 简介](https://ogp.me/)
- [hexo open graph](https://hexo.io/zh-cn/docs/helpers.html#open-graph)
- [hexo-tag-link-preview](https://github.com/minamo173/hexo-tag-link-preview)
- [让网站在分享时预览更美观](http://einverne.github.io/post/2016/08/rich-preview.html)
- [hexo 加上 Open Graph](https://dwatow.github.io/2018/02-07-hexo/hexo-open-graph/)

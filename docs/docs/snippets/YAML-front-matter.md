# YAML-front-matter

```yaml
---
#默认主题中配置首页的配置信息
home: true  #设置true就代表是首页了
actionText: 快速上手 →  #中间有个按钮的文字
actionLink: /base/base  #中间按钮的链接
features:  # 下面内容直接对照下默认主题上显示的内容就知道了
- title: 方便理解
  details: 总之是各种奇奇怪怪的帮助理解例子，懂就懂，不懂拉倒。
- title: VuePress驱动
  details: 照着VuePress官方教程搭建的这个文档，至于内容，当然是把以前写的那些复制粘贴上来了。
- title: 高性能
  details: VuePress最后会渲染成一个静态文件，你说高性能不性能。如果你打开的慢，只能说明站长比较穷，服务器太差。
footer: MIT Licensed | Copyright © 2018-present Evan You 
          
#其他常用配置信息

navbar: false   #禁用侧边栏
sidebarDepth: 2 #标题嵌套深度
sidebar: auto   #自动生成侧边栏
prev: ./some-other-page  #上一篇内容
next: false #下一篇内容，false是没有
editLink: false  #禁止全局配置里面编辑文件部分
pageClass: custom-page-class  #自定义类名
layout: SpecialLayout  #自定义布局的组件名
---
```
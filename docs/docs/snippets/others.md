# others

## 链式发起 qq 聊天

`http://wpa.qq.com/msgrd?v=3&uin=${your-qq-num}&site=qq&menu=yes`

## clone github wiki

> 任何GitHub wiki都可以通过附加wiki.git到repo url 来克隆，因此repo的克隆url https://myorg/myrepo/是:( git@github.com:myorg/myrepo.wiki.git对于ssh）或https://github.com/my/myrepo.wiki.git（对于https)

## 获取微博 uid 

`weibo uid uid, 必选 - 用户 id, 博主主页打开控制台执行 $CONFIG.oid 获取`

## 两台 Host 直连

`Host 2 ：192.168.0.2 255.255.255.0 192.168.0.1
Host 1 ：192.168.0.1 255.255.255.0 192.168.0.1 （不能 192.168.1.1 关闭防火墙 开启 Tomcat）`

## 查看谷歌浏览器支持的 CSS 特性

`Object.keys(document.body.style).map(p => p.replace(/[A-Z]/g, "-$&").toLowerCase())`

## 圆周率算法

```math
3 + 3*(1/24) + 3*(1/24)*(9/80) + 3*(1/24)*(9/80)*(25/168) 
[1, 9, 25, ..., (2x + 1)^2]
[24, 80, 168, ..., (16^2 - 24 x + 8)]
``` 

## Chrome 设计模式开启

```js
document.designMode = 'on'
```
---
title: 利用 Github API 获取 spring-framework 所有版本更新信息
description: 简单尝试下使用 Github API 获取一个仓库的版本信息，然后用 marked.js 简单渲染成 html
---

> description: 简单尝试下使用 Github API 获取一个仓库的版本信息，然后用 marked.js 简单渲染成 html

## 简介
---
spring framework 更新后都会有新的特性, 而且 spring framework 是在 github 上开源的, github 上也会有相应的版本更新日志, 所以我采用 github api 可以获取其日志内容, 当然你可以在页面上看, 不过我想要的是所有的信息

## 快速上手
---
- github 获取的对应仓库的链接 `https://api.github.com/repos/spring-projects/spring-framework/releases`

## 入门篇
---

![20200317_183239.png](https://hy-picgo.oss-cn-shenzhen.aliyuncs.com/img/blog-hackettyu-com/20200317_183239.png)

- 直接贴代码

```html
<script src="https://cdn.staticfile.org/jquery/2.1.2/jquery.min.js"></script>
<script src="https://cdn.staticfile.org/marked/0.6.2/marked.min.js"></script>
<script src="https://cdn.staticfile.org/highlight.js/9.15.6/highlight.min.js"></script>
<body>
    <div id="list"></div>
    <script>
        $(function () {
            marked.setOptions({
                renderer: new marked.Renderer(),
                gfm: true,
                tables: true,
                breaks: false,
                pedantic: false,
                sanitize: false,
                smartLists: true,
                smartypants: false,
                highlight: function (code, lang) {
                    //使用 highlight 插件解析文档中代码部分
                    return hljs.highlightAuto(code, [lang]).value;
                }
            });
            let html = "";
            $.ajax({
                type: "get",
                url: "https://api.github.com/repos/spring-projects/spring-framework/releases",   // 路径
                data: {

                },
                dataType: "json",
                async: false,
                success: function (data) {

                    $.each(data, function (index, value) {
                        // console.log(value['url']);
                        // console.log(value['assets_url']);
                        // console.log(value['upload_url']);
                        console.log(value['html_url']);
                        // console.log(value['id']);
                        console.log(value['tag_name']);
                        // console.log(value['target_commitish']);
                        // console.log(value['name']);
                        // console.log(value['draft']);
                        // console.log(value['author']['login']);
                        // console.log(value['author']['id']);
                        // console.log(value['author']['node_id']);
                        // console.log(value['author']['avatar_url']);
                        // console.log(value['author']['gravatar_id']);
                        // console.log(value['author']['url']);
                        console.log(value['author']['html_url']);
                        // console.log(value['author']['followers_url']);
                        // console.log(value['author']['following_url']);
                        // console.log(value['author']['gists_url']);
                        // console.log(value['author']['starred_url']);
                        // console.log(value['author']['subscripttions_url']);
                        // console.log(value['author']['organizations_url']);
                        // console.log(value['author']['repos_url']);
                        // console.log(value['author']['events_url']);
                        // console.log(value['author']['received_events_url']);
                        // console.log(value['author']['type']);
                        // console.log(value['author']['site_admin']);
                        // console.log(value['prerelease']);
                        // console.log(value['created_at']);
                        // console.log(value['published_at']);
                        // console.log(value['assets']);
                        // console.log(value['tarball_url'])
                        // console.log(value['zipball_url'])
                        console.log(value['body'])

                        html += `<a href='${value['html_url']}'>${value['tag_name']}</a><p>${value['author']['html_url']}</p>${marked(value['body'])}<hr>`;
                    });

                }
            })

            $("#list").html(html);
        });
    </script>
</body>
```

## 附录
---
- github 对应的 api `https://api.github.com/repos/${github name}/${repo name}/releases`
- [github api v4](https://developer.github.com/v4/)
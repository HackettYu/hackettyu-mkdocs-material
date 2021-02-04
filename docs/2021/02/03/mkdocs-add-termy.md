---
title: 让 console 的例子动起来，mkdocs 添加 termynal 支持
description: 最近在看 typer 的文档时候看到 typer 的文档也是用的 mkdocs，但发现文档里 console 是带进度条的
---

> description: 最近在看 typer 的文档时候看到 typer 的文档也是用的 mkdocs，但发现文档里 console 是带进度条的


先进入 typer 的仓库 `https://github.com/tiangolo/typer` 看下目录

添加自定义的 css/js 到 doc 目录下

```bash
typer/docs/css/termynal.css
typer/docs/css/custom.css

typer/docs/js/termynal.js
typer/docs/js/custom.js
```

修改 mkdocs 的配置文件 `typer/mkdocs.yml`

```diff
+ extra_css:
+     - 'css/termynal.css'
+     - 'css/custom.css'

+ extra_javascript:
+     - 'js/termynal.js'
+     - 'js/custom.js'
```

这里需要注意一下引入外部资源的顺序

推动到你的 CI，看下效果吧

**Code**

```html
    <div class="termy">

    ```console
    $ pip install typer
    ---> 100%
    Successfully installed typer
    ```

    </div>
```

**Render**

<div class="termy">

```console
$ pip install typer
---> 100%
Successfully installed typer
```

</div>

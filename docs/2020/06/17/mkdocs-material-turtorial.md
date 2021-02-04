---
title: Mkdocs 搭建博客指北
description: 最近在看 fastAPI 的文档，无意中发现许多 Python 的库的官方文档都是用的 Mkdocs-Materials
---

> description: 最近在看 fastAPI 的文档，无意中发现许多 Python 的库的官方文档都是用的 Mkdocs-Materials

## 什么是 Mkdocs

> MkDocs is a fast, simple and downright gorgeous static site generator that's geared towards building project documentation. Documentation source files are written in Markdown, and configured with a single YAML configuration file. Start by reading the introduction below, then check the User Guide for more info.

## Mkdocs-Materials 

> Create a branded static site from a set of Markdown files to host the documentation of your Open Source or commercial project – customizable, searchable, mobile-friendly, 40+ languages. Set up in 5 minutes.

## Quick Start

```bash
# 安装
pip install mkdocs-material
# 新建项目
mkdocs new project-doc
# 将 markdown 文件放入 doc 文件夹
# 构建
mkdocs build # 生成 html
# 本地服务
mkdocs serve
# 打开
start 127.0.0.1:8000
```

## 使用

### 官方参考 mkdocs.yml

```yaml
# Project information
site_name: Material for MkDocs
site_url: https://squidfunk.github.io/mkdocs-material/
site_author: Martin Donath
site_description: >-
  Create a branded static site from a set of Markdown files to host the
  documentation of your Open Source or commercial project – customizable,
  searchable, mobile-friendly, 40+ languages

# Repository
repo_name: squidfunk/mkdocs-material
repo_url: https://github.com/squidfunk/mkdocs-material
edit_uri: ""

# Copyright
copyright: Copyright &copy; 2016 - 2020 Martin Donath

# Configuration
theme:
  name: null
  custom_dir: material

  # 404 page
  static_templates:
    - 404.html

  # Don't include MkDocs' JavaScript
  include_search_page: false
  search_index_only: true

  # Default values, taken from mkdocs_theme.yml
  language: en
  features:
    - tabs
    #- instant
  palette:
    scheme: default
    primary: indigo
    accent: indigo
  font:
    text: Roboto
    code: Roboto Mono
  icon:
    logo: logo
  favicon: assets/favicon.png

# Plugins
plugins:
  - search
  - minify:
      minify_html: true

# Customization
extra:
  social:
    - icon: fontawesome/brands/github
      link: https://github.com/squidfunk
    - icon: fontawesome/brands/gitter
      link: https://gitter.im/squidfunk/mkdocs-material
    - icon: fontawesome/brands/docker
      link: https://hub.docker.com/r/squidfunk/mkdocs-material/
    - icon: fontawesome/brands/twitter
      link: https://twitter.com/squidfunk
    - icon: fontawesome/brands/linkedin
      link: https://linkedin.com/in/squidfunk/
    - icon: fontawesome/brands/instagram
      link: https://instagram.com/squidfunk

# Extensions
markdown_extensions:
  - markdown.extensions.admonition
  - markdown.extensions.attr_list
  - markdown.extensions.codehilite:
      guess_lang: false
  - markdown.extensions.def_list
  - markdown.extensions.footnotes
  - markdown.extensions.meta
  - markdown.extensions.toc:
      permalink: true
  - pymdownx.arithmatex
  - pymdownx.betterem:
      smart_enable: all
  - pymdownx.caret
  - pymdownx.critic
  - pymdownx.details
  - pymdownx.emoji:
      emoji_index: !!python/name:materialx.emoji.twemoji
      emoji_generator: !!python/name:materialx.emoji.to_svg
  # - pymdownx.highlight:
  #     linenums_style: pymdownx-inline
  - pymdownx.inlinehilite
  - pymdownx.keys
  - pymdownx.magiclink:
      repo_url_shorthand: true
      user: squidfunk
      repo: mkdocs-material
  - pymdownx.mark
  - pymdownx.smartsymbols
  - pymdownx.snippets:
      check_paths: true
  - pymdownx.superfences
  - pymdownx.tabbed
  - pymdownx.tasklist:
      custom_checkbox: true
  - pymdownx.tilde

# Page tree
nav:
  - Home: index.md
  - Getting started: getting-started.md
  - Extensions:
    - Admonition: extensions/admonition.md
    - CodeHilite: extensions/codehilite.md
    - Footnotes: extensions/footnotes.md
    - Metadata: extensions/metadata.md
    - Permalinks: extensions/permalinks.md
    - PyMdown: extensions/pymdown.md
  - Plugins:
    - Search: plugins/search.md
    - Minification: plugins/minification.md
    - Revision date: plugins/revision-date.md
    - Awesome pages: plugins/awesome-pages.md
  - Releases:
    - Upgrading to 5.x: releases/5.md
    - Upgrading to 4.x: releases/4.md
    - Changelog: releases/changelog.md
  - Customization: customization.md
  - Data privacy: data-privacy.md
  - Contributing: contributing.md
  - License: license.md

# Google Analytics
google_analytics:
  - !!python/object/apply:os.getenv ["GOOGLE_ANALYTICS_KEY"]
  - auto
```

### 使用 Mkdocs Materials 全文搜索

因为 Mkdocs 自带的全文搜索是使用 lunr.js 写的，所以===2020-06-17===前还不支持中文

我是了下网上说的设置为日文，反正在我的版本也不行

而且 Mkdocs-Material 主题没有用 Mkdocs 自带的实现，要记得设置 `search_index_only: true`

### 部署 Github pages

每次 gh-deploy 后生成的文件会被 `push` 到 `gh-pages` 分支，尽量不要修改 `site` 文件夹里的内容，修改了就要 `git pull`

刚开始我没有在 `site` 文件夹里写 `CNAME` 导致每次部署后都刷新了 pages 的自定义域名，当然如果你用仓库的域名就另说了

### PyMdown 扩展

添加配置

```yaml
markdown_extensions:
  - pymdownx.arithmatex
  - pymdownx.betterem:
      smart_enable: all
  - pymdownx.caret
  - pymdownx.critic
  - pymdownx.details
  - pymdownx.emoji:
      emoji_index: !!python/name:materialx.emoji.twemoji
      emoji_generator: !!python/name:materialx.emoji.to_svg
  - pymdownx.inlinehilite
  - pymdownx.magiclink
  - pymdownx.mark
  - pymdownx.smartsymbols
  - pymdownx.superfences
  - pymdownx.tasklist:
      custom_checkbox: true
  - pymdownx.tabbed
  - pymdownx.tilde
```

#### Details

```markdown
??? success
   Content.

??? warning classes
   Content.
```

#### MagicLink

##### 自动链接

=== "Output"
    - Just paste links directly in the document like this: https://google.com.
    - Or even an email address: fake.email@email.com.

=== "Markdown"
    ```markdown
    - Just paste links directly in the document like this: https://google.com.
    - Or even an email address: fake.email@email.com.
    ```

##### 短链接

=== "Output"
    @facelessuser

=== "Markdown"
    ```markdown
    @facelessuser
    ```

支持的 provider

```json
{
    "bitbucket": ['dashboard', 'account', 'plans', 'support', 'repo'],
    "github": ['marketeplace', 'notifications', 'issues', 'pull', 'sponsors', 'settings', 'support'],
    "gitlab": ['dashboard', '-', 'explore', 'help', 'projects'],
    "twitter": ['i', 'messages', 'bookmarks', 'home']
}
```

#### 模板

```markdown
===--8<--===
filename
filename2
===--8<--===
```

#### 代码

```Bash tab=
#!/bin/bash
STR="Hello World!"
echo $STR
```

```C tab=
#include 

int main(void) {
  printf("hello, world\n");
}
```

```C++ tab=
#include <iostream>

int main() {
  std::cout << "Hello, world!\n";
  return 0;
}
```

```C# tab=
using System;

class Program {
  static void Main(string[] args) {
    Console.WriteLine("Hello, world!");
  }
}
```

#### 表格

```markdown
=== "Tab 1"
    Markdown **content**.

    Multiple paragraphs.

=== "Tab 2"
    More Markdown **content**.

    - list item a
    - list item b

===! "Tab A"
    Different tab set.

=== "Tab B"
    ```
    More content.
```

#### 待办

=== "Output"
    - [X] item 1
        * [X] item A
        * [ ] item B
            more text
            + [x] item a
            + [ ] item b
            + [x] item c
        * [X] item C
    - [ ] item 2
    - [ ] item 3


=== "Markdown"
    ```markdown
    - [X] item 1
        * [X] item A
        * [ ] item B
            more text
            + [x] item a
            + [ ] item b
            + [x] item c
        * [X] item C
    - [ ] item 2
    - [ ] item 3
    ```


### 启用 Admonitionn

```yaml
markdown_extensions:
  - admontion
```

用法

```markdown
!!! note
    this is a note
```

效果

!!! note
    this is a note

Support Types:

- [X] Note
- [X] Abstract
- [X] Info
- [X] Tip
- [X] Success
- [X] Question
- [X] Warning
- [X] Failure
- [X] Danger
- [X] Bug
- [X] Example
- [X] Quote

## Plugins

- rss: [https://guts.github.io/mkdocs-rss-plugin/](https://guts.github.io/mkdocs-rss-plugin/)

## Resources

- [Mkdocs-Material Icon](https://github.com/squidfunk/mkdocs-material/tree/master/material/.icons)


## 引用

- [MkDocs Project documentation with Markdown](https://www.mkdocs.org/)
- [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)
- [pymdown extensions document](https://facelessuser.github.io/pymdown-extensions/)
- https://github.com/squidfunk/mkdocs-material/blob/master/mkdocs.yml
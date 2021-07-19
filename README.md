# Changelog

> The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)

## [Unreleased]

## [1.0.0] - 2020-12-24

### Added
- Use materials mkdoc `Twitter card` and `Open Graph` [@SEE](https://squidfunk.github.io/mkdocs-material/reference/meta-tags/#customization)
- Use materials mkdoc `Formatting` [@SEE](https://squidfunk.github.io/mkdocs-material/reference/formatting/)

!!! "Highlighting changes raw"

    ```md
    Text can be {​--deleted--} and replacement text {​++added++}. This can also be
    combined into {​~~one~>a single~~} operation. {​==Highlighting==} is also
    possible {​>>and comments can be added inline<<}.

    {​==

    Formatting can also be applied to blocks, by putting the opening and closing
    tags on separate lines and adding new lines between the tags and the content.

    ==}
    ```
!!! "Highlighting changes preview"
    
    Text can be {​--deleted--} and replacement text {​++added++}. This can also be
    combined into {​~~one~>a single~~} operation. {​==Highlighting==} is also
    possible {​>>and comments can be added inline<<}.

    {​==

    Formatting can also be applied to blocks, by putting the opening and closing
    tags on separate lines and adding new lines between the tags and the content.

    ==}

**Highlighting text**

```md
- ==This was marked==
- ^^This was inserted^^
- ~~This was deleted~~
```

**Sub- and superscripts**

```md
- H~2~0
- A^T^A
```

## [1.1.0] - 2021-01-28

### Added

- meta-tags: https://squidfunk.github.io/mkdocs-material/reference/meta-tags/

## [1.2.0] - 2021-02-03

### Added

- termynal

example:

<div class="termy">

```console
$ pip install typer
---> 100%
Successfully installed typer
```

</div>

### Added

```pip install mkdocs-blog-plugin```

### Added

```pip installmkdocs-rss-plugin```

## scripts

```bash
# create nav
cd docs &&  python ..\scripts\navgen.py tree --path .
```

### cheatsheet

```bash
 mike deploy --push --update-aliases latest -r doc     
```

## 关于 Changelog

### 指导原则

- 记住日志是写给人的，而非机器。
- 每个版本都应该有独立的入口。
- 同类改动应该分组放置。
- 版本与章节应该相互对应。
- 新版本在前，旧版本在后。
- 应包括每个版本的发布日期。
- 注明是否遵守语义化版本格式.

### 变动类型

- Added 新添加的功能。
- Changed 对现有功能的变更。
- Deprecated 已经不建议使用，准备很快移除的功能。
- Removed 已经移除的功能。
- Fixed 对bug的修复
- Security 对安全的改进
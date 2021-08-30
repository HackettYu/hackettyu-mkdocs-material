# Markdown TIL[^1]

Markdown
: 这个语言的目的是希望大家使用“易于阅读、易于撰写的纯文字格式，并选择性地转换成有效的XHTML（或是HTML）”。

最近我发现一个关于 Markdwon[^2] 的指南网站[^3]，网站里面有许多标准的实用技巧。

## Markdown Cheat Sheet

| Element	| Markdown Syntax |
| --- | :--- |
| 1 | 2 |

## Link

> <https://www.markdownguide.org/basic-syntax#links>

Markdown 的链接可以有以下的方式：

```md
1. <https://example.com>
2. https://example.com
3. `https://example.com`
4. [标题](https://example.com)
5. [标题](https://example.com "备注")
6. [标题][1]
7. [标题 A]

[1]: <https://example.com> "备注"
[标题 A]: <https://example.com>
```

---

效果

1. <https://example.com>
2. https://example.com
3. `https://example.com`
4. [标题](https://example.com)
5. [标题](https://example.com "备注")
6. [标题][1]
7. [标题 A]

[1]: <https://example.com> "备注"
[标题 A]: <https://example.com>

---

1. 方式一是标准的单个 URL 显示的格式
2. 方式二一般的渲染都是和方式一一致的
3. 方式三是 disabled 的 URL
4. 方式四是带标题的
5. 方式五是带标题和备注的
6. 方式六是方便 URL 嵌入一段句子中的方式
7. 方式七...

## Difinetions lists

> <https://www.markdownguide.org/extended-syntax/#definition-lists>

这个是用来解释定义的，之前我都是使用引用的标记来解释定义。

```md
First Term
: This is the definition of the first term.

Second Term
: This is one definition of the second term.
: This is another definition of the second term.
The HTML looks like this:
```

```html
<dl>
  <dt>First Term</dt>
  <dd>This is the definition of the first term.</dd>
  <dt>Second Term</dt>
  <dd>This is one definition of the second term. </dd>
  <dd>This is another definition of the second term.</dd>
</dl>
```

## More than

- <https://www.tablesgenerator.com/markdown_tables>
- <https://www.markdownguide.org/tools/notion/>

## References

[^1]: Today I learned.
[^2]: <https://zh.wikipedia.org/zh-hans/Markdown>
[^3]: <https://www.markdownguide.org/>
# markdown syntax

文件链接
[name](F://book)
图片
![](url)
参考链接
[CentOS 7.3使用BIND配置DNS服务器](http://blog.csdn.net/miouqi/article/details/76422700)
代码
'''python
'''​
- 目录
[TOC]
- 小节
- *空格
- 表格

| 英文 | 译法 1 | 译法 2 |译法 3 |
|--------|:-------------:|------:|------:|
| col 1 is | left-aligned | $1600 |

- 折叠
```
<details>
<summary> 这里是不想被折叠的文字</summary>
这里是被折叠的文字。
看不同平台，不一定能正常换行、使用 MarkDown 语法。
</details>
```
- 锚点
```
<span id = "jump"></span>
[➥](#jump)
```
​
- 引用
>空格
>>空格​
- 文字
```
<font color=gray size=32 face="微软雅黑">color=gray</font>
<span style="background:yellow;">改变背景色文字</span>
```
**粗体**
*斜体*
~~删除线~~
​
---

- TodoList
- [x] yes 
- [ ] no
- diff
```diff
- 减号后是原来的字符。
+ 加号后是改后的字符。
```
- embed
```
<embed src="http://www.fhdq.net/" style="width:100%; height: 300px;">
```
- MPE
    - TOC
    - 忽略
    {ignore=true}​
    - 导入文件
    @import "你的文件"
    - 支持的文件类型：
        .jpeg(.jpg), .gif, .png, .apng, .svg, .bmp 文件将会直接被当作 markdown 图片被引用。
        .csv 文件将会被转换成 markdown 表格。
        .mermaid 将会被 mermaid 渲染。
        .dot 文件将会被 viz.js (graphviz) 渲染。
        .plantuml(.puml) 文件将会被 PlantUML 渲染。
        .html 将会直接被引入。
        .js 将会被引用为 <script src="你的 js 文件"></script>。
        .less 和 .css 将会被引用为 style。目前 less 只支持本地文件。.css 文件将会被引用为 <link rel="stylesheet" href="你的 css 文件">。
        .pdf 文件将会被 pdf2svg 转换为 svg 然后被引用。
        markdown 将会被分析处理然后被引用。
        其他所有的文件都将被视为代码块。
    - python
    ```python {cmd=true matplotlib=true}
    import matplotlib.pyplot as plt
    plt.plot([1,2,3, 4])
    plt.show() # show figure
    ```

[![IMAGE ALT TEXT HERE](https://huyaimg.msstatic.com/avatar/1091/0e/140cfd7cbaddc5db2c25a97e0aa83e_180_135.jpg?431171)](http://www.youtube.com/watch?v=YOUTUBE_VIDEO_ID_HERE)
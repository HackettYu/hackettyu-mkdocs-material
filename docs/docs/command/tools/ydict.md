# ydict

> 专为命令行极客打造的有道词典

[YDict 中文文档](https://github.com/TimothyYe/ydict/blob/master/README_CN.md)

![https://raw.githubusercontent.com/TimothyYe/ydict/master/snapshots/ydict.gif](https://raw.githubusercontent.com/TimothyYe/ydict/master/snapshots/ydict.gif)

**安装**

```bash
go get github.com/TimothyYe/ydict
```

**参数**

```bash
ydict [flags]

Flags:
  -c, --cache       Query with local cache, and save the query word(s) into the cache.
  -d, --delete      Remove word(s) from the cache.
  -h, --help        help for ydict
  -l, --list        List all the words from the local cache.
  -m, --more        Query with more example sentences.
  -p, --play int    Scan and display all the words in local cache.
  -q, --quiet       Query with quiet mode, don't show spinner.
  -r, --reset       Clear all the words from the local cache.
  -s, --sentence    Translation of sentences.
  -v, --voice int   Query with voice speech, the default voice play count is 0.
```

1. 仅查询单词

```text
ydict <要查询的单词或词组>
```

2. 查询并朗读单词 (__目前仅支持 MacOS 和 Linux__)

```text
ydict -v <要查询的单词或词组>
```
3. 查询并显示更多例句

```text
ydict -m <要查询的单词或词组>
```

4. 开启本地缓存查询单词，单词将被缓存在本地缓存中，再一次使用相同参数查询相同的单词，将获得更快的显示速度

```text
ydict -c <要查询的单词或词组>
```

5. 查询整个句子

```text
ydict -s "你觉得咋样？"
```

**SOCKS5 代理支持**

从版本 V0.5 开始, 支持SOCKS5代理功能. 在ydict的相同目录下，创建 ```.env``` 文件，并填入如下示例内容:

```text
SOCKS5=127.0.0.1:7070
```

配置成功后，所有的查询将使用配置指定的SOCKS5代理。

**单词本功能**

从新版 ydict V2.0 开始，支持单词本功能，方便增删和管理生词，并且可以通过定时消息推送进行随机回放，方便背诵和记忆。

* 增加新词到单词本
```bash
ydict -c hello
```

* 从单词本中删除单词
```bash
ydict -d hello
```

* 从单词本中列出所有单词
```bash
ydict -l
```

* 每隔10秒随机推送并展示单词
```bash
ydict -p 10
```
![](https://raw.githubusercontent.com/TimothyYe/ydict/master/snapshots/play.png)

**帮助与更多信息**

命令行中，输入 "ydict" 获取更多帮助。


# fd

> fd is a simple, fast and user-friendly alternative to find.

> github: https://github.com/sharkdp/fd

![https://github.com/sharkdp/fd/raw/master/doc/screencast.svg](https://github.com/sharkdp/fd/raw/master/doc/screencast.svg)

## Install in windows 

```bash
scoop install fd
```

## Quick start

```bash
# Convert all jpg files to png files:
fd -e jpg -x convert {} {.}.png

# Unpack all zip files (if no placeholder is given, the path is appended):
fd -e zip -x unzip

# Convert all flac files into opus files:
fd -e flac -x ffmpeg -i {} -c:a libopus {.}.opus

# Count the number of lines in Rust files (the command template can be terminated with ';'):
fd -x wc -l \; -e rs
```

## More

```bash
# 在某处 fd
fd {{word}} {{path}} 

# 没有参数 直接遍历当前目录
fd

# 搜索某种特定的文件格式
fd -e {{file type}}

# 忽略某个文件
fd -H {{filename}}

# 包含特定的目录
fd -E {{other path}}
```



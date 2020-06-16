# ossutil

> 阿里云 oss 命令行上传工具

> https://help.aliyun.com/document_detail/120057.html?spm=a2c4g.11186623.6.709.2ca034afIWSJTk#title-w9k-3tk-5w4


- 上传单个文件
```./ossutil cp a.txt oss://bucket/path/```

- 使用cp命令时增加-r选项可以将目标文件夹上传到OSS。
```./ossutil cp -r dir oss://bucket/path/```

- 上传所有文件格式为txt的文件
```./ossutil cp dir/ oss://my-bucket/path --include "*.txt" -r```

- 下载单个文件
```./ossutil cp oss://my-bucket/path/test1.txt /dir```

- 下载文件夹
```./ossutil cp -r oss://my-bucket/path /dir ```

- 下载所有文件名包含abc且不是jpg和txt格式的文件
```./ossutil cp oss://my-bucket1/path dir/ --include "*abc*" --exclude "*.jpg" --exclude "*.txt" -r```

- 仅下载当前目录下的文件，忽略子目录
```./ossutil cp oss://bucket1/path dir/ --only-current-dir -r```

## ossutil 性能调优

![性能调优](https://hy-picgo.oss-cn-shenzhen.aliyuncs.com/img/20200116175538.png)

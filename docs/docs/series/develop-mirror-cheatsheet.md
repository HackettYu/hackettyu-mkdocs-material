# develop mirror cheatsheet

## Package

### Maven

**临时**

在 `pom.xml` 下添加内容如下：

```xml
<repositories>
    <repository>
        <id>central</id>
        <name>aliyun maven</name>
        <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
        <layout>default</layout>
        <!-- 是否开启发布版构件下载 -->
        <releases>
            <enabled>true</enabled>
        </releases>
        <!-- 是否开启快照版构件下载 -->
        <snapshots>
            <enabled>false</enabled>
        </snapshots>
    </repository>
</repositories>
```

### NPM

```bash
npm i {{your-package}} --registry https://registry.npm.taobao.org
```

### Pip

```bash
pip install {{your-package}} -i https://pypi.doubanio.com/simple
```

### Golang

```bash
# your go version >= 1.13
go env -w GO111MODULE=on
go env -w GOPROXY=https://goproxy.io,direct

# 设置不走 proxy 的私有仓库，多个用逗号相隔（可选）
go env -w GOPRIVATE=*.corp.example.com

# 设置不走 proxy 的私有组织（可选）
go env -w GOPRIVATE=example.com/org_name
```

## Mirrors

> NPM: https://npm.taobao.org/mirrors

> Github clone: https://gitclone.com

## Reference

- [国内开发资源镜像一览](https://blog.dteam.top/mirrors.html)
- [开源软件国内镜像源对比](https://huaxiaostar.com/2020/07/open-source-china-mirror-list/)
- [一个全球代理
为 Go 模块而生](https://goproxy.io/zh/)

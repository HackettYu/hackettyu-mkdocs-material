---
title: 利用 Tomcat8/maven 部署 web 工程
description: 今天尝试用 Tomcat8 + maven 部署一下 web 工程, 然后我开始疯狂踩坑
---

> description: 今天尝试用 Tomcat8 + maven 部署一下 web 工程, 然后我开始疯狂踩坑

## 快速上手
---
网上一查如何用 Tomcat8 + maven 部署一般都是这样的教程


- 在 maven 工程下的 pom.xml 加入配置如下:

```xml
<!-- Tomcat plugin -->  
<plugin>  
    <groupId>org.apache.tomcat.maven</groupId>
    <!-- Tomcat8 一样可用-->
    <artifactId>tomcat7-maven-plugin</artifactId>  
    <version>2.2</version>  
    <configuration> 
        <!-- tomcat 管理员地址,有的教程是 `http://localhost:8080/manager/`, 我是用  下面这种-->
        <url>http://localhost:8080/manager/text</url>  
        <server>TomcatServer</server>
        <!-- *(From maven > settings.xml)* '${}' 号内的内容要与环境变量下 maven 路   下的 setting.xml 文件里配置的密码和用户名一致-->
        <username>${admin}</username>  
        <password>${password}</password>   
    </configuration>   
</plugin>  
``` 

- tomcat8 安装目录下 `conf/tomcat-users.xml` 加入配置如下(配置好环境变量):

```xml
<tomcat-users>
    <!-- 注意这是 users 不是 user 所以只要加入下面的内容即可, ps: 这是我最后踩的坑 -->
    <role rolename="manager-gui"/>  
    <role rolename="manager-script"/>
    <!-- 下面的 roles 与上面匹配 -->
    <!-- 匹配内容 -->
    <user username="${admin}" password="${password}" roles="manager-gui,manager-script" />  
</tomcat-users>
```

- maven 安装目录下 `conf/settings.xml` 加入配置如下(配置好环境变量):

```xml
<servers>  
    <server>
        <!-- 匹配内容 -->
       <id>TomcatServer</id>
       <username>${admin}</username>
       <password>${password}</password>
    </server>
</servers>  
```

- 运行 tomcat 8 (运行 Tomcat 7 就是用 7 部署)

> 这个一定要运行不然会报  `404`

- 部署命令

```bash
# 都是 tocmat7 不是 `tomcat8 or tomcat`
mvn tomcat7:deploy
# mvn tomcat7:redeploy
```

## 入门篇

---
- 测试环境:

```
Tomcat 8.0.5
JDK 1.8
Window 10 X64
Maven 3.6.0
```

## FAQ
---

- 报 404: 先开启服务器
- 报 403:

    无法进入 manager 页面

1. 打开 `http://localhost:8080/manager/html` 能否用配置好的账号登录
2. ${Tomcat8_HOME_PATH}/webapps 下有 manager 文件, 如果之前删过, 拷贝一份回来
3. 确认 username 和 password 正确

- 报 401:

```
[ERROR] Tomcat return http status error: 401, Reason Phrase: Unauthorized
[ERROR] Failed to execute goal org.apache.tomcat.maven:tomcat7-maven-plugin:2.2:deploy (default-cli) on project test-mybatis: Tomcat return http status error: 401, Reason Phrase: Unauthorized
```

> 就是账号没配置好, 回去确认


## 附录
---

- [Java 8的Tomcat Maven插件 - 代码日志](https://codeday.me/bug/20170927/78372.html)
- [Maven部署项目到Tomcat7出现403 Access Deny. - Josh_Persistence - ITeye博客](https://josh-persistence.iteye.com/blog/1900088)
- [使用tomcat7插件将项目一键部署到远程tomcat服务器-热部署 - 王西文](http://crocutax.com/blog/hot-deploy-java%20-project-to-remote-server-by-tomcat7-plugin)
- stackoverflow `tomcat8 maven 401 403 404`


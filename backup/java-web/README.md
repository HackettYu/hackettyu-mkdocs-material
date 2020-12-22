# Java Web

> Java Web 的学习笔记

## 基本概念

- 修改 Tomcat 端口号

`conf\server.xml`

```xml
<Connector port="8080" protocol="HTTP/1.1" connectionTimeout="20000" redirectPort="8443" URLEncoding="UTF-8"/>
```

- 部署的工程需要
    1. web-inf (隐私)
    2. meta-inf (信息)
    3. other (资源)

- Servlet 控制

- Servlet 的生命周期
    1. 创建
    2. 初始化
    3. 调用
    4. 销毁 (释放资源)

- Servlet `单例多线程`实现多人访问
- 请求的方式
    1. doGet:
        通过地址栏访问
        超链接
        form 的 get 提交
    优点: 快
    2. doPost
        form 的 post 提交
    优点: 安全 基本没有大小限制

- 通过 name 从前端获取值
    1. request.getParameter() 获取一个
    2. request.getParameterValues() 获取多个

- 配置 Servlet 的两种方式

```Java
// 注解
@WebServlet("/MyServlet")
```

```xml
<!-- web.xml -->
<servlet>
    <servlet-name>hello</servlet-name>
    <servlet-class>com.example.hello.MyServlet</servlet-class>
</servlet>
<servlet-mapping>
    <servlet-name>hello</servlet-name>
    <url-pattern>/MyServlet</url-pattern>
    <!-- 启动时加载 -->
    <!-- 当 load-on-startup 的值为非负数时 Servlet 马上实例化 -->
    <load-on-startup>0</load-on-startup>
</servlet-mapping>
```

- 数据库表为什么需要设计外键
    因为当一个外键的键在一张表中被多次使用时,只要修改外键的值就可以了
    减少了表对其依赖

- 数据库的三范式
    1. 列不可再分
    2. 减少数据冗余
    3. 表中除了主键字段外都依赖主键

- 提交表单前要做的工作
    1. 前端校验
    2. 后端校验

- JNDI java 命名和接口目录

- 服务器端的 DBUtil

    在 META-IFNF 下, Context 要部署在服务器上

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Context>
    <Resource name="jdbc/{MyProject}"
    auth="Container"
    type="javax.sql.DataSource"
    username="scott"
    password="tiger"
    url="jdbc:oracle:thin:@localhost:1521:ORCL"
    driverClassName="oracle.jdbc.driver.OracleDriver"
    maxIdle="2"
    maxWait="5000"
    maxActive="4" />
</Context>
```

```java
try {
    Context context= new InitialContext();
    DataSource ds =p (DataSource) context.lookup("java:comp/env/dbc/{MyProject}");
    conn = ds.getConnection();
} catch(Exception e) {
    e.prinStackTrace();
}
return conn;
```

- 开启事务原则
    1.事务在 Service 层开启
    2. 事务指向一个 connection
    3. 设置手动提交 事务提交 事务回滚

- 单例模式不要写公共成员变量

- JSP 页面的元素
    jsp 文件会生成一个 Servlet.java 文件

```jsp
    <%! a = 10 %>  全局
    <% a = 100 %>  局部
    <%=a%>
```
- 导包

```jsp
<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8" import="com.neuedu.my12306.entity.User"%>
```

- jsp 的生命周期
    1. 翻译为 Java 类
    2. 编译为 class
    3. 构造方法
    4. 初始化方法
    5. Service
    6. destory

- Session 共享的条件
    同一浏览器同一访问
    并且在 Session 的存活时间内

- 页面跳转

方法一

```java
request.getRequestDispatcher("{*.jsp}").forward(request, response); // 派发 url 不改变 可以跳转到 WEB-INF 目录的页面
```

方法二

```java
response.sendRedirect();    // 重定向, 更新操作的跳转在 Servlet 必须用这种 url 改变
```

- scope

    request

    Session

```java
HttpSession session = request.getSession();
session.getAttributte();
session.setAttribute();
```

    Application

```java
ServletContext app = request.getServletContext();
```

- 页面传参数的方式
    1. url 键值对传参
    2. session
    3. request

- EL 表达式
    1. ${sessionScope.user.username}
    2. 空值不显示

- el表达式取值的时候是按 pageContext，request，session，application 这个顺序取值的，只要有一个有就会显示

- 销毁 session

```java
session.invalidate();
```

- 页面跳转最好发送请求道 Servlet 对传递的数据进行过滤或添加

## 其他概念

- 热部署是什么？
`对于Java应用程序来说，热部署就是在运行时更新Java类文件`
- MIME 文件格式类型

性别是 char 类型，大家赋值的时候用：
stmt.setInt(1,user.getSex());

如果是字段disabled，则在提交表单时不会将字段的值发送到服务器。如果一个字段 readonly，该值被发送到服务器。

Tomcat 下路径 `/myproject/` `myproject`
第一个会到一个工程目录下

JSTL 标签库的使用

1. 导入 jstl.jar 包
2. JSP 前加入标签

```jsp
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
```

[关于 java 你可能不知道的十件事](https://github.com/oldratlee/translations/blob/master/10-things-you-didnt-know-about-java/README.md)

- oracle uid 是关键字
- 删除所有断点在 Run 下
step into：单步执行，遇到子函数就进入并且继续单步执行（简而言之，进入子函数）；

step over：在单步执行时，在函数内遇到子函数时不会进入子函数内单步执行，而是将子函数整个执行完再停止，也就是把子函数整个作为一步。有一点,经过我们简单的调试,在不存在子函数的情况下是和step into效果一样的（简而言之，越过子函数，但子函数会执行）。

step out：当单步执行到子函数内时，用step out就可以执行完子函数余下部分，并返回到上一层函数。

### [JSP 九个内置对象](http://www.cnblogs.com/xdp-gacl/p/3779872.html)

| 内置对象 | 类型 |
| --- | --- |
| pageContext | javax.servlet.jsp.PageContext |
| request | javax.servlet.http.HttpServletRequest |
| response | javax.servlet.http.HttpServletResponse |
| session | javax.servlet.http.HttpSession |
| application	| javax.servlet.ServletContext |
| config | javax.servlet.ServletConfig |
| out | javax.servlet.jsp.JspWriter |
| page | java.lang.Object |
| exception | java.lang.Throwable |

- page对象

> page对象表示当前一个JSP页面，可以理解为一个对象本身，即：把一个JSP当作一个对象来看待。page对象在开发中几乎不用，了解一下即可

- out对象

> out对象用于向客户端发送文本数据。 

> out对象是通过调用pageContext对象的getOut方法返回的，其作用和用法与ServletResponse.getWriter方法返回的PrintWriter对象非常相似。 

> JSP页面中的out对象的类型为JspWriter，JspWriter相当于一种带缓存功能的PrintWriter，设置JSP页面的page指令的buffer属性可以调整它的缓存大小，甚至关闭它的缓存。 
　　
> 只有向out对象中写入了内容，且满足如下任何一个条件时，out对象才去调用ServletResponse.getWriter方法，并通过该方法返回的PrintWriter对象将out对象的缓冲区中的内容真正写入到Servlet引擎提供的缓冲区中：

1. 设置page指令的buffer属性关闭了out对象的缓存功能
1. out对象的缓冲区已满
1. 整个JSP页面结束

- pageContext对象

> pageContext对象是JSP技术中最重要的一个对象，它代表JSP页面的运行环境，这个对象不仅封装了对其它8大隐式对象的引用，它自身还是一个域对象(容器)，可以用来保存数据。并且，这个对象还封装了web开发中经常涉及到的一些常用操作，例如引入和跳转其它资源、检索其它域对象中的属性等。

1. getException方法返回exception隐式对象
1. getPage方法返回page隐式对象
1. getRequest方法返回request隐式对象
1. getResponse方法返回response隐式对象
1. getServletConfig方法返回config隐式对象
1. getServletContext方法返回application隐式对象
1. getSession方法返回session隐式对象
1. getOut方法返回out隐式对象

> pageContext封装其它8大内置对象的意义
>> 如果在编程过程中，把pageContext对象传递给一个普通java对象，那么这个java对象将可以获取8大隐式对象，此时这个java对象就可以和浏览器交互了，此时这个java对象就成为了一个动态web资源了，这就是pageContext封装其它8大内置对象的意义，把pageContext传递给谁，谁就能成为一个动态web资源，那么什么情况下需要把pageContext传递给另外一个java类呢，什么情况下需要使用这种技术呢，在比较正规的开发中，jsp页面是不允许出现java代码的，如果jsp页面出现了java代码，那么就应该想办法把java代码移除掉，我们可以开发一个自定义标签来移除jsp页面上的java代码，首先围绕自定义标签写一个java类，jsp引擎在执行自定义标签的时候就会调用围绕自定义标签写的那个java类，在调用java类的时候就会把pageContext对象传递给这个java类，由于pageContext对象封装了对其它8大隐式对象的引用，因此在这个java类中就可以使用jsp页面中的8大隐式对象(request，response，config，application，exception，Session，page，out)了，pageContext对象在jsp自定义标签开发中特别重要。





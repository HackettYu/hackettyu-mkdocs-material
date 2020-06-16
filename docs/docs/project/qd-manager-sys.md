# 邱狄财务管理系统

> 2019-03-27 java web 项目

## 技巧

- 在 java 文件中可以 `// TODO` 标注未完成的事情 当然也要删除默认的 TODO
- 在文档注释中写上注解

- 空指针

```java
if(list != null && list.size() > 0) {
    // do something
} else {
    System.out.println(getClass() + "空指针");
}
```

```java
@ author hackett
@ version 0.0.1
@ date ${date} 修改 | 更新 | 新建
```

- svn 提交的信息

    fix: 修复
    add: 添加
    mod: 修改

## 页面

- 特殊 id userId
- name 驼峰 (certType)
- id 驼峰 (certType)
- action Servlet 名 (UserServlet)
- EL (user.certType.certId)

## java 类

- 注解 UserServlet
- session 驼峰 sessUser
- request reqUser

## sql

- 字段 (user_type)

## jsp

- 小写 下划线 `query-user.jsp`

## 五天计划

### day-1

- version 0.0.1

> 项目初始版本

## 实现的功能

## 分工

### hackett 43

- [X] 创建数据表 连接我的数据库
- [X] 数据导出功能
- [X] 局部刷新分页内容
- [X] 代码审核
- [X] 代码备份
- [X] 改 localhost
- [ ] 统计板块 charts
- [X] 和 di 讲 diff
- [ ] selenium
- [ ] 搜索框
- [ ] 邮箱通知
- [X] 优化一下样式 开源 dashboard diff details 纯 css 分栏
- [X] nginx 修改 host 反向代理 `https://blog.csdn.net/mn960mn/article/details/42360901` qd.com
- [X] 前端格式转换库 后端时间格式转换 util `https://github.com/iamkun/dayjs/blob/dev/docs/zh-cn/README.zh-CN.md` `https://juejin.im/entry/5ae29dd7f265da0b767d314f`
- [ ] 自动插入脚本
- [x] 明天改 数据库 配置 组员的 svn 资源定位
- [x] 代码行统计 cloc svn
- [X] `https://hackett:8443/!/#qd-manager-sys-repo` test test
- [X] 实现第三方登录

### lisi 42

- [X] 分析需求功能 分别在哪个页面上进行(用于写 Controller)
- [X] 按页面创建好 Servlet 并实现跳转
- [X] 按照实体类的成员给页面上的 name id(如果要用), 驼峰
- [X] XX 模块流程图
- [X] XX 页面的所有传数据的入口
- [X] 分页
- [ ] controller
- [X] list != null && list.size() > 0
- [ ] 批量删除

### tom 38

- [X] 路径修改 把外面的 js 放进 Script
- [X] 连接数据库外网代码
- [X] 序列的脚本
- [X] 插入数据的脚本
- [X] 登录模块
- [X] MD5
- [X] 验证码
- [X] 导出数据库 数据库备份
- [X] 404 页面配置 HTTP CAT `https://http.cat/`
- [X] 自动创表脚本 写出伪代码
- [X] 前端非空校验
- [X] 导出数据库 sql 每日 `database_190327.sql`
- [X] 修改页面上的 `深圳 邱狄`
- [X] error 配上 bootstrap 信息 console

### prosperity 37

- [X] 确认表的没有设计缺陷, 没有没别要的字段
- [X] 实体类 写上注释  @author
- [X] dao service 骨架
- [X] service dao 的设计方法 service 上写 @see 哪一个表方法多
- [X] dao

## template

- 日期转换格式(单据表中的提交日期)

```java
// 如何将数据库的 TimeStamp 在 java 为 TimeState

Bills 中的
TimeStamp ts = rs.getTimeStamp("ts"); // 从数据库中获取时间戳时间

billsSubDate 在数据库中是 Date 在实体类中是 TimeStamp

```java
// ts 转 sql.Date
stmt.setDate(1, new java.sql.Date(bills.getSubDate().getTime()));

// sql.date 转 ts

TimeStamp ts = new TimeStamp(rs.getDate("billSubDate").getTime())
bills.setBillsSubDate(ts);

stmt.setTimestamp(1, new Timestamp(new Date().getTime()));
rs.getTimestamp("ts")
```

- 输出 sql

``` java

ResultSet rs = statement.executeQuery();
if (statement instanceof com.mysql.jdbc.PreparedStatement) {
    com.mysql.jdbc.PreparedStatement msqlPstmt (com.mysql.jdbc.PreparedStatement)statement;
    String sqla = msqlPstmt.toString();
    System.out.println(sqla);
}
```

- 文件上传(Servlet 3.0 原生)

post 提交

```js
var form = document.getElementById("uploadForm");
form.action = "UploadServlet";
form.encoding="mutipart/form-data";
form.submit();
```

```java
// 一定要加上
@MultipartConfig
```

```java
// Servlet
// 储存路径
String savaPath = request.geServletContext().getRealPath("/WEB-INF/uploadFile");
// 确认路径
File file = new File(savaPath);
if(!file.exists()) {
    file.mkdir();
    // file.mkdirs();
}
```

- forecah 标签

```txt
var用于指定将当前迭代到的元素保存到page域中的属性名称；
items指定将要迭代的集合对象；
varStatus表示当前被迭代到的对象的状态信息，包括四个属性：index（表
示当前迭代成员的索引值）、count（表示当前已迭代成员的数量）、first
（表示当前迭代到的成员是否为第一个）、last（表示当前迭代到的成员是
否为最后一个）；
begin表示遍历的起始索引，值为整数；
end表示遍历的结束索引，值为整数；
step表示迭代的步长，值为整数。
```

## 其他

### 账号相关

```txt
hackett
prosperity
lisi
tom
0327
url:  https://10.25.161.43:8443/svn/qd-manager-sys-repo
```

### 记录

```md

# 邱狄财务管理系统

## 小组分工
- 俞佰霖 组长
- 吴狄 负责前端页面 账单模块
- 邱富强 负责类图, 数据库设计, 人事模块
- 吴良庭  负责 登录模块 登录页面修改 所有页面的路径规范 ,JSP 页面搭建, 前端文件命名

## 计划

- 0327
设计好系统
搭建完成类图
流程图
svn 搭建
实体类设计
数据库表的创建
搭建工程模板
搭建数据(连接 修改密码)
- 0328
编写页面入口
开始写各个模块
- 0329
完成登录模块
完成账单模块的部分功能
完成认识模块的部分功能
测试模块 优化前端样式
```

```word
曼尼管理系统总结
一、已完成（回顾过去）
1、 初步完成了前端界面整体布局和后台MVC结构的搭建，包括Servlet，Dao层和Service层工厂模式，以及各种工具类的封装。
1、 完成了需求分析，并根据需求分析创建好表，共12张表；
2、 完成了前端界面统一布局，优化用户体验；
3、 完成了后台MVC架构的搭建，构建好Servlet层，实现前端与后台的数据流通；
4、 设计并完成了Dao层和Service层的工厂模式；
5、 对各种工具类进行了封装，如DBUtil（数据库连接）、BeanLoadUtil（部分实体类查询数据自动装在）、PageUtil（数据分页输出）、ParameterUtil（参数类型转换）、ReflectUtil（反射工具类）；
6、 实现了整体页面的跳转和数据的传输；
7、 规定了统一的代码格式以及注释要求；
二 待完成（展望未来）
1、 完成各个页面的数据查询功能；
2、 完成管理员界面相关数据操作功能；
3、 完成普通用户界面的相关数据操作功能；
4、 根据前三点逐一实现Dao层数据相关sql语句；
5、 进行系统测试，并根据测试结果不断完善；
6、 继续优化用户体验；
```

## 八哥

- 关于空对象和空

```java
// 比如说在一个 Dao 里面
// 情况 1 (不友好)
public User queryUser() {
    // 空对象
    User user = new User();
    try {
        conn = DBUtil.getConnection();
        stmt = conn.prepareStatement(QUERY_BILLS_BASE);
        rs = stmt.executeQuery();
        // while if 都可以
        if (rs.next()) {
            // 这里创建和不创建都一样
            // user = new User();
            user = user.setName("foobar");
    } catch (SQLException e) {
    e.printStackTrace();
    } finally {
    DBUtil.release(conn, stmt, rs);
    }

return user;
}

// 在 Servlet 里
public test() {
    // 省略了 Service
    User user = userServie.queryUser();

    // 判断非空
    if(user != null) {
        // 如果数据库查出数据输出 name
        if(user.getName() != null) {
            // 输出 name
            System.out.print(user.getName())
        }
    } else {
        // 永远不会执行
    }
}

// 情况 2 (友好)
public User queryUser() {
    // 空
    User user = null;
    try {
        conn = DBUtil.getConnection();
        stmt = conn.prepareStatement(QUERY_BILLS_BASE);
        rs = stmt.executeQuery();
        // while if 都可以
        if (rs.next()) {
            user = new User();
            user = user.setName("foobar");
    } catch (SQLException e) {
    e.printStackTrace();
    } finally {
    DBUtil.release(conn, stmt, rs);
    }

return user;
}

// 在 Servlet 里
public test() {
    // 千万不要写 User user = new User();
    // 省略了 Service
    User user = userServie.queryUser();

    // 判断非空
    if(user != null) {
        // 如果数据库查出数据输出 name
        System.out.print(user.getName())
    } else {
        // 当查不出时执行
    }
}

// 情况 3 (友好)
public List<User> queryUser() {
    // 新建
    List<User> list = new ArrayList<>();
    try {
        conn = DBUtil.getConnection();
        stmt = conn.prepareStatement(QUERY_BILLS_BASE);
        rs = stmt.executeQuery();
        // 一定是 while
        while (rs.next()) {
            User user = new User();
            user = user.setName("foobar");
            // 添加
            list.add(user);
    } catch (SQLException e) {
    e.printStackTrace();
    } finally {
    DBUtil.release(conn, stmt, rs);
    }

return list;
}

// 在 Servlet 里
public test() {
    // 省略了 Service
    // 这里写不写都一样
    // List<User> list = new ArrayList<>();
    List<User> list = userServie.queryUser();

    // 判断非空
    // 也可以 if(list != null && list.size() > 0)
    // 不可以是 if(list != null)
    if(list.size() > 0) {
        // 如果数据库查出数据输出 name
        System.out.print(user.getName());
    } else {
        // do something
    }
}

// 情况 4 (待商议)
public List<User> queryUser() {
    // 新建
    List<User> list = new ArrayList<>();
    try {
        conn = DBUtil.getConnection();
        stmt = conn.prepareStatement(QUERY_BILLS_BASE);
        rs = stmt.executeQuery();
        // 一定是 while
        while (rs.next()) {
            User user = new User();
            user = user.setName("foobar");
            // 添加
            list.add(user);
    } catch (SQLException e) {
        // 做了个修改
        list = null;
        e.printStackTrace();
    } finally {
    DBUtil.release(conn, stmt, rs);
    }

return list;
}

// 在 Servlet 里
public test() {
    // 省略了 Service

    // 可以写 List<User> list = new ArrayList<>();
    // null 或者 一定装有一个 user
    List<User> list = userServie.queryUser();

    // 判断
    // 不可以是 `if(list.size() > 0 && list != null)`
    if(list != null && list.size() > 0) {
        // 如果数据库查出数据输出 name
        System.out.print(user.getName());
    } else {
        // do something
    }
}
```

```java
// 关于 String
	public static void func2() {
		// 定义
		String 某人 = "SB"; // 带引号创建的字符串 : 这个 "SB" 不单单是指值是
							// "SB",还有唯一的指纹信息(哈希值),当他出生时(创建时),如果指纹库(hashmap)里没有,录入信息(插入新的哈希值)
		String SB = "某人";

		// 某人是什么
		System.out.println(某人.toString()); // 是 SB
		System.out.println("某人".toString()); // 是某人
		// 某人是名字(引用), "某人"是指<我是谁>(值)

		// 某人是 SB 吗
		System.out.println(某人 == "SB"); // true
		System.out.println(SB == "某人"); // true
		// <==>(做为比较符) : 如果在定义是用<"字符串">(带引号,不是 new 一个对象)的话, 比较<我是谁>值

		// 某人是某人吗
		System.out.println(SB == "SB"); // false
		System.out.println(某人 == "某人"); // false
		// 当名字(引用)作为比较的时候,先用名字去找到<我是谁>(值)再做比较

		// equal()
		某人 = new String("SB"); // 新建字符串对象 : 一个叫某人的 "SB",是一个没录入身份信息系统的 "SB"(不在常量池),在其他星球居住(堆区)
		SB = new String("某人"); // 一个叫 SB 的 "某人"
		System.out.println(某人.equals(SB)); // flase
		System.out.println(某人 == "SB"); // false 比较你是否是唯一的我
		System.out.println(某人.equals("SB")); // true 不管你在哪(只比较值)
		// System.out.println(某人 == 某人); // 我就是我
		System.out.println(某人.equals(某人)); // 我的值等于我的值

		某人 = new String("某人");
		SB = new String("某人");

		System.out.println(某人 == SB);// 还是不同地方的某人
		System.out.println(某人.equals(SB));// 值都是 "某人"

        // 如果你会某人就是你
	}
```

> 总结: 看 查出 返回 null 还是 空对象
空指针 其实 是 执行了一个错误语句

```java
// 这种情况会编译错误 `The operator == is undefined for the argument type(s) null, int`
// System.out.print(null == 1);
// 实际情况是
// System.out.print(null == user.getName());

// 通用解决

// 非 List
// 不建议 实体类对象 要写这种代码 尽量让代码健壮
if(user != null) {
    if(user.getName() != null) {
        // do something
    } else {
        System.out.print(getClass() + "空指针异常");
    }
}

// List
if(list != null && list.size() > 0) {
    // do something
} else {
    System.out.print(getClass() + "空指针异常");
}
```

> 最后看你写的方法需求是查不到返回空对象和空

## 思考

- 为什么 Gson 而不是 FastJson

1. 项目小
2. Gson 更准确

- 修改 toString() 为 Json 问题

1. 方便组员理解 不懂 json 也可以用
2. 应该在用的时候 序列化

- 为什么一个组员写一层

1. 多层一起写无法深入
2. 充分利用工厂模式解耦合

- 为什么工程模式

1. 团队: 利于分工 调用一个实现了该功能的接口引用
2. 个人开发: 少修改代码(`或者在更少的代码中找要修改的代码`), 只要修改 低层 的方法名 要修改 相应工厂中的调用, 但修改 低层中方法里的实现就不需要修改其他代码, 例如:
给手机充电
电 => Dao
充电器(充电头 + 数据线) => factory
手机 => service

不同的手机只要需改 在充电器中选择相应的适配就可以 不需要修改 手机的 充电口
不同的 电压输入 (220V 110V) 由充电器适配

## 经验

- varchar2(64) 其实可以超过
- ```<`%=request.getContentPath()> 返回的路径有 "/"```

```text
${map[key1]}   ---- 直接取map中key=key1 的value;  例：  map .put("a","b"), {map["a"]}  就可以

注意：如果key1 是数值，例如; 1

后台 map.put(1, value1) , 前台 ${map[1]}将取不到值。原因：el表达式中数字1是Long类型，无法匹配后台map中的int。 修改 map.put(0L, value);  前台 ：${map[1]}.
```

- TimeStamp 转 Date 精度会丢失 sql 和 java 都应该写 TimeStamp 1950 YYYY-mm-DD hh:mi:ss.ff ff:999999999为最大值，共计9位

![oracle_timestamp](https://i.loli.net/2019/03/31/5ca0da9cf1ef6.png)

- Stringbuffer 全局会一直 append Stringbuffer 是可变的 即使 final 只是对象不可变

- java.lang package wrapper classes are immutable:
Boolean, Byte, Character, Double, Float, Integer, Long, Short, String.

- 不过我们又发现，Web页面上调用js文件时则不受是否跨域的影响（不仅如此，我们还发现凡是拥有"src"这个属性的标签都拥有跨域的能力，比如 `<script>、<img>、<iframe>`

- 不同 tomcat 不要提交 classpath
- svn 资源可以切换
- 写一个 主键 自增长后 在弄一个 限定好范围先的 业务 num 方便开发

## funny

- 听了老师的话后 把数据库卸载了
- 吴 良 佰 强

## 教程

### day.js

> [https://juejin.im/entry/5ae29dd7f265da0b767d314f](https://juejin.im/entry/5ae29dd7f265da0b767d314f)

- 依赖

```html
<script src="https://unpkg.com/dayjs"></script>
```

- 直接运行 dayjs()，得到包含当前时间和日期的 Dayjs 对象

- 时间字符串
可以解析传入的一个标准的ISO 8601时间字符串。

```js
// dayjs(String);
dayjs("1995-12-25");
```

- Unix 时间戳 (毫秒)
可以解析传入的一个 Unix 时间戳 (13位数字)。

```js
// dayjs(Number);
dayjs(1318781876406);
```

- Date 对象
可以解析传入的一个 Javascript Date 对象。

```js
// dayjs(Date);
dayjs(new Date(2018, 8, 18));
```

- 复制
Dayjs 对象是不可变的，如果你想获得一个对象的拷贝，请执行 .clone()。 向 dayjs() 里传入一个 Dayjs 对象也能实现同样的效果。

```js
// dayjs(Dayjs);
dayjs().clone();
```

- 验证
return Boolean
检测当前 Dayjs 对象是否是一个有效的时间。

```js
dayjs().isValid();
```

- 获取+设置
获取和改变日期。

```js
年
return Number
获取年份。

dayjs().year();
月
return Number
获取月份。

dayjs().month();
日
return Number
获取日期。

dayjs().date();
时
return Number
获取小时。

dayjs().hour();
分
return Number
获取分钟。

dayjs().minute();
秒
return Number
获取秒。

dayjs().second();
毫秒
return Number
获取毫秒。

dayjs().millisecond();
```

- 设置
设置时间 传入的单位 (unit) 对大小写不敏感。

```js
dayjs().set(unit : String, value : Int);
dayjs().set('month', 3);  // April
dayjs().set('second', 30);
```

- 增加
增加时间并返回一个新的 Dayjs() 对象。

```js
dayjs().add(value : Number, unit : String);
dayjs().add(7, 'day');
```

- 减少
减少时间并返回一个新的 Dayjs() 对象，使用方法和 dayjs#add 相同。

```js
dayjs().subtract(value : Number, unit : String);
dayjs().subtract(7, 'year');
```

- 格式化
return String
接收一系列的时间日期字符串并替换成相应的值。

```js
dayjs().format(String);
dayjs().format();                       // "2014-09-08T08:02:17-05:00" (ISO 8601, no fractional seconds)
dayjs().format("[YYYY] MM-DDTHH:mm:ssZ"); // "[2014] 09-08T08:02:17-05:00"
```

- 时间差
return Number
获取两个 Dayjs 对象的时间差，默认毫秒。

```js
dayjs().diff(Dayjs, unit);
dayjs().diff(dayjs(), 'years'); // 0
```

- Date 对象
return Javascript Date object
返回原生的 Date 对象。

```js
dayjs().toDate();
```

- JSON
return JSON String
当序列化 Dayjs 对象时，会返回 ISO8601 格式的字符串。

```js
dayjs().toJSON(); //"2018-08-08T00:00:00.000Z"
```

- 是否相同(isAfter(Dayjs); isBefore(Dayjs))
return Boolean
检查一个 Dayjs 对象是否和另一个 Dayjs 对象时间相同。

```js
dayjs().isSame(Dayjs);
dayjs().isSame(dayjs()); // true
```

- wechat oauth

```url
https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0424529d0a924965&redirect_uri=http://10.25.161.43:8080/qd-manager-sys/users-index-jsp&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect
```

- chrome wechat UA:

```api
Mozilla/5.0 (Linux; Android 4.4.4; HM NOTE 1LTEW Build/KTU84P) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chr
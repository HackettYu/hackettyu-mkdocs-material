# mybatis

> [mybatis 官方中文文档](http://www.mybatis.org/mybatis-3/zh/index.html)
>> MyBatis 是一款优秀的持久层框架，它支持定制化 SQL、存储过程以及高级映射。MyBatis 避免了几乎所有的 JDBC 代码和手动设置参数以及获取结果集。MyBatis 可以使用简单的 XML 或注解来配置和映射原生类型、接口和 Java 的 POJO（Plain Old Java Objects，普通老式 Java 对象）为数据库中的记录。

## SqlSessionFactoryBuilder
这个类可以被实例化、使用和丢弃，一旦创建了 SqlSessionFactory，就不再需要它了。 因此 SqlSessionFactoryBuilder 实例的最佳作用域是方法作用域（也就是局部方法变量）。 你可以重用 SqlSessionFactoryBuilder 来创建多个 SqlSessionFactory 实例，但是最好还是不要让其一直存在，以保证所有的 XML 解析资源可以被释放给更重要的事情。

## SqlSessionFactory
SqlSessionFactory 一旦被创建就应该在应用的运行期间一直存在，没有任何理由丢弃它或重新创建另一个实例。 使用 SqlSessionFactory 的最佳实践是在应用运行期间不要重复创建多次，多次重建 SqlSessionFactory 被视为一种代码“坏味道（bad smell）”。因此 SqlSessionFactory 的最佳作用域是应用作用域。 有很多方法可以做到，最简单的就是使用单例模式或者静态单例模式。

## SqlSession
每个线程都应该有它自己的 SqlSession 实例。SqlSession 的实例不是线程安全的，因此是不能被共享的，所以它的最佳的作用域是请求或方法作用域。 绝对不能将 SqlSession 实例的引用放在一个类的静态域，甚至一个类的实例变量也不行。 也绝不能将 SqlSession 实例的引用放在任何类型的托管作用域中，比如 Servlet 框架中的 HttpSession。 如果你现在正在使用一种 Web 框架，要考虑 SqlSession 放在一个和 HTTP 请求对象相似的作用域中。 换句话说，每次收到的 HTTP 请求，就可以打开一个 SqlSession，返回一个响应，就关闭它。 这个关闭操作是很重要的，你应该把这个关闭操作放到 finally 块中以确保每次都能执行关闭。

## 别名
每一个在包中的 Java Bean，在没有注解的情况下，会使用 Bean 的首字母小写的非限定类名来作为它的别名。 比如 `domain.blog.Author` 的别名为 author；若有注解，则别名为其注解值, 比如 `@Alias("author")`

## 映射

- association: 关联 一对一
- collection: 集合 一对多

## 缓存

一级缓存:

- session 级别
- 默认开启
- 直到 session flush 或者 close
- cache (HashMap)



二级缓存:

- mapper 级别
- 分别在 mybatis-config.xml 和 mapper.xml 配置
- mybatis-conifig.xml: `<settings name="cahceEnabled" value="true" />`
- mapper.xml 

```xml
<mapper>
<cache></cache>
<mapper>
```

- 实体类实现序列化接口

## mybatis 工作原理

session 的四个对象:

1. Executor 执行器工作

--- 二级 cachingExecuotor 对象

--- 一级 cache 对象

2. 调用 parameterHandel 给 sql 注入参数
3. 调用 statementHandel 执行 sql 语句
4. 调用 resultsetHandle 执行结果集中的数据到返回的对象映射

### selectKey

> 返回主键 ID

```xml
<insert id="insertUser" parameter="User">
    <selectKey keyProperty="id" resultType="Integer">
        select seq_user.currval from dual
    </selectKey>
    insert into t_user(id, username, birthday, address) values(sql_user.nextval, #{username, #{birthday}, #{address})
</insert>
```


## 其它

### BigDecimal

- 商业计算使用 BigDecimal
- 尽量使用参数类型为String的构造函数
- BigDecimal都是不可变的（immutable）的，在进行每一步运算时，都会产生一个新的对象，所以在做加减乘除运算时千万要保存操作后的值
- 我们往往容易忽略JDK底层的一些实现细节，导致出现错误，需要多加注意


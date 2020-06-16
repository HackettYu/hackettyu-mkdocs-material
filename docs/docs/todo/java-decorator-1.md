# java 装饰器模式

> 我们构造这样一个情景：某个应用的数据访问层上，实现持久化的技术有很多种mybaits，jdbc等等。如此我们设计一个接口：


```java
public interface GenerateInterface<T> {
    //创建一条记录
    public void save(T data);
    //更新一条记录
    public void update(T data);
}
// 不同的ORM技术，我们分别设计两个类：

public class MybatisORM<T> implements GenerateInterface<T> {
    @Override
    public void save(T data) {
        //mybatis save
        System.out.println("mybaits save");
    }
    @Override
    public void update(T data) {
        //mybatis update
        System.out.println("mybatis update");
    }
}
public class JdbcORM<T> implements GenerateInterface<T> {
    @Override
    public void save(T data) {
        //insert data into table with jdbc
        System.out.println("jdbc save");
    }
    @Override
    public void update(T data) {
        //update data to table with jdbc
        System.out.println("jdbc update");
    }
}
//现在新增一个需求，是我们在持久化数据的时候， save or update时同时更新日志，这时候为了不更改原有代码， 也不使用继承，我们采用装饰器模式，定义一个装饰者。

public class LogDecoratorORM <T> implements GenerateInterface<T>{
    private GenerateInterface<T> generator;
    public LogDecoratorORM(GenerateInterface<T> generator) {
        this.generator = generator;
    }
    private void logSave(T data) {
        //to insert log table
        System.out.println("log save");
    }
    private void logUpdate(T data) {
        //to update log table
        System.out.println("log update");
    }
    @Override
    public void save(T data) {
        logSave(data);
        generator.save(data);
    }
    @Override
    public void update(T data) {
        logUpdate(data);
        generator.save(data);
    }
}
//如此就可以实现需求的变动。
```
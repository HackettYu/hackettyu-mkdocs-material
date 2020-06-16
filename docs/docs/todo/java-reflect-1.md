# java 反射

- getName():String：获得该类型的全称名称。
- getSuperClass():Class：获得该类型的直接父类，如果该类型没有直接父类，那么返回null。
- getInterfaces():Class[]：获得该类型实现的所有接口。
- isArray():boolean：判断该类型是否是数组。
- isEnum():boolean：判断该类型是否是枚举类型。
- isInterface():boolean：判断该类型是否是接口。
- isPrimitive():boolean：判断该类型是否是基本类型，即是否是int，boolean，double等等。
- isAssignableFrom(Classcls):boolean：判断这个类型是否是类型cls的父（祖先）类或父（祖先）接口。
- getComponentType():Class：如果该类型是一个数组，那么返回该数组的组件类型。

getClass()是一个对象实例的方法，只有对象实例才有这个方法，具体的类是没有的。类的Class类实例是通过.class获得的，显然，类没有.getClass()方法。
从网上还找到一些其他资料：
1、出现的时期不同：Class.forName()在运行时加载；Class.class和getClass()是在编译时加载.

new ClassName()，就是所谓的静态加载，
Class.forName("ClassName")，就是所谓的动态加载。
区别在于“静态加载”的类在编译的时候就要提供，而动态加载的类在源程序编译时可以缺席，在运行时按需提供

`https://blog.csdn.net/sunzhicehng/article/details/70821045`
使用反射Class.forName(“com.cn.mybatisDemo.util.Student”).newInstance()或Student.class.newInstance(); 
java 创建对象的五种方式

```java
<V> V get(Object obj){
        return (V)obj;
}
```
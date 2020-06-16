# base

## 泛型

- <? super T>：是指 “下界通配符（Lower Bounds Wildcards）”
- ？ 表示不确定的java类型
- T (type) 表示具体的一个java类型
- K V (key value) 分别代表java键值中的Key Value
- E (element) 代表Element
- <? extends T>是指上界通配符(Upper Bounds Wildcards)

## 抽象类

> 一个实现接口的类，必须实现接口内所描述的所有方法，否则就必须声明为抽象类
接口中所有的方法必须是抽象方法。
接口支持多继承
一个类只能继承一个抽象类，而一个类却可以实现多个接口
接口速度比抽象类慢

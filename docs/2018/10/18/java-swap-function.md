---
title: 一个 java swap 函数关于值传递与引用
description: 关于值传递与引用，我还是通过这个实践才真正理解
---

> description: 关于值传递与引用，我还是通过这个实践才真正理解

## 简介
在写算法的时候，书本里使用的 c 语言里的 swap 函数，头一热就在 java 里写了一个。
```java
public void swap(int a, int b) {
      int temp = a;
      a = b;
      b = temp;
}
```
美滋滋运行自己的排序算法，居然原样输出，后来发现 java 里没有引用这个概念，自己写的函数不能真正的交换。

## 快速入门
这样写：
```java 
public static int swap(int itself, int dummy)
{
    return itself;
}

public static void main(String[] args)
{
    int a = 10;
    int b = 20;

    a = swap(b, b = a);
}
```
还可以这样：
```java
class MyInteger {
   private int x;                   // single data member
   public MyInteger(int xIn) { x = xIn; } // constructor
   public int getValue() { return x; }  // retrieve value
   public void insertValue(int xIn) { x = xIn;} // insert
}

public class Swapping {
   // swap: pass references to objects
   static void swap(MyInteger rWrap, MyInteger sWrap) {
      // interchange values inside objects
      int t = rWrap.getValue();
      rWrap.insertValue(sWrap.getValue());
      sWrap.insertValue(t);
   }

   public static void main(String[] args) {
      int a = 23, b = 47;
      System.out.println("Before. a:" + a + ", b: " + b);
      MyInteger aWrap = new MyInteger(a);
      MyInteger bWrap = new MyInteger(b);
      swap(aWrap, bWrap);
      a = aWrap.getValue();
      b = bWrap.getValue();
      System.out.println("After.  a:" + a + ", b: " + b);
   }
}
```
## 附录
是不是三行代码的方式更简单~~~
# 假设问题

1. ECMAScript 6 有什么新特性？

> 模板字符串 Symbol Promise 箭头函数  async 函数 let const

2. 三个数据库的默认端口号？

> port: 1521 3306 1443

3. 为什么使用 JDBC ？

> JDBC : 执行SQL语句的 Java API，可以为多种关系数据库提供统一访问

4. 什么是关系型数据库 ？

> 表单A 中有一个名为user_id的字段
表单B 中也有一个名为user_id的字段
现在我把他们建立一种联系，当我去修改表单A的user_id的值时，表单B 中的user_id的值也会自动进行修改，因为他们建立的一种关系

>> NOSQL 非关系型数据库 Neo4j 

5. 一篇有趣的文章？

> [cmd powershell 提权](https://hackettyu.com/181004_2/)  windows doc 查资料 sudo 配置 alia 还配置了用 命令关闭 英伟达显卡

6. 简述 SpringMVC 原理 ?

![spring mvc](https://i.loli.net/2019/04/12/5caff603dc352.png)


7. 自我介绍稿子?

8. 分层结构?

> GUI 控制测试 测试用例

9. TCP UDP 的区别?

> tcp协议和udp协议的差别 

| - | TCP | UDP |
| --- | --- | --- | 
| 是否连接    | 面向连接    | 面向非连接   |
| 传输可靠性  | 可靠        | 不可靠  |
| 应用场合    | 少量数据    | 传输大量数据 | 
| 速度        | 慢         | 快 |

10. 七层网络模型?

应用层　│←第七层
　　├───────┤
　　│　表示层　│
　　├───────┤
　　│　会话层　│
　　├───────┤
　　│　传输层　│
　　├───────┤
　　│　网络层　│
　　├───────┤
　　│数据链路层│
　　├───────┤
　　│　物理层　│←第一层
　　└───────┘ 



## the more

1. 值传递和引用传递

```java
package com.t190410;
import java.util.Arrays;
public class ValueAndRef {
       
       int[] arr1 = {1,2};
       
       public void func1(int[] arr) {
             int temp;
             temp = arr[1];
             arr[1] = arr[0];
             arr[0] = temp;
       }
       
       public void func2(int[] arr) {
             int[] temp = {2,1};
             arr = temp;
             System.out.println("innner:" + Arrays.toString(arr));
       }
       
       public void exchange(int a, int b) {
             int temp = a;
             a = b;
             b= temp;
       }
       
       public static void main(String[] args) {
             
             ValueAndRef valueAndRef = new ValueAndRef();
//           valueAndRef.func2(valueAndRef.arr1);
//           System.out.println(Arrays.toString(valueAndRef.arr1));
             
             int[] arr2 = {1,2};
//           valueAndRef.func1(arr2);
//           System.out.println(Arrays.toString(arr2));
//           valueAndRef.func2(arr2);
//           System.out.println(Arrays.toString(arr2));
             
             int a = 1;
             int b = 0;
             valueAndRef.exchange(a, b);
             System.out.println(a);
             
             
       }
}
```

1. 二分查找?

```java
public class BinarySearch {
	/*
	 * @param a: 数组
	 * @param n: 范围
	 * @param key: 查找的值
	 * @return int 位置
	 */
	public int binarySearch(int[] a, int n, int key) {
		if(n > a.length - 1) return -1;
		int low = 0;
		int high = n;
		while(low <= high) {	// 这个等于号让 high < low 终止循环
			int mid = low + ((high - low)>>1);	// + == >>
			if(key <= a[mid]) high = --mid;
			else low = ++ mid;
		}
		// 解决重复元素，查找的是首个匹配
		if(low < n && a[low] == key) return low;
		else return -1;
	}
	@Test
	public void func() {
		int[] a = {1, 32, 23, 32, 43, 312, 213, 324, 342, 34, 324, 324, 34, 113};
		Arrays.sort(a);
		System.out.println(binarySearch(a, 3, 1));
		
	}
}
```

1. 快排?

```java
// 完整优化后的快排
public class DoubleQuickSort {
	public static int quickSort(int[] a, int l, int r) {
//		if(l >= r )	return 1;
		if(r - l < 500000)	return -1;	// 中位值	如果知道输入在 [1, 100]  50
		int temp;
		int swap = new Random().nextInt(r - l) + l; // 降低升序数组和常见输入的影响
		temp = a[l]; a[l] = a[swap]; a[swap] = temp;
//		new Random().nextInt(r - l) + l; // 降低有序和重复数的影响, 改用插入排序
		int privot = a[l];
		int i = l, j = r + 1;
		while(true) 
    {
			do ++i; while(i <= r && a[i] < privot);
			do --j; while(a[j] > privot);
			if(i > j) break;
			temp = a[i]; a[i] = a[j]; a[j] = temp;
		}
		temp = a[l]; a[l] = a[j]; a[j] = temp;
		quickSort(a, l, j-1);
		return quickSort(a, j+1, r);
	}
	
	public static void binaryInserSort(int[] arr) {
		for(int i = 1; i < arr.length; ++i) {
			int temp = arr[i];
			int low = 0, high = i - 1;
			int mid = -1;
			while(low <= high) {
				mid = low + (high - low) / 2;
				if(arr[mid] > temp) high = --mid;
				else low = ++mid;
			}
			for(int j = i - 1;j >= low; --j) {
				arr[j + 1] = arr[j];
			}
			arr[low] = temp;
		}
	}
	
	public static void init(int[] a, int n) {
		for(int i = 0; i < n; ++i) {
			a[i] = (int)(Math.random()*1000000 + 1);
		}
	}
	
	public static void main(String[] args) {
		int[] a = new int[1000000];
		init(a, 1000000);
		int qs = quickSort(a, 0, a.length-1);
		System.out.println("qs:" + qs);
		if(qs < 0)	binaryInserSort(a);
		System.out.println(Arrays.toString(a));
	}
}
```

1. 单例模式三种?

1. 类成员方法不能重写?

```java
package com.t190415;

public class Test1 {
	
	public static void main(String[] args) {
		
		Father father = new Father();
		Father child = new Child();
		System.out.println(father.getName());	// Father
		System.out.println(child.getName());	// Father
	}

}

class Father {
	public static String getName() {
		return "Father";
	}
}

class Child extends Father {
	public static String getName() {
		return "Child";
	}
}
```

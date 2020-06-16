# 利用枚举实现单列模式

```java
public enum MySingleton {
	INSTANCE;
    // 这里隐藏了一个空的私有构造方法
    // private Singleton () {}

	public void doSomething() {
		System.out.println("this is a func()");
	}

	public synchronized String getSomething() {
		return something;
	}

	private String something;
	
	public static void main(String[] args) {
		// in another class
		MySingleton mySingleton = MySingleton.INSTANCE;
		mySingleton.doSomething();
	}
}
```
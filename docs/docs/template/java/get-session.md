# get session

> 获取 Session 里的所有值

```java
//获取session
HttpSession   session   =   request.getSession();  
// 获取session中所有的键值
Enumeration<?> enumeration = session.getAttributeNames();
// 遍历enumeration中的
while (enumeration.hasMoreElements()) {
	// 获取session键值
	String name = enumeration.nextElement().toString();
	// 根据键值取session中的值
	Object value = session.getAttribute(name);
	// 打印结果
	System.out.println("<B>" + name + "</B>=" + value + "<br>/n");
}
```
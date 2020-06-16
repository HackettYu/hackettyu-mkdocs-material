#  Gson

```java
@SuppressWarnings("unused")
	private static void test6() {
		// 处理 Map
		Gson gson = new GsonBuilder().enableComplexMapKeySerialization().create();

		Map<Point, String> map1 = new LinkedHashMap<Point, String>();// 使用LinkedHashMap将结果按先进先出顺序排列
		map1.put(new Point(5, 6), "a");
		map1.put(new Point(8, 8), "b");
		String s = gson.toJson(map1);
		System.out.println(s);// 结果:[[{"x":5,"y":6},"a"],[{"x":8,"y":8},"b"]]

		Map<Point, String> retMap = gson.fromJson(s, new TypeToken<Map<Point, String>>() {
		}.getType());
		for (Point p : retMap.keySet()) {
			System.out.println("key:" + p + " values:" + retMap.get(p));
		}
		System.out.println(retMap);

		System.out.println("----------------------------------");
		Map<String, Point> map2 = new LinkedHashMap<String, Point>();
		map2.put("a", new Point(3, 4));
		map2.put("b", new Point(5, 6));
		String s2 = gson.toJson(map2);
		System.out.println(s2);

		Map<String, Point> retMap2 = gson.fromJson(s2, new TypeToken<Map<String, Point>>() {
		}.getType());
		for (String key : retMap2.keySet()) {
			System.out.println("key:" + key + " values:" + retMap2.get(key));
		}
	}

	// 包括特殊字段
	@SuppressWarnings("unused")
	private static void test5() {
		@SuppressWarnings("unused")
		Gson gson = new GsonBuilder().excludeFieldsWithModifiers(Modifier.STATIC, Modifier.TRANSIENT, Modifier.VOLATILE)
				.create();
	}

	@SuppressWarnings("unused")
	private static void test4() {
		// 空值输出
		@SuppressWarnings("unused")
		Gson gson = new GsonBuilder().serializeNulls().create();
	}

	@SuppressWarnings("unused")
	private static void test3() {
		// Gson默认提供的默认JSON输出是一个紧凑的JSON格式。这意味着输出的JSON格式中将不会有空格字符
		// 格式化输出
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		String jsonOutput = gson.toJson(new TestGsonObject());
		System.out.println(jsonOutput);
	}

	@SuppressWarnings("unused")
	private static void test2() {
		// test1();
		// 常用序列化
		// 数组
		Gson gson = new Gson();
		String[] strings = { "abc", "def", "ghi" };
		String temp = "";
		System.out.println(temp = gson.toJson(strings));
		System.out.println(gson.toJson(gson.fromJson(temp, String[].class)));

		// 集合
		List<TestGsonObject> list = new ArrayList<>();
		list.add(new TestGsonObject());
		list.add(new TestGsonObject());
		list.add(new TestGsonObject());
		System.out.println(temp = gson.toJson(list));

		// 可以序列化任意对象的集合但不能反序列化之
		// 1、这是因为没有途径使得用户可以去提示该对象的类型。
		// 反序列化过程中，集合必须制定特定的泛型
		// Type collectionType = new TypeToken<List<TestGsonObject>>(){}.getType(); //
		// 获取类型
		System.out.println(gson.toJson(gson.fromJson(temp, List.class)));
		// Type collectionType = new TypeToken<Collection<Integer>>(){}.getType();

		// System.out.println(gson.toJson(gson.fromJson(temp, new
		// TypeToken<List<TestGsonObject>>(){}.getType()))); // error

		// 如果不满意输出格式可以写构造器
	}

	/**
	 * @author Hackett 类的序列化和反序列化
	 */
	@SuppressWarnings("unused")
	private static void test1() {
		// 最好使用private成员变量
		// 没有必要使用注解指示一个成员变量是否需要序列化或反序列化。所有当前类中的成员变量（包括继承自所有父类的成员变量）都默认支持序列化和反序列化。
		// 以下实现得以正确的操作空对象
		// 1、序列化时，一个空的成员变量将会在输出中被省去。
		// 2、反序列化时，在JSON字符串中缺失的字段将会在相应的成员变量中变为空。
		// 如果一个成员变量由synthetic关键字标记，在JSON序列化或者反序列化的过程中将会被忽略。
		// 如果成员变量对应的是外部类中的内部类，匿名类，本地类则会被忽略，从而不被序列化或反序列化。

		// Gson 不保存状态
		Gson gson = new Gson();
		// 序列化
		gson.toJson(1);
		// 反序列化
		TestGsonObject tgo = new TestGsonObject();
		String temp = "";
		System.out.println(temp = gson.toJson(tgo)); // {"id":1,"ll":10,"test":{"name":"12"}}
		System.out.println(gson.toJson(gson.fromJson(temp, TestGsonObject.class)));
	}

}

// Gson不能自动的反序列化一个纯内部类，这是因为在创建这样的对象时它的无参构造器需要一个指向包裹对象（外部类）的引用
// 所以写在这里
class TestGsonObject implements Serializable {
	private static final long serialVersionUID = 6734671812408917597L;
	int id = 1;
	long ll = 10L;
	Test test = new Test();

	class Test implements Serializable {
		private static final long serialVersionUID = 4497633505968337675L;
		String name = "12";

		public Test() {
		}

	}

	public TestGsonObject() {
	}
```


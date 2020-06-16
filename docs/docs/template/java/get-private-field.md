# get private field

> 返回私有字段

```java
List<Field> privateFields = new ArrayList<>();
Field[] allFields = User.class.getDeclaredFields();
for (Field field : allFields) {
	if (Modifier.isPrivate(field.getModifiers())) {
		privateFields.add(field);
		System.out.println(field.getType());
		 System.out.println(field.getName());
	}
}
```
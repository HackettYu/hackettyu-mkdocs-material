# 类加载

严格双亲委派模式加载步骤：

从 Bootstrap classloader 加载。
若没有，则依次从 System、Common、shared 加载。
若没有，从 /WEB-INF/classes 加载。
若没有，从 /WEB-INF/lib/*.jar 加载。

Webapp classLoader 的默认行为会与正常的双亲委派模式不同：

从 Bootstrap classloader 加载。
若没有，从 /WEB-INF/classes 加载。
若没有，从 /WEB-INF/lib/*.jar 加载。
若没有，则依次从 System、Common、shared 加载（该步骤使用双亲委派）。

类加载器主要分为两类，一类是 JDK 默认提供的，一类是用户自定义的。 JDK 默认提供三种类加载器：

Bootstrap ClassLoader 启动类加载器：每次执行 java 命令时都会使用该加载器为虚拟机加载核心类。该加载器是由 native code 实现，而不是 Java 代码，加载类的路径为 <JAVA_HOME>/jre/lib。特别的 <JAVA_HOME>/jre/lib/rt.jar 中包含了 sun.misc.Launcher 类， 而 sun.misc.Launcher$ExtClassLoader 和 sun.misc.Launcher$AppClassLoader 都是 sun.misc.Launcher 的内部类，所以拓展类加载器和系统类加载器都是由启动类加载器加载的。
Extension ClassLoader, 拓展类加载器：用于加载拓展库中的类。拓展库路径为 <JAVA_HOME>/jre/lib/ext/。实现类为 sun.misc.Launcher$ExtClassLoader
System ClassLoader 系统类加载器：用于加载 CLASSPATH 中的类。实现类为 sun.misc.Launcher$AppClassLoader
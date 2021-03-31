# SAP JCo 例子 | SAP Java Connector 参考

> 本例子使用的的版本为 jco_31

## 准备

下载SAP Java Connector: [https://support.sap.com/en/product/connectors/jco.html](https://support.sap.com/en/product/connectors/jco.html)

导入 JCo sapjco.jar(Windows and Linux) 到开发路径


windows 导入 sapjco3.dll，Linux 导入 libsapjco3.so 带 Path

## 代码

```java
import java.io.File;
import java.io.FileOutputStream;
import java.util.Properties;

import com.sap.conn.jco.JCoDestination;
import com.sap.conn.jco.JCoDestinationManager;
import com.sap.conn.jco.JCoException;
import com.sap.conn.jco.ext.DestinationDataProvider;

public class Generator {

	static String DESTINATION_NAME1 = "ABAP_AS_WITHOUT_POOL";
	static String DESTINATIOn_NAME2 = "ABAP_AS_WITH_POOL";

	static void createDestinationDataFile(String destinationName, Properties connectProperties) {

		File destConfigiration = new File(destinationName + ".jcoDestination");

		try {
			FileOutputStream fos = new FileOutputStream(destConfigiration, false);
			connectProperties.store(fos, "Generator");
			fos.close();
		} catch (Exception e) {
			throw new RuntimeException("Unable create file!");
		}
	}

	public static void stepConnectionWithoutPool() throws JCoException {
		JCoDestination destination = JCoDestinationManager.getDestination(DESTINATION_NAME1);
		System.out.println("Attributes:");
		System.out.println(destination.getAttributes());
		System.out.println();

	}

	public static void stepConnectionWithPool() throws JCoException {
		JCoDestination destination = JCoDestinationManager.getDestination(DESTINATIOn_NAME2);

		destination.ping();

		System.out.println("Attributes");
		System.out.println(destination.getAttributes());
		System.out.println();

	}

	public static void main(String[] args) throws JCoException {

		Properties connectProperties = new Properties();
				
	    // Basic configuration
		connectProperties.setProperty(DestinationDataProvider.JCO_ASHOST, "{{your host}}");
		connectProperties.setProperty(DestinationDataProvider.JCO_SYSNR, "00");
		connectProperties.setProperty(DestinationDataProvider.JCO_CLIENT, "500");
		connectProperties.setProperty(DestinationDataProvider.JCO_USER, "{{USERNAME}}");
		connectProperties.setProperty(DestinationDataProvider.JCO_PASSWD, "{{PASSWORD}}");
		connectProperties.setProperty(DestinationDataProvider.JCO_LANG, "ZH");
		connectProperties.setProperty(DestinationDataProvider.JCO_POOL_CAPACITY, "3");
		connectProperties.setProperty(DestinationDataProvider.JCO_PEAK_LIMIT, "10");
		
		// Further configuration
		connectProperties.setProperty(DestinationDataProvider.JCO_SERIALIZATION_FORMAT, "columnBased");
		connectProperties.setProperty(DestinationDataProvider.JCO_NETWORK, "lan");
		connectProperties.setProperty(DestinationDataProvider.JCO_EXPIRATION_TIME, "600000");
		connectProperties.setProperty(DestinationDataProvider.JCO_EXPIRATION_PERIOD, "120000");
		
		
		createDestinationDataFile(DESTINATION_NAME1, connectProperties);
		createDestinationDataFile(DESTINATIOn_NAME2, connectProperties);
		
		System.out.println("Generate DESTINATION_NAME1 finished!");
		System.out.println("Generate DESTINATION_NAME2 finished!");
		
		// Test connection
		Generator.stepConnectionWithoutPool();
		Generator.stepConnectionWithPool();
	}

}

```

```java
import com.sap.conn.jco.AbapException;
import com.sap.conn.jco.JCoDestination;
import com.sap.conn.jco.JCoDestinationManager;
import com.sap.conn.jco.JCoException;
import com.sap.conn.jco.JCoFunction;
import com.sap.conn.jco.JCoStructure;
import com.sap.conn.jco.JCoTable;

public class Invoker {
	
	public static void main(String[] args) throws JCoException {
		
		String functionName = "BAPI_COMPANYCODE_GETLIST";  // 调用的 Function moudule 名称，需要开启远程调用
		JCoDestination destination = JCoDestinationManager.getDestination("ABAP_AS_WITH_POOL");  // 获取工程根目录下的文件 ABAP_AS_WITH_POOL.jcoDestination
		JCoFunction function = destination.getRepository().getFunction(functionName);
		
		if (function == null) {
			throw new RuntimeException(functionName + " not found in SAP");
		}
		
		try {
			function.execute(destination);
		} catch (AbapException e) {
			System.out.println(e);
			return;
		}
		
		
		JCoStructure exportStructure = function.getExportParameterList().getStructure("RETURN");  // 获取导出参数

		for(int i = 0; i < exportStructure.getMetaData().getFieldCount(); i++) {
			System.out.println(exportStructure.getString(i));
		}
		
		JCoTable exportTable = function.getTableParameterList().getTable("COMPANYCODE_LIST");  // 获取 Table 参数
		
		for(int i = 0; i < exportTable.getNumRows(); i++) {
			exportTable.setRow(i);
			
			System.out.println(exportTable.getString("COMP_CODE") + "\t" + exportTable.getString("COMP_NAME"));
			
		}
		
		
		
	}

}
```

## Type mapping

> 参考文档

## 异常处理

- JCO.AbapException：ABAP 函数执行过程中出现异常，在 JAVA 进程中触发该异常
- JCO.ConversionException：当执行参数的 get,set 方法时，如果在 Java 类型和 ABAP 类型间转换失败

## Debug

```abap
JCO.Pool pool = JCO.getClientPoolManage().getPool(POOL_NAME);

pool.setAbapDebug(true);
```

## 连接池

连接池的使用可以参考这篇[博客](https://coldinfire.github.io/2019/SAP_JCO/)



## SAP JCo Architecture

Java Application -> JCo Java API -> JNI Layer -> CPI-C -> RFC -> SAP System

## 拓展库

- https://github.com/hibersap/hibersap-sapjco3
- https://github.com/saro-lab/sap-jco-manager
- https://github.com/easonjim/jco-sdk

## Reference

- https://support.sap.com/content/dam/support/en_us/library/ssp/products/connectors/jco/jco_31_documentation.pdf
- https://coldinfire.github.io/2019/SAP_JCO/
- https://blogs.sap.com/2017/08/25/sap-jco-server-example/

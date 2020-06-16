# 数据仓库建模
>[数据仓库建模：星型模式和雪花模式](https://blog.csdn.net/zy_zhengyang/article/details/79024426)
## 星型模型
> star schema

![star schema](https://images0.cnblogs.com/blog/684470/201410/262001252934202.png)

## 雪花模型
> snowflake schema
![snowflake schema](https://images0.cnblogs.com/blog/684470/201410/262001583558033.png)
- 节省存储空间
- 一定程度上的范式  

## 事实表
> 在多维数据仓库中，保存度量值的详细值或事实的表称为“事实表”

![事实表](https://img-hacketyu.oss-cn-shenzhen.aliyuncs.com/note/20190912165604227_24634.png)

## 维度表
> 维度表包含了维度的每个成员的特定名称。维度成员的名称称为“属性”(Attribute)

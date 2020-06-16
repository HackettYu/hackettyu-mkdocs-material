# get-data-table-create-structure

> 获取数据表 create 结构

```sql
create PROCEDURE [sp_gettext]
    @name VARCHAR(max) = NULL
,    @identity BIT = 1
,    @index TINYINT = 2 -- 0不创建索引  1不创建表  2创建索引  
,    @new BIT =0 
AS
SET ARITHABORT ON;
SET CONCAT_NULL_YIELDS_NULL ON;
SET QUOTED_IDENTIFIER ON;
SET ANSI_NULLS ON;
SET ANSI_PADDING ON;
SET ANSI_WARNINGS ON;
SET NUMERIC_ROUNDABORT OFF;

DECLARE    @crlf CHAR(2);
SET @crlf = CHAR(13) + CHAR(10);
DECLARE    @objid INT;

DECLARE @results TABLE (definition NVARCHAR(max))

DECLARE    @objects TABLE (id VARCHAR(100), type CHAR(2));

WITH    db1(dbname)
            AS (SELECT    [value] AS dbname
                FROM    Split(@name)),
        db2    AS (SELECT   
              --CASE WHEN CHARINDEX('.', dbname) = 0 AND CHARINDEX('[', dbname) = 0 THEN '[cn9c080].' + QUOTENAME(dbname)
     --                            ELSE dbname
     --                       END AS dbname
                        CASE WHEN o.[object_id] IS NULL AND tt.[name] IS NULL THEN '%' ELSE LTRIM(ISNULL(o.[object_id],tt.[type_table_object_id])) END AS object_id,
                        CASE  [db1].[dbname] WHEN 'tables' THEN 'U' WHEN 'procs' THEN 'P' else
                         o.[type] END type
                FROM    db1
                left JOIN sys.[objects] o ON (PARSENAME(db1.[dbname],1) = o.[name] OR OBJECT_ID('[cn9c080].' + QUOTENAME(dbname)) = o.[object_id])
                LEFT JOIN sys.table_types tt ON db1.dbname=tt.NAME 
                )
                

    INSERT    INTO @objects
    SELECT    *
    FROM    db2    ;
    --OPTION    (MAXRECURSION 0);    

    --SELECT TOP 100 * FROM @objects;
     
    WITH    ColumnDefs
                AS (SELECT    TableObj = c.[object_id], ColSeq = c.column_id,
                            ColumnDef = QUOTENAME(c.name) + ' ' + CASE    WHEN c.is_computed = 1
                                                                        THEN 'as ' + COALESCE(k.[definition], '') + CASE
                                                                                                        WHEN k.is_persisted = 1
                                                                                                        THEN ' PERSISTED' + CASE
                                                                                                        WHEN k.is_nullable = 0
                                                                                                        THEN ' NOT NULL'
                                                                                                        ELSE ''
                                                                                                        END
                                                                                                        ELSE ''
                                                                                                        END
                                                                        ELSE DataType + CASE    WHEN DataType IN (
                                                                                                        'decimal',
                                                                                                        'numeric')
                                                                                                THEN '(' + CAST(c.precision AS VARCHAR(10)) + CASE
                                                                                                        WHEN c.scale <> 0
                                                                                                        THEN ',' + CAST(c.scale AS VARCHAR(10))
                                                                                                        ELSE ''
                                                                                                        END + ')'
                                                                                                WHEN DataType IN ('char',
                                                                                                        'varchar',
                                                                                                        'nchar',
                                                                                                        'nvarchar',
                                                                                                        'binary',
                                                                                                        'varbinary')
                                                                                                THEN '(' + CASE
                                                                                                        WHEN c.max_length = -1
                                                                                                        THEN 'max'
                                                                                                        ELSE CASE
                                                                                                        WHEN DataType IN (
                                                                                                        'nchar',
                                                                                                        'nvarchar')
                                                                                                        THEN CAST(c.max_length / 2 AS VARCHAR(10))
                                                                                                        ELSE CAST(c.max_length AS VARCHAR(10))
                                                                                                        END
                                                                                                        END + ')'
                                                                                                WHEN DataType = 'float' AND c.precision <> 53
                                                                                                THEN '(' + CAST(c.precision AS VARCHAR(10)) + ')'
                                                                                                WHEN DataType IN ('time',
                                                                                                        'datetime2',
                                                                                                        'datetimeoffset') AND c.scale <> 7
                                                                                                THEN '(' + CAST(c.scale AS VARCHAR(10)) + ')'
                                                                                                ELSE ''
                                                                                        END
                                                                    END + CASE    WHEN c.is_identity = 1 AND @identity = 1
                                                                                THEN ' IDENTITY(' + CAST(IDENT_SEED(QUOTENAME(OBJECT_SCHEMA_NAME(c.[object_id])) + '.' + QUOTENAME(OBJECT_NAME(c.[object_id]))) AS VARCHAR(30)) + ',' + CAST(IDENT_INCR(QUOTENAME(OBJECT_SCHEMA_NAME(c.[object_id])) + '.' + QUOTENAME(OBJECT_NAME(c.[object_id]))) AS VARCHAR(30)) + ')'
                                                                                ELSE ''
                                                                            END + CASE    WHEN c.is_rowguidcol = 1
                                                                                        THEN ' ROWGUIDCOL'
                                                                                        ELSE ''
                                                                                    END + CASE    WHEN c.xml_collection_id > 0
                                                                                                THEN ' (CONTENT ' + QUOTENAME(SCHEMA_NAME(x.schema_id)) + '.' + QUOTENAME(x.name) + ')'
                                                                                                ELSE ''
                                                                                            END + CASE    WHEN c.is_computed = 0 AND UserDefinedFlag = 0
                                                                                                        THEN CASE
                                                                                                        WHEN c.collation_name <> CAST(DATABASEPROPERTYEX(DB_NAME(),
                                                                                                        'collation') AS NVARCHAR(128))
                                                                                                        THEN ' COLLATE ' + c.collation_name
                                                                                                        ELSE ''
                                                                                                        END
                                                                                                        ELSE ''
                                                                                                    END + CASE
                                                                                                        WHEN c.is_computed = 0
                                                                                                        THEN CASE
                                                                                                        WHEN c.is_nullable = 0
                                                                                                        THEN ' NOT'
                                                                                                        ELSE ''
                                                                                                        END + ' NULL'
                                                                                                        ELSE ''
                                                                                                        END + CASE                                                                                                        
                                                                                                        WHEN c.default_object_id > 0 AND ISNULL(@new,0) = 0
                                                                                                        THEN ' CONSTRAINT ' + QUOTENAME(d.name) + ' DEFAULT ' + COALESCE(d.[definition],
                                                                                                        '')
                                                                                                        WHEN c.default_object_id > 0 AND ISNULL(@new,0) = 1
                                                                                                        THEN ' DEFAULT ' + COALESCE(d.[definition],
                                                                                                        '')
                                                                                                        ELSE ''
                                                                                                        END
                    FROM    sys.columns c
                    CROSS APPLY (SELECT    DataType = TYPE_NAME(c.user_type_id)
                                    ,    UserDefinedFlag = CASE    WHEN c.system_type_id = c.user_type_id THEN 0
                                                                ELSE 1
                                                            END) F1
                    LEFT JOIN sys.default_constraints d ON c.default_object_id = d.[object_id]
                    LEFT JOIN sys.computed_columns k ON c.[object_id] = k.[object_id] AND c.column_id = k.column_id
                    LEFT JOIN sys.xml_schema_collections x ON c.xml_collection_id = x.xml_collection_id),
            IndexDefs
                AS (SELECT    TableObj = i.[object_id], IxName = QUOTENAME(i.name+CASE WHEN @new=1 THEN '_'+LEFT(NEWID(),4) ELSE '' end), IxPKFlag = i.is_primary_key,
                            IxType = CASE    WHEN i.is_primary_key = 1 THEN 'PRIMARY KEY '
                                            WHEN i.is_unique = 1 THEN 'UNIQUE '
                                            ELSE ''
                                        END + LOWER(type_desc),
                            IxDef = '(' + IxColList + ')' + COALESCE(' INCLUDE (' + IxInclList + ')', ''),
                            IxOpts = IxOptList
                    FROM    sys.indexes i
                    LEFT JOIN sys.stats s ON i.index_id = s.stats_id AND i.[object_id] = s.[object_id]
                    CROSS APPLY (SELECT    STUFF((SELECT    CASE    WHEN i.is_padded = 1 THEN ', PAD_INDEX=ON'
                                                                ELSE ''
                                                        END + CASE    WHEN i.fill_factor <> 0
                                                                    THEN ', FILLFACTOR=' + CAST(i.fill_factor AS VARCHAR(10))
                                                                    ELSE ''
                                                                END + CASE    WHEN i.ignore_dup_key = 1
                                                                            THEN ', IGNORE_DUP_KEY=ON'
                                                                            ELSE ''
                                                                        END + CASE    WHEN s.no_recompute = 1
                                                                                    THEN ', STATISTICS_RECOMPUTE=ON'
                                                                                    ELSE ''
                                                                                END + CASE    WHEN i.allow_row_locks = 0
                                                                                            THEN ', ALLOW_ROW_LOCKS=OFF'
                                                                                            ELSE ''
                                                                                        END + CASE    WHEN i.allow_page_locks = 0
                                                                                                    THEN ', ALLOW_PAGE_LOCKS=OFF'
                                                                                                    ELSE ''
                                                                                                END), 1, 2, '')) F_IxOpts (IxOptList)
                    CROSS APPLY (SELECT    STUFF((SELECT    ',' + QUOTENAME(c.name) + CASE    WHEN ic.is_descending_key = 1 AND i.type <> 3
                                                                                        THEN ' DESC'
                                                                                        WHEN ic.is_descending_key = 0 AND i.type <> 3
                                                                                        THEN ' ASC'
                                                                                        ELSE ''
                                                                                    END
                                                FROM    sys.index_columns ic
                                                JOIN    sys.columns c ON ic.[object_id] = c.[object_id] AND ic.column_id = c.column_id
                                                WHERE    ic.[object_id] = i.[object_id] AND ic.index_id = i.index_id AND ic.is_included_column = 0
                                                ORDER BY ic.key_ordinal    
                                        FOR        XML    PATH('')
                                                ,    TYPE).value('.', 'nvarchar(max)'), 1, 1, '')) F_IxCols (IxColList)
                    CROSS APPLY (SELECT    STUFF((SELECT    ',' + QUOTENAME(c.name)
                                                FROM    sys.index_columns ic
                                                JOIN    sys.columns c ON ic.[object_id] = c.[object_id] AND ic.column_id = c.column_id
                                                WHERE    ic.[object_id] = i.[object_id] AND ic.index_id = i.index_id AND ic.is_included_column = 1
                                                ORDER BY ic.key_ordinal    
                                        FOR        XML    PATH('')
                                                ,    TYPE).value('.', 'nvarchar(max)'), 1, 1, '')) F_IxIncl (IxInclList)
                    WHERE    i.type_desc <> 'HEAP'),
            FKDefs
                AS (SELECT    TableObj = f.parent_object_id, FKName = QUOTENAME(f.name),
                            FKRef = QUOTENAME(OBJECT_SCHEMA_NAME(f.referenced_object_id)) + '.' + QUOTENAME(OBJECT_NAME(f.referenced_object_id)),
                            FKColList = ParentColList, FKRefList = RefColList,
                            FKDelOpt = CASE f.delete_referential_action
                                            WHEN 1 THEN 'CASCADE'
                                            WHEN 2 THEN 'SET NULL'
                                            WHEN 3 THEN 'SET DEFAULT'
                                        END, FKUpdOpt = CASE f.update_referential_action
                                                            WHEN 1 THEN 'CASCADE'
                                                            WHEN 2 THEN 'SET NULL'
                                                            WHEN 3 THEN 'SET DEFAULT'
                                                        END, FKNoRepl = f.is_not_for_replication
                    FROM    sys.foreign_keys f
                    CROSS APPLY (SELECT    STUFF((SELECT    ',' + QUOTENAME(c.name)
                                                FROM    sys.foreign_key_columns k
                                                JOIN    sys.columns c ON k.parent_object_id = c.[object_id] AND k.parent_column_id = c.column_id
                                                WHERE    k.constraint_object_id = f.[object_id]
                                                ORDER BY constraint_column_id
                                        FOR        XML    PATH('')
                                                ,    TYPE).value('.', 'nvarchar(max)'), 1, 1, '')) F_Parent (ParentColList)
                    CROSS APPLY (SELECT    STUFF((SELECT    ',' + QUOTENAME(c.name)
                                                FROM    sys.foreign_key_columns k
                                                JOIN    sys.columns c ON k.referenced_object_id = c.[object_id] AND k.referenced_column_id = c.column_id
                                                WHERE    k.constraint_object_id = f.[object_id]
                                                ORDER BY constraint_column_id
                                        FOR        XML    PATH('')
                                                ,    TYPE).value('.', 'nvarchar(max)'), 1, 1, '')) F_Ref (RefColList))
        INSERT INTO @results ([definition])
        SELECT  --TableName, 
                [definition]+CHAR(10)+'GO'+CHAR(10) AS definition            
        FROM    sys.tables t
        INNER JOIN @objects o ON(t.[object_id] LIKE o.[id] AND o.[type]='U')
        CROSS APPLY (SELECT    TableName = QUOTENAME(OBJECT_SCHEMA_NAME(t.[object_id])) + '.' + QUOTENAME(OBJECT_NAME(t.[object_id]))) F_Name
        CROSS APPLY (SELECT    STUFF((SELECT    @crlf + '  ,' + ColumnDef
                                    FROM    ColumnDefs
                                    WHERE    TableObj = t.[object_id]
                                    ORDER BY ColSeq    
                            FOR        XML    PATH('')
                                    ,    TYPE).value('.', 'nvarchar(max)'), 1, 5, '')) F_Cols (ColumnList)
        CROSS APPLY (SELECT    STUFF((SELECT    @crlf + '  ,CONSTRAINT ' + QUOTENAME(name) + ' CHECK ' + CASE
                                                                                                        WHEN is_not_for_replication = 1
                                                                                                        THEN 'NOT FOR REPLICATION '
                                                                                                        ELSE ''
                                                                                                        END + COALESCE([definition],
                                                                                                        '')
                                    FROM    sys.check_constraints
                                    WHERE    parent_object_id = t.[object_id]
                            FOR        XML    PATH('')
                                    ,    TYPE).value('.', 'nvarchar(max)'), 1, 2, '')) F_Const (ChkConstList)
        CROSS APPLY (SELECT    STUFF((SELECT    @crlf + '  ,CONSTRAINT ' + IxName + ' ' + IxType + ' ' + IxDef + COALESCE(' WITH (' + IxOpts + ')',
                                                                                                        '')
                                    FROM    IndexDefs
                                    WHERE    TableObj = t.[object_id] AND IxPKFlag = 1
                            FOR        XML    PATH('')
                                    ,    TYPE).value('.', 'nvarchar(max)'), 1, 2, '')) F_IxConst (IxConstList)
        CROSS APPLY (SELECT    STUFF((SELECT    @crlf + '  ,CONSTRAINT ' + FKName + ' FOREIGN KEY ' + '(' + FKColList + ')' + ' REFERENCES ' + FKRef + ' (' + FKRefList + ')' + CASE
                                                                                                        WHEN FKDelOpt IS NOT NULL
                                                                                                        THEN ' ON DELETE ' + FKDelOpt
                                                                                                        ELSE ''
                                                                                                        END + CASE
                                                                                                        WHEN FKUpdOpt IS NOT NULL
                                                                                                        THEN ' ON UPDATE ' + FKUpdOpt
                                                                                                        ELSE ''
                                                                                                        END + CASE
                                                                                                        WHEN FKNoRepl = 1
                                                                                                        THEN ' NOT FOR REPLICATION'
                                                                                                        ELSE ''
                                                                                                        END
                                    FROM    FKDefs
                                    WHERE    TableObj = t.[object_id]
                            FOR        XML    PATH('')
                                    ,    TYPE).value('.', 'nvarchar(max)'), 1, 2, '')) F_Keys (FKConstList)
        CROSS APPLY (SELECT    STUFF((SELECT    @crlf + 'CREATE ' + IxType + ' INDEX ' + IxName + ' ON ' + TableName + ' ' + IxDef + COALESCE(' WITH (' + IxOpts + ')',
                                                                                                        '')
                                    FROM    IndexDefs
                                    WHERE    TableObj = t.[object_id] AND IxPKFlag = 0
                            FOR        XML    PATH('')
                                    ,    TYPE).value('.', 'nvarchar(max)'), 1, 2, '')) F_Indexes (IndexList)
        CROSS APPLY (SELECT    [definition] =
            ( SELECT    CASE    WHEN @index <> 1
                                THEN 'CREATE TABLE ' + TableName + @crlf + '(' + @crlf + '   ' + ColumnList + COALESCE(@crlf + ChkConstList,
                                                                                                        '') + COALESCE(@crlf + IxConstList,
                                                                                                        '') + COALESCE(@crlf + FKConstList,
                                                                                                        '') + @crlf + ')' + @crlf
                                ELSE ''
                        END + CASE    WHEN @index <> 0 THEN COALESCE(@crlf + IndexList, '')
                                    ELSE ''
                                END    
                        FOR    XML    PATH('')
                            ,    TYPE).value('.', 'nvarchar(max)')) F_Link
        WHERE    t.[is_ms_shipped] = 0 AND [definition] <> '';


        -- 视图/过程/函数/触发器
    INSERT INTO @results ([definition])
    SELECT  --QUOTENAME(object_schema_name(m.object_id))+'.'+ QUOTENAME(object_name(m.object_id)) AS [name],o.type,
            m.definition+CHAR(10)+'GO'+CHAR(10) AS definition            
    FROM    sys.sql_modules m
    INNER JOIN sys.objects o ON m.object_id = o.object_id
    INNER JOIN @objects a ON(m.[object_id] LIKE a.[id] AND a.[type] <>'U');    

    --houpeidong 2018-05-30 add 字段说明
    insert into @results ([definition])
    select 
    'EXEC sys.sp_addextendedproperty @name=N''MS_Description'', @value=N''' 
    + cast(ep.[value] as varchar(100)) 
    +''', @level0type=N''SCHEMA'',@level0name=N'''
    +schema_name(schema_id)
    +''', @level1type=N''TABLE'',@level1name=N'''
    +t.[name]
    +''', @level2type=N''COLUMN'',@level2name=N'''
    +c.[name]
    +''''
    +CHAR(10)+'GO'+CHAR(10)
    --,t.[name] AS 表名,c.[name] AS 字段名,cast(ep.[value] as varchar(100)) AS [字段说明]  ,c.collation_name,t.create_date,t.modify_date,schema_name(schema_id),*
    FROM sys.tables AS t  
    INNER JOIN sys.columns AS c ON t.object_id = c.object_id  
    LEFT JOIN sys.extended_properties AS ep ON ep.major_id = c.object_id AND ep.minor_id = c.column_id 
    INNER JOIN @objects o ON(t.[object_id] LIKE o.[id] AND o.[type]='U')
    WHERE ep.class =1 --AND t.name='tbCertifyUserApply'
        
    SELECT * FROM @results;
```

> 数据拆分函数

```sql
create FUNCTION [Split](@text NVARCHAR(max))
RETURNS @tempTable TABLE(value NVARCHAR(1000))
AS
BEGIN
     DECLARE @StartIndex INT                --开始查找的位置
     DECLARE @FindIndex INT                --找到的位置
     DECLARE @Content    VARCHAR(4000)    --找到的值
     --初始化一些变量
     SET @StartIndex = 1 --T-SQL中字符串的查找位置是从1开始的
     SET @FindIndex=0
    
     --开始循环查找字符串逗号
     WHILE(@StartIndex <= LEN(@Text))
     BEGIN
         --查找字符串函数 CHARINDEX 第一个参数是要找的字符串
         --                            第二个参数是在哪里查找这个字符串
         --                            第三个参数是开始查找的位置
         --返回值是找到字符串的位置
         SELECT @FindIndex = CHARINDEX(',' ,@Text,@StartIndex)
         --判断有没找到 没找到返回0
         IF(@FindIndex =0 OR @FindIndex IS NULL)
         BEGIN
             --如果没有找到就表示找完了
             SET @FindIndex = LEN(@Text)+1
         END
         --截取字符串函数 SUBSTRING 第一个参数是要截取的字符串
         --                            第二个参数是开始的位置
         --                            第三个参数是截取的长度
         SET @Content =SUBSTRING(@Text,@StartIndex,@FindIndex-@StartIndex)
         --初始化下次查找的位置
         SET @StartIndex = @FindIndex+1
         --把找的的值插入到要返回的Table类型中
         INSERT INTO @tempTable (Value) VALUES (@Content)
     END
     RETURN
END
```
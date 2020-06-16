# ABAP 对象性能示例

> TCODE(SE30)

```javascript
DATA: C1A(01),   C1B(01),   C1C(01),   C1D(01),   C1E(01),   C1F(01), ""
      C2A(02),   C2B(02),   C2C(02),   C2D(02),   C2E(02),   C2F(02), ""
      C4A(04),   C4B(04),   C4C(04),   C4D(04),   C4E(04),   C4F(04), ""
      C8A(08),   C8B(08),   C8C(08),   C8D(08),   C8E(08),   C8F(08), ""
      CMA(32),   CMB(32),   CMC(32),   CMD(32),   CME(32),   CMF(32), ""
      CLA(64),   CLB(64),   CLC(64),   CLD(64),   CLE(64),   CLF(64), ""
      CHA(1024), CHB(1024), CHC(1024), CHD(1024).                     ""
                                                                      ""
DATA: I1 TYPE I, I2 TYPE I, I3 TYPE I, I4 TYPE I,                     ""
      I5 TYPE I, I6 TYPE I, I7 TYPE I, I8 TYPE I.                     ""
                                                                      ""
FIELD-SYMBOLS: <F1> TYPE ANY, <F2> TYPE ANY, <F3> TYPE ANY,           ""
               <F4> TYPE ANY, <F5> TYPE ANY, <F6> TYPE ANY,           ""
               <F7> TYPE ANY, <F8> TYPE ANY,                          ""
               <I1>  TYPE I,                                          ""
               <C1A> LIKE C1A, <C1B> LIKE C1B.                        ""
                                                                      ""
DATA: STRING1, STRING2, STRING3,                                      ""
      STRING4, STRING5, STRING6 TYPE STRING.                          ""
                                                                      ""
DATA: XSTRING1, XSTRING2, XSTRING3,                                   ""
      XSTRING4, XSTRING5, XSTRING6 TYPE XSTRING.                      ""
                                                                      ""
* Internal Tables                                                     ""
DATA: T100_WA TYPE T100,                                              ""
      SCARR_WA TYPE SCARR,                                            ""
      DD01L_WA TYPE DD01L,                                            ""
      SBOOK_WA TYPE SBOOK,                                            ""
      M6       TYPE T006,                                             ""
      T006_WA  TYPE T006,                                             ""
      X006_WA  TYPE T006.                                             ""
                                                                      ""
DATA: X100 TYPE STANDARD TABLE OF T100                                ""
             WITH NON-UNIQUE DEFAULT KEY,                             ""
      X006 TYPE STANDARD TABLE OF T006                                ""
             WITH NON-UNIQUE DEFAULT KEY.                             ""
                                                                      ""
DATA: TAB_WA TYPE  CUSTOMERS,                                         ""
      TAB TYPE TABLE OF CUSTOMERS.                                    ""
                                                                      ""
* Contexts                                                            ""
CONTEXTS: DEMO_TRAVEL.                                                ""
                                                                      ""
* Types                                                               ""
TYPES: BEGIN OF LINE1,                                                ""
         K(20)    TYPE C,                                             ""
         DATA(40) TYPE C,                                             ""
         DATE     TYPE D,                                             ""
         COUNT(8) TYPE P DECIMALS 0,                                  ""
         REST(24) TYPE C,                                             ""
       END OF LINE1,                                                  ""
                                                                      ""
       TAB1_100  TYPE STANDARD TABLE OF LINE1                         ""
                         WITH NON-UNIQUE DEFAULT KEY INITIAL SIZE 100,""
       TAB1_1000 TYPE STANDARD TABLE OF LINE1                         ""
                      WITH NON-UNIQUE DEFAULT KEY INITIAL SIZE 1000,  ""
                                                                      ""
       BEGIN OF LINE2,                                                ""
         K(20)     TYPE C,                                            ""
         DATA(40)  TYPE C,                                            ""
         DATE      TYPE D,                                            ""
         COUNT(8)  TYPE P DECIMALS 0,                                 ""
         REST(424) TYPE C,                                            ""
       END OF LINE2,                                                  ""
                                                                      ""
       TAB2_100  TYPE  STANDARD TABLE OF LINE2                        ""
                        WITH NON-UNIQUE DEFAULT KEY INITIAL SIZE 100, ""
       TAB2_1000 TYPE STANDARD TABLE OF LINE2                         ""
                      WITH NON-UNIQUE DEFAULT KEY INITIAL SIZE 1000,  ""
                                                                      ""
       BEGIN OF LINE3,                                                ""
         K(20)     TYPE C,                                            ""
         VAL1      TYPE I,                                            ""
         VAL2(8)   TYPE P DECIMALS 0,                                 ""
       END OF LINE3,                                                  ""
                                                                      ""
       TAB3_100   TYPE STANDARD TABLE OF LINE3                        ""
                       WITH NON-UNIQUE DEFAULT KEY INITIAL SIZE 100,  ""
       TAB3_10000 TYPE STANDARD TABLE OF LINE3                        ""
                        WITH NON-UNIQUE DEFAULT KEY INITIAL SIZE 0,   ""
                                                                      ""
       BEGIN OF LINE4,                                                ""
         FLAG(1)   TYPE C,                                            ""
         INTTAB    TYPE  STANDARD TABLE OF I                          ""
                          WITH NON-UNIQUE DEFAULT KEY INITIAL SIZE 0, ""
       END OF LINE4,                                                  ""
                                                                      ""
       TAB4_100   TYPE STANDARD TABLE OF LINE4                        ""
                        WITH NON-UNIQUE DEFAULT KEY INITIAL SIZE 100, ""
                                                                      ""
       BEGIN OF LINE5,                                                ""
         KEY       TYPE I,                                            ""
         DATA(240) TYPE C,                                            ""
         INTTAB    TYPE  STANDARD TABLE OF I                          ""
                          WITH NON-UNIQUE DEFAULT KEY INITIAL SIZE 0, ""
       END OF LINE5,                                                  ""
                                                                      ""
       BEGIN OF INDEX_LINE,                                           ""
         DATE TYPE D,                                                 ""
         INDX TYPE I,                                                 ""
       END OF INDEX_LINE,                                             ""
                                                                      ""
       TAB_INDEX TYPE STANDARD TABLE OF INDEX_LINE                    ""
                       WITH NON-UNIQUE DEFAULT KEY INITIAL SIZE 1000. ""
                                                                      ""
                                                                      ""
class C1 definition.                                                  ""
  public section.                                                     ""
    class-methods M1.                                                 ""
endclass.                                                             ""
                                                                      ""
class C1 implementation.                                              ""
  method M1.                                                          ""
    ...                                                               ""
  endmethod.                                                          ""
endclass.                                                             ""
                                                                      ""
form f1.                                                              ""
  ...                                                                 ""
endform.                                                              ""
```

## 1 SQL Interface

### 1.1.1 Select ... Where vs. Select + Check

#### 1.1.1.1 select+check语句 

> Runtime:186ms

```javascript
SELECT * FROM SBOOK INTO SBOOK_WA.
  CHECK: SBOOK_WA-CARRID = 'LH' AND
         SBOOK_WA-CONNID = '0400'.
ENDSELECT.
```

#### 1.1.1.2 Select with Where condition 

> Runtime:261ms

```javascript
SELECT * FROM SBOOK INTO SBOOK_WA
  WHERE CARRID = 'LH' AND
        CONNID = '0400'.
ENDSELECT.
```

#### 1.1.1.3 文档

> Always specify your conditions in the Where-clause instead of 
> checking them yourself with check-statements. 
> The database system can then use an index (if possible) and the 
> network load is considerably less. 

应该在 WHERE 子句中指定条件，而不是自己用 CHECK 语句检查它们。
然后，数据库系统可以使用索引（如果可能的话），这样网络负载要少得多

### 1.1.2 Test Existence

#### 1.1.2.1 Select And Exit 

> Runtime:261ms

```javascript
SELECT * FROM SBOOK INTO SBOOK_WA
    WHERE CARRID = 'LH'.
  EXIT.
ENDSELECT.
```

#### 1.1.2.2 Select ... Up To 1 Rows 

> Runtime:258ms

```javascript
SELECT * FROM SBOOK INTO SBOOK_WA
  UP TO 1 ROWS
  WHERE CARRID = 'LH'.
ENDSELECT.
```

#### 1.1.2.3 文档

> If you are interested if there exists at least one row of a database 
>  table or view with a certain condition, use the Select ... Up To 1 
>  Rows statement instead of a Select-Endselect-loop with an Exit. 
>  If all primary key fields are supplied in the Where condition you 
>  can even use Select Single. 
>  Select Single requires one communication with the database system, 
>  whereas Select-Endselect needs two. 

如果您对数据库表或具有特定条件的视图中至少需要一行，请使用 select…up <1...n> row 语句，而不是带有 EXIT 的 select endselect 循环。
如果在 where 条件下提供了所有主键字段，则甚至可以使用 select single。
select single 需要与数据库系统进行一次通信，而 select endselect 需要两次通信。

### 1.1.3 Select aggregates

#### 1.1.3.1 Select ... Where + Check 

> Runtime:1894ms

```javascript
DATA: MAX_MSGNR type t100-msgnr.
MAX_MSGNR = '000'.
SELECT * FROM T100 INTO T100_WA
  WHERE SPRSL = 'D' AND
        ARBGB = '00'.
  CHECK: T100_WA-MSGNR > MAX_MSGNR.
  MAX_MSGNR = T100_WA-MSGNR.
ENDSELECT.
```

#### 1.1.3.2 Select using an aggregate function 

> Runtime:448ms

```javascript
DATA: MAX_MSGNR type t100-msgnr.
SELECT MAX( MSGNR ) FROM T100 INTO max_msgnr
  WHERE SPRSL = 'D' AND
        ARBGB = '00'.
```

####  1.1.3.3 文档

> If you want to find the maximum, minimum, sum and average value   or the count of a database column, use a select list with aggregate   functions instead of computing the aggregates yourself.
> Network load is considerably less. 

如果要查找数据库列的最大值、最小值、和平均值或计数（MAX MIN AVG COUNT），请使用带有聚合函数的选择列表，而不是自己计算聚合。网络负载要少得多。

### 1.1.4 Select with select list

#### 1.1.4.1 Select *

> Runtime:2542ms

```javascript
SELECT * FROM DD01L INTO DD01L_WA
  WHERE DOMNAME LIKE 'CHAR%'
        AND AS4LOCAL = 'A'.
ENDSELECT.
```

#### 1.1.4.2 Select with select list

> Runtime:782ms

```javascript
SELECT DOMNAME FROM DD01L
  INTO DD01L_WA-DOMNAME
  WHERE DOMNAME LIKE 'CHAR%'
        AND AS4LOCAL = 'A'.
ENDSELECT.
```

#### 1.1.4.3 文档

> Use a select list or a view instead of Select * ,  if you are only  interested in specific columns of the table. Network load is considerably less. 

如果只对表的特定列感兴趣，请使用选择列表或视图而不是选择 *。
网络负载要少得多。

### 1.1.5 Column Update

#### 1.1.5.1 Single-line Updates

> Runtime:185ms

```javascript
SELECT * FROM SFLIGHT INTO SFLIGHT_WA.
  SFLIGHT_WA-SEATSOCC =
    SFLIGHT_WA-SEATSOCC - 1.
  UPDATE SFLIGHT FROM SFLIGHT_WA.
ENDSELECT.
```

#### 1.1.5.2 Column Update

> Runtime:297ms

```javascript
UPDATE SFLIGHT
       SET SEATSOCC = SEATSOCC - 1.
```

#### 1.1.5.3 文档

> Whenever possible, use column updates instead of single-row updates to update your database tables. 
> Network load is considerably less. 

尽可能使用列更新而不是单行更新来更新数据库表。
网络负载要少得多

### 1.2 Index and Buffer Support

#### 1.2.1 Select with index support

##### 1.2.1.1 Select without index support

> Runtime:307ms

```javascript
SELECT * FROM SBOOK CLIENT SPECIFIED INTO SBOOK_WA
  WHERE CARRID = 'LH'
    AND CONNID = '0400'.
ENDSELECT.
```

##### 1.2.1.2 Select promary index support

> Runtime:408ms

```javascript
SELECT * FROM SBOOK CLIENT SPECIFIED INTO SBOOK_WA
  WHERE MANDT IN ( SELECT MANDT FROM T000 )
    AND CARRID = 'LH'
    AND CONNID = '0400'.
ENDSELECT.
```

##### 1.2.1.3 文档

> For all frequently used Select statements, try to use an index. You always use an index if you specify (a generic part of) the index fields concatenated with logical Ands in the Select statement's Where clause. Note that complex Where clauses are poison for the statement optimizer in any database system. 

对于所有常用的 select 语句，请尝试使用索引。如果在 SELECT 语句的 WHERE 子句中指定（通用部分）与逻辑和连接的索引字段，则始终使用索引。请注意，复杂的 WHERE 子句对任何数据库系统中的语句优化器都是有害的。

#### 1.2.2 Select with buffer support

##### 1.2.2.1 Select without buffer support 

> Runtime:191ms

```javascript
SELECT SINGLE * FROM T100 INTO T100_WA
  BYPASSING BUFFER
  WHERE     SPRSL = 'D'
        AND ARBGB = '00'
        AND MSGNR = '999'.
```

##### 1.2.2.2 Select with buffer support

> Runtime:1ms

```javascript
SELECT SINGLE * FROM T100  INTO T100_WA
  WHERE     SPRSL = 'D'
        AND ARBGB = '00'
        AND MSGNR = '999'.
```

##### 1.2.2.3 文档

> For all frequently used, read-only tables, try to use SAP buffering. Network load is considerably less. 

对于所有常用的只读透明表，请尝试使用 SAP 缓冲。
网络负载要少得多

### 1.3 Array Operations(internal tables)

#### 1.3.1 Select ... Into Table t

##### 1.3.1.1 Select + Append statement 

> Runtime:57ms

```javascript
DATA T006_WA TYPE T006.
CLEAR X006.
SELECT * FROM T006 INTO T006_WA.
  APPEND T006_WA TO X006.
ENDSELECT.
```

##### 1.3.1.2 Select Into Table 

> Runtime:16ms

```JAVV
SELECT * FROM T006 INTO TABLE X006.
```

##### 1.3.1.3 文档

> It is always faster to use the Into Table version of a Select statement than to use Append statements. 

使用 SELECT 语句的 INTO TABLE 总是比使用 APPEND 语句更快

#### 1.3.2 Array Insert VS Single-row

##### 1.3.2.1 Single-line Inserts 

> Runtime:0ms

```javascript
LOOP AT TAB INTO TAB_WA.
  INSERT INTO CUSTOMERS VALUES TAB_WA.
ENDLOOP.
```

##### 1.3.2.2 Array Insert

> Runtime:7ms 

```javascript
INSERT CUSTOMERS FROM TABLE TAB.
```

##### 1.3.3.3 文档

> Whenever possible, use array operations instead of single-row operations to modify your database tables. Frequent communication between the application program and database system produces considerable overhead. 

尽可能使用数组操作而不是单行操作来修改数据库表。
应用程序和数据库系统之间频繁的通信会产生相当大的开销

#### 1.3.3 Array-Select vs. Select-EndSelect

##### 1.3.3.1 Select Into Table t + Loop at t. 

> Runtime:36ms

```javascript
SELECT * FROM T006
  INTO TABLE X006.
LOOP AT X006 INTO X006_WA.
ENDLOOP.
```

##### 1.3.3.2 Select ... Endselect.

> Runtime:35ms

```javascript
SELECT * FROM T006 INTO X006_WA.
ENDSELECT.
```

##### 1.3.3.3 文档

> If you process your data only once, use a Select-Endselect-loop 
> instead of collecting data in an internal table with Select Into 
> Table.  Internal table handling takes up much more space. 

如果只处理一次数据，请使用 select endselect 循环，而不是使用 select into 表在内部表中收集数据。内部表处理占用更多空间。

### 1.4 Select over more than one table

#### 1.4.1 Select with view 

##### 1.4.1.1 Nested Select statements

> Runtime:84517ms

```javascript
SELECT * FROM DD01L INTO DD01L_WA
  WHERE DOMNAME LIKE 'CHAR%'
        AND AS4LOCAL = 'A'.
  SELECT SINGLE * FROM DD01T INTO DD01T_WA
    WHERE   DOMNAME    = DD01L_WA-DOMNAME
        AND AS4LOCAL   = 'A'
        AND AS4VERS    = DD01L_WA-AS4VERS
        AND DDLANGUAGE = SY-LANGU.
ENDSELECT.
```

##### 1.4.1.2 Select with view 

> Runtime:3796ms

```javascript
SELECT * FROM DD01V INTO  DD01V_WA
  WHERE DOMNAME LIKE 'CHAR%'
        AND DDLANGUAGE = SY-LANGU.
ENDSELECT.
```

##### 1.4.1.3 文档

> To process a join, use a view instead of nested Select statements. Network load is considerably less. 

#### 1.4.2 Select with join

##### 1.4.2.1 Nested Select statements 

> Runtime:1ms

```javascript
SELECT * FROM SPFLI INTO SPFLI_WA.
  SELECT * FROM SFLIGHT INTO SFLIGHT_WA
      WHERE CARRID = SPFLI_WA-CARRID
        AND CONNID = SPFLI_WA-CONNID.
  ENDSELECT.
ENDSELECT.
```

##### 1.4.2.2 Select with join

> Runtime:203ms

```javascript
SELECT * INTO WA
    FROM SPFLI AS P INNER JOIN SFLIGHT AS F
      ON P~CARRID = F~CARRID AND
         P~CONNID = F~CONNID.
ENDSELECT.
```

##### 1.4.2.3 文档

>To read data from several logically connected tables use a join 
>instead of nested Select statements. Network load is considerably 

要从几个逻辑连接的表中读取数据，请使用 join 而不是嵌套的 select 语句。网络负载相当大

#### 1.4.3 Using Sunqueries

##### 1.4.3.1 Using Two Selects 

> Runtime:224ms

```javascript
SELECT * FROM SPFLI
  INTO TABLE T_SPFLI
  WHERE CITYFROM = 'FRANKFURT'
    AND CITYTO = 'NEW YORK'.
SELECT * FROM SFLIGHT AS F
    INTO SFLIGHT_WA
    FOR ALL ENTRIES IN T_SPFLI
    WHERE SEATSOCC < F~SEATSMAX
      AND CARRID = T_SPFLI-CARRID
      AND CONNID = T_SPFLI-CONNID
      AND FLDATE BETWEEN '19990101' AND '19990331'.
ENDSELECT.
```

##### 1.4.3.2 Using A Subquery 

> Runtime:992ms

```javascript
SELECT * FROM SFLIGHT AS F INTO SFLIGHT_WA
    WHERE SEATSOCC < F~SEATSMAX
      AND EXISTS ( SELECT * FROM SPFLI
                     WHERE CARRID = F~CARRID
                       AND CONNID = F~CONNID
                       AND CITYFROM = 'FRANKFURT'
                       AND CITYTO = 'NEW YORK' )
      AND FLDATE BETWEEN '19990101' AND '19990331'.
ENDSELECT.
```

##### 1.4.3.3 文档

> Instead of using nested Select loops or FOR ALL ENTRIES it is often 
> possible to use subqueries. Network load is considerably less. 

通常可以使用子查询，而不是使用嵌套的 select 循环或 select all 条目。
网络负载要少得多

## 2 Context

### 2.1.1 Supply/Demand vs. SELECT

#### 2.1.1.1 SELECT 

> Runtime:180ms

```javascript
SELECT * FROM SBOOK INTO SBOOK_WA UP TO 10 ROWS.
  SELECT SINGLE AIRPFROM AIRPTO INTO (AP1, AP2)
         FROM  SPFLI
         WHERE CARRID = SBOOK_WA-CARRID
         AND   CONNID = SBOOK_WA-CONNID.
  SELECT SINGLE NAME INTO NAME1 FROM  SAIRPORT
         WHERE ID = AP1.
  SELECT SINGLE NAME INTO NAME2 FROM  SAIRPORT
         WHERE ID = AP2.
ENDSELECT.
```

#### 2.1.1.2 Context (for durable data) 

> Runtime:176ms

```javascript
SELECT * FROM SBOOK INTO SBOOK_WA UP TO 10 ROWS.
  SUPPLY CARRID = SBOOK_WA-CARRID
         CONNID = SBOOK_WA-CONNID
             TO CONTEXT TRAV1.
  DEMAND AIRPFROM   = AP1
         AIRPTO     = AP2
         NAME_FROM  = NAME1
         NAME_TO    = NAME2
             FROM CONTEXT TRAV1.
ENDSELECT.
```

#### 2.1.1.3 文档

Context advantages: 
- no double fetch by DEMAND: 
  1. fetch
  2. get from buffer 
- more performance (best SELECT-statement) 

上下文优势：

- 不按需双取：
  1. 抓取
  2. 从缓冲区获取
- 更多性能（最佳选择语句）

### 2.2 Internal Tables

#### 2.2.1 Using explicit work area

##### 2.2.1.1 operation via header line 

> Runtime:0ms

```javascript
* Line width: 500
* The table is defined with HEADER LINE

ITAB = WA.
APPEND ITAB.
```

##### 2.2.1.2 explicit work area 

> Runtime:0ms

```javascript
* Line width: 500

APPEND WA TO ITAB.
```

##### 2.2.1.3 文档

> Avoid unnecessary MOVEs by using the explicit work area operations 
> APPEND  wa TO itab. INSERT  wa INTO itab. 

通过使用显式工作区操作 APPEND WA to ITAB 避免不必要的 MOVEs。
将 WA 插入 ITAB

#### 2.2.2 Linear search vs. binary search

##### 2.2.2.1 Linear search in an internal table 

> Runtime: 17ms

```javascript
* Entries: 1000, Line width: 100
*                Key width:   20
* The READ ends with SY-SUBRC=4

READ TABLE ITAB INTO WA
                WITH KEY K = 'X'.
```

##### 2.2.2.2 Binary search in an internal table 

> Runtime: 0ms

```javascript
* Entries: 1000, Line width: 100
*                Key width:   20
* The READ ends with SY-SUBRC=4

READ TABLE ITAB INTO WA
                WITH KEY K = 'X'
                BINARY SEARCH.
```
##### 2.2.2.3 文档

> If internal tables are assumed to have many (>20) entries, a linear 
 search through all entries is very time-consuming. 
 Try to keep the table ordered and use binary search 
 or used a table of type SORTED TABLE. 
 If TAB has n entries, linear search runs in O( n ) time, whereas 
 binary search takes only O( log2( n ) ). 
 
如果假定内部表有多个（>20）条目，则对所有条目进行线性搜索非常耗时。
尝试保持表的顺序，并使用二分搜索和使用排序表类型的表。
如果 tab 有 n 个条目，线性搜索将在 O(n) 时间内运行，而二进制搜索只需要 O(log2(n))

#### 2.2.3 Dynamic vs. static key access

##### 2.2.3.1 Dynamically specified key

> Runtime: 0ms

```javascript
* Entries: 10, Line width: 100
*              Key width:   20
* The READ ends with SY-SUBRC=4

READ TABLE ITAB INTO WA
                WITH KEY (NAME) = 'X'.
```
##### 2.2.3.2 Statically specified key 

> Runtime: 0ms

```javascript
* Entries: 10, Line width: 100
*              Key width:   20
* The READ ends with SY-SUBRC=4

READ TABLE ITAB INTO WA
                WITH KEY K = 'X'.
```

##### 2.2.3.3 文档

>  文档 
A dynamic key access is slower than a static one, since the key 
 specification must be evaluated at runtime. However, for large tables the costs are dominated by number of comparison needed to locate the entry. 
 
 动态 key 访问比静态 key 访问慢，因为密钥规范必须在运行时进行预估。但是，对于大型表，成本主要由定位条目所需的比较数量决定。

#### 2.2.4 Secondary indices

##### 2.2.4.1 No secondary index => linear search 

> Runtime: 8ms

```javascript
* Entries: 1000, Line width: 100
*                Key width:   20
* The READ locates the 500th entry.

READ TABLE ITAB INTO WA
     WITH KEY DATE = SY-DATUM.
IF SY-SUBRC = 0.
  " ...
ENDIF.
```

##### 2.2.4.2 Binary search using secondary index 

> Runtime: 0ms

```javascript
* Entries: 1000, Line width: 100
*                Key width:   20
* The READ locates the 500th entry.

READ TABLE SEC_IDX INTO  SEC_IDX_WA
     WITH KEY DATE = SY-DATUM
          BINARY SEARCH.
IF SY-SUBRC = 0.
  READ TABLE ITAB INTO WA
                  INDEX SEC_IDX_WA-INDX.
  " ...
ENDIF.
```

##### 文档

> If you need to access an internal table with different keys 
 repeatedly, keep your own secondary indices. 
 With a secondary index, you can replace a linear search with a 
 binary search plus an index access. 
 
如果需要重复访问具有不同键的内部表，请保留自己的二级索引。
使用二级索引，可以将线性搜索替换为二分搜索和索引访问。

#### 2.2.5 Key access to multiple lines

##### 2.2.5.1 Key access with LOOP/CHECK 

> Runtime: 8ms

```javascript
* Entries: 1000, Line width: 500
*                Key width:   20
* 5 entries of which match the key condition

LOOP AT ITAB INTO WA.
  CHECK WA-K = 'X'.
  " ...
ENDLOOP.
```

#####  2.2.5.2 Key access with LOOP ... WHERE 

> Runtime: 4ms

```javascript
* Entries: 1000, Line width: 500
*                Key width:   20
* 5 entries of which match the key condition

LOOP AT ITAB INTO WA WHERE K = 'X'.
  " ...
ENDLOOP.
```

##### 2.2.5.3 文档

> LOOP ... WHERE is faster than LOOP/CHECK because LOOP ... WHERE evaluates the specified condition internally. 
As with any logical expressions, the performance is better if the 
operands of a comparison share a common type. 
The performance can be further enhanced if LOOP ... WHERE is combined with FROM i1 and/or TO i2, if possible. 
 
LOOP ... WHERE 比 LOOP/CHEC 快，因为 LOOP… WHERE，在内部计算指定的条件。
与任何逻辑表达式一样，如果比较的操作数共享一个公共类型，则性能会更好。
如果 LOOP ... WHERE，如果可能，与 from i1 AND/OR to i2 组合。
 
#### 2.2.6 Sorted and Hashed Tables 

##### 2.2.6.1 Single Read: Sorted vs. hashed tables 

###### 2.2.6.1.1 READ on a unique sorted table 

> Runtime: 182 ms

```javascript
* Entries: 1000
* Line width: 100, key width: 20
* STAB is a unique sorted table, 250 entries are read

DO 250 TIMES.
  N = 4 * SY-INDEX.
  READ TABLE STAB INTO WA WITH TABLE KEY K = N.
  IF SY-SUBRC = 0.
    " ...
  ENDIF.
ENDDO.
```

###### 2.2.6.1.2 unique hashed table 

> Runtime: 130 ms

```javascript
* Entries: 1000
* Line width: 100, key width: 20
* HTAB is a hased table, 250 entries are read

DO 250 TIMES.
  N = 4 * SY-INDEX.
  READ TABLE HTAB INTO WA WITH TABLE KEY K = N.
  IF SY-SUBRC = 0.
    " ...
  ENDIF.
ENDDO.
```

###### 2.2.6.1.3 文档

> Entries in a sorted table are located by binary search. 
 The costs depend on the number of entries in the table (O (log n)). 
 Entries in a hashed table are located by an internal hash-algorithm 
 The costs are constant (O (1)), i.e. they do not depend on the table 
 size. 
 Hashed tables are optimized for single entry access, whereas sorted 
 tables are optimized for partial sequential loop operations (see the 
 separate example). 
 
排序表中的条目按二进制搜索定位。
成本取决于表中的条目数（o（log n））。
哈希表中的条目由内部哈希算法定位成本是恒定的（o（1）），即它们不依赖于表的大小。
哈希表针对单条目访问进行了优化，而排序表针对部分顺序循环操作进行了优化（请参见单独的示例）。
 
##### 2.2.6.2 Part. seq. access: Hashed vs. sorted

###### 2.2.6.2.1 Partial sequential access on a sorted table

> Runtime: 457 ms

```javascript
* Entries: 10000, Line width: 100
* key width: 60,  Subkey width: 20
* HTAB is a hashed table, 2000 entries are read
* Key fields: K, DATA

LOOP AT HTAB INTO WA WHERE K = SUBKEY.
  " ...
ENDLOOP.
```
 
###### 2.2.6.2.2 Partial sequential access on a sorted table

> Runtime: 282 ms

```javascript
* Entries: 10000, Line width: 100
* key width: 60,  Subkey width: 20
* STAB is a sorted table, 2000 entries are read
* Key fields: K, DATA

LOOP AT STAB INTO WA WHERE K = SUBKEY.
  " 循环排序表 读哈希表
ENDLOOP.
```

###### 2.2.6.2.3 文档

> Hashed tables are optimized for single entry access. The entries have
 no specific order. Therefore, a partial sequential access cannot be
 optimized. Every entry must be checked to match the condition
 (full table scan).
 Sorted tables are ordered ascendingly by their key components. If
 a partial key of the form "k1 = v1 AND ... AND kn = vn" where k1 .. kn
 matches a left part of the table key, the access is optimized by the
 kernel. In that case, only the matching entries are visited

哈希表针对单条目访问进行了优化。条目没有特定的顺序。因此，不能优化部分顺序访问。必须检查每个条目以匹配条件（全表扫描）。
排序表按其关键组件升序排列。如果“k1=v1”和…kn=vn“，其中k1..kn匹配表键的左边部分，访问由内核优化。在这种情况下，只访问匹配的条目。

#### 2.2.6.3 Building unique standard tables 

##### 2.2.6.3.1 One-step approach

> Runtime: 397 ms

```javascript
* Entries: 1000, Duplicates: 250
* Line width: 100, Key width: 20
* ITAB2 takes 750 entries with unique key K

REFRESH ITAB2.
LOOP AT ITAB1 INTO WA.
  READ TABLE ITAB2 WITH KEY K = WA-K
                   BINARY SEARCH
                   TRANSPORTING NO FIELDS.
  IF SY-SUBRC <> 0.
    INSERT WA INTO ITAB2
              INDEX SY-TABIX.
  ENDIF.
ENDLOOP.
```

##### 2.2.6.3.2 Three-steps: move, sort, delete dupl

> Runtime: 201 ms

```javascript
* Entries: 10000, Duplicates: 2500
* Line width: 100, Key width: 20
* ITAB2 takes 750 entries with unique key K

ITAB2[] = ITAB1[].
SORT ITAB2 BY K.
DELETE ADJACENT DUPLICATES FROM ITAB2
                           COMPARING K.
```

##### 2.2.6.3.3 文档

> If the data amount is small (< 20 entries), or if you need read- 
access to the internal table while it is being filled, the one-step 
approach using READ/INSERT is the right choice. 
If, however, the data amount is larger and you need read-access only to the completely-filled table, the three-step algorithm is preferable. See also the comparable test for SORTED vs. HASHED TABLEs 
 
如果数据量很小（<20个条目），或者在填充内部表时需要对其进行读取访问，则使用 read/insert 的一步方法是正确的选择。
但是，如果数据量较大，并且只需要对完全填充的表进行读访问，则最好使用三步算法。
另请参见排序表与哈希表的比较测试

#### 2.2.6.4 Building unique sorted/hashed tables

##### 2.2.6.4.1 INSERT in a sorted table with unique key

> Runtime: 297 ms

```javascript
* Entries: 1000, Duplicates: 250
* Line width: 100, Key width: 20
* ITAB2 takes 750 entries with unique key K

REFRESH ITAB2.
LOOP AT ITAB1 INTO WA.
  INSERT WA INTO TABLE ITAB2.
  IF SY-SUBRC <> 0.
    " ...
  ENDIF.
ENDLOOP.
```

##### 2.2.6.4.2 INSERT in a hashed table with unique key

> Runtime: 247 ms

```javascript
* Entries: 1000, Duplicates: 250
* Line width: 100, Key width: 20
* ITAB2 takes 750 entries with unique key K

REFRESH ITAB2.
LOOP AT ITAB1 INTO WA.
  INSERT WA INTO TABLE ITAB2.
  IF SY-SUBRC <> 0.
    " ...
  ENDIF.
ENDLOOP.
```

##### 2.2.6.4.3 文档

> You can use the same syntax (generic INSERT ... INTO TABLE ...) for 
 different types of tables (SORTED, HASHED). 
 Filling a sorted table is equivalent to building it up by "READ BINARY 
 SEARCH" and "INSERT ... INDEX SY-TABIX" but it is slightly faster and 
 more elegant to use the generic "INSERT ... INTO TABLE ...". See the 
 example for building a unique standard table, if you need no access 
 to the table while it is build up. 
 Filling a hash table is faster than for a sorted table. You can access 
 single entries very fast, but partial sequential loops are more 
 expensive than for sorted tables (see the separate example)

您可以使用相同的语法（通用插入…对于不同类型的表（排序、散列），请输入表…。
填充排序表相当于通过“读取二进制搜索”和“插入…索引 sy-tabix“，但是使用通用的“insert…”稍微快一些，而且更优雅一些。进入 Table ……。如果在构建唯一的标准表时不需要访问该表，请参见构建该表的示例。
填充哈希表比填充排序表更快。您可以非常快地访问单个条目，但部分顺序循环比排序表更昂贵（请参见单独的示例）

#### 2.2.6.5 Modifying single lines 

##### 2.2.6.5.1 Modifying the complete line

> Runtime: 0 ms

```javascript
* Line width: 500 * The complete line is moved.
 WA-DATE = SY-DATUM.
MODIFY ITAB FROM WA INDEX 1.
```

##### 2.2.6.5.2 Modifying selected components only

> Runtime: 0 ms

```javascript
* Line width: 500 * Only the 8 bytes of the selected * component are moved.
 WA-DATE = SY-DATUM.
MODIFY ITAB FROM WA INDEX 1 TRANSPORTING DATE.
```

##### 2.2.6.5.3 文档

> With the MODIFY variant "MODIFY itab ... TRANSPORTING f1 f2 ..."   the task of updating a line of an internal table can be accelerated.
 The longer the table line is, the larger the speed-up is. The effect   increases for tables with complex structured line types

使用修改变量“modify itab…传输 f1 f2…“可以加速更新内部表行的任务。
table line 越长，提速越大。对于具有复杂结构化行类型的表，效果会增加

#### 2.2.6.6 Using the Assigning Comand

##### 2.2.6.6.1 Modifying a set of lines directl

###### 2.2.6.6.1.1 Modifying all lines completely

> Runtime: 27 ms
```javascript
* Entries: 100 (outer table), 20 (inner table) * The entries to be modified: 50 * Actually, only the component FLAG is updated.
* However, the complete lines are moved.
 LOOP AT ITAB INTO WA.
  I = SY-TABIX MOD 2.
  IF I = 0.
    WA-FLAG = 'X'.
    MODIFY ITAB FROM WA.
  ENDIF.
ENDLOOP.
```

###### 2.2.6.6.1.2 Modifying selected components only

> Runtime: 7 ms

```javascript
* Entries: 100 (outer table), 20 (inner table) * Entries to be modified: 50 * The component FLAG is updated directly.
 LOOP AT ITAB ASSIGNING <WA>.
  I = SY-TABIX MOD 2.
  IF I = 0.
    <WA>-FLAG = 'X'.
  ENDIF.
ENDLOOP.
```

###### 2.2.6.6.1.3 文档

> Accessing the table entries directly in a "LOOP ... ASSIGNING ..."   accelerates the task of updating a set of lines of an internal table   considerably. Especially if inner tables must not be moved the   speed-up is high. 

直接在“循环”中访问表条目…分配…“大大加快了更新内部表的一组行的任务。特别是如果内表不能移动，速度会很快。

##### 2.2.6.6.2 Filling nested internal tables

###### 2.2.6.6.2.1 Bottom-up strategy

> Runtime: 53 ms

```javascript
* Entries: 50 (outer table), 10 (inner tables) * Line width: 500 (outer), 4 (inner)  DO 50 TIMES.
  CLEAR WA.
  DO 10 TIMES.
    APPEND N TO WA-INTTAB.
    ADD 1 TO N.
  ENDDO.
  APPEND WA TO ITAB.
ENDDO.
```

###### 2.2.6.6.2.2 Top-down strategy

> Runtime: 52 ms

```javascript
* Entries: 50 (outer table), 10 (inner tables) * Line width: 500 (outer), 4 (inner)  DO 50 TIMES.
  APPEND INITIAL LINE TO ITAB.
ENDDO.
LOOP AT ITAB ASSIGNING <F>.
  DO 10 TIMES.
    APPEND N TO <F>-INTTAB.
    ADD 1 TO N.
  ENDDO.
ENDLOOP.
```

###### 2.2.6.6.2.3 文档

> Filling an internal table with the bottom-up strategy, you have   to pay move costs several times depending on the depth of the data   structure. The contents of nested inner tables are moved to every   superordinate level of the data structure.
On the contrary, the top-down startegy fills the outer tables first   and updates the inner tables directly by using "LOOP ... ASSIGNING".
That is, the contents of inner tables are only moved once. 

用自下而上的策略填充一个内部表，您必须根据数据结构的深度支付好几次移动成本。嵌套的内部表的内容被移动到数据结构的每个上一级。
相反，自顶向下的 startegy 首先填充外部表，然后使用“loop…”直接更新内部表。分配”。
也就是说，内部表的内容只移动一次

#### 2.2.6.7 Building condensed tables

##### 2.2.6.7.1 COLLECT semantics using READ BINARY 

> Runtime: 680ms

```javascript
* TAB1: 1000 entries, Line width: 32
* 500 entries have different keys

LOOP AT ITAB1 INTO WA1.
  READ TABLE ITAB2 INTO WA2 WITH KEY K = WA1-K BINARY SEARCH.
  IF SY-SUBRC = 0.
    ADD: WA1-VAL1 TO WA2-VAL1,
         WA1-VAL2 TO WA2-VAL2.
    MODIFY ITAB2 FROM WA2 INDEX SY-TABIX TRANSPORTING VAL1 VAL2.
  ELSE.
    INSERT WA1 INTO ITAB2 INDEX SY-TABIX.
  ENDIF.
ENDLOOP.
```

##### 2.2.6.7.2 Collect via COLLECT 

> Runtime: 503ms

```javascript
* TAB1: 1000 entries, Line width: 32
* 500 entries have different keys

LOOP AT ITAB1 INTO WA.
  COLLECT WA INTO ITAB2.
ENDLOOP.
SORT ITAB2 BY K.
```

##### 2.2.6.7.3 文档

> If you need the COLLECT semantics, DO use COLLECT ! 
 READ BINARY runs in O( log2(n) ) time, and the internal table's 
 index must be adjusted with each INSERT. 
 COLLECT, however, uses a hash algorithm and is therefore independent 
 of the number of entries (i.e. O(1)) and does not need to maintain 
 a table index. If you need the final data sorted, sort it after 
 all data has been collected. 
 If the amount of data is small, the READ/INSERT approach isn't 
 bad, but for large amounts of data (> 1000), COLLECT is much faster. 
 Caution: When you fill an internal table, do not use COLLECT in 
 combination with any other table-filling statements (APPEND, INSERT, 
 MODIFY, SELECT * INTO TABLE and/or SELECT * APPENDING TABLE). If you 
 mix COLLECT with the other statements, COLLECT cannot use its hash 
 algorithm. In this case, COLLECT resorts to a normal linear search, 
 which is dramatically slower: O(n). 

如果您需要 collect 语义，请使用 collect！
读取二进制文件在o（log2（n））时间内运行，并且内部表的索引必须随每次插入而调整。
然而，collect 使用散列算法，因此独立于条目数（即o（1））并且不需要维护表索引。如果需要对最终数据进行排序，请在收集完所有数据后对其进行排序。
如果数据量很小，读/插入方法也不错，但是对于大量数据（>1000），收集速度要快得多。
注意：填充内部表时，不要将collect与任何其他表填充语句（append、insert、modify、select*into table 和 / 或 select*appending table）结合使用。如果将 collect 与其他语句混合使用，collect 将无法使用其哈希算法。在这种情况下， collect 使用普通的线性搜索，其速度要慢得多：o（n）。

#### 2.2.6.8 Array Operations

##### 2.2.6.8.1 Appending tables

###### 2.2.6.8.1.1 Pedestrian way to append a table 

```javascript
* Entries: 500 (ITAB1), 500 (ITAB2)
* Line width: 500
* ITAB1 is appended line by line to ITAB2.

LOOP AT ITAB1 INTO WA.
  APPEND WA TO ITAB2.
ENDLOOP.
```

###### 2.2.6.8.1.2 Let the kernel do the work 

```javascript
* Entries: 500 (ITAB1), 500 (ITAB2)
* Line width: 500
* ITAB1 is appended in one step to ITAB2.

APPEND LINES OF ITAB1 TO ITAB2.
```

###### 2.2.6.8.1.3 文档

> With the APPEND variant "APPEND LINES OF itab1 TO itab2" 
 the task of appending a table to another table can be transferred 
 to the kernel. 

通过附加变体“ITAB1到ITAB2的追加行”，将表追加到另一个表的任务可以转移到内核。

##### 2.2.6.8.2 Inserting tables

###### 2.2.6.8.2.1 Pedestrian way to insert a table 

> Runtime: 97ms

```javascript
* Entries: 500 (ITAB1), 500 (ITAB2)
* Line width: 500
* ITAB1 is inserted line by line into ITAB2 at index I.

I = 250.
LOOP AT ITAB1 INTO WA.
  INSERT WA INTO ITAB2 INDEX I.
  ADD 1 TO I.
ENDLOOP.
```

###### 2.2.6.8.2.2 Let the kernel do the work 

> Runtime: 6ms 

```javascript
* Entries: 500 (ITAB1), 500 (ITAB2)
* Line width: 500
* ITAB1 is inserted in one step into ITAB2 at index IDX.

I = 250.
INSERT LINES OF ITAB1 INTO ITAB2
                      INDEX I.
```

###### 2.2.6.8.2.3 文档

> With the INSERT variant "INSERT LINES OF itab1 INTO itab2 INDEX idx" the task of inserting a table into another table can be transferred to the kernel. 

将插入变量“Itab1插入到Itab2索引IDX”中，将表插入到另一个表中的任务可以转移到内核。

##### 2.2.6.8.3 Deleting duplicates

###### 2.2.6.8.3.1 way to delete duplicates 

> Runtime: 63ms

```javascript
* Entries: 1000, Line width: 100
* 500 pairs of duplictaes

READ TABLE ITAB INDEX 1 INTO PREV_LINE.
LOOP AT ITAB FROM 2 INTO WA.
  IF WA = PREV_LINE.
    DELETE ITAB.
  ELSE.
    PREV_LINE = WA.
  ENDIF.
ENDLOOP.
```

###### 2.2.6.8.3.2 Let the kernel do the work 

> Runtime: 10ms

```javascript
* Entries: 1000, Line width: 100
* 500 pairs of duplictaes

DELETE ADJACENT DUPLICATES FROM ITAB
                COMPARING K.
```

###### 2.2.6.8.3.3 文档

> With the DELETE variant "DELETE ADJACENT DUPLICATES" 
the task of deleting duplicate entries can be transferred to the kernel. 

##### 2.2.6.8.4 Deleting a sequence of lines

###### 2.2.6.8.4.1 Pedestrian way to delete a seq. of lines 

> Runtime: 5ms 

```javascript
* Entries: 1000, Line width 500
* Range to be deleted: 450 .. 550

DO 101 TIMES.
  DELETE ITAB INDEX 450.
ENDDO.
```

###### 2.2.6.8.4.2 Let the kernel do the work 

> Runtime

```javascript
* Entries: 1000, Line width 500
* Range to be deleted: 450 .. 550

DELETE ITAB FROM 450 TO 550.
```

###### 2.2.6.8.5.3 文档

> With the DELETE variant "DELETE itab FROM ... TO ..." the task of 
deleting a sequence of lines can be transferred to the kernel. 

##### 2.2.6.8.5 Copying internal tables

###### 2.2.6.8.5.1 Pedestrian way to copy internal tables 

> Runtime: 11 us

```javascript
* Entries: 100, Line width 100

REFRESH ITAB2.
LOOP AT ITAB1 INTO WA.
  APPEND WA TO ITAB2.
ENDLOOP.
```

###### 2.2.6.8.5.2 Let the kernel do the work

> Runtime: 0 us

```javascript
* Entries: 100, Line width 100

ITAB2[] = ITAB1[].
```

###### 2.2.6.8.5.3 文档

> Internal tables can be copied by MOVE just like any other data 
object. If an internal table itab has a header line, the table itself is accessed by itab[]. 
 
##### 2.2.6.8.6 Comparing internal tables

###### 2.2.6.8.6.1 Pedestrian way to compare int. tables 

> Runtime: 47 us

```javascript
* Entries: 100, Line width: 100
* Both tables have the same contents

DESCRIBE TABLE: ITAB1 LINES L1,
                ITAB2 LINES L2.

IF L1 <> L2.
  TAB_DIFFERENT = 'X'.
ELSE.
  TAB_DIFFERENT = SPACE.
  LOOP AT ITAB1 INTO WA1.
    READ TABLE ITAB2 INTO WA2 INDEX SY-TABIX.
    IF WA1 <> WA2.
      TAB_DIFFERENT = 'X'. EXIT.
    ENDIF.
  ENDLOOP.
ENDIF.

IF TAB_DIFFERENT = SPACE.
  " ...
ENDIF.
```

###### 2.2.6.8.6.2 Let the kernel do the work ... 

> Runtime: 5 us

```javascript
* Entries: 100, Line width: 100
* Both tables have the same contents

IF ITAB1[] = ITAB2[].
  " ...
ENDIF.
```

###### 2.2.6.8.6.3 文档

> Internal tables can be compared in logical expressions just like 
 other data objects. 
 Two internal tables are equal if 
- they have the same number of lines and 
- each pair of corresponding lines is equal. 
 If an internal table itab has a header line, the table itself is 
 accessed by itab[]. 

#### 2.2.6.9 Sorting internal tables

##### 2.2.6.9.1 with default sort key 

> Runtime: 47 us

```javascript
* Entries: 100, Line width: 500
* Key width: 492

SORT ITAB.
```

##### 2.2.6.9.2 Sort with sort key specified explicitly

> Runtime: 7 us

```javascript
* Entries: 100, Line width: 500
* Key width: 20

SORT ITAB BY K.
```

##### 2.2.6.9.3 文档

> The more restrictively you specify the sort key, the faster the 
 program will run. 
 Therefore, specify the sort key as restrictively as possible. 

#### 2.2.6.10 Sorting internal tables

#### 2.2.6.11 Simple ALgotithms

##### 2.2.6.11.1 Joining internal tables 

##### 2.2.6.11.1.1 Naive join: loop ITAB1, read ITAB2 w/key 

> Runtime: 407 us

```javascript
* Entries: 1000 (ITAB1), 300 (ITAB2)
* Line width: 100
* Both tables sorted by unique key K ascending

LOOP AT ITAB1 INTO WA1.
  READ TABLE ITAB2 INTO WA2
             WITH KEY K = WA1-K BINARY SEARCH.
  IF SY-SUBRC = 0.
    " ...
  ENDIF.
ENDLOOP.
```

##### 2.2.6.11.1.2 More sophisticated: use parallel 

> Runtime: 144 us

```javascript
* Entries: 1000 (ITAB1), 300 (ITAB2)
* Line width: 100
* Both tables sorted by unique key K ascending
DATA: I TYPE I.

I = 1.
LOOP AT ITAB1 INTO WA1.
  do.
    READ TABLE ITAB2 INTO WA2 INDEX I.
    IF SY-SUBRC <> 0. EXIT. ENDIF.
    IF WA2-K < WA1-K. " had sorted
      ADD 1 TO I.
    ELSEIF WA2-K = WA1-K.
      " ...
      ADD 1 TO I.
      EXIT.
    ELSE.
      EXIT.
    endif.
  enddo.
  if sy-subrc <> 0. exit. endif.
ENDLOOP.
```

##### 2.2.6.11.1.3 文档

> If ITAB1 has n1 entries and ITAB2 has n2 entries, the time needed for 
 joining ITAB1 and ITAB2 with the straightforward algorithm is 
 O( n1 * log2( n2 ) ), whereas the parallel cursor approach takes only 
 O( n1 + n2 ) time. 
 The above parallel cursor algorithm assumes that ITAB2 is a secondary 
 table containing only entries also contained in primary table ITAB1. 
 If this assumption does not hold, the parallel cursor algorithm 
 gets slightly more complicated, but its performance characteristics 
 remain the same. 

##### 2.2.6.11.2 Nested loops 

##### 2.2.6.11.2.1 Straightforward nested loop 

> Runtime: 3827 us

```javascript
* Entries: 100 (ITAB1), 1000 (ITAB2)
* Line width: 100
* Both tables sorted by key K

LOOP AT ITAB1 INTO WA1.
  LOOP AT ITAB2 INTO WA2
                WHERE K = WA1-K.
    " ...
  ENDLOOP.
ENDLOOP.
```

##### 2.2.6.11.2.2 More sophisticated loop: parallel cursors 

> Runtime: 99 us

```javascript
* Entries: 100 (ITAB1), 1000 (ITAB2)
* Line width: 100
* Both tables sorted by key K

I = 1.
LOOP AT ITAB1 INTO WA1.
  LOOP AT ITAB2 INTO WA2 FROM I.
    IF WA2-K <> WA1-K.
      I = SY-TABIX.
      EXIT.
    ENDIF.
    " ...
  ENDLOOP.
ENDLOOP.
```

##### 2.2.6.11.2.2 文档

> If ITAB1 has n1 entries and ITAB2 has n2 entries, the time needed for 
 the nested loop with the straightforward algorithm is O(n1 * n2), 
 whereas the parallel cursor approach takes only O(n1 + n2) time. 
 The above parallel cursor algorithm assumes that ITAB2 contains only 
 entries also contained in ITAB1. 
 If this assumption does not hold, the parallel cursor algorithm 
 gets slightly more complicated, but its performance characteristics 
 remain the same. 

##### 2.2.6.11.3 Intersection of internal tables

##### 2.2.6.11.3.1 Using a sorted table temporarily 

> Runtime: 43 us

```javascript
* Entries: 200 (ITAB1), 100 (ITAB2)
* Intersection: 50 (ITAB3)
* Line width: 100, Key width: 20

STAB1 = ITAB1.
REFRESH ITAB3.
LOOP AT ITAB2 ASSIGNING <WA>.
  READ TABLE STAB1 FROM <WA>
                   TRANSPORTING NO FIELDS.
  IF SY-SUBRC = 0.
    APPEND <WA> TO ITAB3.
  ENDIF.
ENDLOOP.
FREE STAB1.
```

##### 2.2.6.11.3.2 Using a hashed table temporarily 

> Runtime: 45 us

```javascript
* Entries: 200 (ITAB1), 100 (ITAB2)
* Intersection: 50 (ITAB3)
* Line width: 100, Key width: 20

HTAB1 = ITAB1.
REFRESH ITAB3.
LOOP AT ITAB2 ASSIGNING <WA>.
  READ TABLE HTAB1 FROM <WA>
                   TRANSPORTING NO FIELDS.
  IF SY-SUBRC = 0.
    APPEND <WA> TO ITAB3.
  ENDIF.
ENDLOOP.
FREE HTAB1.
```

##### 2.2.6.11.3.3 文档

> The source tables ITAB1 and ITAB2 are standard tables. It is assumed 
 that ITAB1 takes more entries than ITAB2. Otherwise, the table with 
 more entries must be computed with "DESCRIBE TABLE ... LINES ...". 
 Since both tables shall represent sets, it is assumed that their 
 entries are unique with respect to component K. 
 
 The algorithm works with a temporary table with unique key K. The 
 table is a copy of ITAB1 and is used to locate the entries beeing 
 also contained in ITAB2. The matching entries are copied to ITAB3. 
 The left-hand and right-hand side differ only by the kind of the 
 temporary table being used. For a hashed table, the READ statement 
 in the LOOP is faster than for the sorted table. 

### 3 Typing

#### 3.1 Typed vs. untyped Parameters

##### 3.1.1 Untyped parameters 

```javascript
PERFORM UP1 USING 10 M6-DIMID M6-ZAEHL M6-ISOCODE M6-ANDEC M6-PRIMARY.

FORM UP1 USING
               REPEAT
               DIMID
               ZAEHL
               ISOCODE
               ANDEC
               PRIMARY.
* Identical source code left and right:
 DO REPEAT TIMES.
   T006_WA-DIMID   = DIMID.
   T006_WA-ZAEHL   = ZAEHL.
   T006_WA-ISOCODE = ISOCODE.
   T006_WA-ANDEC   = ANDEC.
   T006_WA-PRIMARY = PRIMARY.
 ENDDO.
ENDFORM.
```

##### 3.1.2 Typed parameters 

```javascript
PERFORM UP2 USING 10 M6-DIMID M6-ZAEHL M6-ISOCODE M6-ANDEC M6-PRIMARY.

FORM UP2 USING
              REPEAT   TYPE I
              DIMID    LIKE T006-DIMID
              ZAEHL    LIKE T006-ZAEHL
              ISOCODE  LIKE T006-ISOCODE
              ANDEC    LIKE T006-ANDEC
              PRIMARY  LIKE T006-PRIMARY.
* Identical source code left and right:
 DO REPEAT TIMES.
   T006_WA-DIMID   = DIMID.
   T006_WA-ZAEHL   = ZAEHL.
   T006_WA-ISOCODE = ISOCODE.
   T006_WA-ANDEC   = ANDEC.
   T006_WA-PRIMARY = PRIMARY.
  ENDDO.
ENDFORM.
```

##### 3.1.3 文档

> If you specify the type for formal parameters in your source code, 
 the ABAP/4 compiler can optimize your code more thoroughly. 
 In addition, the risk of using the wrong sequence of parameters in a 
 Perform statement is much less. 

#### 3.2 Typed vs untyped Field-Symbols 

##### 3.2.1 Field-Symbol without type 

```javascript
FIELD-SYMBOLS: <F> TYPE ANY.
DATA: I1 TYPE I, I2 TYPE I.

ASSIGN I1 TO <F>.

I2 = <F>.
```

##### 3.2.2 Typed Field-Symbol 

```javascript
FIELD-SYMBOLS: <I> TYPE I.
DATA: I1 TYPE I, I2 TYPE I.

ASSIGN I1 TO <I>.

I2 = <I>.
```

##### 3.3.3 文档

> If you specify the type of field-symbols and formal parameters in your 
 source code, the ABAP/4 compiler can better optimize your code. 

如果你给定指针和参数类型在你的代码，ABAP/4 编译器能够更好的优化你的代码

### 4 IF,Case...

#### 4.1 If Vs Case...

##### 4.1.1 IF

```javascript
DATA C TYPE C.
 IF     C = 'A'.   WRITE '1'.
 ELSEIF C = 'B'.   WRITE '2'.
 ELSEIF C = 'C'.   WRITE '3'.
 ELSEIF C = 'D'.   WRITE '4'.
 ELSEIF C = 'E'.   WRITE '5'.
 ELSEIF C = 'F'.   WRITE '6'.
 ELSEIF C = 'G'.   WRITE '7'.
 ELSEIF C = 'H'.   WRITE '8'.
 ENDIF.
```

##### 4.1.2 CASE 

```javascript
DATA C TYPE C.
 CASE C.
   WHEN 'A'. WRITE '1'.
   WHEN 'B'. WRITE '2'.
   WHEN 'C'. WRITE '3'.
   WHEN 'D'. WRITE '4'.
   WHEN 'E'. WRITE '5'.
   WHEN 'F'. WRITE '6'.
   WHEN 'G'. WRITE '7'.
   WHEN 'H'. WRITE '8'.
 ENDCASE.
```

##### 4.1.3 文档

> CASE statements are clearer and a little faster than 
 IF-constructions. 

CASE 语句更整洁而且较快于 IF 结构

#### 4.2 Comparison of I and C 
##### 4.2.1 IF i = c 

```javascript
 DATA C(8) TYPE C.
 IF 12345678 = C.
 ENDIF.
```

##### 4.2.2 IF c = c 

```javascript
 DATA C(8) TYPE C.
 IF '12345678' = C.
 ENDIF.
```

##### 4.2.3 文档
> Comparing C with C ist faster as comparing C with a great number 
字符之间的比较比字符与数字之间的比较更快


#### 4.3 While vs. Do 

##### 4.3.1 Do

```javascript
 DATA C TYPE C. DATA I TYPE I.
 I = 0.
 DO.
    IF C NE SPACE. EXIT. ENDIF.
    ADD 1 TO I.
    IF I GT 10. C = 'X'. ENDIF.
 ENDDO.
```

##### 4.3.2 While 

```javascript
 DATA C TYPE C. DATA I TYPE I.
 I = 0.
 WHILE C = SPACE.
    ADD 1 TO I.
    IF I GT 10. C = 'X'. ENDIF.
 ENDWHILE.
```

##### 4.3.3 文档

> If you can use WHILE instead of a DO+EXIT-construction, then do so. 
 WHILE is easier to understand and faster to execute. 

如果你用 WHILE 代替 DO+EXIT-construction，可以这么做。WHILE 简单快速。

#### 4.4 Case vs. Perform i Of ... 

##### 4.4.1 Case 

```javascript
*  (I = 5 in this test)
 CASE I.
  WHEN 1. PERFORM PV1.
  WHEN 2. PERFORM PV2.
  WHEN 3. PERFORM PV3.
  WHEN 4. PERFORM PV4.
  WHEN 5. PERFORM PV5.
  WHEN 6. PERFORM PV6.
  WHEN 7. PERFORM PV7.
  WHEN 8. PERFORM PV8.
 ENDCASE.
```

##### 4.4.2 Perform i Of ... 

```javascript
*  (I = 5 in this test)
 PERFORM I OF
             PV1
             PV2
             PV3
             PV4
             PV5
             PV6
             PV7
             PV8.
```

##### 4.4.3 文档

> A very fast way to call a certain routine using a given 
 index is the Perform i Of ... statement. 

Perform i of ... 语法调用一定的 routine 使用给定的索引是一个非常快的方式

### 5 Field Conversion 

#### 5.1 Field Types I and P 

##### 5.1.1 Type P 

```javascript
DATA P TYPE P VALUE 1.

READ TABLE TAB INTO TAB_WA INDEX P.
```

##### 5.1.2 Type I 

```javascript
DATA I TYPE I VALUE 1.

READ TABLE TAB INTO TAB_WA INDEX I.
```

##### 5.1.3 文档

> Use fields of type I for typical integral variables like indices. 

像索引这样的类型 I 变量 使用 I 字段

#### 5.2 Literals Type C and Type I 

##### 5.2.1 Type C 

```javascript
 MOVE SPACE TO SY-SUBRC.
 CASE SY-SUBRC.
   WHEN '1'.
   WHEN '2'.
   WHEN '3'.
   WHEN '4'.
  ENDCASE.
```

##### 5.2.2 Type I 

```javascript
 SY-SUBRC = 0.
 CASE SY-SUBRC.
   WHEN 1.
   WHEN 2.
   WHEN 3.
   WHEN 4.
 ENDCASE.
```

##### 5.2.3 

> Use numeric literals or named constants with a number type 
 instead of character strings if you are dealing with type-I 
 or integral type-P fields. 

使用数字文字或带数字类型的命名常量而不是字符串，如果您正在处理I型或整数 P 型字段

#### 5.4 Constants Type F 

##### 5.4.1 Literal Type C 

```javascript
DATA:
  FLOAT TYPE F.

  FLOAT = '3.1415926535897932'.
```

##### 5.4.2 Constant Type F

```javascript
CONSTANTS:
  PI TYPE F VALUE '3.1415926535897932'.
DATA:
  FLOAT TYPE F.

  FLOAT = PI.
```

##### 5.4.3 文档

> Use properly typed constants instead of literals. 
使用适当的常量代替字面上

### 5.5 Arithmetic 

#### 5.5.1 Type N 

```javascript
 DATA:
   N1(15) TYPE N VALUE '123456789012345',
   N2(15) TYPE N VALUE '543210987654321',
   N3(15) TYPE N.

   N3 = N1 + N2.
```

#### 5.5.2 Type P

```javascript
 DATA:
   P1     TYPE P VALUE '123456789012345',
   P2     TYPE P VALUE '543210987654321',
   P3     TYPE P.

   P3 = P1 + P2.
```

#### 5.5.3 文档

> Use number types for arithmetic. Use type-N fields only for pure 
 digit strings that are not intended for calculations, e.g., 
 telephone numbers or parts of a date or time field. 

计数使用数字类型。使用的 N 类型的场景是不是计算的纯数值，例如电话号码和日期或时间的部分字段

### 5.6 Mixed Types 

#### 5.6.1 Several Types 

```javascript
 DATA: F1 TYPE I VALUE 2,
       F2 TYPE P DECIMALS 2 VALUE '3.14',
       F3 TYPE F.

 F3 = F1 * F2.
```

#### 5.6.2 Only One Type 

```javascript
 DATA: F1 TYPE F VALUE 2,
       F2 TYPE F            VALUE '3.14',
       F3 TYPE F.

 F3 = F1 * F2.
```

#### 5.6.3 文档

> Don't mix types unless absolutely necessary. 
不使用混合类型除非十分必要

## 6 Character/String Manipulation 

### 6.1 fixed and unfixed length strings 

#### 6.1.1 Character fields (fixed length) 

```javascript
*data c1(200) type c.
*data c2(200) type c.
*data c3(400) type c.

c1 = 'mysap'.
c2 = '.com'.
concatenate c1 c2 into c3.
```

#### 6.1.2 String (unfixed length) 

```javascript
*data string1 type string.
*data string2 type string.
*data string3 type string.

string1 = 'mysap'.
string2 = '.com'.
concatenate string1 string2 into string3.
```

#### 6.1.3 文档

> Depending on the length of the character field, 
 string operation may be faster. 
 The concatenate algorithm has to compute the length of the fixed character fields by scanning the first 
 non-blank character from the end. 

依赖于长度的字符字段， string 运行可能更快
连接器的算法必须从第一个非空格字符到结尾扫描定长字符来计算长度

## 7 ABAP object

### 7.1 Methods vs Subroutines 

#### 7.1.1 Calling local Subroutines 

```javascript
perform F1.
```

#### 7.1.2 Calling Methods of local Classes 

```javascript
call method C1=>M1.
```

#### 7.1.3 文档

> There is no performance loss when you call local methods compared to 
 local subroutines 

与调用本地方法相比，调用本地方法不会造成性能损失局部子程序

### 7.2 Methods vs Function Modules 

#### 7.2.1 Calling Function Modules 

```javascript
call function 'FUNCTION1'.
```

#### 7.2.2 Calling Methods of global Classes  

```javascript
call method CL_PERFORMANCE_TEST=>M1.
```

#### 7.2.3 文档

> Calling methods of global classes is faster than calling 
 function modules 

调用全局类方法比调用方法块快

### 7.3 Local Methods vs global Methods 

#### 7.3.1 Calling local Methods 

```javascript
call method C1=>M1.
```

#### 7.3.2 Calling global Methods 

```javascript
call method CL_PERFORMANCE_TEST=>M1.
```

#### 7.3.3 文档

> Calling global methods is not much slower compared to 
 calling local methods 

调用全局方法不比调用本地方法慢太多









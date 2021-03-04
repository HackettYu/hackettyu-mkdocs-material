---
title: ABAP code indentation
description: ABAP 代码缩进风格参考
redirect: 2020-08-20-ABAP-code-indent
---

> description: ABAP 代码缩进风格参考

## 1. Introduction

ABAP 的代码缩进不同于许多其它语言，因为语法的原因可能导致一行代码超级长，也可能是因为缩进的原因导致排版不一致

建议写 ABAP 的时候用两个空格缩进而不是 TAB

**Example**

```diff
+ xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx = xxxxx(
+   xxx  = xxx
+   xxxx = xxxx 
+ ).

- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx =
-   xxxxx(
-     xxx  = xxx
-     xxxx = xxxx ).
```

如果换行，缩进在参数的下方

```diff
+ DATA(sum) = add_two_numbers(
+                 value_1 = 5
+                 value_2 = 6 ).

+ DATA(result) = merge_structures( a = VALUE #( field_1 = 'X'
+                                               field_2 = 'A' )
+                                  b = NEW /clean/structure_type( field_3 = 'C'
+                                                                 field_4 = 'D' ) ).

- DATA(sum) = add_two_numbers(
-     value_1 = 5
-     value_2 = 6 ).
```

关键字用两个空格缩进，参数用四个空格

```diff
+ DATA(sum) = add_two_numbers(
+               EXPORTING
+                 value_1 = 5
+                 value_2 = 6
+               CHANGING
+                 errors  = errors ).

- DATA(sum) = add_two_numbers(
-                 EXPORTING
-                     value_1 = 5
-                     value_2 = 6
-                 CHANGING
-                     errors  = errors ).
```

## 2. Statements

### 2.1 TYPE Statement
变量定义不必对齐 TYPE 关键字

```diff
+ DATA name   TYPE seoclsname.
+ DATA reader TYPE REF TO /clean/reader.

- DATA name   TYPE seoclsname.
- DATA reader TYPE REF TO /clean/reader.

DATA(ptab) = VALUE abap_parmbind_tab( ( name  = 'USERNAME'
                                        kind  = cl_abap_objectdescr=>exporting
                                        value = REF #( sy-uname ) )
                                      ( name  = 'RESULT'
                                        kind  = cl_abap_objectdescr=>returning
                                        value = REF #( <profiles> ) ) ).
```

### 2.2 IF Statement

```diff
+ IF X EQ 1
+   AND X NE 2.
+   ...
+ ENDIF.

- IF X EQ 1 AND X NE 2.
-   ...
- ENDIF.

IF result IS INITIAL.
  result = config

ELSEIF result-prio = config-prio AND
    result-threshold GE config-threshold.
  result = config

ELSEIF result-threshold LE config-threshold AND
       ( ( result-prio = 'W' AND config-prio = 'E' ) OR
         ( result-prio = 'N' AND config-prio = 'E' ) OR
         ( result-prio = 'N' AND config-prio = 'W' ) ).
  result = config.
ENDIF.
```

### 2.3 LOOP Statement

```diff
+ LOOP itab INTO DATA(line)
+   WHERE field NE `name`.
+   ...
+ ENDLOOP.

- LOOP itab INTO DATA(line) WHERE field NE `name`.
-   ...
- ENDLOOP.
```

### 2.4 TRY Statement

```diff
# should
TRY .
  ...
  CATCH.
    ...
ENDTRY.
```

常见转换异常

| Exeception                     | Description                                              |
| ------------------------------ | -------------------------------------------------------- |
| CX_SY_CONVERSION_CODEPAGE      | System exception in character set conversion             |
| CX_SY_CONVERSION_CODEPAGE_EX   | System exception in character set conversion             |
| CX_SY_CONVERSION_DATA_LOSS     | Exception for Conversions Where Data Is Lost             |
| CX_SY_CONVERSION_ERROR         | System exception in conversion errors                    |
| CX_SY_CONVERSION_EXACT_NOT_SUP | Forbidden Type/Length Combination for MOVE EXACT         |
| CX_SY_CONVERSION_INEXACT_FLTP  | For Type F Only Integers of up to 15 Digits Allowed      |
| CX_SY_CONVERSION_LOST_DECIMALS | Exception for Conversions with Loss of Decimal Places    |
| CX_SY_CONVERSION_NO_BOOLEAN    | System Exception for Conversion Error in xsd:boolean     |
| CX_SY_CONVERSION_NO_DATE       | System Exception when Changing a Date                    |
| CX_SY_CONVERSION_NO_DATE_TIME  | System Exception for Data and Time Conversions           |
| CX_SY_CONVERSION_NO_ENUM_VALUE | System exception in transformation of an enumeration val |
| CX_SY_CONVERSION_NO_NUMBER     | System exception in transformation to a number           |
| CX_SY_CONVERSION_NO_QNAME      |                                                          |
| CX_SY_CONVERSION_NO_RAW        | System exception for overflow in conversion              |
| CX_SY_CONVERSION_NO_TIME       | System Exception when Changing a Time                    |
| CX_SY_CONVERSION_NO_UUID       | System Exception for UUID Conversions                    |
| CX_SY_CONVERSION_OVERFLOW      | System exception for overflow in conversion              |
| CX_SY_CONVERSION_ROUNDING      | Rounding Necessary                                       |
| CX_SY_CONVERSION_SRC_TOO_SHORT | Source Data too short for MOVE EXACT                     |
| CX_SY_CONVERSION_UNKNOWN_CURR  | Conversion error in currency unit                        |
| CX_SY_CONVERSION_UNKNOWN_LANGU | Conversion Error at Language Key                         |
| CX_SY_CONVERSION_UNKNOWN_UNIT  | Conversion error in unit of measurement                  |

### 2.5 INSERT Statement

```diff
+ INSERT VALUE #( char = value
+                 elem = me ) INTO TABLE char_tab.

- INSERT VALUE #( char = value elem = me ) INTO TABLE char_tab.

- INSERT VALUE #( char = value
-                 elem = me ) 
-   INTO TABLE char_tab.
```

### 2.6 CASE Statement

```abap
CASE option.
  
  WHEN A.
    ...
  
  WHEN B.
    ...

  WHEN C.
    ...

ENDCASE.
```

### 2.7 TYPES Statement

```diff
+ TYPES:
+   BEGIN OF t_point,
+     x TYPE i,
+     y TYPE i,
+   END OF t_point,
+   t_points TYPE STANDARD TABLE OF t_point WITH DEFAULT KEY.

- TYPES: BEGIN OF ts_fullpath,
-          title  TYPE string,
-          name   TYPE string,
-          ext    TYPE string,
-          path   TYPE string,
-          filter TYPE string,
-        END OF ts_fullpath.
```

### 2.8 SELECT Statement

```abap
SELECT SINGLE * 
  FROM ztable 
  INNER JOIN bkpf ON ztable~bukrs EQ bkpf~bukrs
                 AND ztable~belnr EQ bkpf~belnr
                 AND ztable~gjahr EQ bkpf~gjahr
  WHERE ztable~bukrs                 EQ gt_help_tab-bukrs
    AND ztable~hkont                 EQ gt_help_tab-hkont
    AND ztable~dekont_no             EQ u_out-dekont_no
    AND ztable~fiziksel_islem_tarihi EQ '01012018'
    AND ztable~gjahr                 EQ u_ut-year(4)
    AND ztable~stblg                 EQ ''
  INTO CORRESPONDING FIELDS OF ls_doc.
```

### 2.9 PERFORM Statement

```abap
PERFORM get_type 
  USING '1' '2' '3' 
  TABLES it_table 
  C lv_char.
```
## 3. References

- Issue github:SAP/styleguides#21
- [https://github.com/SAP/styleguides/issues/21#issuecomment-489989967](https://github.com/SAP/styleguides/issues/21#issuecomment-489989967)
- [https://github.com/SAP/styleguides/blob/012d2e8bdc19de321ed51c1a2310dd07e4f87de3/clean-abap/CleanABAP.md](https://github.com/SAP/styleguides/blob/012d2e8bdc19de321ed51c1a2310dd07e4f87de3/clean-abap/CleanABAP.md)
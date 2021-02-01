# ABAP RFC 笔记

## 基础

### 常见 RFC 类型
 
1. sRFC 同步 RFC
2. aRFC 异步 RFC
3. tRFC 事务 RFC
4. qRFC 队列 RFC
5. bgRFC 后台 RFC

### RFC 的限制

1. sRFC 里面不应该使用 Open SQL 语法 open 或 close database cursor

> For each call that is made using synchronous RFC, a database commit is performed. For this reason, a synchronous RFC must not be used between Open SQL statements that open or close a database cursor

2. 远程 RFC 不应该用语法提前关闭连接，eg: LEAVE PROGRAM, or SUBMIT without the addition RETURN

> In a remotely called function module, you must not use statements that close the current context and thus the connection. An example of this is the statement LEAVE PROGRAM, or SUBMIT without the addition RETURN

3. dynpro 和选择屏幕的 sRFC 可以使用 LEAVE TO LIST-PROCESSING 语法退出

> In the case of a synchronous RFC, dynpros and selection screens that are called in a remotely-called function module are displayed in the calling system if the calling program is executed in dialog processing, and if the user defined in the destination has dialog authorization. The screen data is transmitted by the RFC interface to the calling system. In this particular case, you can display lists that are written in a remotely-called function module by using LEAVE TO LIST-PROCESSING

4. 由于 RFC 只使用传递值，当发生异常时，你永远无法访问同步RFC时的临时结果

> As only pass by value is used for the RFC, when exceptions do occur, you can never access interim results when a synchronous RFC is made

5. Information messages are warnings are handled in the same way as status messages

### 常见 RFC 的 Exceptions

- SYSTEM_FAILURE

    This exception reports all failures and system problems on the remote machine.

- COMMUNICATION_FAILURE

    This exception is raised when a connection or communications failure occurs. It does not report system problems (for example, abnormal termination) that occur on the remote machine.

### sRFC

Parameter list

- [EXPORTING p1 = a1 ... pn = an]
- [IMPORTING p1 = a1 p2 = a2 ...]
- [CHANGING p1 = a1 p2 = a2 ...]
- [TABLES t1 = itab1 t2 = itab2 ...]
- [EXCEPTIONS exc1 = n1 exc2 = n2 .. [MESSAGE mess]
- [OTHERS = n_others] ]

### aRFC

STARTING NEW TASK => the system starts the function in a new session

Client System

```abap

CALL FUNCTION Remotefunction

STARTING NEW TASK Taskname

DESTINATION Dest
```

Server System

```abap
FUNCTION Remotefunction.

CALL SCREEN 100.

ENDFUNCTION.
```

### tRFC

Key tRFC Concepts
To call a tRFC, the following syntax is used:

```abap
CALL FUNCTION <func_name> IN BACKGROUND TASK
    [AS SEPARATE UNIT]
    [DESTINATION <dest>]
    <parameter_list>.
```

To close (and execute) a tRFC LUW, call COMMIT WORK

## RFC 回调

> CALL FUNCTION... DESTINATION 'BACK'
![](https://help.sap.com/saphelp_nw73/helpdata/en/48/99b960ee2b73e7e10000000a42189b/loio2423a4f8bdd8420d88604c056f1c0436_LowRes.png)


## Reference

- https://help.sap.com/saphelp_nw73/helpdata/en/48/920837feb35ed2e10000000a42189d/
- https://wiki.scn.sap.com/wiki/display/CPP/transactional+RFCs#transactionalRFCs-frameworkObjects

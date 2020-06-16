# ABAP 日志处理

原生代码

``` ABAP
DATA: header TYPE bal_s_log,
      handle TYPE balloghndl,
      handles_to_save TYPE bal_t_logh.

header-object = 'ZINTERFACES'.
header-subobject = 'ACCOUNTING'.
header-extnumber = 'Stuff imported from legacy systems'.

CALL FUNCTION 'BAL_LOG_CREATE'
  EXPORTING
    i_s_log      = header
  IMPORTING
    e_log_handle = handle.

CALL FUNCTION 'BAL_LOG_MSG_ADD_FREE_TEXT'
  EXPORTING
    i_log_handle = handle
    i_msgty = 'E'
    i_text = 'You see, what had happened was...'.

CALL FUNCTION 'BAL_DB_SAVE'
  EXPORTING
    i_t_log_handle = handles_to_save.
```

也可以看 demo 程序`SBAL_DEMO_01`
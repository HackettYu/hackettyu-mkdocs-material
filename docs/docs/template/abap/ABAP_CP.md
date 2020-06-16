# ABAP SELECT 语句的模糊查询

``` abap
RANGES: s_name FOR zifs_requestinfo-name.

CONCATENATE lv_value '*' INTO lv_name.

IF is_requestinfo-name IS NOT INITIAL.
  s_name-sign   = 'I'.
  s_name-option = 'CP'. " 模糊查询
  s_name-low    = lv_name.
  APPEND s_name.
ENDIF.

```

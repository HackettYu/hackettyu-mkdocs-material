# ABAP nested looping

> 在需要嵌套循环一个一对一关系的两张内表的时候，直接的嵌套其实可以优化

嵌套循环的写法

``` abap
SORT lt_bkpf BY bukrs belnr gjahr.
SORT lt_bseg BY bukrs belnr gjahr.
LOOP AT lt_bkpf ASSIGNING <ls_bkpf>.
  READ TABLE lt_bseg TRANSPORTING NO FIELDS WITH KEY
      bukrs = <ls_bkpf>-bukrs
      belnr = <ls_bkpf>-belnr
      gjahr = <ls_bkpf>-gjahr BINARY SEARCH.
  CHECK sy-subrc = 0.
  LOOP AT lt_bseg ASSIGNING <ls_bseg> FROM sy-tabix.
    lv_counter = lv_counter + 1.
** Your logic **
    AT END OF gjahr.
      EXIT.
    ENDAT.
  ENDLOOP.
ENDLOOP.
```

单个循环的写法

``` abap
SORT lt_bkpf BY bukrs belnr gjahr.
SORT lt_bseg BY bukrs belnr gjahr.
LOOP AT lt_bseg ASSIGNING <ls_bseg>.
  AT NEW gjahr.
    READ TABLE lt_bkpf ASSIGNING <ls_bkpf> WITH KEY
        bukrs = <ls_bseg>-bukrs
        belnr = <ls_bseg>-belnr
        gjahr = <ls_bseg>-gjahr BINARY SEARCH.
    CHECK sy-subrc = 0.
  ENDAT.
  lv_counter = lv_counter + 1.
** Your logic **
ENDLOOP.
```

如果你不喜欢用`AT THE`

``` abap
"Looping into header
LOOP AT gt_bkpf ASSIGNING <gs_bkpf>.
  "Get index (sy-tabix) for the first occurrence
  "You must guarantee that the table is sorted by the keys used in BINARY SEARCH
  READ TABLE gt_bseg TRANSPORTING NO FIELDS
       WITH KEY bukrs = <gs_bkpf>-bukrs
                belnr = <gs_bkpf>-belnr
                gjahr = <gs_bkpf>-gjahr
       BINARY SEARCH.
  CHECK sy-subrc = 0. " CONTINUE

  "Looping into items from index which we got before
  LOOP AT gt_bseg ASSIGNING <gs_bseg> FROM sy-tabix.
    "Check the table key, if it has changed, leave this looping
    IF <gs_bkpf>-bukrs <> <gs_bseg>-bukrs
       OR <gs_bkpf>-belnr <> <gs_bseg>-belnr
       OR <gs_bkpf>-gjahr <> <gs_bseg>-gjahr.
      EXIT.
    ENDIF.

    "Do stuff...
  ENDLOOP.
ENDLOOP.
```

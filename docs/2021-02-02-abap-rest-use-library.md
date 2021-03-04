---
title: ABAP 使用 CL_REST_LIBRARY 实现 RESTful 接口
description: CL_REST_LIBRARY 是 SAP 官方提供的实现类
redirect: 2021-02-02-abap-rest-use-library
---

> description: CL_REST_LIBRARY 是 SAP 官方提供的实现类

## 直接上代码

**zcl_rest_router_person**

```abap
CLASS zcl_rest_router_person DEFINITION
  PUBLIC
  INHERITING FROM cl_rest_http_handler " 继承 CL_REST_HTTP_HANDLER，这个类也实现了接口 IF_HTTP_EXTENSION（在 SICF 里用到）
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.
    METHODS: if_rest_application~get_root_handler REDEFINITION.
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.

CLASS zcl_rest_router_person IMPLEMENTATION.

  " 重载 if_rest_application~get_root_handler
  METHOD if_rest_application~get_root_handler.
    DATA(lo_router) = new cl_rest_router( ).
    " iv_template 设置 path
    " iv_handler_class 设置 handle class
    lo_router->attach( iv_template = `/path` iv_handler_class = 'ZCL_REST_HANDLE_PERSON' ).

    ro_root_handler = lo_router.
  ENDMETHOD.
ENDCLASS.
```

**zcl_rest_handle_person**

```abap
CLASS zcl_rest_handle_person DEFINITION
  PUBLIC
  INHERITING FROM cl_rest_resource
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.
    METHODS:
      if_rest_resource~get REDEFINITION,
      if_rest_resource~post REDEFINITION.
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.


CLASS zcl_rest_handle_person IMPLEMENTATION.
* <SIGNATURE>---------------------------------------------------------------------------------------+
* | Instance Public Method zcl_rest_handle_person->IF_REST_RESOURCE~GET
* +-------------------------------------------------------------------------------------------------+
* +--------------------------------------------------------------------------------------</SIGNATURE>
  " impl get
  METHOD if_rest_resource~get.
    mo_response->create_entity( )->set_string_data( `Hello world!` ).
  ENDMETHOD.


* <SIGNATURE>---------------------------------------------------------------------------------------+
* | Instance Public Method zcl_rest_handle_person->IF_REST_RESOURCE~POST
* +-------------------------------------------------------------------------------------------------+
* | [--->] IO_ENTITY                      TYPE REF TO IF_REST_ENTITY
* +--------------------------------------------------------------------------------------</SIGNATURE>
  " impl post
  METHOD if_rest_resource~post.
    DATA: BEGIN OF ls_request,
            name TYPE char50,
            age  TYPE i,
            city TYPE char50,
          END OF ls_request.

    DATA(lv_request_body) = mo_request->get_entity( )->get_string_data( ).
    /ui2/cl_json=>deserialize( EXPORTING json = lv_request_body CHANGING data = ls_request ).

    " 设置 required
    IF ls_request-name IS INITIAL.
      mo_response->set_status( cl_rest_status_code=>gc_client_error_bad_request ).
      RAISE EXCEPTION TYPE cx_rest_resource_exception
        EXPORTING
          status_code    = cl_rest_status_code=>gc_client_error_bad_request
          request_method = if_rest_request=>gc_method_post.
    ENDIF.

    DATA(lo_response) = NEW zcl_complex_person( ).
    lo_response->name = ls_request-name.
    lo_response->age = ls_request-age.
    lo_response->city = ls_request-city.
    lo_response->telno = VALUE #(
        ( type = 'Home' number = '023217999' )
        ( type = 'Work' number = '027561000' )
        ( type = 'Cell' number = '0891234567' )
      ).

    DATA(lo_entity) = mo_response->create_entity( ).
    lo_entity->set_content_type( if_rest_media_type=>gc_appl_json ).
    lo_entity->set_string_data( /ui2/cl_json=>serialize( lo_response ) ).
    mo_response->set_status( cl_rest_status_code=>gc_success_created ).
  ENDMETHOD.

ENDCLASS.
```

**zcl_complex_person**

```abap
CLASS zcl_complex_person DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.
    TYPES: BEGIN OF ts_phone_number,
             type   TYPE char50,
             number TYPE char50,
           END OF ts_phone_number,
           tt_phone_number TYPE STANDARD TABLE OF ts_phone_number.

    DATA: name  TYPE char50,
          age   TYPE i,
          city  TYPE char50,
          telno TYPE tt_phone_number.
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.

CLASS zcl_complex_person IMPLEMENTATION.
ENDCLASS.
```

## 启动 SICF

使用 `TCODE: SICF` 进入 

选中 SAP 节点新建一个空的子元素

在新建的子元素下新建你的命名空间

然后在里面添加`处理器清单`：`zcl_rest_router_person`

## 测试

获取 X-CSRF-Token

使用 `GET` 和 `header> X-CSRF-Token: Fetch` 获取 X-CSRF-Token

```bash
curl --location --request GET 'http://example.com/test/person' \
--header 'Content-Type: application/json' \
--header 'X-CSRF-Token: Fetch' \
--header 'Authorization: Basic ******' \
--data-raw '{
    "name": "foo",
    "age": "",
    "city": ""
}'
```

```bash
curl --location --request POST 'http://example.com/test/person' \
--header 'Content-Type: application/json' \
--header 'X-CSRF-Token: {{your fetch token}}' \
--header 'Authorization: Basic Ymd5X3libDpiZ3loYWNrZXR0eXU=' \
--header 'Cookie: ******' \
--data-raw '{
    "name": "foo",
    "age": "",
    "city": ""
}'
```

## 进阶

使用 path 参数

```abap
lo_router->attach( iv_template = ‘/flights/{carrid}/’ iv_handler_class = ‘ZCL_SCN_BLOG_FLIGHT_RESOURCE’ ).
" ...
data(lv_carrid) = mo_request->get_uri_attribute( iv_name = ‘carrid’ ).
```

## Reference

- [pacroy/abap-rest-api](https://github.com/pacroy/abap-rest-api)
- [https://answers.sap.com/questions/10288247/in-create-csrf-token-validation-failed.html](https://answers.sap.com/questions/10288247/in-create-csrf-token-validation-failed.html)
- [https://blogs.sap.com/2013/05/16/usage-of-the-abap-rest-library-sapbasis-740/](https://blogs.sap.com/2013/05/16/usage-of-the-abap-rest-library-sapbasis-740/)
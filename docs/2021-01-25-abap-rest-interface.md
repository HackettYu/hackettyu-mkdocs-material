---
title: ABAP 创建 RESTful 接口
description: 实现 IF_HTTP_EXTENSION 接口即可
redirect: 2021-01-25-abap-rest-interface
---

> description: 实现 IF_HTTP_EXTENSION 接口即可

## 创建一个实现 IF_HTTP_EXTENSION 接口的类

> TCODE: SE24

实现代码

```abap
" ZCL_HTTP_RESTFUL_TEST
CLASS zcl_http_restful_test DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.

    INTERFACES if_http_extension .
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.

CLASS ZCL_HTTP_RESTFUL_TEST IMPLEMENTATION.

* <SIGNATURE>---------------------------------------------------------------------------------------+
* | Instance Public Method ZCL_HTTP_RESTFUL_TEST->IF_HTTP_EXTENSION~HANDLE_REQUEST
* +-------------------------------------------------------------------------------------------------+
* | [--->] SERVER                         TYPE REF TO IF_HTTP_SERVER
* +--------------------------------------------------------------------------------------</SIGNATURE>
  METHOD if_http_extension~handle_request.

    DATA lv_json_string TYPE vbi_json.
    DATA lt_data TYPE STANDARD TABLE OF zmdg006.
    DATA ls_data TYPE zmdg006.
    DATA lv_data TYPE string.
    DATA lt_fields TYPE tihttpnvp.

    lv_data = server->request->if_http_entity~get_cdata( ).

    " 获取 query
    server->request->if_http_entity~get_form_fields(
      CHANGING fields = lt_fields
    ).

    CASE server->request->get_header_field( name = '~request_method' ).
      WHEN `GET` OR `POST`.
        SELECT *
          FROM zmdg006
          INTO TABLE @lt_data
          UP TO 20 ROWS.

        lv_json_string = /ui2/cl_json=>serialize(
          data        = lt_data
          compress    = abap_true
          pretty_name = /ui2/cl_json=>pretty_mode-camel_case
          numc_as_string = abap_false
        ).

        server->response->set_cdata(
         EXPORTING
           data = lv_json_string
        ).
        server->response->set_status(
          code = 200
          reason = `OK`
        ).
    ENDCASE.

    server->response->if_http_entity~set_content_type(
      EXPORTING
        content_type =  'application/json'
    ).

  ENDMETHOD.
ENDCLASS.
```

TCODE: SICF

配置处理器清单

测试

## References

- https://blogs.sap.com/2013/09/16/creation-of-restful-webservice-in-sap/
- API
    - APPEND_FIELD_URL 将名称/值对添加到URL的查询字符串中
    - DECODE_BASE64 解码一个BASE64编码的字符串
    - ENCODE_BASE64 BASE64对给定的字符串进行编码
    - ESCAPE_HTML HTML对给定的字符串进行编码，替换掉例如<'与'<'
    - ESCAPE_URL URL对给定的字符串进行编码，例如：用%20代替Space
    - GET_EXTENSION_INFO 返回请求处理程序的协议、主机、端口和URL
    - GET_EXTENSION_URL 返回请求处理程序的协议、主机、端口和URL
    - UNESCAPE_URL URL对给定的字符串进行解码
    - GET_LOCATION 为客户域内的WebAS提供主机、端口
    - GET_LOCATION_EXCEPTION 从异常表中只返回主机和端口
    - SET_SESSION_STATEFUL 激活/停用有状态的会话
    - SET_SESSION_STATEFUL_VIA_URL 通过URL重写激活/停用有状态的会话
    - CREATE_ABS_URL 创建绝对网址
    - CREATE_REL_URL 创建相对的URL
    - GET_LAST_ERROR 返回最后一次方法调用的返回代码
    - SET_COMPRESSION 激活/停用压缩
    - SEND_PAGE 发送最后一页
    - SET_PAGE 设置错误页面
    - LOGOFF 登出
    - ENABLE_FOREIGN_SESSION_ACCESS 其他HTTP客户端访问有状态会话
    - GET_XSRF_TOKEN 提供跨站点请求伪造(XSRF)令牌
    - VALIDATE_XSRF_TOKEN 跨站请求伪造(XSRF)令牌的验证
    - GET_UCON_RUNTIME 接收统一连接的运行时接口
    - GET_ICF_RUNTIME 接收经典ICF Runtime的运行时接口
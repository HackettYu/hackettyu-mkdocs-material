---
title: SAP 主数据参考 ｜ SAP Master Data ｜ SAP MDG API examples
description:  http://www.sdn.sap.com/irj/scn/index?rid=/library/uuid/70f3f3d3-86e5-3010-909d-9162368bfbec&overridelayout=true
redirect: 2020-11-04-sap-mdg-api-example
---

> Document PDF: http://www.sdn.sap.com/irj/scn/index?rid=/library/uuid/70f3f3d3-86e5-3010-909d-9162368bfbec&overridelayout=true

## 1. Quick start

### 1.1 Code Example – Create Airline (with governance API)

```abap
*&---------------------------------------------------------------------*
*& Report zcreatecarr_sf
*&---------------------------------------------------------------------*
*& This example creates a new change request. Along with the change
*& request, a new airline (carrier) is created.
*&
*& The exceptions raised by the governance API contain the error
*& messages and some other attributes. Therefore, it is possible to react
*& to the errors raised by the governance API.
*&---------------------------------------------------------------------*
REPORT zcreatecarr_sf.
DATA:
    lo_gov_api TYPE REF TO if_usmd_gov_api,
    lv_crequest_id TYPE usmd_crequest, "Change Request ID
    lr_carr_key_str TYPE REF TO data, "Entity Carrier - key structure
    lr_carr_key_tab TYPE REF TO data, "Entity Carrier - key table
    lr_carr_data_str TYPE REF TO data, "Entity Carrier - data structure
    lr_carr_data_tab TYPE REF TO data, "Entity Carrier - data table
    ls_entity TYPE usmd_gov_api_s_ent_tabl,
    lt_entity TYPE usmd_gov_api_ts_ent_tabl,
    lt_messages TYPE usmd_t_message.
FIELD-SYMBOLS:
    <ls_carr_key> TYPE any,
    <lt_carr_key> TYPE ANY TABLE,
    <ls_carr_data> TYPE any,
    <lt_carr_data> TYPE ANY TABLE,
    <value> TYPE any.

"1st: Create an instance of the governance API
TRY.
    lo_gov_api = cl_usmd_gov_api=>get_instance( iv_model_name = 'SF' ).
    CATCH cx_usmd_gov_api.
    EXIT.
ENDTRY.

"2nd: Create all the data references needed to maintain the carrier entity
"Create a data reference of the key structure / table of entity CARR (Carrier)
lo_gov_api->create_data_reference(
    EXPORTING iv_entity_name         = 'CARR'
              iv_struct              = lo_gov_api->gc_struct_key
    IMPORTING er_structure = lr_carr_key_str
              er_table               = lr_carr_key_tab ).

"Create a data reference of the key and attribute structure / table of
"entity CARR (Carrier)
lo_gov_api->create_data_reference(
    EXPORTING iv_entity_name         = 'CARR'
              iv_struct              = lo_gov_api->gc_struct_key_attr
    IMPORTING er_structure = lr_carr_data_str
              er_table               = lr_carr_data_tab ).

"Assign the created data references for carrier key and carrier data
"to field symbols
ASSIGN lr_carr_key_str->* TO <ls_carr_key>.
ASSIGN lr_carr_key_tab->* TO <lt_carr_key>.
ASSIGN lr_carr_data_str->* TO <ls_carr_data>.
ASSIGN lr_carr_data_tab->* TO <lt_carr_data>.

"3rd: Fill the key and data structure with values to create a new carrier
"The entity CARR only has key field CARR. The new carrier ID should be 'YZ'
ASSIGN COMPONENT 'CARR' OF STRUCTURE <ls_carr_key> TO <value>.
IF sy-subrc = 0.
    <value> = 'YZ'.
    INSERT <ls_carr_key> INTO TABLE <lt_carr_key>.
ELSE.
    EXIT.
    "Tough luck – unfortunately, this field name is not part of the key structure
ENDIF.

"4th: Create a new change request using change request type and a
"description (required)
TRY.
    lv_crequest_id = lo_gov_api->create_crequest(
    iv_crequest_type = 'SFC01'
    iv_description = 'Create new Carrier YZ' ).
CATCH cx_usmd_gov_api.
    "Something went wrong while creating the change request (e.g. model blocked
    "or change request type unknown).
    EXIT.
ENDTRY.

"5th: Before making changes to an object, the object needs to be enqueued
"even if this is a creation scenario
TRY.
    lo_gov_api->enqueue_entity( EXPORTING iv_crequest_id = lv_crequest_id
    iv_entity_name = 'CARR'
    it_data = <lt_carr_key> ).
CATCH cx_usmd_gov_api_entity_lock cx_usmd_gov_api.
    EXIT.
    "Tough luck –
    "something went wrong while enqueueing the entity (it could be a
    "technical reason, or maybe the carrier is already interlocked?!
ENDTRY.

"6th: Provide some entity attributes (complete data structure)
MOVE-CORRESPONDING <ls_carr_key> TO <ls_carr_data>.
ASSIGN COMPONENT 'CARRNAME' OF STRUCTURE <ls_carr_data> TO <value>.
<value> = 'Fantasy Flight Airlines'.
ASSIGN COMPONENT 'CURRCODE' OF STRUCTURE <ls_carr_data> TO <value>.
<value> = 'USD'.
ASSIGN COMPONENT 'URL' OF STRUCTURE <ls_carr_data> TO <value>.
<value> = 'http://www.fantasyflight.com'.
INSERT <ls_carr_data> INTO TABLE <lt_carr_data>.

"7th: Write the entity data to the change request
TRY.
    lo_gov_api->write_entity( EXPORTING iv_crequest_id = lv_crequest_i
    iv_entity_name = 'CARR'
    it_data = <lt_carr_data> ).
CATCH cx_usmd_gov_api_entity_write.
    EXIT.
    "Tough luck - might be that you have no authorization, or the entity is
    "not enqueued or cannot be added to the object list of the change
    "request
ENDTRY.

"8th: optionally, the entity data is read again... just to make sure everything
"went right.
TRY.
    lo_gov_api->read_entity( 
        EXPORTING iv_crequest_id = lv_crequest_id
                  iv_entity_name = 'CARR'
                  it_key = <lt_carr_key>
        IMPORTING et_data = <lt_carr_data> ).
CATCH cx_usmd_gov_api_core_error cx_usmd_gov_api.
    EXIT.
    "Adequate Exception handling
ENDTRY.

"9th: The complete change request should be checked before it is saved
TRY.
    lo_gov_api->check_crequest_data( 
        iv_crequest_id = lv_crequest_id 
    ).

    "Collect the entities to be checked
    ls_entity-entity = 'CARR'.
    ls_entity-tabl = lr_carr_key_tab.
    INSERT ls_entity INTO TABLE lt_entity.

    "check the entity
    lo_gov_api->check_complete_data(
        EXPORTING iv_crequest_id = lv_crequest_id
                  it_key = lt_entity ).
CATCH cx_usmd_gov_api_core_error cx_usmd_gov_api.
    "Possibility to handle the erroneous data or go on.
ENDTRY.

"10th: Save the change request (and the entity data of course)
TRY.
    lo_gov_api->save( ).
    "Save is done in draft mode by default so it is possible to
    "save the change request even if change request data or
    "entity data is not consistent.
CATCH cx_usmd_gov_api_core_error.
    EXIT.
    "Adequate Exception handling
ENDTRY.

"11th: At the end, it is necessary to clean the house
TRY.
    lo_gov_api->dequeue_entity( 
        EXPORTING iv_crequest_id = lv_crequest_id
                  iv_entity_name = 'CARR'
                  it_data = <lt_carr_key>
    ).

    lo_gov_api->dequeue_crequest(
        EXPORTING iv_crequest_id = lv_crequest_id 
    ).

CATCH cx_usmd_gov_api.
    "Not a tragedy - maybe the workflow could not be processed properly after
    "it was started
ENDTRY.

COMMIT WORK AND WAIT.

"12th: If everything is fine, the workflow can be started for
"the change request (this is like a 'submit')
TRY.
    lo_gov_api->start_workflow( iv_crequest_id = lv_crequest_id ).
CATCH cx_usmd_gov_api_core_error.
    "Adequate Exception handling
ENDTRY.
"Interested in the errors occured?
lt_messages = lo_gov_api->get_messages( ).
```

### 1.2 Code Example – Change Flight Connection (with governance API)

```abap
*&---------------------------------------------------------------------*
*& Report ZCHANGEPFLI_SF
*&---------------------------------------------------------------------*
*& This example creates a new change request. Along with the change
*& request, an existing flight connection is changed. Additionally, a
*& dependent entity of type flight schedule is changed/created.
*&
*& The exceptions raised by the governance API contain the error
*& messages and some other attributes. Therefore, it is possible to react
*& to the errors raised by the governance API.
*&---------------------------------------------------------------------*
REPORT zchangepfli_sf.
DATA:
    lo_gov_api TYPE REF TO if_usmd_gov_api,
    lv_crequest_id TYPE usmd_crequest, "Change Request ID
    lr_pfli_key_str TYPE REF TO data, "Entity Flight Connection - key structure
    lr_pfli_key_tab TYPE REF TO data, "Entity Flight Connection - key table
    lr_pfli_data_str TYPE REF TO data, "Entity Flight Connection - data structure
    lr_pfli_data_tab TYPE REF TO data, "Entity Flight Connection - data table
    lr_flight_key_str TYPE REF TO data, "Entity Flight - key structure
    lr_flight_key_tab TYPE REF TO data, "Entity Flight - key table
    lr_flight_data_str TYPE REF TO data, "Entity Flight - data structure
    lr_flight_data_tab TYPE REF TO data, "Entity Flight - data table
    ls_entity TYPE usmd_gov_api_s_ent_tabl,
    lt_entity TYPE usmd_gov_api_ts_ent_tabl,
    lt_messages TYPE usmd_t_message.
FIELD-SYMBOLS:
    <ls_pfli_key> TYPE any,
    <lt_pfli_key> TYPE INDEX TABLE,
    <ls_pfli_data> TYPE any,
    <lt_pfli_data> TYPE INDEX TABLE,
    <ls_flight_key> TYPE any,
    <lt_flight_key> TYPE INDEX TABLE,
    <ls_flight_data> TYPE any,
    <lt_flight_data> TYPE INDEX TABLE,
    <value> TYPE any.

"1: Create an instance of the governance API
TRY.
    lo_gov_api = cl_usmd_gov_api=>get_instance( iv_model_name = 'SF' ).
CATCH cx_usmd_gov_api.
    EXIT.
ENDTRY.

"2: Create the data references needed to maintain the flight connection entity
"Create a data reference of the key structure/table of entity PFLI
lo_gov_api->create_data_reference(
    EXPORTING iv_entity_name = 'PFLI'
              iv_struct = lo_gov_api->gc_struct_key
    IMPORTING er_structure = lr_pfli_key_str
              er_table = lr_pfli_key_tab 
).

lo_gov_api->create_data_reference(
    EXPORTING iv_entity_name = 'PFLI'
              iv_struct = lo_gov_api->gc_struct_key_attr
    IMPORTING er_structure = lr_pfli_data_str
              er_table = lr_pfli_data_tab 
).

"Assign the created data references for the flight connection key to the field symbols
ASSIGN lr_pfli_key_str->* TO <ls_pfli_key>.
ASSIGN lr_pfli_key_tab->* TO <lt_pfli_key>.
ASSIGN COMPONENT 'CARR' OF STRUCTURE <ls_pfli_key> TO <value>.
<value> = 'LH'.
ASSIGN COMPONENT 'PFLI' OF STRUCTURE <ls_pfli_key> TO <value>.
<value> = '0401'.
INSERT <ls_pfli_key> INTO TABLE <lt_pfli_key>.
"Assign the created data references for the flight connection data to the field symbols
ASSIGN lr_pfli_data_str->* TO <ls_pfli_data>.
ASSIGN lr_pfli_data_tab->* TO <lt_pfli_data>.

"3: Create a new change request using change request type and a
description (required)
TRY.
    lv_crequest_id = lo_gov_api->create_crequest(
                        iv_crequest_type = 'SFP02'
                        iv_description = 'Change Flight Connection LH 400' 
                     ).
CATCH cx_usmd_gov_api.
    "Something went wrong while creating the change request (e.g. data model blocked or change request type unknown).
    EXIT.
ENDTRY.

"4: Before making changes to an object, the object needs to be enqueued.
TRY.
    lo_gov_api->enqueue_entity( 
        EXPORTING iv_crequest_id = lv_crequest_id
                  iv_entity_name = 'PFLI'
                  it_data = <lt_pfli_key> ).
CATCH cx_usmd_gov_api_entity_lock cx_usmd_gov_api.
    EXIT.
ENDTRY.

"5: Read the flight connection data in order to do some changes
TRY.
    lo_gov_api->read_entity( 
        EXPORTING iv_crequest_id = lv_crequest_id
                  iv_entity_name = 'PFLI'
                  it_key = <lt_pfli_key>
    IMPORTING et_data = <lt_pfli_data> 
    ).
CATCH cx_usmd_gov_api_core_error cx_usmd_gov_api.
    EXIT.
ENDTRY.

READ TABLE <lt_pfli_data> INDEX 1 INTO <ls_pfli_data>.
CLEAR <lt_pfli_data>.
ASSIGN COMPONENT 'ARRTIME' OF STRUCTURE <ls_pfli_data> TO <value>.
<value> = '075500'.
ASSIGN COMPONENT 'DEPTIME' OF STRUCTURE <ls_pfli_data> TO <value>.
<value> = '184000'.
INSERT <ls_pfli_data> INTO TABLE <lt_pfli_data>.

"6: Write the changes for the flight connection
TRY.
    lo_gov_api->write_entity( 
        EXPORTING iv_crequest_id = lv_crequest_id
                  iv_entity_name = 'PFLI'
                  it_data = <lt_pfli_data> 
    ).
CATCH cx_usmd_gov_api_entity_write.
    EXIT. "Do better next time!
ENDTRY.

"7: Create all the data references needed to maintain the flight entity
"Create a data reference of the key structure/table of entity FLIGHT (Flight)
lo_gov_api->create_data_reference(
    EXPORTING iv_entity_name = 'FLIGHT'
              iv_struct = lo_gov_api->gc_struct_key
    IMPORTING er_structure = lr_flight_key_str
              er_table = lr_flight_key_tab 
).

lo_gov_api->create_data_reference(
    EXPORTING iv_entity_name = 'FLIGHT'
              iv_struct = lo_gov_api->gc_struct_key_attr
    IMPORTING er_structure = lr_flight_data_str
              er_table = lr_flight_data_tab 
).

"Assign the created data references for flight connection key to the field symbols
ASSIGN lr_flight_key_str->* TO <ls_flight_key>.
ASSIGN lr_flight_key_tab->* TO <lt_flight_key>.
MOVE-CORRESPONDING <ls_pfli_key> TO <ls_flight_key>.
INSERT <ls_flight_key> INTO TABLE <lt_flight_key>.
ASSIGN lr_flight_data_str->* TO <ls_flight_data>.
ASSIGN lr_flight_data_tab->* TO <lt_flight_data>.

"8: Read some flight data in order to do some changes
TRY.
    lo_gov_api->read_entity( 
        EXPORTING iv_crequest_id = lv_crequest_id
                  iv_entity_name = 'FLIGHT'
                  it_key = <lt_flight_key>
        IMPORTING et_data = <lt_flight_data> ).
CATCH cx_usmd_gov_api_core_error cx_usmd_gov_api.
    EXIT.
ENDTRY.

READ TABLE <lt_flight_data> INDEX 1 INTO <ls_flight_data>.
CLEAR <lt_flight_data>.
IF sy-subrc <> 0.
    MOVE-CORRESPONDING <ls_flight_key> TO <ls_flight_data>.
    ASSIGN COMPONENT 'FLDATE' OF STRUCTURE <ls_flight_data> TO <value>.
    <value> = '31122013'.
ENDIF.
ASSIGN COMPONENT 'SEATSOCC' OF STRUCTURE <ls_flight_data> TO <value>.
<value> = '209'.
INSERT <ls_flight_data> INTO TABLE <lt_flight_data>.

"9: Write the changes for the flight
TRY.
    lo_gov_api->write_entity( EXPORTING iv_crequest_id = lv_crequest_id
    iv_entity_name = 'FLIGHT'
    it_data = <lt_flight_data> ).
CATCH cx_usmd_gov_api_entity_write.
    EXIT. "Do better next time!
ENDTRY.

"10: The complete change request should be checked before it is saved
TRY.
    lo_gov_api->check_crequest_data( iv_crequest_id = lv_crequest_id ).
    
    "Collect the entities to be checked
    ls_entity-entity = 'PFLI'.
    ls_entity-tabl = lr_pfli_key_tab.
    INSERT ls_entity INTO TABLE lt_entity.
    "Check the entity
    lo_gov_api->check_complete_data(
        EXPORTING iv_crequest_id = lv_crequest_id
                  it_key = lt_entity 
    ).
CATCH cx_usmd_gov_api_core_error cx_usmd_gov_api.
    "Handle the erroneous data or go on.
ENDTRY.

"11: Save the change request (and the entity data, of course)
TRY.
    lo_gov_api->save( ).
    "Save is done in draft mode by default so it is possible to 
    "save the change request even if the change request data or
    "the entity data is not consistent.
CATCH cx_usmd_gov_api_core_error.
    EXIT.
    "Adequate exception handling
ENDTRY.

"12: At the end, it is necessary to clean the house
TRY.
    lo_gov_api->dequeue_entity( 
        EXPORTING iv_crequest_id = lv_crequest_id
                  iv_entity_name = 'PFLI'
                  it_data = <lt_pfli_key> 
    ).
    lo_gov_api->dequeue_crequest( 
        EXPORTING iv_crequest_id = lv_crequest_id
    ).
CATCH cx_usmd_gov_api.
    "Adequate exception handling
ENDTRY.

COMMIT WORK AND WAIT.

"13: If everything is correct, the workflow can be started for the change request (this is like a 'submit')
TRY.
    lo_gov_api->start_workflow( iv_crequest_id = lv_crequest_id ).
CATCH cx_usmd_gov_api_core_error.
    "Adequate exception handling
ENDTRY.

"Interested in the messages occurred?
lt_messages = lo_gov_api->get_messages( ).
```
### 1.3 What is the different between creating and changing?

> Notice: read_entity

创建的时候 read_entity 是可选的校验操作

修改的时候 read_entity 是需要从主数据中获取数据

## 2. MDG advanced usage

### 2.1 CL_USMD_GOV_API

#### 2.1.0 IF_USMD_GOV_API_TRANS~SAVE Public
#### 2.1.1 IF_USMD_GOV_API_TRANS~REFRESH_BUFFERS Public
#### 2.1.2 IF_USMD_GOV_API_SERVICES~CHECK_USAGE_OF_ENTITY Public
#### 2.1.3 IF_USMD_GOV_API_SERVICES~GET_ENTITY_USAGE Public
#### 2.1.4 IF_USMD_GOV_API_SERVICES~DETERMINE_STEP_TYPE Public
#### 2.1.5 IF_USMD_GOV_API_SERVICES~GET_ALLOWED_CHANGES Public
#### 2.1.6 IF_USMD_GOV_API_SERVICES~GET_CREQUEST_TYPES_FOR_PROCESS Public
#### 2.1.7 IF_USMD_GOV_API_SERVICES~GET_MAIN_ENTITIES_FROM_ENTITY Public
#### 2.1.8 IF_USMD_GOV_API_SERVICES~GET_ENTITY_KEY_FIELDS Public
#### 2.1.9 IF_USMD_GOV_API_SERVICES~GET_SUT1ENTITY_FROM_ENTITY Public
#### 2.1.10 IF_USMD_GOV_API_SERVICES~GET_WORKITEMS_FOR_CREQUEST Public
#### 2.1.11 IF_USMD_GOV_API_SERVICES~HAS_ENTITY_TYPE_EDITION Public
#### 2.1.12 IF_USMD_GOV_API_SERVICES~IS_EDITION_CHANGEABLE Public
#### 2.1.13 IF_USMD_GOV_API_SERVICES~IS_ENTITY_IN_CREQUEST Public
#### 2.1.14 IF_USMD_GOV_API_SERVICES~RETRIEVE_BLOCKING_CR_BY_EN_KEY Public
#### 2.1.15 IF_USMD_GOV_API_SERVICES~GET_FIELDNAME_OF_ENTITY Public
#### 2.1.16 IF_USMD_GOV_API_SERVICES~RETRIEVE_CREQUEST_BY_ENTITY Public
#### 2.1.17 IF_USMD_GOV_API_ENTITY~CHECK_ENTITY_AUTHORIZATION Public
#### 2.1.18 IF_USMD_GOV_API_ENTITY~CHECK_ENTITY_DATA Public
#### 2.1.19 IF_USMD_GOV_API_ENTITY~CHECK_ENTITY_LOCK_SINGLE Public
#### 2.1.20 IF_USMD_GOV_API_ENTITY~CONFIRM_ENTITY_DATA Public
#### 2.1.21 IF_USMD_GOV_API_ENTITY~COPY_ENTITY Public
#### 2.1.22 IF_USMD_GOV_API_ENTITY~CREATE_DATA_REFERENCE Public
#### 2.1.23 IF_USMD_GOV_API_ENTITY~CREATE_ENTITY_TMP_KEY Public
#### 2.1.24 IF_USMD_GOV_API_ENTITY~DELETE_ENTITY Public
#### 2.1.25 IF_USMD_GOV_API_ENTITY~DEQUEUE_ENTITY Public
#### 2.1.26 IF_USMD_GOV_API_ENTITY~DEQUEUE_ENTITY_ALL Public
#### 2.1.27 IF_USMD_GOV_API_ENTITY~ENQUEUE_ENTITY Public
#### 2.1.28 IF_USMD_GOV_API_ENTITY~EXCHANGE_ENTITY_KEY Public
#### 2.1.29 IF_USMD_GOV_API_ENTITY~GET_DERIVE_ENTITY_RESULT Public
#### 2.1.30 IF_USMD_GOV_API_ENTITY~GET_ENTITY_FIELD_PROPERTIES Public
#### 2.1.31 IF_USMD_GOV_API_ENTITY~IS_ENTITY_DELETED Public
#### 2.1.32 IF_USMD_GOV_API_ENTITY~IS_NEW_ENTITY Public
#### 2.1.33 IF_USMD_GOV_API_ENTITY~IS_TMP_KEY Public
#### 2.1.34 IF_USMD_GOV_API_ENTITY~QUERY_ENTITY Public
#### 2.1.35 IF_USMD_GOV_API_ENTITY~READ_ENTITY Public
#### 2.1.36 IF_USMD_GOV_API_ENTITY~READ_OBSOLETE_ENTITY Public
#### 2.1.37 IF_USMD_GOV_API_ENTITY~READ_SAVED_ENTITY Public
#### 2.1.38 IF_USMD_GOV_API_ENTITY~RETRIEVE_ENTITY Public
#### 2.1.39 IF_USMD_GOV_API_ENTITY~RETRIEVE_OBSOLETE_ENTITY Public
#### 2.1.40 IF_USMD_GOV_API_ENTITY~WRITE_ENTITY Public

- IV_CREQUEST_ID	Importing	requeried   USMD_CREQUEST       Change Request
- IV_ENTITY_NAME	Importing	requeried   USMD_ENTITY         Entity Type
- IT_DATA	        Importing	requeried   ANY TABLE           Entity Keys and Attributes
- IT_ATTRIBUTE	    Importing	unrequeried USMD_TS_FIELDNAME   List of Field Names with Changed Data

可以使用可选参数 IT_ATTRIBUTE 更新某一列数据

```abap
DATA lo_gov_api TYPE REF TO if_usmd_gov_api.
DATA lt_attributes TYPE usmd_ts_fieldname.

APPEND '{{fieldname_a}}' TO lt_attributes.
APPEND '{{fieldname_b}}' TO lt_attributes.
APPEND VALUE #( key = '{{key}}' {{fieldname_a}} = 'a' {{fieldname_b}} = 'b' ) TO lt_data.

lo_gov_api->write_entity(
     EXPORTING iv_crequest_id = lv_crequest_id " XXXX
               iv_entity_name = lc_entity " EMPL
               it_data = <lfs_datas> " lt_data
               it_attribute = lt_attributes
```

#### 2.1.41 IF_USMD_GOV_API_CR_DATA~ADD_ATTACHMENT Public
#### 2.1.42 IF_USMD_GOV_API_CR_DATA~ADD_TARGET_SYSTEMS Public
#### 2.1.43 IF_USMD_GOV_API_CR_DATA~CHANGE_ATTACHMENT Public
#### 2.1.44 IF_USMD_GOV_API_CR_DATA~CHANGE_NOTE Public
#### 2.1.45 IF_USMD_GOV_API_CR_DATA~CHECK_CREQUEST_AUTHORIZATION Public
#### 2.1.46 IF_USMD_GOV_API_CR_DATA~CHECK_CREQUEST_DATA Public
#### 2.1.47 IF_USMD_GOV_API_CR_DATA~CREATE_CREQUEST Public
#### 2.1.48 IF_USMD_GOV_API_CR_DATA~DELETE_ATTACHMENT Public
#### 2.1.49 IF_USMD_GOV_API_CR_DATA~DELETE_NOTE Public
#### 2.1.50 IF_USMD_GOV_API_CR_DATA~DELETE_TARGET_SYSTEMS Public
#### 2.1.51 IF_USMD_GOV_API_CR_DATA~DEQUEUE_CREQUEST Public
#### 2.1.52 IF_USMD_GOV_API_CR_DATA~ENQUEUE_CREQUEST Public
#### 2.1.53 IF_USMD_GOV_API_CR_DATA~GET_ATTACHMENT_CONTENT Public
#### 2.1.54 IF_USMD_GOV_API_CR_DATA~GET_ATTACHMENT_LIST Public
#### 2.1.55 IF_USMD_GOV_API_CR_DATA~GET_CREQUEST_ATTRIBUTES Public
#### 2.1.56 IF_USMD_GOV_API_CR_DATA~GET_CREQUEST_DATA Public
#### 2.1.57 IF_USMD_GOV_API_CR_DATA~GET_CREQUEST_DRAFTS Public
#### 2.1.58 IF_USMD_GOV_API_CR_DATA~GET_CREQUEST_STATUS Public
#### 2.1.59 IF_USMD_GOV_API_CR_DATA~GET_NOTES Public
#### 2.1.60 IF_USMD_GOV_API_CR_DATA~GET_HRY_OBJECT_LIST Public
#### 2.1.61 IF_USMD_GOV_API_CR_DATA~GET_OBJECT_LIST Public
#### 2.1.62 IF_USMD_GOV_API_CR_DATA~GET_TARGET_SYSTEMS Public
#### 2.1.63 IF_USMD_GOV_API_CR_DATA~SET_CREQUEST_ATTRIBUTES Public
#### 2.1.64 IF_USMD_GOV_API_CR_DATA~SET_CREQUEST_EDITION Public
#### 2.1.65 IF_USMD_GOV_API_CR_DATA~SET_CREQUEST_STATUS Public
#### 2.1.66 IF_USMD_GOV_API_CR_DATA~WRITE_NOTE Public
#### 2.1.67 IF_USMD_GOV_API~GET_MESSAGES Public
#### 2.1.68 IF_USMD_GOV_API~REMOVE_MESSAGES_FROM_MSG_CONT Public
#### 2.1.69 IF_USMD_GOV_API~SET_MESSAGE_CONTAINER Public
#### 2.1.70 IF_USMD_GOV_API_PROCESS~CHECK_COMPLETE_DATA Public
#### 2.1.71 IF_USMD_GOV_API_PROCESS~DELETE_ENTITY_FROM_OBJECT_LIST Public
#### 2.1.72 IF_USMD_GOV_API_PROCESS~FINALIZE_PROCESS_STEP Public
#### 2.1.73 IF_USMD_GOV_API_PROCESS~GET_CR_VALIDATION_RESULT Public
#### 2.1.74 IF_USMD_GOV_API_PROCESS~START_WORKFLOW Public
#### 2.1.75 IF_USMD_GOV_API_PROCESS~VALIDATE_CREQUEST Public
#### 2.1.76 IF_USMD_GOV_API_CR_ACTION~DELETE_DRAFT Public
#### 2.1.77 IF_USMD_GOV_API_HRY~CHECK_ASSIGNMENT_AUTHORIZATION Public
#### 2.1.78 IF_USMD_GOV_API_HRY~CHECK_HRY_AUTHORIZATION Public
#### 2.1.79 IF_USMD_GOV_API_HRY~DELETE_ASSIGNMENT Public
#### 2.1.80 IF_USMD_GOV_API_HRY~DEQUEUE_ASSIGNMENT Public
#### 2.1.81 IF_USMD_GOV_API_HRY~ENQUEUE_ASSIGNMENT Public
#### 2.1.82 IF_USMD_GOV_API_HRY~EXPAND_PLACEHOLDER Public
#### 2.1.83 IF_USMD_GOV_API_HRY~FIND_POSITION Public
#### 2.1.84 IF_USMD_GOV_API_HRY~GET_COMPLETE_HRY Public
#### 2.1.85 IF_USMD_GOV_API_HRY~GET_DIRECT_CHILDREN Public
#### 2.1.86 IF_USMD_GOV_API_HRY~READ_ASSIGNMENT Public
#### 2.1.87 IF_USMD_GOV_API_HRY~RETRIEVE_CREQUEST_BY_ASSGNMNT Public
#### 2.1.88 IF_USMD_GOV_API_HRY~WRITE_ASSIGNMENT Public
#### 2.1.89 CHECK_INSTANCE_EXISTS Public

> 检查实例是否声明
实例声明的方式为 `GET_INSTANCE`

#### 2.1.90 GET_INSTANCE Public

```lo_gov_api = cl_usmd_gov_api=>get_instance( iv_model_name = 'SF' ).```

#### 2.1.91 ADD_ENTITY_TO_CHANGE_LIST Protected
#### 2.1.92 ADD_ENTITY_TO_OBJECT_LIST Protected
#### 2.1.93 ADD_NODE_HRYASGN_TO_OBJ_LIST Protected
#### 2.1.94 ADD_NODE_TO_HRY_OBJECT_LIST Protected
#### 2.1.95 BUILD_REF_DATA_FOR_ATTACHMENT Protected
#### 2.1.96 CHECK_ASSIGNMENT_LOCK Protected
#### 2.1.97 CHECK_ENTITY_MAINTAINABLE Protected
#### 2.1.98 CHECK_N_ADD_INACT_ASSGNMNT_BUF Protected
#### 2.1.99 CHECK_N_ADD_INACT_DATALOAD_BUF Protected
#### 2.1.100 CHECK_PREREQUISITES_FOR_CHANGE Protected
#### 2.1.101 CONSTRUCTOR Protected
#### 2.1.102 GET_EDITION_OF_CREQUEST Protected
#### 2.1.103 GET_FIELDNAME_FOR_ENTITY Protected
#### 2.1.104 GET_PROC_PERMISSION_FOR_STATUS Protected
#### 2.1.105 GET_TABLE_KEY Protected
#### 2.1.106 WF_SERVICE_GET_WITEMS Protected
#### 2.1.107 ADD_ASSIGNMENT_LOCK Private
#### 2.1.108 ADD_CORE_MESSAGES_TO_MESS_CONT Private
#### 2.1.109 ADD_GOV_MESSAGE_TO_MESS_CONT Private
#### 2.1.110 ADD_HRY_NAME_TO_HRY_OBJ_LIST Private
#### 2.1.111 ADD_MSG_TO_MSGCONT_AND_TABLES Private
#### 2.1.112 ADD_PARENT_TO_HRY_OBJECT_LIST Private
#### 2.1.113 ARE_OBJECT_CHANGES_ALLOWED Private
#### 2.1.114 BUILD_ASSIGNMENT_BUFF_STRUC Private
#### 2.1.115 BUILD_ASSIGNMENT_LOCK_STRUC Private
#### 2.1.116 CHECK_CREQUEST_TYPE Private
#### 2.1.117 CHECK_CR_LOCK Private
#### 2.1.118 CHECK_DERIVED_DATA Private
#### 2.1.119 CHECK_DISPLAY_AUTH_FOR_NODE Private
#### 2.1.120 CHECK_EDITION Private
#### 2.1.121 CHECK_ENTITY_ACTIVE_IN_BUFFER Private
#### 2.1.122 CHECK_FOR_DATA_CONFIRMATION Private
#### 2.1.123 CHECK_FOR_REMOVE_OBJECT Private
#### 2.1.124 CHECK_N_BUILD_SEL Private
#### 2.1.125 CLEAR_AUTH_BUFFER Private
#### 2.1.126 CLEAR_ENTITY_BUFFER Private
#### 2.1.127 CLEAR_HRY_OBJECT_LIST_BUFFER Private
#### 2.1.128 CLEAR_OBJECT_LIST_BUFFER Private
#### 2.1.129 COMPARE_EDITIONS Private
#### 2.1.130 CONFIRM_ASSIGNMENT_DATA Private
#### 2.1.131 CONTAINS_ERROR Private
#### 2.1.132 CONVERT_ENTITY_TYPE_TO_TEXT Private
#### 2.1.133 CONVERT_FROM_STRUC_TO_TABLE Private
#### 2.1.134 CONVERT_HRY_OBJLIST Private
#### 2.1.135 CREATE_DATA_REF_KEY_STRUCTURE Private
#### 2.1.136 DELETE_ASSIGNMENT_BUFFER Private
#### 2.1.137 DELETE_ENTITY_FROM_CHANGELIST Private
#### 2.1.138 DERIVE_CHANGED_ENTITIES_EVENT Private
#### 2.1.139 DETERMINE_EDITION_FOR_READ Private
#### 2.1.140 ENRICH_ASSIGNMENT_ATTRIBUTES Private
#### 2.1.141 ENRICH_ATTRIBUTES_AFTER_DERIVE Private
#### 2.1.142 EXTRACT_OBJECT_KEYS Private
#### 2.1.143 GET_EDITION_OF_CR_BY_LOCK Private
#### 2.1.144 GET_EDITION_TYPE_BY_CR_TYPE Private
#### 2.1.145 GET_FIELDS Private
#### 2.1.146 GET_HRY_OBJECT_LIST_FROM_DB Private
#### 2.1.147 GET_HRY_OBJ_LIST_FROM_BUFFER Private
#### 2.1.148 GET_LEADING_SUT1_ENTITY Private
#### 2.1.149 GET_OBJECT_LIST_FROM_BUFFER Private
#### 2.1.150 GET_OBJLIST_FROM_KEY Private
#### 2.1.151 HANDLE_DERIVED_ENTITY_DATA Private
#### 2.1.152 INSERT_ASSIGNMENT_BUFFER Private
#### 2.1.153 INVALIDATE_INACT_DATALOAD_BUF Private
#### 2.1.154 IS_ASSIGNMENT_IN_OBJECT_LIST Private
#### 2.1.155 IS_AUTHORIZED Private
#### 2.1.156 IS_CREQUEST_PARALLEL Private
#### 2.1.157 IS_ENTITY_ADDABLE_TO_OBJLIST Private
#### 2.1.158 IS_ENTITY_ENQUEUED Private
#### 2.1.159 IS_ENTITY_IN_OBJECT_LIST Private
#### 2.1.160 IS_ENTITY_MAINTAINABLE Private
#### 2.1.161 IS_ENTITY_TYPE_IN_TYPE_SCOPE Private
#### 2.1.162 PREP_ACT_ASSGNMT_READ Private
#### 2.1.163 RAISE_RESUMEABLE_EXCEPTION Private
#### 2.1.164 RAISE_STRUC_CX_ADD_MSG Private
#### 2.1.165 READ_ASSIGNMENT_BUFFER Private
#### 2.1.166 READ_AUTH_BUFFER Private
#### 2.1.167 READ_ENTITY_BUFFER Private
#### 2.1.168 REMOVE_ASSIGNMENT Private
#### 2.1.169 REMOVE_ASSIGNMENT_LOCK Private
#### 2.1.170 SET_HRY_OBJECT_LIST_BUFFER Private
#### 2.1.171 SET_OBJECT_LIST_BUFFER Private
#### 2.1.172 UPDATE_ASSIGNMENT_BUFFER Private
#### 2.1.173 UPDATE_CREQUEST_ADM_FIELDS Private
#### 2.1.174 UPDATE_CREQUEST_DATA Private
#### 2.1.175 UPD_BUFFER_FROM_IO_CHANGE Private
#### 2.1.176 WRITE_AUTH_BUFFER Private
#### 2.1.177 WRITE_ENTITY_BUFFER Private
#### 2.1.178 IS_CREQUEST_USER Private

### 2.2 CL_USMD_CREQUEST_API

> TODO

### 2.3 CL_USMD_CREQUEST_DELETE

> TODO

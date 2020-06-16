# sql 嵌套 case 语法

```sql
select case  
            when (username = '') then  
                case when(username = '') then  '1'  
                else  '2'  
                end  
            else  
            '3'  
           end,username,id,ohter-field
      from bl_author;  
```
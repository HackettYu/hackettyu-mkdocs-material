# limit

```sql
select * 
from sometable
where rownum <= 10
order by name;

select e.*,rownum from (select * from emp order by hiredate) e where rownum<=?;
```
# csplit

``` vim
分割文件

csplit {{src}} {{I:begin-line}} {{I:end-line}}

在这两行作为分割点将文件分割为三个文件

csplit 5 {4}

分割四次五行数据，剩余的留到最后

csplit -k --prefix=mine foo.txt 5 {*}

-k 忽略错误提示
--prefix=mine 设置文件前缀为 mine
5 {*} 将可能 5 行等分文件，不能等分会报错

csplit -n 3 --prefix=mine foo.txt 5 {4}
-n 可以改变文件命名的数字

输出：

mine000
mine001
mine002
mine003
mine004
mine005

csplit foo.xt /fie/

每次出现 fie 的时候分割文件 */fie/* 是正则表达式

csplit foo.txt /fie/ {5}
前五次出现的地方分割
```

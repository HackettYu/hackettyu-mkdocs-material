# ABAP CHECK

CHECK 跳转的前提是 <expr> 为假时。

CHECK只是跳出当前事件块，继续下一个事件块的处理，相当于方法的 return；

另外，如果CHECK在循环（DO、WHILE、LOOP）里，**只是跳出当前循环而已**；

如果CHECK出现在循环以外,退出的是当前执行的程序块(processing block)，例如一个 FORM，METHOD，或 EVENT
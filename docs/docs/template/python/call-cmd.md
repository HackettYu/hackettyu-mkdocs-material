# 调用命令行

> [6方法，python中执行shell命令](https://python.freelycode.com/contribution/detail/8)

```python
# 1
os.system("The command you want").


# 2
os.popen(command[,mode[,bufsize]])

import os
p = os.popen("dir c:", 'r')
p.read()
bla bla... <这里是dir正确的输出>
p.close()
p = os.popen("dir d:", 'r') # 电脑中没有D盘
p.read()
p.close()

# 使用commands模块，同样看一组例子。

import commands
commands.getstatusoutput('ls /bin/ls')
(0, '/bin/ls')
commands.getstatusoutput('cat /bin/junk')
(256, 'cat: /bin/junk: No such file or directory')
commands.getstatusoutput('/bin/junk')
(256, 'sh: /bin/junk: not found')
commands.getoutput('ls /bin/ls')
'/bin/ls'
commands.getstatus('/bin/ls')
'-rwxr-xr-x  1 root13352 Oct 14  1994 /bin/ls'


# 4 subprocess

subprocess.call(["ls", "-l"]，shell=True)
subprocess.call("ls -l", shell=True)
subprocess.call("exit 1", shell=True)
第一种，os.system("The command you want").

# 5 os.popen(command[,mode[,bufsize]])

import os
p = os.popen("dir c:", 'r')
p.read()
bla bla... <这里是dir正确的输出>
p.close()
p = os.popen("dir d:", 'r') # 电脑中没有D盘
p.read()
''
p.close()

# 6 使用commands模块，同样看一组例子。

import commands
commands.getstatusoutput('ls /bin/ls')
(0, '/bin/ls')
commands.getstatusoutput('cat /bin/junk')
(256, 'cat: /bin/junk: No such file or directory')
commands.getstatusoutput('/bin/junk')
(256, 'sh: /bin/junk: not found')
commands.getoutput('ls /bin/ls')
'/bin/ls'
commands.getstatus('/bin/ls')
'-rwxr-xr-x  1 root13352 Oct 14  1994 /bin/ls'

subprocess.call(["ls", "-l"]，shell=True)
subprocess.call("ls -l", shell=True)
subprocess.call("exit 1", shell=True)
```
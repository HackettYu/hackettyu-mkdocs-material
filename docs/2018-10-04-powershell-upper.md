---
title: 命令行下 powershell 提权
description: windows 下 powershell 没有 sudo 命令，每次需要管理员权限的时候都需要按 <WIN + X>
redirect: 2018-10-04-powershell-upper
---

> description: windows 下 powershell 没有 sudo 命令，每次需要管理员权限的时候都需要按 <WIN + X>

## 简介

windows 下每次打开一个普通 cli 后发现要按 [win + X + A] 组合键才能打开管理员 cli ，感觉很麻烦，然后在网速查到了这个方法。

## 快速上手

在普通 powershell 下输入下面的命令即可提权：

```shell
Start-Process -verb runas "C:\Windows\SysWOW64\WindowsPowerShell\v1.0\Powershell.exe"
```

后面的路径根据实际的路径修改，最好用任务管理器查看系统使用的那个，系统内可能有几个 powershell 程序。

## 入门篇

- [powershell/module/microsoft.powershell.utility/new-alias?view=powershell-6](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/new-alias?view=powershell-6)

- [powershell/module/microsoft.powershell.core/about/about_functions?view=powershell-6](https://docs.microsoft.com/zh-cn/powershell/module/microsoft.powershell.core/about/about_functions?view=powershell-6)

其实这样输入有点麻烦，bash 有 alias 这样的命令的给命令起别名， cmd 有doskey 这样的命令，而 powershell 的是 Set-Alias 。
下面的命令分别是添加、获取和删除别名：

```powershell
Set-Alias {$alias} {$command}
Get-Alias | findstr {$alias}
Remove-Item alias:{$alias}
```

用 Set-Alias 找不到能传参的方式，用了函数的方式，用法如下：

```powershell
Function FuncName （args[]）
{
      code;
}
```

实际命令如下：

```powershell
Function fuck {Start-Process -verb runas "C:\Windows\System32\WindowsPowerShell\v1.0\Powershell.exe"}
Set-Alias sudo fuck
```

删除函数如下：

```powershell
del Function:{$your function}
```

## 进阶篇

- [about_Execution_Policies](https://technet.microsoft.com/zh-CN/library/hh847748.aspx)

上面的方法可以使用但是，关闭程序后旧失效了，找了一种方法把脚本写入全局。
找到全局设置文件 Microsoft.PowerShell_profile.ps1 ：

```powershell
Get-Variable profile | Format-List
```

如果没有自己创建一个，写入下面的代码：

```powershell
Function fuck {Start-Process -verb runas "C:\Windows\System32\WindowsPowerShell\v1.0\Powershell.exe"}
Set-Alias sudo fuck
```

保存后发现无法加载，因为默认不加载外部脚本，管理员权限下 powershell 运行：

```powershell
set-ExecutionPolicy RemoteSigned
```

> **REMOTESIGNED**
脚本可以运行。这是 Windows Server 2012 R2 中的默认执行策略。
要求从 Internet 下载的脚本和配置文件（包括电子邮件和即时消息程序）具有受信任的发布者的数字签名。
不要求你在本地计算机上编写的脚本（不是从 Internet 下载的）具有数字签名。
如果脚本已被取消阻止（比如通过使用 Unblock-File cmdlet），则运行从 Internet 下载但未签名的脚本。
存在运行来自 Internet 之外的源的未签名脚本和已签名但却是恶意的脚本的风险。

## 附录

cmd 提权：

```cmd
runas /user:hackett_yu@outlook.com cmd
doskey sudo=runas /user:{$username} cmd
```

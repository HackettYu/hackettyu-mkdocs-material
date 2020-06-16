---
title: WINDOW 下使用 SCOOP 安装环境
date: 2020-05-07 20:40:00
category:
- note
tag:
- scoop
- windows
- CLI
- rcfile
---

环境: WIN10 Pro
工具: powershell(version > 3)/scoop

## scoop 使用

### scoop 安装

安装 scoop 前提 Permalink 版本大于等于 3 的 powershell

```poershell
$psversiontable.psversion.**major**
5
```

确保您已允许 PowerShell 执行本地脚本

```powershell
set-executionpolicy remotesigned -scope currentuser
```

安装 scoop

```powershell
Set-ExecutionPolicy RemoteSigned -scope CurrentUser
Invoke-Expression (New-Object System.Net.WebClient).DownloadString('https://get.scoop.sh')

# or shorter
iwr -useb get.scoop.sh | iex
```
### scoop 添加 bucket

安装 git 后可以添加 bucket

```powershell
# scoop insatll git

# 查看官方支持的 bucket
scoop bucket known
# main
# extras
# versions
# nightlies
# nirsoft
# php
# nerd-fonts
# nonportable
# java
# games
# jetbrains

# 查看帮助
scoop bucket help
# scoop bucket: cmd 'help' not supported
# Usage: scoop bucket add|list|known|rm [<args>]

# 添加 bucket
scoop bucket add extras
scoop bucket add java
```

### scoop 常用命令使用

```powershell
#查看某软件执行命令位置
# scoop which {{name}}
#搜索某软件
# scoop search {{name}}
#打开某软件官网
# scoop home {{name}}
# 检查潜在的问题
# scoop checkup
# 查看状态
# scoop status
```

### scoop 安装我在使用的软件

安装前可以考虑使用 aria2 加速下载，不过由于 HTTPS 可能会导致下载失败，具体参考 [scoop aria2 使用](#scoop-aria2-使用)
安装前可以考虑使用 proxy 加速下载，具体参考 [scoop 添加 http 代理](#scoop-添加-http-代理)

```powershell
# 启用 aria2c 加速下载，不过可能会导致下载失败

# 建议先安装
scoop install innounp
scoop install extras/vcredist2010   # erroor: missing MSVCR100.dll
scoop install extras/vcredist2015

# dev env
scoop install git
scoop install openssh # because: https://stackoverflow.com/questions/49926386/openssh-windows-bad-owner-or-permissions
scoop install nodejs # test: node npm
scoop install yarn # depend on npm
scoop install python # test: python pip
scoop install go

# java
# scoop bucket add java
# install java lastest openjdk
scoop install openjdk 
# 如果你想使用 jdk8 你可以使用 openjdk 的发行版本
# scoop install adopt8-upstream
# 切换到 jk8, 默认只会使用最后一次安装的版本
# scoop reset adopt8-upstream
java -version
# 目前在 scoop java bucket 里的 jdk 版本
chrome https://github.com/ScoopInstaller/Java/tree/master/bucket

# dev tools
scoop install vscode-portable   # vscode 便携版
scoop install postman
scoop install soapui # jdk 1.8 if jdk >= 1.8 you can try to readyapi
scoop install devdocs
scoop install windows-terminal

# CLI tools
scoop install wget
scoop install ffmpeg
scoop install aria2
scoop install youtube-dl
scoop install vim
scoop install zip
scoop install jq
scoop install latex
scoop install pandoc
scoop install hugo
scoop install phantomjs

# apps im
scoop install telegram

# apps tools
scoop install googlechrome  # Chrome
scoop install everything    # 文件搜索
scoop install 7zip  # 压缩
scoop install vlc   # vedio
scoop install dismplusplus  # dism++
scoop install calibre   # 书籍管理
scoop install ccleaner  # 清理工具
scoop install copyq # 剪切板工具
scoop install snipaste  # 截图工具
scoop install libreoffice-stable    # office
```

### scoop-aria2-使用

aria2-enabled false true
scoop config aria2-enabled false
scoop config proxy 127.0.0.1:{{port}} # 启用 http 代理参考 windows 代理设置里写的端口与 sock5 端口不一样

### scoop-添加-http-代理

```powershell
# add
# 端口在 win10 设置里的代理设置
# 好像不支持 sock5
scoop config proxy 127.0.0.1:{{port}}
# delete
scoop config rm proxy
```

### scoop 常见问题处理

下载错误建议关闭 aria2

```powershell
scoop config aria2-enabled false
# scoop config aria2-enabled true
```

```powershell
PS C:\WINDOWS\system32> scoop install vscode-portable
WARN  Scoop uses 'aria2c' for multi-connection downloads.
WARN  Should it cause issues, run 'scoop config aria2-enabled false' to disable it.
Installing 'vscode-portable' (1.44.2) [64bit]
Loading dl.7z from cache.
Starting download with aria2 ...
Download: 05/04 11:56:18 [ERROR] CUID#8 - Download aborted. URI=https://raw.githubusercontent.com/lukesampson/scoop-extras/master/scripts/vscode-install-context.reg
Download: Exception: [HttpConnection.cc:156] errorCode=1 Got EOF from the server.
Download: 05/04 11:56:18 [ERROR] CUID#9 - Download aborted. URI=https://raw.githubusercontent.com/lukesampson/scoop-extras/master/scripts/vscode-uninstall-context.reg
Download: Exception: [HttpConnection.cc:156] errorCode=1 Got EOF from the server.
Download: Download Results:
Download: gid   |stat|avg speed  |path/URI
Download: ======+====+===========+=======================================================
Download: 9274bd|ERR |       0B/s|C:/Users/hasee/scoop/cache/vscode-portable#1.44.2#https_raw.githubusercontent.com_lukesampson_scoop-extras_master_scripts_vscode-install-context.reg
Download: da621c|ERR |       0B/s|C:/Users/hasee/scoop/cache/vscode-portable#1.44.2#https_raw.githubusercontent.com_lukesampson_scoop-extras_master_scripts_vscode-uninstall-context.reg
Download: Status Legend:
Download: (ERR):error occurred.
Download: aria2 will resume download if the transfer is restarted.
Download: If there are any errors, then see the log file. See '-l' option in help/man page for details.
ERROR Download failed! (Error 1) An unknown error occurred
ERROR https://raw.githubusercontent.com/lukesampson/scoop-extras/master/scripts/vscode-install-context.reg
    referer=https://raw.githubusercontent.com/lukesampson/scoop-extras/master/scripts/
    dir=C:\Users\hasee\scoop\cache
    out=vscode-portable#1.44.2#https_raw.githubusercontent.com_lukesampson_scoop-extras_master_scripts_vscode-install-context.reg
https://raw.githubusercontent.com/lukesampson/scoop-extras/master/scripts/vscode-uninstall-context.reg
    referer=https://raw.githubusercontent.com/lukesampson/scoop-extras/master/scripts/
    dir=C:\Users\hasee\scoop\cache
    out=vscode-portable#1.44.2#https_raw.githubusercontent.com_lukesampson_scoop-extras_master_scripts_vscode-uninstall-context.reg

ERROR & 'C:\Users\hasee\scoop\apps\aria2\current\aria2c.exe' --input-file='C:\Users\hasee\scoop\cache\vscode-portable.txt' --user-agent='Scoop/1.0 (+http://scoop.sh/) PowerShell/5.1 (Windows NT 10.0; Win64; x64; Desktop)' --allow-overwrite=true --auto-file-renaming=false --retry-wait=2 --split=5 --max-connection-per-server=5 --min-split-size=5M --console-log-level=warn --enable-color=false --no-conf=true --follow-metalink=true --metalink-preferred-protocol=https --min-tls-version=TLSv1.2 --stop-with-process=12884 --continue --all-proxy='127.0.0.1:1080'

Please try again or create a new issue by using the following link and paste your console output:
https://github.com/lukesampson/scoop-extras/issues/new?title=vscode-portable%401.44.2%3a+download+via+aria2+failed
```

使用 scoop checkup 命令检查

```powershell
PS C:\WINDOWS\system32> scoop checkup
WARN  Windows Defender may slow down or disrupt installs with realtime scanning.
  Consider running:
    sudo Add-MpPreference -ExclusionPath 'C:\Users\hasee\scoop'
  (Requires 'sudo' command. Run 'scoop install sudo' if you don't have it.)
WARN  Windows Defender may slow down or disrupt installs with realtime scanning.
  Consider running:
    sudo Add-MpPreference -ExclusionPath 'C:\ProgramData\scoop'
  (Requires 'sudo' command. Run 'scoop install sudo' if you don't have it.)
WARN  LongPaths support is not enabled.
You can enable it with running:
    Set-ItemProperty 'HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem' -Name 'LongPathsEnabled' -Value 1
ERROR 'Inno Setup Unpacker' is not installed! It's required for unpacking InnoSetup files. Please run 'scoop install innounp'.
WARN  Found 4 potential problems.
```

如果你想安装微信或者网易云

```powershell
scoop bucket add dodorz https://github.com/dodorz/scoop-bucket
scoop install dodorz/NeteaseMusic
scoop install dodorz/wechat
```

**wechat.json**

```json
{
    "homepage": "https://weixin.qq.com/",
    "description": "Free messaging and calling app.",
    "version": "2.9.0",
    "license": {
        "identifier": "EULA",
        "url": "https://weixin.qq.com/cgi-bin/readtemplate?lang=zh_CN&t=weixin_agreement&s=default"
    },
    "url": "https://dldir1.qq.com/weixin/Windows/WeChatSetup.exe#/dl.7z",
    "shortcuts": [
        [
            "wechat.exe",
            "WeChat"
        ]
    ],
    "post_install": [
        "Remove-Item \"$dir\\`$PLUGINSDIR\" -Force -Recurse",
        "Remove-Item \"$dir\\`$_15_\" -Force -Recurse",
        "Remove-Item \"$dir\\`$R5\" -Force -Recurse"
    ],
    "checkver": "微信 ([\\d.]+) for Windows 发布",
    "notes": "We don't persist your WeChat data, they are still storaged in '%APPDATA%\\Tencent\\WeChat'."
}
```

**neteasemusic.json**

```json
{
    "homepage": "https://music.163.com/",
    "description": "The official NetEase Cloud Music client.",
    "version": "2.7.1.198242",
    "license": {
        "identifier": "EULA",
        "url": "https://music.163.com/html/web2/service.html"
    },
    "url": "https://d1.music.126.net/dmusic/obj/w5zCg8OCw6fCn2vDicOl/809710492/7805/2019112318441/cloudmusicsetup2.7.1.198242.exe#/dl.7z",
    "hash": "md5:991ae324e2ff261295f5fb4caeff55d9",
    "post_install": "Remove-Item \"$dir\\`$PLUGINSDIR\" -Force -Recurse",
    "bin": "cloudmusic.exe",
    "shortcuts": [
        [
            "cloudmusic.exe",
            "Netease Cloud Music"
        ]
    ],
    "checkver": {
        "url": "https://h404bi.azurewebsites.net/ncmversion.php",
        "jp": "$.updateFiles[0].url",
        "regex": "https://d1.music.126.net/dmusic/cloudmusicsetup([\\d.]+)\\.exe"
    },
    "autoupdate": {
        "url": "https://d1.music.126.net/dmusic/cloudmusicsetup$version.exe#/dl.7z",
        "hash": {
            "url": "https://h404bi.azurewebsites.net/ncmversion.php",
            "jp": "$.updateFiles[0].hash"
        }
    },
    "notes": "We don't persist your CloudMusic data, they are still storaged in '%LOCALAPPDATA%\\Netease\\CloudMusic'."
}
```



## 使用 DISM++ 检查 WIN10 环境

```powershell
# 扫描全部系统文件并和官方系统文件对比，扫描计算机中的不一致情况
Dism /Online /Cleanup-Image /ScanHealth
# 这条命令必须在前一条命令执行完以后，发现系统文件有损坏时使用
Dism /Online /Cleanup-Image /CheckHealth
# 不同的系统文件还原成官方系统源文件
DISM /Online /Cleanup-image /RestoreHealth
# 完成重启后
sfc /SCANNOW
```

## PWA

NOTION
ROAM
Todolist

## VSCode extensions

```powershell
# scoop install vscode

code --extensions-dir <dir>
    Set the root path for extensions.
code --list-extensions
    List the installed extensions.
code --show-versions
    Show versions of installed extensions, when using --list-extension.
code --install-extension (<extension-id> | <extension-vsix-path>)
    Installs an extension.
code --uninstall-extension (<extension-id> | <extension-vsix-path>)
    Uninstalls an extension.
code --enable-proposed-api (<extension-id>)
    Enables proposed API features for extensions. Can receive one or more extension IDs to enable individually.
```

安装我使用的 VSCode extentions

```powershell
code --list-extensions
# dbaeumer.vscode-eslint
# eamodio.gitlens
# MS-CEINTL.vscode-language-pack-zh-hans
# ms-python.python
# ms-vscode-remote.remote-wsl
# yzhang.markdown-all-in-one

# code --install-extension {{extension-id}}
```

> Where are extensions installed?#
Extensions are installed in a per user extensions folder. Depending on your platform, the location is in the following folder:

- Windows %USERPROFILE%\.vscode\extensions
- macOS ~/.vscode/extensions
- Linux ~/.vscode/extensions

## Chrome extensions

/TODO

## download

- edge
- wechat
- 坚果云

## windows app store

spotify
Trello
ubunto wsl

## yarn

```bash
yarn add hexo
```

## pip

/TODO

## npm

/TODO

## 安装 WSl

```powershell
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

## 个性化设置

[为 windows 添加 open here](https://github.com/microsoft/terminal/issues/1060#issuecomment-497539461)

## REFERENCE

### scoop java

- [Java · lukesampson/scoop Wiki](https://github.com/lukesampson/scoop/wiki/Java)
- [Java/bucket at master · ScoopInstaller/Java](https://github.com/ScoopInstaller/Java/tree/master/bucket)

### VSCode

- [Managing Extensions in Visual Studio Code](https://code.visualstudio.com/docs/editor/extension-gallery)

### Others

- [scoop-homepage](https://scoop.sh/)
- [scoop 的使用](http://www.igiven.com/tool/scoop-use/)
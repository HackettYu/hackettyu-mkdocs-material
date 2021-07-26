---
title: 命令行下切换当前 workplace 到 Visual Studio Code
description: 命令行下 <code> 命令可以直接打开 VSCode，只要添加环境变量就行了
redirect: 2020-03-20-vscode-diff
---

> description: 命令行下 <code> 命令可以直接打开 VSCode，只要添加环境变量就行了

> 环境：WIN10

## VSCode 的命令行方式

配置环境变量：`%LOCALAPPDATA%\Programs\Microsoft VS Code\code.exe`

code 命令：

``` sh
# 新建一个文件
code README.md
# 新建两个文件
code foo.md bar.md
# 编辑一个已存在的文件
code foo.md
# diff 比较两个文件
code -d foo.md bar.md
code --diff foo.md bar.md
# 新打开一个窗口
code -n
```

## 修改 VSCode 为 git 默认 diff tool

``` bash
# 修改 VSCode 为 git 默认 diff
git config --global diff.tool vscode
git config --global difftool.vscode.cmd "code --wait --diff $LOCAL $REMOTE"
# 修改 git 默认编辑器
git config --global core.editor "code --wait"
```

## 参考

[Comparing files using Visual Studio Code](https://www.meziantou.net/comparing-files-using-visual-studio-code.htm)

**code --help**

``` sh
HY $code --help
Visual Studio Code 1.43.1

Usage: code.exe [options][paths...]

To read output from another program, append '-' (e.g. 'echo Hello World | code.exe -')

Options
  -d --diff <file> <file>           Compare two files with each other.
  -a --add <folder>                 Add folder(s) to the last active window.
  -g --goto <file:line[:character]> Open a file at the path on the specified
									line and character position.
  -n --new-window                   Force to open a new window.
  -r --reuse-window                 Force to open a file or folder in an
									already opened window.
  -w --wait                         Wait for the files to be closed before
									returning.
  --locale <locale>                 The locale to use (e.g. en-US or zh-TW).
  --user-data-dir <dir>             Specifies the directory that user data is
									kept in. Can be used to open multiple
									distinct instances of Code.
  -v --version                      Print version.
  -h --help                         Print usage.
  --telemetry                       Shows all telemetry events which VS code
									collects.
  --folder-uri <uri>                Opens a window with given folder uri(s)
  --file-uri <uri>                  Opens a window with given file uri(s)

Extensions Management
  --extensions-dir <dir>                            Set the root path for
													extensions.
  --list-extensions                                 List the installed
													extensions.
  --show-versions                                   Show versions of installed
													extensions, when using
													--list-extension.
  --category                                        Filters installed
													extensions by provided
													category, when using
													--list-extension.
  --install-extension <extension-id | path-to-vsix> Installs or updates the
													extension. Use `--force`
													argument to avoid
													prompts.
  --uninstall-extension <extension-id>              Uninstalls an extension.
  --enable-proposed-api <extension-id>              Enables proposed API
													features for extensions.
													Can receive one or more
													extension IDs to enable
													individually.

Troubleshooting
  --verbose                          Print verbose output (implies --wait).
  --log <level>                      Log level to use. Default is 'info'.
									 Allowed values are 'critical', 'error',
									 'warn', 'info', 'debug', 'trace', 'off'.
  -s --status                        Print process usage and diagnostics
									 information.
  --prof-startup                     Run CPU profiler during startup
  --disable-extensions               Disable all installed extensions.
  --disable-extension <extension-id> Disable an extension.
  --inspect-extensions <port>        Allow debugging and profiling of
									 extensions. Check the developer tools for
									 the connection URI.
  --inspect-brk-extensions <port>    Allow debugging and profiling of
									 extensions with the extension host being
									 paused after start. Check the developer
									 tools for the connection URI.
  --disable-gpu                      Disable GPU hardware acceleration.
  --max-memory                       Max memory size for a window (in Mbytes).
```

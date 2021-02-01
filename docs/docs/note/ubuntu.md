# UBUNTU

在Ubuntu中 可以设置环境变量有4个 优先级从高到底

/etc/profile:在登录时,操作系统定制用户环境时使用的第一个文件,此文件为系统的每个用户设置环境信息,用户第一次登录时,该文件被执行。

/etc/environment:在登录时操作系统使用的第二个文件,系统在读取你自己的profile前,设置环境文件的环变量。
~/.bash_profile

在登录时用到的第三个文件是.profile文件,每个用户都可使用该文件输入专用于自己使用的shell信息,当用登录时,该 文件仅仅执行一次!默认情况下,他设置一些环境变游戏量,执行用户的.bashrc文件。/etc/bashrc为每一个运行bash shell的用户执行此文件.当bash shell被打开时,该文件被读取.

~/.bashrc:该文件包含专用于你的bash shell的bash信息,当登录时以及每次打开新的shell时,该该文件被取。
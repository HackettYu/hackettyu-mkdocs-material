# fail2ban

> 你可以通过以下方式来检测当前iptables来验证禁止规则。

$ sudo iptables --list -n

想要从fail2ban中解锁某个IP地址，你可以使用iptables命令：

$ sudo iptables -D fail2ban-SSH -s 192.168.1.8 -j DROP

 sudo fail2ban-client status ssh-iptables
上面的命令会显示出被禁止IP地址列表

为了解锁特定的IP地址：

$ sudo fail2ban-client set ssh-iptables unbanip 192.168.1.8

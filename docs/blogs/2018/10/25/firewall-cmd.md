---
title: centos 7 防火墙命令 firewall-cmd
description: firewall-cmd 的 cheatsheet
---

> description: firewall-cmd 的 cheatsheet

## 简介
centos 7 和 centos 6 有不同的防火墙命令，centos 7 的是 firewall-cmd，如果没安装，安装方法如下：
```bash
yum install firewalld
```
开启防火墙
```bash
systemctl start firewalld.service
```
关闭防火墙
```bash
systemctl stop firewalld.service
```
开机自动启动
```bash
systemctl enable firewalld.service
```
关闭开机制动启动
```bash
systemctl disable firewalld.service
```

## 快速入门
基本的添加端口：
```bash
firewall-cmd --zone=public --add-port=9001/tcp --permanent
firewall-cmd --zone=public --add-port=9001/udp --permanent
firewall-cmd --reload
```
查看：
```bash
firewall-cmd --list-all
```
## 进阶篇
```bash
firewall-cmd --zone=public --add-service=https //临时
firewall-cmd --zone=public --add-port=8080-8081/tcp //临时
```
```bash
firewall-cmd --permanent --zone=public --add-service=https //永久
firewall-cmd --permanent --zone=public --add-port=8080-8081/tcp //永久
```

删除
```bash
firewall-cmd --permanent --zone=public --remove-rich-rule="rule family="ipv4" source address="192.168.1.1"
```
查询
```bash
firewall-cmd --query-service ftp
yes
firewall-cmd --query-service ssh
yes
firewall-cmd --query-service samba
no
firewall-cmd --query-service http
no
```
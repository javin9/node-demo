<!--
 * @Name: name
 * @Description: description
 * @Author: cupid(cupid@163.com)
 * @LastEditors  : cupid
 * @LastEditTime : 2020-01-13 11:53:09
 * @LastEditContent: 
 -->
###
```bash
pm2 start app.yml
# 在线监控
# 开机启动
```                

### docker 安装mysql
[Mac下Docker安装MySql、操作MySql](https://www.jianshu.com/p/d211fec2f34a)  
[mac下利用docker部署个Mysql](https://www.jianshu.com/p/83ecd99cf3eb)  
[Mac Docker 安装 MySQL](https://www.kefaming.com/9910.html)  
[2019-01-11亲测Navicat Premium for Mac破解](https://www.jianshu.com/p/4e93b48f9f63)  
[Docker常用命令汇总，和常用操作举例](https://www.cnblogs.com/cblogs/p/dockerCommand.html)

```bash
$ docker exec -it 6d5388599bda /bin/bash

mysql -u root -p  
#密码：123456 // 123456是密码

mysql> ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '123456

### 全站的思维脑图
# node-demo

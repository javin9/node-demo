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

docker run --name mysqlserver -e MYSQL_ROOT_PASSWORD=root -d -i -p 3306:3306  mysql/mysql-server

mysql -u root -p  123456;
#密码：123456 // 123456是密码

mysql> ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '123456
```

### 全站的思维脑图
# node-demo


### docker 安装redis
[Docker安装redis](https://www.jianshu.com/p/2f95680f21c5)
[Docker创建redis容器](https://www.cnblogs.com/yanghe123/p/10960535.html)

```bash
docker run -d -p 6379:6379 -v $PWD/conf/redis.conf:/usr/local/etc/redis/redis.conf -v $PWD/data:/data --name myredis docker.io/redis redis-server /usr/local/etc/redis/redis.conf --appendonly yes
# -d：表示后台运行，不加-d执行上面的命令你就会看到redis启动的日志信息了
# --appendonly yes：表示redis开启持久化策略
# -v：表示挂载路径，$PWD表示当前目录下，冒号左面的表示我们宿主机的挂载目录，也就是我们虚拟机所在的文件路径，冒号右边则表是的是redis容器在容器内部的路径，上面的命令我分别挂载了redis.conf(redis的配置文件)，如需使用配置文件的方式启动redis，这里则需要加上，还有redis存放数据所在的目录

docker run -d --restart=always -v $PWD/conf/redis.conf:/usr/local/etc/redis/redis.conf -v $PWD/data:/data --name myredis -p 6379:6379 redis --requirepass "123456"
# -d 　　　　　　　　　 后台进行
# --retsart=always 自动重启
# -v /data:/data 宿主机/data目录挂载到容器/data目录
# --name　　　　　　　 容器名设置为myredis
# -p　　　　　　　　　　映射端口号
# --requirepass "123456" 设置密码123456


# 下载redis桌面可视化工具连接测试：https://redisdesktop.com/
```
# 可以使用nginx

## 首先用ssh打开公网服务器和内网服务器的连接通道

```bash
ssh -vnNT -R 服务器端口:localhost:本地端口 服务器用户名@服务器 IP 地址
ssh -vnNT -R 7689:localhost:8000 root@47.45.14.12
# 7689指的是公网服务器的端口，localhost:8000是内网服务器的ip端口
# root是公网服务器的用户，47.45.14.12是公网服务器的ip
```

## nginx转发服务

在公网服务器的nginx配置文件nginx.conf添加一下内容：

```haskell
upstream tunnel {
server 127.0.0.1:7689;
}

server {
listen 80;
server_name x.xx.xxx;

location / {
proxy_set_header  X-Real-IP  $remote_addr;
proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header Host $http_host;
proxy_redirect off;

proxy_pass http://tunnel;
}
}
```

理解：用nginx创建代理，如果有人访问[http://x.xx.xxx](https://link.zhihu.com/?target=http%3A//x.xx.xxx)，nginx会把请求转发给tunnel，这个tunnel指的就是这台公网服务器，端口号是7689，后面会用这个跟内网来进行通信

# 中微子内网穿透

相较于nginx而言.他由民间大佬提供了web可视化操作.以及数据库端口映射,流量监控信息.
教程连接
[快速上手 | 中微子代理](https://neutrino-proxy.dromara.org/neutrino-proxy/pages/793dcb/#_1%E3%80%81-%E9%83%A8%E7%BD%B2%E6%9C%8D%E5%8A%A1%E7%AB%AF)

## 服务端docker部署

####  指定自己的mysql数据库

● 在服务器上创建目录：/root/neutrino-proxy/config
● 在该目录下创建app.yml文本文件，并配置如下内容：

```yaml
application:
  name: neutrino-proxy-server

neutrino:
  proxy:
    protocol:
      max-frame-length: 2097152
      length-field-offset: 0
      length-field-length: 4
      initial-bytes-to-strip: 0
      length-adjustment: 0
      read-idle-time: 360
      write-idle-time: 300
      all-idle-time-seconds: 3600
    tunnel:
      boss-thread-count: 2
      work-thread-count: 10
      # 服务端端口，用于保持与客户端的连接，非SSL
      port: ${OPEN_PORT:9000}
      # 服务端端口，用于保持与客户端的连接，SSL,需要jks证书文件，若不需要ssl支持，可不配置
      ssl-port: ${SSL_PORT:9002}
      # 证书配置，用于隧道通信SSL加密
      key-store-password: ${STORE_PASS:123456}
      key-manager-password: ${MGR_PASS:123456}
      jks-path: ${JKS_PATH:classpath:/test.jks}
    server:
      boss-thread-count: 5
      work-thread-count: 20
      # HTTP代理端口，默认80，也可以用其他端口，走nginx转发
      http-proxy-port: ${HTTP_PROXY_PORT:80}
      # HTTPS代理端口，默认443，也可以用其他端口，走nginx转发
      https-proxy-port: ${HTTPS_PROXY_PORT:443}
      # 如果不配置，则不支持域名映射
      domain-name: ${DOMAIN_NAME:}
      # 证书配置，用于支持HTTPS
      key-store-password: ${HTTPS_STORE_PASS:}
      jks-path: ${HTTPS_JKS_PATH:}

  data:
    db:
      type: mysql
      # 自己的数据库实例，创建一个空的名为'neutrino-proxy'的数据库即可，首次启动服务端会自动初始化
      url: jdbc:mysql://xxxx:3306/neutrino-proxy?useUnicode=true&characterEncoding=UTF-8&allowMultiQueries=true&useAffectedRows=true&useSSL=false
      driver-class: com.mysql.jdbc.Driver # 这行配置无意义,代码中已开启mysql版本检测,自动切换
      # 数据库帐号
      username: xxx
      # 数据库密码
      password: xxx

```

执行如下命令

```bash
docker run -it -p 9000-9200:9000-9200/tcp -p 8888:8888 \
-v /root/neutrino-proxy/config:/root/neutrino-proxy/config \
-d --restart=always --name neutrino \
registry.cn-hangzhou.aliyuncs.com/asgc/neutrino-proxy:latest
```

## 服务端使用jar包自行部署

● 首先确保服务器上已安装java8运行环境
● 打开[发行版页面(opens new window)](https://gitee.com/dromara/neutrino-proxy/releases)，下载最新的release包：neutrino-proxy-server.jar、neutrino-proxy-admin.zip
● 在服务器上新建部署目录：/work/projects/neutrino-proxy-server
● 将neutrino-proxy-server.jar、neutrino-proxy-admin.zip上传至服务器部署目录。
● 解压neutrino-proxy-admin.zip文件
● 若需要指定自己的mysql数据库，同样的需要在当前目录下新建app.yml文件，文件内容同上。执行命令`java -Dfile.encoding=utf-8 -jar neutrino-proxy-server.jar config=app.yml`启动服务端完成部署

## 客户端jar部署

● 首先确保本地已安装java8运行环境
● 打开[发行版页面(opens new window)](https://gitee.com/dromara/neutrino-proxy/releases)，下载最新的release包：`neutrino-proxy-client.jar`
● 在本地`neutrino-proxy-client.jar`同级别目录下新建app.yml文件，并配置如下内容：

```yaml
neutrino:
  proxy:
    protocol:
      max-frame-length: 2097152
      length-field-offset: 0
      length-field-length: 4
      initial-bytes-to-strip: 0
      length-adjustment: 0
      read-idle-time: 360
      write-idle-time: 300
      all-idle-time-seconds: 3600
    client:
      # ssl证书密钥（使用jjar包内自带的证书，则此处无需修改）
      key-store-password: 123456
      # ssl证书管理密钥（使用jjar包内自带的证书，则此处无需修改。自定义证书，则此处配置对应的路径）
      jks-path: classpath:/test.jks
      # 代理服务端IP
      server-ip: localhost
      # 代理服务端IP, 若是非ssl端口，则ssl-enable需要配置为false
      server-port: 9002
      # 是否启用ssl
      ssl-enable: true
      # licenseKey，客户端凭证。此处需要配置刚刚从管理后台复制的LicenseKey
      license-key: xxxx

```

可以 `screen -R proxy`创建一个新屏幕启动该jar.  ctrl+a+d不杀掉当前屏幕,返回原屏幕
执行命令`java -jar neutrino-proxy-client.jar config=app.yml`启动客户端
`nohup java -Xms128m -Xmx256m -jar neutrino-proxy-client.jar config=app.yml >/dev/null 2>&1 &`后台启动并且不输出日志
查看服务端License管理，刷新页面，对应的License在线状态为在线，则表明客户端已正常连接。

## 管理后台配置

● 服务端部署成功后，访问http://{服务端IP}:8888打开后台管理页面。
● 使用默认的管理员帐号登录：admin/123456
● 打开代理配置>License管理页面，可以看到系统已经自动为管理员初始化了一条License记录，复制该LicenseKey备用，后续客户端配置需要。
● 打开代理配置>端口映射页面，可以看到系统已经自动为初始化了几条端口映射。可根据需要自行添加、修改。这里我们以9101 -> 127.0.0.1:8080映射为例
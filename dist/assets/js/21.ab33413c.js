(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{601:function(s,a,t){"use strict";t.r(a);var n=t(18),e=Object(n.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"内网穿透"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#内网穿透"}},[s._v("#")]),s._v(" 内网穿透")]),s._v(" "),t("h1",{attrs:{id:"可以使用nginx"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#可以使用nginx"}},[s._v("#")]),s._v(" 可以使用nginx")]),s._v(" "),t("h2",{attrs:{id:"首先用ssh打开公网服务器和内网服务器的连接通道"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#首先用ssh打开公网服务器和内网服务器的连接通道"}},[s._v("#")]),s._v(" 首先用ssh打开公网服务器和内网服务器的连接通道")]),s._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("ssh")]),s._v(" -vnNT -R 服务器端口:localhost:本地端口 服务器用户名@服务器 IP 地址\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("ssh")]),s._v(" -vnNT -R "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("7689")]),s._v(":localhost:8000 root@47.45.14.12\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 7689指的是公网服务器的端口，localhost:8000是内网服务器的ip端口")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# root是公网服务器的用户，47.45.14.12是公网服务器的ip")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br")])]),t("h2",{attrs:{id:"nginx转发服务"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#nginx转发服务"}},[s._v("#")]),s._v(" nginx转发服务")]),s._v(" "),t("p",[s._v("在公网服务器的nginx配置文件nginx.conf添加一下内容：")]),s._v(" "),t("div",{staticClass:"language-java line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[s._v("upstream tunnel "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  server "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("127.0")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v(".0")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v(".1")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("7689")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\nserver "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  listen "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("80")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  server_name x"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("xx"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("xxx"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  \n  location "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    proxy_set_header  "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("X")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Real")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("IP  $remote_addr"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    proxy_set_header  "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("X")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Forwarded")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("For")]),s._v(" $proxy_add_x_forwarded_for"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    proxy_set_header "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Host")]),s._v(" $http_host"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    proxy_redirect off"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    \n    proxy_pass http"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("tunnel"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br")])]),t("p",[s._v("理解：用nginx创建代理，如果有人访问"),t("a",{attrs:{href:"https://link.zhihu.com/?target=http%3A//x.xx.xxx",target:"_blank",rel:"noopener noreferrer"}},[s._v("http://x.xx.xxx"),t("OutboundLink")],1),s._v("，nginx会把请求转发给tunnel，这个tunnel指的就是这台公网服务器，端口号是7689，后面会用这个跟内网来进行通信")]),s._v(" "),t("h1",{attrs:{id:"中微子内网穿透"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#中微子内网穿透"}},[s._v("#")]),s._v(" 中微子内网穿透")]),s._v(" "),t("p",[s._v("相较于nginx而言.他由民间大佬提供了web可视化操作.以及数据库端口映射,流量监控信息.\n教程连接\n"),t("a",{attrs:{href:"https://neutrino-proxy.dromara.org/neutrino-proxy/pages/793dcb/#_1%E3%80%81-%E9%83%A8%E7%BD%B2%E6%9C%8D%E5%8A%A1%E7%AB%AF",target:"_blank",rel:"noopener noreferrer"}},[s._v("快速上手 | 中微子代理"),t("OutboundLink")],1)]),s._v(" "),t("h2",{attrs:{id:"服务端docker部署"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#服务端docker部署"}},[s._v("#")]),s._v(" 服务端docker部署")]),s._v(" "),t("h4",{attrs:{id:"指定自己的mysql数据库"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#指定自己的mysql数据库"}},[s._v("#")]),s._v(" 指定自己的mysql数据库")]),s._v(" "),t("p",[s._v("● 在服务器上创建目录：/root/neutrino-proxy/config\n● 在该目录下创建app.yml文本文件，并配置如下内容：")]),s._v(" "),t("div",{staticClass:"language-yaml line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-yaml"}},[t("code",[t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("neutrino")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("data")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("db")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("type")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" mysql\n      "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 自己的数据库实例，创建一个空的名为'neutrino-proxy'的数据库即可，首次启动服务端会自动初始化")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("url")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" jdbc"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("mysql"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("//xxxx"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("3306/neutrino"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("proxy"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("?")]),s._v("useUnicode=true"),t("span",{pre:!0,attrs:{class:"token important"}},[s._v("&characterEncoding=UTF-8&allowMultiQueries=true&useAffectedRows=true&useSSL=false")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("driver-class")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" com.mysql.jdbc.Driver "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 这行配置无意义,代码中已开启mysql版本检测,自动切换")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 数据库帐号")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("username")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" xxx\n      "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 数据库密码")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("password")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" xxx\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br")])]),t("p",[s._v("执行如下命令")]),s._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("docker run -it -p "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("9000")]),s._v("-9200:9000-9200/tcp -p "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("8888")]),s._v(":8888 "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n-v /root/neutrino-proxy/config:/root/neutrino-proxy/config "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n-d --restart"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("always --name neutrino "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\nregistry.cn-hangzhou.aliyuncs.com/asgc/neutrino-proxy:latest\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br")])]),t("h2",{attrs:{id:"服务端使用jar包自行部署"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#服务端使用jar包自行部署"}},[s._v("#")]),s._v(" 服务端使用jar包自行部署")]),s._v(" "),t("p",[s._v("● 首先确保服务器上已安装java8运行环境\n● 打开"),t("a",{attrs:{href:"https://gitee.com/dromara/neutrino-proxy/releases",target:"_blank",rel:"noopener noreferrer"}},[s._v("发行版页面(opens new window)"),t("OutboundLink")],1),s._v("，下载最新的release包：neutrino-proxy-server.jar、neutrino-proxy-admin.zip\n● 在服务器上新建部署目录：/work/projects/neutrino-proxy-server\n● 将neutrino-proxy-server.jar、neutrino-proxy-admin.zip上传至服务器部署目录。\n● 解压neutrino-proxy-admin.zip文件\n● 若需要指定自己的mysql数据库，同样的需要在当前目录下新建app.yml文件，文件内容同上。执行命令"),t("code",[s._v("java -Dfile.encoding=utf-8 -jar neutrino-proxy-server.jar config=app.yml")]),s._v("启动服务端完成部署")]),s._v(" "),t("h2",{attrs:{id:"客户端jar部署"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#客户端jar部署"}},[s._v("#")]),s._v(" 客户端jar部署")]),s._v(" "),t("p",[s._v("● 首先确保本地已安装java8运行环境\n● 打开"),t("a",{attrs:{href:"https://gitee.com/dromara/neutrino-proxy/releases",target:"_blank",rel:"noopener noreferrer"}},[s._v("发行版页面(opens new window)"),t("OutboundLink")],1),s._v("，下载最新的release包："),t("code",[s._v("neutrino-proxy-client.jar")]),s._v("\n● 在本地"),t("code",[s._v("neutrino-proxy-client.jar")]),s._v("同级别目录下新建app.yml文件，并配置如下内容：")]),s._v(" "),t("div",{staticClass:"language-yaml line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-yaml"}},[t("code",[t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("neutrino")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("proxy")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("client")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# ssl证书密钥（使用jjar包内自带的证书，则此处无需修改）")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("key-store-password")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("123456")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# ssl证书管理密钥（使用jjar包内自带的证书，则此处无需修改。自定义证书，则此处配置对应的路径）")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("jks-path")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" classpath"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("/test.jks\n      "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 代理服务端IP")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("server-ip")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" localhost\n      "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 代理服务端IP, 若是非ssl端口，则ssl-enable需要配置为false")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("server-port")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("9002")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 是否启用ssl")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("ssl-enable")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token boolean important"}},[s._v("true")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# licenseKey，客户端凭证。此处需要配置刚刚从管理后台复制的LicenseKey")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("license-key")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" xxxx\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br")])]),t("p",[s._v("可以 "),t("code",[s._v("screen -R proxy")]),s._v("创建一个新屏幕启动该jar.  ctrl+a+d不杀掉当前屏幕,返回原屏幕\n执行命令"),t("code",[s._v("java -jar neutrino-proxy-client.jar config=app.yml")]),s._v("启动客户端\n查看服务端License管理，刷新页面，对应的License在线状态为在线，则表明客户端已正常连接。")]),s._v(" "),t("h2",{attrs:{id:"管理后台配置"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#管理后台配置"}},[s._v("#")]),s._v(" 管理后台配置")]),s._v(" "),t("p",[s._v("● 服务端部署成功后，访问http://{服务端IP}:8888打开后台管理页面。\n● 使用默认的管理员帐号登录：admin/123456\n● 打开代理配置>License管理页面，可以看到系统已经自动为管理员初始化了一条License记录，复制该LicenseKey备用，后续客户端配置需要。\n● 打开代理配置>端口映射页面，可以看到系统已经自动为初始化了几条端口映射。可根据需要自行添加、修改。这里我们以9101 -> 127.0.0.1:8080映射为例")])])}),[],!1,null,null,null);a.default=e.exports}}]);
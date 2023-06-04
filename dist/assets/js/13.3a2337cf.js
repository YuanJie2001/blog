(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{372:function(t,n,r){t.exports=r.p+"assets/img/1.741047b7.png"},373:function(t,n,r){t.exports=r.p+"assets/img/img.f0e071d2.png"},598:function(t,n,r){"use strict";r.r(n);var s=r(18),e=Object(s.a)({},(function(){var t=this,n=t.$createElement,s=t._self._c||n;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"基于golang的gin框架和gorm框架的项目结构及演练"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#基于golang的gin框架和gorm框架的项目结构及演练"}},[t._v("#")]),t._v(" 基于golang的gin框架和gorm框架的项目结构及演练")]),t._v(" "),s("p"),s("div",{staticClass:"table-of-contents"},[s("ul",[s("li",[s("a",{attrs:{href:"#一-项目结构"}},[t._v("一.项目结构")])]),s("li",[s("a",{attrs:{href:"#二-常用命令"}},[t._v("二.常用命令")])])])]),s("p"),t._v(" "),s("hr"),t._v(" "),s("p",[s("strong",[t._v("go学习资料")]),t._v(":")]),t._v(" "),s("p",[s("a",{attrs:{href:"https://github.com/xxjwxc/uber_go_guide_cn#import-%E5%88%86%E7%BB%84",target:"_blank",rel:"noopener noreferrer"}},[t._v("Go编程规范"),s("OutboundLink")],1)]),t._v(" "),s("p",[s("a",{attrs:{href:"https://www.runoob.com/go/go-basic-syntax.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Go 语言基础语法 | 菜鸟教程 (runoob.com)"),s("OutboundLink")],1)]),t._v(" "),s("p",[s("a",{attrs:{href:"https://gorm.io/zh_CN/docs/",target:"_blank",rel:"noopener noreferrer"}},[t._v("GORM 指南 | GORM - The fantastic ORM library for Golang, aims to be developer friendly."),s("OutboundLink")],1)]),t._v(" "),s("p",[s("a",{attrs:{href:"https://gin-gonic.com/zh-cn/docs/examples/",target:"_blank",rel:"noopener noreferrer"}},[t._v("示例 | Gin Web Framework (gin-gonic.com)"),s("OutboundLink")],1)]),t._v(" "),s("p",[s("a",{attrs:{href:"https://www.bilibili.com/video/BV1gJ411p7xC?p=10&vd_source=3c2251052802b14d4d8e7afdc95a2c3a",target:"_blank",rel:"noopener noreferrer"}},[t._v("lesson10_gin框架返回json_哔哩哔哩_bilibili"),s("OutboundLink")],1)]),t._v(" "),s("p",[s("code",[t._v("项目地址写在文章最后")]),t._v(" "),s("a",{attrs:{href:"https://github.com/YuanJie2001/gin-gorm-test",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://github.com/YuanJie2001/gin-gorm-test"),s("OutboundLink")],1)]),t._v(" "),s("h2",{attrs:{id:"一-项目结构"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#一-项目结构"}},[t._v("#")]),t._v(" 一.项目结构")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("主要技术")]),t._v(" "),s("th",[t._v("版本")]),t._v(" "),s("th",[t._v("描述")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("golang")]),t._v(" "),s("td",[t._v("v1.20")]),t._v(" "),s("td",[t._v("--")])]),t._v(" "),s("tr",[s("td",[t._v("gin")]),t._v(" "),s("td",[t._v("v1.9.0")]),t._v(" "),s("td",[t._v("mvc框架")])]),t._v(" "),s("tr",[s("td",[t._v("gorm")]),t._v(" "),s("td"),t._v(" "),s("td",[t._v("ORM框架")])])])]),t._v(" "),s("p",[s("img",{attrs:{src:r(372),alt:"在这里插入图片描述"}})]),t._v(" "),s("p",[t._v("1.router路由组可以嵌套")]),t._v(" "),s("p",[t._v("2.Gin框架允许开发者在处理请求的过程中，加入用户自己的钩子(Hook)函数。这个钩子函数就叫中间件，中间件适合处理一些公共的业务逻辑，比如登录认证、权限校验、数据分页、记录日志、耗时统计等。")]),t._v(" "),s("p",[t._v("3.gorm框架由后端驱动. 对象生成表结构, 对象的方法操作表结构")]),t._v(" "),s("p",[t._v("执行流程:\n"),s("img",{attrs:{src:r(373),alt:"在这里插入图片描述"}})]),t._v(" "),s("h2",{attrs:{id:"二-常用命令"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#二-常用命令"}},[t._v("#")]),t._v(" 二.常用命令")]),t._v(" "),s("div",{staticClass:"language-shell line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 设置国内代理下载")]),t._v("\ngo "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("env")]),t._v(" -w "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("GO111MODULE")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("on\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 阿里云")]),t._v("\ngo "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("env")]),t._v(" -w "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("GOPROXY")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("https://mirrors.aliyun.com/goproxy/,direct\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 1. 引用项目需要的依赖增加到go.mod文件。")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 2. 去掉go.mod文件中项目不需要的依赖。")]),t._v("\ngo mod tidy\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 下载远程依赖库")]),t._v("\ngo get -u url\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 启动项目")]),t._v("\ngo run main.go\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br"),s("span",{staticClass:"line-number"},[t._v("9")]),s("br"),s("span",{staticClass:"line-number"},[t._v("10")]),s("br"),s("span",{staticClass:"line-number"},[t._v("11")]),s("br"),s("span",{staticClass:"line-number"},[t._v("12")]),s("br"),s("span",{staticClass:"line-number"},[t._v("13")]),s("br"),s("span",{staticClass:"line-number"},[t._v("14")]),s("br")])]),s("p",[s("a",{attrs:{href:"https://github.com/YuanJie2001/gin-gorm-test",target:"_blank",rel:"noopener noreferrer"}},[t._v("项目地址"),s("OutboundLink")],1)])])}),[],!1,null,null,null);n.default=e.exports}}]);
# 前言
嘿嘿嘿，这个项目是我闲着无聊弄出来的

### 技术栈

后端技术栈：node + koa2 + sequelize + mysql

### 项目运行
前提：首先安装node和mysql，然后修改config目录下config.json配置文件（数据库的用户名和密码）

```
git clone https://github.com/caiheping/node-blog-server.git
cd ./node-blog-server
npm install   // 安装依赖
npx sequelize-cli db:created    // 创建数据库
npx sequelize-cli db:migrate    // 生成迁移文件
npx sequelize-cli db:seed:all   // 生成种子文件
node ./app.js   // 启动服务器
```

打开浏览器输入： http://127.0.0.1:8888/ 就可以访问项目啦(前端代码地址：https://github.com/caiheping/node-blog-client)

admin登录账号：admin，密码： 123456，admin用户只能管理用户，没有前端博客界面。
普通用户账号密码自己用admin去用户管理创建


## 说明

>  如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！ ^_^


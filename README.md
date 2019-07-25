# 前言
嘿嘿嘿，这个项目是我闲着无聊弄出来的

### 技术栈

后端技术栈：node + koa2 + sequelize + mysql

### 项目运行
前提：首先安装MySQL数据库，然后修改config目录下config.json配置文件（数据库的用户名和密码）

```
npm install   // 安装依赖
npx sequelize-cli db:created    // 创建数据库
npx sequelize-cli db:migrate    // 生成迁移文件
npx sequelize-cli db:seed:all   // 生成种子文件
node ./app.js   // 启动服务器
```

打开浏览器输入： http://127.0.0.1:8888/ 就可以访问项目啦

登录账号：admin，密码： 123456

## 说明

>  如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！ ^_^

>  或者您可以 "follow" 一下，我会不断开源更多的有趣的项目


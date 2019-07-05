(async function () {
  const Koa = require('koa');
  const KoaBodyParser = require('koa-bodyparser');
  const koaBody = require('koa-body');
  const path = require('path');
  const index = require('./router/index');
  const user = require('./router/user');
  const test = require('./router/test');
  const other = require('./router/other');
  const article = require('./router/article');
  const static = require('koa-static');    //静态资源服务

  const app = new Koa();

  // 静态资源 例如：http://127.0.0.1:8888/static/upload/1562297696067.png
  app.use(static(__dirname, 'static'));

  app.use(koaBody({
    multipart:true, // 支持文件上传
    formidable:{
      keepExtensions: true,    // 保持文件的后缀
      maxFieldsSize:200 * 1024 * 1024, // 文件上传大小
    }
  }));

  app.use(KoaBodyParser());

  app.use(index.routes());
  app.use(user.routes());
  app.use(other.routes());
  app.use(article.routes());

  app.use(test.routes());

  app.listen(8888);
})()
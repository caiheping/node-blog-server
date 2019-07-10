(async function () {
  const Koa = require('koa');
  const KoaBodyParser = require('koa-bodyparser');
  const koaBody = require('koa-body');
  const path = require('path');
  const static = require('koa-static');    //静态资源服务
  const session = require('koa-session');
  const checkToken = require('./middlewares/checkToken.js')

  const a_index = require('./router/admin/index');
  const a_user = require('./router/admin/user');
  const a_other = require('./router/admin/other');
  const a_article = require('./router/admin/article');

  const app = new Koa();

  // 静态资源 例如：http://127.0.0.1:8888/static/upload/1562297696067.png
  app.use(static(__dirname, 'static'));

  // 配置session
  app.keys = ['some secret hurr'];

  const CONFIG = {
    key: 'koa:sess',
    maxAge: 60*60*1000,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: false,
  };

  app.use(session(CONFIG, app));

  // 拦截，判断token是否过期
  app.use(checkToken())

  app.use(koaBody({
    multipart:true, // 支持文件上传
    formidable:{
      keepExtensions: true,    // 保持文件的后缀
      maxFieldsSize:200 * 1024 * 1024, // 文件上传大小
    }
  }));

  app.use(KoaBodyParser());

  // admin
  app.use(a_index.routes());
  app.use(a_user.routes());
  app.use(a_other.routes());
  app.use(a_article.routes());

  app.listen(8888);
})()
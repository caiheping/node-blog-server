(async function () {
  const Koa = require('koa');
  const KoaBodyParser = require('koa-bodyparser');
  const router = require('./router/index');
  const user = require('./router/user');
  const test = require('./router/test');
  const other = require('./router/other');
  const article = require('./router/article');
  const StaticCache = require('koa-static-cache');

  const app = new Koa();

  // 静态资源
  app.use(StaticCache('./static/', {
    prefix: '/static/',
    gzip: true
  }));

  app.use(KoaBodyParser());

  app.use(router.routes());
  app.use(user.routes());
  app.use(other.routes());
  app.use(article.routes());

  app.use(test.routes());

  app.listen(8888);
})()
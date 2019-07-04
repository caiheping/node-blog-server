const Router = require('koa-router');
const router = new Router();

// 测试
router.get('/test', async (ctx, next) => {
  ctx.cookies.set('name', 'frank');
  ctx.body = {
    code: 0,
    data: {
      msg: 'sss'
    }
  }
})

module.exports = router

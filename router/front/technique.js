const Router = require('koa-router');
const Models = require('../../models/index');


const router = new Router();

// 技术杂谈
router.get('/front/technique', async (ctx, next) => {
  let page = 1
  let limit = 10
  let u_id = ctx.query.u_id ? parseInt(ctx.query.u_id) : '';
  let type = ctx.query.type ? ctx.query.type : '';
  let query = {
    u_id
  }
  if (!u_id) {
    return ctx.body = {
      code: 1,
      data: '缺少参数'
    }
  }
  if (type) {
    query.type = type
  }
  if (ctx.query.page) {
    page = parseInt(ctx.query.page)
  }
  if (ctx.query.limit) {
    limit = parseInt(ctx.query.limit)
  }
  let res = await Models.Article.findAndCountAll({
    offset: (page - 1) * limit,
    limit: limit,
    where: query,
    order: [
      ['createdAt', 'DESC']
    ],
    include: [{
      model: Models.Ip
    }]
  })
  ctx.body = {
    code: 0,
    page,
    limit,
    data: res.rows,
    count: res.count
  }
})

module.exports = router

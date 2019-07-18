const Router = require('koa-router');
const Models = require('../../models/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


const router = new Router();

// 查询类型
router.get('/fornt/article/findArticleType', async (ctx, next) => {
  let u_id = ctx.query.u_id ? parseInt(ctx.query.u_id) : '';
  let query = {
    u_id
  }
  if (!u_id) {
    return ctx.body = {
      code: 1,
      data: '缺少参数'
    }
  }
  res = await Models.ArticleType.findAll({
    where: query,
    order: [
      ['createdAt', 'DESC']
    ]
  })
  ctx.body = {
    code: 0,
    data: res
  }
})

// 查询文章
router.get('/fornt/article/findArticle', async (ctx, next) => {
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
  res = await Models.Article.findAndCountAll({
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

// 查询文章
router.get('/fornt/article/findArticleById', async (ctx, next) => {
  let id = ctx.query.id ? parseInt(ctx.query.id) : '';
  let u_id = ctx.query.u_id ? parseInt(ctx.query.u_id) : '';
  let query = {
    id
  }
  if (!id) {
    return ctx.body = {
      code: 1,
      data: '缺少参数'
    }
  }
  res = await Models.Article.findOne({
    where: query,
    include: [{
      model: Models.Ip
    }]
  })
  ctx.body = {
    code: 0,
    data: res
  }
})

module.exports = router

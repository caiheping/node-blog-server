const Router = require('koa-router');
const Models = require('../../models/index');


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
  let res = await Models.ArticleType.findAll({
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

// 查询文章
router.get('/fornt/article/findArticleById', async (ctx, next) => {
  let id = ctx.query.id ? parseInt(ctx.query.id) : '';
  let query = {
    id
  }
  if (!id) {
    return ctx.body = {
      code: 1,
      data: '缺少参数'
    }
  }
  let res = await Models.Article.findOne({
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

// 设置浏览量
router.post('/fornt/article/setBrowse', async (ctx, next) => {
  let a_id = ctx.request.body.a_id
  let ip = ctx.header['x-forwarded-for']
  if (!a_id || !ip) {
    return ctx.body = {
      code: 1,
      data: '缺少参数'
    }
  }
  let ipResult = await Models.Ip.findOne({
    where: {
      ip,
      a_id
    }
  })
  if (ipResult) {
    ctx.body = {
      code: 0
    }
  } else {
    let res = await Models.Article.findOne({
      where: {
        id: a_id
      }
    })
    let browse = res.browse + 1
    await Models.Article.update({
      browse
    },{
      where: {
        id: a_id
      }
    })
    await Models.Ip.create({
      a_id,
      ip
    })
    ctx.body = {
      code: 0
    }
  }
})

// 喜欢
router.post('/front/article/like', async (ctx, next) => {
  let a_id = ctx.request.body.a_id
  let ip = ctx.header['x-forwarded-for']
  if (!a_id || !ip) {
    return ctx.body = {
      code: 1,
      data: '缺少参数'
    }
  }
  let ipResult = await Models.Ip.findOne({
    where: {
      ip,
      a_id
    }
  })
  if (ipResult && !ipResult.is_love) {
    let res = await Models.Article.findOne({
      where: {
        id: a_id
      }
    })
    let love = res.love + 1
    await Models.Article.update({
      love
    },{
      where: {
        id: a_id
      }
    })
    await Models.Ip.update({
      is_love: 1
    },{
      where: {
        a_id,
        ip
      }
    })
    ctx.body = {
      code: 0
    }
  } else {
    ctx.body = {
      code: 1,
      data: '不能重复添加喜欢'
    }
  }
})

module.exports = router

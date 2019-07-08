const Router = require('koa-router');
const Models = require('../models/index');

const router = new Router();

// 查询类型
router.get('/article/findArticleType', async (ctx, next) => {
  let page = 1
  let limit = 10
  if (ctx.query.page) {
    page = parseInt(ctx.query.page)
  }
  if (ctx.query.limit) {
    limit = parseInt(ctx.query.limit)
  }
  res = await Models.ArticleType.findAndCountAll({
    offset: (page - 1) * limit,
    limit: limit
  })
  ctx.body = {
    code: 0,
    page,
    limit,
    data: res.rows,
    count: res.count
  }
})

// 添加类型
router.post('/article/addArticleType', async (ctx, next) => {
  let u_id = ctx.request.body.u_id ? parseInt(ctx.request.body.u_id) : '';
  let title = ctx.request.body.title ? ctx.request.body.title : '';
  console.log(u_id, title)
  if (!u_id || !title) {
    return ctx.body = {
      code: 1,
      data: '缺少参数'
    }
  }
  let res = await Models.ArticleType.create({u_id, title})
  ctx.body = {
    code: 0,
    data: '添加成功'
  }
})

// 删除类型
router.post('/article/deleteArticleType', async (ctx, next) => {
  let id = ctx.request.body.id ? parseInt(ctx.request.body.id) : '';
  if (!id) {
    return ctx.body = {
      code: 1,
      data: '缺少参数'
    }
  }

  let res = await Models.ArticleType.destroy({
    where: {
      id: id
    }
  })
  ctx.body = {
    code: 0,
    data: '删除成功'
  }
})

// 修改类型
router.post('/article/updateArticleType', async (ctx, next) => {
  let title = ctx.request.body.title ? ctx.request.body.title : '';
  let id = ctx.request.body.id ? parseInt(ctx.request.body.id) : '';
  if (!id || !title) {
    return ctx.body = {
      code: 1,
      data: '缺少参数'
    }
  }

  let res = await Models.ArticleType.update({
    title
  },
  {
    where: {
      id: id // 查询条件
    }
  })

  ctx.body = {
    code: 0,
    data: '修改成功'
  }
})



// 查询文章
router.get('/article/findArticle', async (ctx, next) => {
  let page = 1
  let limit = 10
  if (ctx.query.page) {
    page = parseInt(ctx.query.page)
  }
  if (ctx.query.limit) {
    limit = parseInt(ctx.query.limit)
  }
  res = await Models.Article.findAndCountAll({
    offset: (page - 1) * limit,
    limit: limit,
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

// 添加文章
router.post('/article/addArticle', async (ctx, next) => {
  let u_id = ctx.request.body.u_id ? parseInt(ctx.request.body.u_id) : '';
  let title = ctx.request.body.title ? ctx.request.body.title : '';
  let content = ctx.request.body.content ? ctx.request.body.content : '';
  let type = ctx.request.body.type ? ctx.request.body.type : '';
  let cover_photo = ctx.request.body.cover_photo ? ctx.request.body.cover_photo : '';
  if (!u_id || !title || !content || !type || !cover_photo) {
    return ctx.body = {
      code: 1,
      data: '缺少参数'
    }
  }
  let res = await Models.Article.create({u_id, title, content, type, cover_photo})
  ctx.body = {
    code: 0,
    data: '添加成功'
  }
})

// 删除文章
router.post('/article/deleteArticle', async (ctx, next) => {
  let id = ctx.request.body.id ? parseInt(ctx.request.body.id) : '';
  if (!id) {
    return ctx.body = {
      code: 1,
      data: '缺少参数'
    }
  }

  let res = await Models.Article.destroy({
    where: {
      id: id
    }
  })
  ctx.body = {
    code: 0,
    data: '删除成功'
  }
})

// 修改文章
router.post('/article/updateArticle', async (ctx, next) => {
  let title = ctx.request.body.title ? ctx.request.body.title : '';
  let content = ctx.request.body.content ? ctx.request.body.content : '';
  let type = ctx.request.body.type ? ctx.request.body.type : '';
  let cover_photo = ctx.request.body.cover_photo ? ctx.request.body.cover_photo : '';
  let id = ctx.request.body.id ? parseInt(ctx.request.body.id) : '';
  if (!id || !title || !content || !type || !cover_photo) {
    return ctx.body = {
      code: 1,
      data: '缺少参数'
    }
  }

  let res = await Models.Article.update({
    title,
    content,
    type,
    cover_photo
  },
  {
    where: {
      id: id // 查询条件
    }
  })

  ctx.body = {
    code: 0,
    data: '修改成功'
  }
})


module.exports = router
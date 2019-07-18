const Router = require('koa-router');
const Models = require('../../models/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const router = new Router();

// 查询类型
router.get('/admin/article/findArticleType', async (ctx, next) => {
  let page = 1
  let limit = 10
  let u_id = ctx.query.u_id ? parseInt(ctx.query.u_id) : '';
  let title = ctx.query.title ? ctx.query.title : '';
  let query = {
    u_id
  }
  if (!u_id) {
    return ctx.body = {
      code: 1,
      data: '缺少参数'
    }
  }
  if (title) {
    query.title = {
      // 模糊查询
      [Op.like]:'%' +title + '%'
    }
  }
  if (ctx.query.page) {
    page = parseInt(ctx.query.page)
  }
  if (ctx.query.limit) {
    limit = parseInt(ctx.query.limit)
  }
  res = await Models.ArticleType.findAndCountAll({
    offset: (page - 1) * limit,
    limit: limit,
    where: query,
    order: [
      ['createdAt', 'DESC']
    ]
  })
  ctx.body = {
    code: 0,
    page,
    limit,
    data: res.rows,
    count: res.count
  }
})

// 查询所有类型
router.get('/admin/article/findArticleAllType', async (ctx, next) => {
  res = await Models.ArticleType.findAll({
    order: [
      ['createdAt', 'DESC']
    ]
  })
  ctx.body = {
    code: 0,
    data: res
  }
})

// 添加类型
router.post('/admin/article/addArticleType', async (ctx, next) => {
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
router.post('/admin/article/deleteArticleType', async (ctx, next) => {
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
router.post('/admin/article/updateArticleType', async (ctx, next) => {
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
router.get('/admin/article/findArticle', async (ctx, next) => {
  let page = 1
  let limit = 10
  let u_id = ctx.query.u_id ? parseInt(ctx.query.u_id) : '';
  let type = ctx.query.type ? ctx.query.type : '';
  let title = ctx.query.title ? ctx.query.title : '';
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
  if (title) {
    query.title = {
      // 模糊查询
      [Op.like]:'%' +title + '%'
    }
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
    ]
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
router.post('/admin/article/addArticle', async (ctx, next) => {
  let u_id = ctx.request.body.u_id ? parseInt(ctx.request.body.u_id) : '';
  let title = ctx.request.body.title ? ctx.request.body.title : '';
  let preface = ctx.request.body.preface ? ctx.request.body.preface : '';
  let content = ctx.request.body.content ? ctx.request.body.content : '';
  let type = ctx.request.body.type ? ctx.request.body.type : '';
  let cover_photo = ctx.request.body.cover_photo ? ctx.request.body.cover_photo : '';
  if (!u_id || !title || !preface || !content || !type || !cover_photo) {
    return ctx.body = {
      code: 1,
      data: '缺少参数'
    }
  }
  let res = await Models.Article.create({u_id, title, content, type, cover_photo, preface})
  ctx.body = {
    code: 0,
    data: '添加成功'
  }
})

// 删除文章
router.post('/admin/article/deleteArticle', async (ctx, next) => {
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
router.post('/admin/article/updateArticle', async (ctx, next) => {
  let title = ctx.request.body.title ? ctx.request.body.title : '';
  let preface = ctx.request.body.preface ? ctx.request.body.preface : '';
  let content = ctx.request.body.content ? ctx.request.body.content : '';
  let type = ctx.request.body.type ? ctx.request.body.type : '';
  let cover_photo = ctx.request.body.cover_photo ? ctx.request.body.cover_photo : '';
  let id = ctx.request.body.id ? parseInt(ctx.request.body.id) : '';
  if (!id || !title || !preface || !content || !type || !cover_photo) {
    return ctx.body = {
      code: 1,
      data: '缺少参数'
    }
  }

  let res = await Models.Article.update({
    title,
    content,
    type,
    cover_photo,
    preface
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
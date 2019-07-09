const Router = require('koa-router');
const Models = require('../models/index');

const router = new Router();

// 查询轮播图
router.get('/other/findBanner', async (ctx, next) => {
  let u_id = ctx.query.u_id ? parseInt(ctx.query.u_id) : '';
  if (!u_id) {
    return ctx.body = {
      code: 1,
      data: '缺少参数'
    }
  }
  res = await Models.Banner.findAll({
    where: {
      u_id
    }
  })
  ctx.body = {
    code: 0,
    data: res
  }
})

// 添加轮播图
router.post('/other/addBanner', async (ctx, next) => {
  let u_id = ctx.request.body.u_id ? parseInt(ctx.request.body.u_id) : '';
  let index = ctx.request.body.index ? parseInt(ctx.request.body.index) : '';
  let url = ctx.request.body.url ? ctx.request.body.url : '';
  console.log(u_id, index, url)
  if (!u_id || !index || !url) {
    return ctx.body = {
      code: 1,
      data: '缺少参数'
    }
  }
  let res = await Models.Banner.create({u_id, index, url})
  ctx.body = {
    code: 0,
    data: '添加成功'
  }
})

// 删除轮播图
router.post('/other/deleteBanner', async (ctx, next) => {
  let id = ctx.request.body.id ? parseInt(ctx.request.body.id) : '';
  if (!id) {
    return ctx.body = {
      code: 1,
      data: '缺少参数'
    }
  }

  let res = await Models.Banner.destroy({
    where: {
      id: id
    }
  })
  ctx.body = {
    code: 0,
    data: '删除成功'
  }
})

// 修改轮播图
router.post('/other/updateBanner', async (ctx, next) => {
  let index = ctx.request.body.index ? parseInt(ctx.request.body.index) : '';
  let url = ctx.request.body.url ? ctx.request.body.url : '';
  let id = ctx.request.body.id ? parseInt(ctx.request.body.id) : '';
  if (!id || !index || !url) {
    return ctx.body = {
      code: 1,
      data: '缺少参数'
    }
  }

  let res = await Models.Banner.update({
    index,
    url
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


// 查询友情链接
router.get('/other/findFriendshipLink', async (ctx, next) => {
  let u_id = ctx.query.u_id ? parseInt(ctx.query.u_id) : '';
  if (!u_id) {
    return ctx.body = {
      code: 1,
      data: '缺少参数'
    }
  }
  res = await Models.FriendshipLink.findAll({
    where: {
      u_id
    }
  })
  ctx.body = {
    code: 0,
    data: res
  }
})

// 添加友情链接
router.post('/other/addFriendshipLink', async (ctx, next) => {
  let u_id = ctx.request.body.u_id ? parseInt(ctx.request.body.u_id) : '';
  let title = ctx.request.body.title ? ctx.request.body.title : '';
  let url = ctx.request.body.url ? ctx.request.body.url : '';
  if (!u_id || !title || !url) {
    return ctx.body = {
      code: 1,
      data: '缺少参数'
    }
  }
  let res = await Models.FriendshipLink.create({u_id, title, url})
  ctx.body = {
    code: 0,
    data: '添加成功'
  }
})

// 删除友情链接
router.post('/other/deleteFriendshipLink', async (ctx, next) => {
  let id = ctx.request.body.id ? parseInt(ctx.request.body.id) : '';
  if (!id) {
    return ctx.body = {
      code: 1,
      data: '缺少参数'
    }
  }

  let res = await Models.FriendshipLink.destroy({
    where: {
      id: id
    }
  })
  ctx.body = {
    code: 0,
    data: '删除成功'
  }
})

// 修改友情链接
router.post('/other/updateFriendshipLink', async (ctx, next) => {
  let title = ctx.request.body.title ? ctx.request.body.title : '';
  let url = ctx.request.body.url ? ctx.request.body.url : '';
  let id = ctx.request.body.id ? parseInt(ctx.request.body.id) : '';
  if (!id || !title || !url) {
    return ctx.body = {
      code: 1,
      data: '缺少参数'
    }
  }

  let res = await Models.FriendshipLink.update({
    title,
    url
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
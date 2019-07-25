const Router = require('koa-router');
const Models = require('../../models/index');


const router = new Router();

// 个人信息
router.get('/front/user/userInfo', async (ctx, next) => {
  let u_id = ctx.query.u_id ? parseInt(ctx.query.u_id) : '';
  if (!u_id) {
    return ctx.body = {
      code: 1,
      data: '缺少参数'
    }
  }
  let user = await Models.User.findOne({
    where: {
      id: u_id
    }
  })
  if (!user) {
    return ctx.body = {
      code: 1,
      data: '没有此记录'
    }
  }
  if (user.level === 0) {
    return ctx.body = {
      code: 0,
      data: '没有此记录'
    }
  } else {
    let res = await Models.User.findOne({
      where: {
        id: u_id
      },
      include: [{
        model: Models.Skill
      }]
    })
    return ctx.body = {
      code: 0,
      data: res
    }
  }
})

// 个人笔记管理
// 查询个人笔记
router.get('/front/user/findNote', async (ctx, next) => {
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
  let res = await Models.Note.findAll({
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

module.exports = router

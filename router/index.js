const Router = require('koa-router');
const Models = require('../models/index');
const md5 = require('md5');

const router = new Router();

// 登陆接口
router.post('/login', async (ctx, next) => {
  let username = ctx.request.body.username ? ctx.request.body.username : '';
  let password = ctx.request.body.password ? md5(ctx.request.body.password) : '';
  if (!username || !password) {
    return ctx.body = {
      code: 1,
      data: '用户名或密码不能为空'
    }
  }

  let user = await Models.User.findOne({
    where: {
      username,
      is_delete: 0
    }
  });
  if (user === null) {
    return ctx.body = {
      code: 1,
      data: '不存在该用户'
    }
  }
  user = await Models.User.findOne({
    where: {
      username,
      password: password
    }
  });
  if (user === null) {
    return ctx.body = {
      code: 1,
      data: '密码错误'
    }
  }

  ctx.body = {
    code: 0,
    data: {
      username: user.get('username'),
      id: user.get('id'),
      avator: user.get('avatar')
    }
  }
});

// 后台管理首页 获取分类的总数
router.get('/home/getArticleTypeTotal', async (ctx, next) => {
  let id = ctx.request.body.id ? ctx.request.body.id : '';
  let res = await Models.User.findOne({
    where: {
      id
    },
    include: [{
      model: Models.Skill
    }, {
      model: Models.Article
    }, {
      model: Models.ArticleType
    }, {
      model: Models.Banner
    }, {
      model: Models.Note
    }, {
      model: Models.FriendshipLink
    }]
  })
  ctx.body = {
    code: 0,
    data: res
  }
})

module.exports = router
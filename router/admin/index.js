const Router = require('koa-router');
const Models = require('../../models/index');
const md5 = require('md5');
const jwt = require('jsonwebtoken')

const router = new Router();

const secret = 'cai'

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

  const token = jwt.sign(
    {
      id: user.get('id'),
      username: user.get('username')
    },
    secret,
    {expiresIn: 60*60*1000}
  )

  ctx.session.token = token
  ctx.cookies.set('token', token, {
    httpOnly: false,
    maxAge: 1000*60*60 // 设置token过期时间
  });

  ctx.body = {
    code: 0,
    data: {
      userInfo: user,
      token
    }
  }
});

// 后台管理首页 获取分类的总数
router.get('/admin/home', async (ctx, next) => {
  let id = ctx.query.id ? parseInt(ctx.query.id) : '';
  if (!id) {
    return ctx.body = {
      code: 1,
      data: '缺少参数'
    }
  }
  let user = await Models.User.findOne({
    where: {
      id
    }
  })
  if (!user) {
    return ctx.body = {
      code: 1,
      data: '没有此记录'
    }
  }
  let allArticle
  let allUser
  let allNote
  if (user.level === 0) {
    console.log(999)
    allArticle = await Models.Article.count()
    allUser = await Models.User.count()
    allNote = await Models.Note.count()
    return ctx.body = {
      code: 0,
      data: {
        allArticle,
        allUser,
        allNote
      }
    }
  } else {
    allArticle = await Models.Article.count({
      where: {
        u_id: id
      }
    })
    allNote = await Models.Note.count({
      where: {
        u_id: id
      }
    })
    return ctx.body = {
      code: 0,
      data: {
        allArticle,
        allNote
      }
    }
  }
})

// 图片上传
router.post('/uploadImg', async (ctx, next) => {
  const file = ctx.request.files.file;
  let urlPath = file.path.substring(file.path.lastIndexOf('/'))
  console.log(urlPath)
  // 返回保存的路径
  return ctx.body = {
    code: 0,
    data: { url: 'http://' + ctx.headers.host + '/static/upload' + urlPath }
  };
})

module.exports = router

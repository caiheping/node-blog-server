const Router = require('koa-router');
const Models = require('../models/index');
const md5 = require('md5');
const fs = require('fs');
const path = require('path');
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
    {expiresIn: '1h'}
  )

  ctx.cookies.set('token', token, {
    httpOnly: false
  });

  ctx.body = {
    code: 0,
    data: {
      username: user.get('username'),
      id: user.get('id'),
      level: user.get('level'),
      avator: user.get('avatar'),
      token
    }
  }
});

// 后台管理首页 获取分类的总数
router.get('/home/getArticleTypeTotal', async (ctx, next) => {
  let id = ctx.query.id ? parseInt(ctx.query.id) : '';
  if (!id) {
    ctx.body = {
      code: 1,
      data: '缺少参数'
    }
  }
  let user = await Models.User.findOne({
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
  if (user.level === 0) {
    let allArticle = await Models.Article.findAndCountAll()
    let allUser = await Models.User.findAndCountAll()
    let allArticleType = await Models.ArticleType.findAndCountAll()
    let res = {
      allArticle,
      allUser,
      allArticleType
    }
    ctx.body = {
      code: 0,
      data: res
    }
  } else {
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
  }
})

// 图片上传
router.post('/uploadImg', async (ctx, next) => {
  const file = ctx.request.files.file; // 上传的文件在ctx.request.files.file
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    // 修改文件的名称
    var myDate = new Date();
    var newFilename = myDate.getTime()+'.'+file.name.split('.')[1];
    var targetPath = path.join(__dirname, '../static/upload/') + `/${newFilename}`;
    // 创建可写流
    const upStream = fs.createWriteStream(targetPath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    // 返回保存的路径
    return ctx.body = {
      code: 0,
      data: { url: 'http://' + ctx.headers.host + '/static/upload/' + newFilename }
    };
})

module.exports = router
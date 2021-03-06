const Router = require('koa-router');
const Models = require('../../models/index');
const md5 = require('md5');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


const router = new Router();

// 用户管理
// 查看用户
router.get('/admin/user/findUser', async (ctx, next) => {
  let page = 1
  let limit = 10
  let username = ctx.query.username ? ctx.query.username : ''
  let query = {
    is_delete: 0
  }
  if (ctx.query.page) {
    page = parseInt(ctx.query.page)
  }
  if (ctx.query.limit) {
    limit = parseInt(ctx.query.limit)
  }
  if (username) {
    query.username = {
      [Op.like]:'%' +username + '%'
    }
  }
  let userList = await Models.User.findAndCountAll({
    where: query,
    order: [
      ['createdAt', 'DESC']
    ],
    offset: (page - 1) * limit,
    limit: limit
  })
  ctx.body = {
    code: 0,
    data: {
      page,
      limit,
      rows: userList.rows,
      count: userList.count
    }
  }
})

router.get('/admin/user/findUserById', async (ctx, next) => {
  let u_id = ctx.query.u_id ? ctx.query.u_id : ''
  if (!u_id) {
    return ctx.body = {
      code: 1,
      data: '缺少参数'
    }
  }
  let query = {
    id: u_id
  }
  let user = await Models.User.findOne({
    where: query
  })
  ctx.body = {
    code: 0,
    data: {
      userInfo: user
    }

  }
})

// 添加用户
router.post('/admin/user/addUser', async (ctx, next) => {
  let username = ctx.request.body.username ? ctx.request.body.username : '';
  let password = ctx.request.body.password ? md5(ctx.request.body.password) : '';

  if (!username || !password) {
    return ctx.body = {
      code: 1,
      data: '缺少参数'
    }
  }

  let user = await Models.User.findOne({
    where: {
      username
    }
  });
  if (user !== null) {
    return ctx.body = {
      code: 1,
      data: '该用户已存在'
    }
  }
  let res = await Models.User.create({ username: username, password: password})
  console.log(res)
  ctx.body = {
    code: 0,
    data: '添加成功'
  }
})

// 修改密码
router.post('/admin/user/updatePwd', async (ctx, next) => {
  let originPwd = ctx.request.body.originPwd ? ctx.request.body.originPwd : '';
  let newPwd = ctx.request.body.newPwd ? ctx.request.body.newPwd : '';
  let id = ctx.request.body.id ? parseInt(ctx.request.body.id) : '';
  if (!id || !newPwd || !originPwd) {
    return ctx.body = {
      code: 1,
      data: '缺少参数'
    }
  }

  let user = await Models.User.findOne({
    where: {
      id: id
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
      id: id,
      password: md5(originPwd)
    }
  });
  if (user === null) {
    return ctx.body = {
      code: 1,
      data: '密码错误'
    }
  }

  let res = await Models.User.update({
    password: md5(newPwd)
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

// 删除用户
router.post('/admin/user/deleteUser', async (ctx, next) => {
  let id = ctx.request.body.id ? parseInt(ctx.request.body.id) : '';
  if (!id) {
    return ctx.body = {
      code: 1,
      data: '缺少参数'
    }
  }

  let res = await Models.User.update({
    is_delete: '-1'
  },
  {
    where: {
      id: id
    }
  })
  ctx.body = {
    code: 0,
    data: '删除成功'
  }
})


// 个人管理
// 查询个人技能
router.get('/admin/user/findSkill', async (ctx, next) => {
  let u_id = ctx.query.u_id ? parseInt(ctx.query.u_id) : ''
  if (!u_id) {
    return ctx.body = {
      code: 1,
      data: '缺少参数'
    }
  }
  let res = await Models.Skill.findAll({
    where: {
      u_id: u_id
    },
    order: [
      ['createdAt', 'DESC']
    ]
  })
  ctx.body = {
    code: 0,
    data: res
  }
})

// 添加个人技能
router.post('/admin/user/addSkill', async (ctx, next) => {
  let skill = ctx.request.body.skill ? ctx.request.body.skill : ''
  let u_id = ctx.request.body.u_id ? parseInt(ctx.request.body.u_id) : ''
  let proficiency = ctx.request.body.proficiency ? parseInt(ctx.request.body.proficiency) : ''
  if (!skill || !proficiency || !u_id) {
    return ctx.body = {
      code: 1,
      data: '缺少参数'
    }
  }
  let res = await Models.Skill.create({u_id, skill, proficiency})
  ctx.body = {
    code: 0,
    data: '添加技能成功'
  }
})

// 删除个人技能
router.post('/admin/user/deleteSkill', async (ctx, next) => {
  let id = ctx.request.body.id ? parseInt(ctx.request.body.id) : '';
  if (!id) {
    return ctx.body = {
      code: 1,
      data: '缺少参数'
    }
  }

  let res = await Models.Skill.destroy({
    where: {
      id: id
    }
  })
  ctx.body = {
    code: 0,
    data: '删除成功'
  }
})

// 修改个人技能
router.post('/admin/user/updateSkill', async (ctx, next) => {
  let skill = ctx.request.body.skill ? ctx.request.body.skill : '';
  let proficiency = ctx.request.body.proficiency ? ctx.request.body.proficiency : '';
  let id = ctx.request.body.id ? parseInt(ctx.request.body.id) : '';
  if (!id || !proficiency || !skill) {
    return ctx.body = {
      code: 1,
      data: '缺少参数'
    }
  }

  let res = await Models.Skill.update({
    proficiency,
    skill
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

// 编辑个人简介信息
router.post('/admin/user/updateUserInfo', async (ctx, next) => {
  let id = ctx.request.body.id ? parseInt(ctx.request.body.id) : '';
  let nickname = ctx.request.body.nickname ? ctx.request.body.nickname : '';
  let motto = ctx.request.body.motto ? ctx.request.body.motto : '';
  let hobby = ctx.request.body.hobby ? ctx.request.body.hobby : '';

  let github = ctx.request.body.github ? ctx.request.body.github : '';
  let qq = ctx.request.body.qq ? ctx.request.body.qq : '';
  let wechat = ctx.request.body.wechat ? ctx.request.body.wechat : '';
  let weibo = ctx.request.body.weibo ? ctx.request.body.weibo : '';
  let RSS = ctx.request.body.RSS ? ctx.request.body.RSS : '';
  let email = ctx.request.body.email ? ctx.request.body.email : '';


  let query = {
    nickname,
    motto,
    hobby,
    github,
    qq,
    weibo,
    wechat,
    RSS,
    email
  }
  if (ctx.request.files.file) {
    let file = ctx.request.files.file ? ctx.request.files.file : '';
    let avatar = 'http://' + ctx.headers.host + '/static/upload' + file.path.substring(file.path.lastIndexOf('/'))
    query.avatar = avatar
  }

  if (!id) {
    return ctx.body = {
      code: 1,
      data: '缺少参数id'
    }
  }
  let res = await Models.User.update(
    query,
    {
      where: {
        id: id // 查询条件
      }
    }
  )

  ctx.body = {
    code: 0,
    data: '修改成功'
  }
})


// 个人笔记管理
// 查询个人笔记
router.get('/admin/user/findNote', async (ctx, next) => {
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
  let userList = await Models.Note.findAndCountAll({
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
    data: userList.rows,
    count: userList.count
  }
})

// 添加个人笔记
router.post('/admin/user/addNote', async (ctx, next) => {
  let u_id = ctx.request.body.u_id ? parseInt(ctx.request.body.u_id) : '';
  let title = ctx.request.body.title ? ctx.request.body.title : '';
  let content = ctx.request.body.content ? ctx.request.body.content : '';
  if (!u_id || !title || !content) {
    return ctx.body = {
      code: 1,
      data: '缺少参数'
    }
  }
  let res = await Models.Note.create({u_id, title, content})
  ctx.body = {
    code: 0,
    data: '添加成功'
  }
})

// 删除个人笔记
router.post('/admin/user/deleteNote', async (ctx, next) => {
  let id = ctx.request.body.id ? parseInt(ctx.request.body.id) : '';
  if (!id) {
    return ctx.body = {
      code: 1,
      data: '缺少参数'
    }
  }

  let res = await Models.Note.destroy({
    where: {
      id: id
    }
  })
  ctx.body = {
    code: 0,
    data: '删除成功'
  }
})

// 编辑个人笔记
router.post('/admin/user/updateNote', async (ctx, next) => {
  let title = ctx.request.body.title ? ctx.request.body.title : '';
  let content = ctx.request.body.content ? ctx.request.body.content : '';
  let id = ctx.request.body.id ? parseInt(ctx.request.body.id) : '';
  if (!id || !content || !title) {
    return ctx.body = {
      code: 1,
      data: '缺少参数'
    }
  }

  let res = await Models.Note.update({
    content,
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

module.exports = router

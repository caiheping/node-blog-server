const Router = require('koa-router');
const Models = require('../models/index');
const md5 = require('md5');

const router = new Router();

// 用户管理
// 查看用户
router.get('/user/findUser', async (ctx, next) => {
  let page = 1
  let limit = 10
  if (ctx.query.page) {
    page = parseInt(ctx.query.page)
  }
  if (ctx.query.limit) {
    limit = parseInt(ctx.query.limit)
  }
  userList = await Models.User.findAndCountAll({
    where: {
      is_delete: 0
    },
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

// 添加用户
router.post('/user/addUser', async (ctx, next) => {
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
router.post('/user/updatePwd', async (ctx, next) => {
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
router.post('/user/deleteUser', async (ctx, next) => {
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
router.get('/user/findSkill', async (ctx, next) => {
  let u_id = ctx.query.u_id ? parseInt(ctx.query.u_id) : ''
  console.log(ctx.query)
  if (!u_id) {
    return ctx.body = {
      code: 1,
      data: '缺少参数'
    }
  }
  let res = await Models.Skill.findAll({
    where: {
      u_id: u_id
    }
  })
  ctx.body = {
    code: 0,
    data: res
  }
})

// 添加个人技能
router.post('/user/addSkill', async (ctx, next) => {
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
router.post('/user/deleteSkill', async (ctx, next) => {
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
router.post('/user/updateSkill', async (ctx, next) => {
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
router.post('/user/updateUserInfo', async (ctx, next) => {
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

  if (!id) {
    return ctx.body = {
      code: 1,
      data: '缺少参数id'
    }
  }
  let res = await Models.User.update({
    nickname,
    motto,
    hobby,
    github,
    qq,
    weibo,
    wechat,
    RSS,
    email
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


// 个人笔记管理
// 查询个人笔记
router.get('/user/findNote', async (ctx, next) => {
  let page = 1
  let limit = 10
  if (ctx.query.page) {
    page = parseInt(ctx.query.page)
  }
  if (ctx.query.limit) {
    limit = parseInt(ctx.query.limit)
  }
  userList = await Models.Note.findAndCountAll({
    offset: (page - 1) * limit,
    limit: limit
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
router.post('/user/addNote', async (ctx, next) => {
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

module.exports = router
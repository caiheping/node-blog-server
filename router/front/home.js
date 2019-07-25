const Router = require('koa-router');
const Models = require('../../models/index');


const router = new Router();

router.get('/front/home', async (ctx, next) => {
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
  let banners = await Models.Banner.findAll({
    where: query,
    order: [
      ['createdAt', 'DESC']
    ]
  })
  let hots = await Models.Article.findAll({
    limit: 5,
    where: query,
    order: [
      ['hot', 'DESC']
    ]
  })
  let loves = await Models.Article.findAll({
    limit: 6,
    where: query,
    order: [
      ['love', 'DESC']
    ]
  })
  let articles = await Models.Article.findAll({
    limit: 10,
    where: query,
    order: [
      ['createdAt', 'DESC']
    ]
  })
  let links = await Models.FriendshipLink.findAll({
    where: query,
    order: [
      ['createdAt', 'DESC']
    ]
  })
  ctx.body = {
    code: 0,
    data: {
    	articles,
    	loves,
    	hots,
    	banners,
    	links
    }
  }
})

module.exports = router

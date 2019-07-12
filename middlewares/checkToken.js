const checkToken = () => {
  return async (ctx, next) => {
    // 如果是/admin/*页面，则需要token验证
    if (ctx.request.url.substring(0,6) === '/admin') {
      if (ctx.request.header.cookie) {
        let cookies = ctx.request.header.cookie.split(';')
        let obj = {}
        cookies.forEach(item => {
          obj[item.split('=')[0].trim()] = item.split('=')[1].trim()
        })
        console.log(obj.token)
        if (!obj.token || obj.token !== ctx.session.token) {
          return ctx.body = {
            code: 401,
            data: '请重新登录',
            message: 'token失效'
          }
        }
      } else {
        return ctx.body = {
          code: 401,
          data: '请重新登录',
          message: 'token失效'
        }
      }
    }
    await next()
  }
}

module.exports = checkToken;
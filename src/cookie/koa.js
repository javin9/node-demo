const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()
router.get('/index', async (ctx, next) => {
  ctx.cookies.set('userinfo', 'lisa')
  ctx.body = "hello world"
  next()
})

router.get('/name', async (ctx, next) => {
  const name = ctx.cookies.get('userinfo')
  ctx.body = name
  next()
})

app.use(router.routes())
app.listen(3001, () => {

})
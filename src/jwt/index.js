const Koa = require('koa')
const path = require('path')
const bodyParser = require('koa-bodyparser')
const token = require('jsonwebtoken')
const jwtAuth = require('koa-jwt')
const static = require('koa-static')
const Router = require('koa-router')

const secret = 'this is secret'
const router = new Router()
const app = new Koa()
app.use(bodyParser())
app.use(static(path.resolve(__dirname)))

router.post('/api/login', async (ctx, next) => {
  const { body } = ctx.request
  const userInfo = body.username
  console.log(body);

  //登录逻辑省略
  ctx.body = {
    errNo: 0,
    errStr: 'success',
    data: {
      userInfo,
      token: token.sign(
        {
          //自定义payload
          username: userInfo,
          // 设置 token 过期时间，一小时后，秒为单位 自定义payload，可以用于getDetail判断规定事件内获取
          exp: Math.floor(Date.now() / 1000) + 60 * 60
        },
        secret
      )
    }
  }
})

router.get(
  '/api/getDetail',
  jwtAuth({
    secret
  }),
  async (ctx, next) => {
    console.log((ctx.state));
    ctx.body = {
      errNo: 0,
      errStr: '',
      data: {}
    }
  })


app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000, () => {
  console.log('已经启动。。。');
})
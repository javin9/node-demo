const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const path = require('path')
const Router = require('koa-router')
const axios = require('axios')
const querystring = require('querystring')

const app = new Koa()
const router = new Router()

app.use(static(path.resolve(__dirname)))
app.use(bodyParser())
const config = {
  client_secret: 'd0d6104a4b7400207172674acd03f8f0f93cbefc',
  client_id: '342b11f462a8eba9d4b3'
}

router.get('/api/login', async (ctx, next) => {
  var dataStr = (new Date()).valueOf(); //重定向到认证接口,并配置参数
  var path = "https://github.com/login/oauth/authorize";
  path += '?client_id=' + config.client_id;
  //转发到授权服务器
  ctx.redirect(path);
})

router.get('/api/githubcb', async (ctx, next) => {
  const code = ctx.query.code;
  const params = {
    client_id: config.client_id,
    client_secret: config.client_secret,
    code: code
  }
  let res = await
    axios.post('https://github.com/login/oauth/access_token', params)
  const access_token = querystring.parse(res.data).access_token
  res = await axios.get('https://api.github.com/user?access_token=' +
    access_token)
  console.log('userAccess:', res.data)
  ctx.body = `
      <h1>Hello ${res.data.login}</h1>
      <img src="${res.data.avatar_url}" alt=""/>
  `
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000, () => {
  console.log('登录成功');
})
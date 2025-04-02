/*
 * @Desc:
 * @FilePath: /node-demo/src/jwt/index.js
 * @Author: liujianwei1
 * @Date: 2021-03-16 15:58:17
 * @LastEditors: liujianwei1
 * @Reference Desc:
 */
const Koa = require('koa');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const token = require('jsonwebtoken');
const jwtAuth = require('koa-jwt');
const static = require('koa-static');
const Router = require('koa-router');
const cors = require('koa2-cors');

const secret = 'this is secret';
const router = new Router();
const app = new Koa();
app.use(cors()); //全部允许跨域
app.use(bodyParser());
app.use(static(path.resolve(__dirname)));

// app.use(
//   cors({
//     origin: function (ctx) { //设置允许来自指定域名请求
//       const whiteList = ['http://localhost:5501', 'http://localhost:5502'] //可跨域白名单
//       let url = ctx.header.referer.substr(0, ctx.header.referer.length - 1)
//       if (whiteList.includes(url)) {
//         return url //注意，这里域名末尾不能带/，否则不成功，所以在之前我把/通过substr干掉了
//       }
//       return 'http://localhost::3000' //默认允许本地请求3000端口可跨域
//     },
//     maxAge: 5, //指定本次预检请求的有效期，单位为秒。
//     credentials: true, //是否允许发送Cookie
//     allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
//     allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
//     exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
//   })
// )

router.post('/api/login', async (ctx, next) => {
  const { body } = ctx.request;
  const userInfo = body.username;
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
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        secret,
      ),
    },
  };
});

router.get(
  '/api/getDetail',
  jwtAuth({
    secret,
    key: 'jwtdata',
  }),
  async (ctx, next) => {
    console.log(ctx.state);
    ctx.body = {
      errNo: 0,
      errStr: '',
      data: {},
    };
  },
);

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
  console.log('已经启动。。。');
});

/*
 * @Desc:
 * @FilePath: /node-demo/src/bodyparser/index.js
 * @Author: liujianwei1
 * @Date: 2021-07-06 16:20:44
 * @LastEditors: liujianwei1
 * @Reference Desc:
 */

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const app = new Koa()

// app.use(bodyParser())

app.use(async (ctx, next) => {
  // JSON.stringify(ctx)
  console.log(ctx.request)
  console.log(ctx.disableBodyParser)
  console.log(ctx.request.body !== undefined || ctx.disableBodyParser)
  // console.log(ctx.request.body)
  await next()
  ctx.body = "success"
})

app.listen(3000)
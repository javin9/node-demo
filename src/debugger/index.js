/*
 * @Desc:
 * @FilePath: /node-demo/src/debugger/index.js
 * @Author: liujianwei1
 * @Date: 2021-05-06 18:58:53
 * @LastEditors: liujianwei1
 * @Reference Desc:
 */

const Koa = require('koa')
const app = new Koa()

app.use(async ctx => {
  ctx.body = 'Hello World'
})

app.listen(3000)
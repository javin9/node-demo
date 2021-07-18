/*
 * @Desc:
 * @FilePath: /node-demo/src/babel/index.js
 * @Author: liujianwei1
 * @Date: 2021-07-18 12:11:20
 * @LastEditors: liujianwei1
 * @Reference Desc:
 */

// const Koa = require('koa')
import Koa from "koa"

const app = new Koa()
// 端口
const PORT = 3000

app.use(async (ctx, next) => {
  ctx.body = {
    code: 0,
    message: "success",
    data: {}
  }
  next()
})

app.listen(PORT, () => {
  console.log(`Server is listening ${PORT}，http://localhost:${PORT}`)
})


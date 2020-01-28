// proxy.js
const path = require('path')
const Koa = require('koa')
const static = require('koa-static')
const app = new Koa()
app.use(static(path.resolve(__dirname)))
module.exports = app
// app.listen(3000)
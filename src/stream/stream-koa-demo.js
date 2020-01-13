/*
 * @Copyright: Copyright (c) 2019 Zybang, All rights reserved
 * @Name: name
 * @Description: description
 * @Author: liujianwei(liujianwei@zuoyebang.com)
 * @LastEditors  : liujianwei
 * @LastEditTime : 2020-01-13 10:03:18
 * @LastEditContent: 初始化文件
 */
const Koa = require('koa')
const app = new Koa()
const fs = require('fs')
const path = require('path')

app.use(async (ctx) => {
  //创建读取文件流
  let read = fs.createReadStream(path.resolve(__dirname, './data/data.txt'))
  //如果不加type，直接下载了
  ctx.type = "txt"
  // read.pipe(ctx.body)
  ctx.body = read

  //期望打印data的内容
})


app.listen(3001, () => {
  console.log('listening');
})
//https://www.cnblogs.com/tugenhua0707/p/10828869.html
/*
 * @Name: name
 * @Description: description
 * @Author: cupid(cupid@163.com)
 * @LastEditors: cupid
 * @LastEditTime: 2020-01-13 11:48:22
 * @LastEditContent: 
 */

const Koa = require('koa')
const koaBody = require('koa-body')
const Router = require('koa-router');
const static = require('koa-static')

const path = require('path')
const fs = require('fs-extra')

const app = new Koa()
const router = new Router()

//解析目录资源
app.use(static(path.resolve(__dirname, './assets')))
//首页
router.get('/', async (ctx, next) => {
  const read = fs.createReadStream(path.resolve(__dirname, './assets/upload/index.html'))
  //不设置type会直接下载
  ctx.type = "html"
  ctx.body = read
})

//文件上传和下载
router.post(
  '/upload',
  koaBody({
    multipart: true, // 支持文件上传
    formidable: {
      maxFieldsSize: 2 * 1024 * 1024, // 最大文件为2兆
      multipart: true // 是否支持 multipart-formdate 的表单
    }
  }),
  async (ctx, next) => {

    const file = ctx.request.files.file
    //读取文件流
    const fileReader = fs.createReadStream(file.path)
    //文件放置位置
    const filePath = path.resolve(__dirname, './assets')
    //文件全路径
    const resource = path.join(filePath, file.name)
    //文件url地址
    const url = `http://localhost:3001/assets/${file.name}`

    //创建写入流
    const fileWrite = fs.createWriteStream(resource)
    //确保目录存在
    fs.ensureDirSync(filePath)
    //输入流和输出流对接
    fileReader.pipe(fileWrite)

    ctx.body = {
      code: 0,
      message: 'success',
      data: {
        url
      }
    }

  }
)


app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3001, () => {
  console.log('server is listen in 3001');
})
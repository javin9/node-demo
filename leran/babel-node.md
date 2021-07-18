
# 如何在 Node.js 项目中使用 Babel

今天讲解如何在 Node.js 项目中使用 Babel。

前面《手把手教你如何配置Babel的系列》文章中我们讲到，Babel会把新的语言特性**降级处理**，**转换成目标环境**支持的语法，并且对目标环境不支持的API添加Polyfill。文章中提到的目标环境，都是特指浏览器，那么Node环境如何使用呢？

接下里，我们用Koa创建一个简单的服务器，然后一步一步的讲解集成Babel。

#### 创建一个node项目

首先，创建一个node项目的文件夹,并进入

```bash
mkdir babel-node-example 
cd babel-node-example
```

初始化项目

```bash
npm init
```

我们使用Koa创建一个简单的服务，我们需要安装Koa依赖

```bash
 npm install koa --save
```

安装完毕之后，创建一个src文件夹，进入src文件夹，添加index.js文件

```bash
mkdir src && cd "$_"  && touch index.js
```

通过require方式导入了Koa，创建一个简单的Koa服务

```javascript
//这里我们通过require方式导入了Koa
const Koa = require('koa')
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
```

在package.json的script里面添加如下命令

```json
 {
    "start": "node ./src/index.js"
 }
```

然后在项目根目录下面执行 `npm run start` 

```bash
> $ npm run babel:demo   
> node ./src/babel/index.js

Server is listening 3000，http://localhost:3000
```

然后打开http://localhost:3000/ ，我们将得到如下结果

```json
{
  code: 0,
  message: "success",
  data: { }
}
```



好了，这一切看似很完美，但是如果把 `const Koa = require('koa')`换成`import Koa from "koa"`  又会有什么效果呢？

```javascript
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
```

重新执行`npm run start`   看一下控制台输出

![](/Users/liujianwei/Documents/personal_code/node-demo/images/babel-node.png)

可以看到报错了：`SyntaxError: Cannot use import statement outside a module`

原因是不能使用`import`  ，此刻如果就是想用import 怎么办呢？那么就需要借助`@babel/node`.



### @babel/node

接下来，一步一步教你如何集成@babel/node. 

安装Babel相关依赖

```bash
 npm install -D @babel/core @babel/cli @babel/preset-env 
 npm install -D @babel/node
```

- @babel/core是Bable进行代码转换的核心，@babel/cli,@babel/node都依赖他

- @babel/cli 是一个内置的 CLI，可以通过命令行编译文件

- @babel/preset-env 是一个预设集合，允许您使用最新的 JavaScript，他会根据目标环境对代码降级处理（**这里说的不严谨，具体可以去看《[手把手教你如何配置Babel(3)—真实项目中如何去打补丁](https://mp.weixin.qq.com/s?__biz=MzI0NzMzMDI3Ng==&mid=2247483846&idx=1&sn=2ca3c2361351798db63061f58bcfe43e&chksm=e9b0e54ddec76c5b6f6fec24a9008a313fd8949daff2af4fd4b94e26a4a12e8fd77a79375545&token=687067163&lang=zh_CN#rd)》**）

- @babel/node 是一个与 Node.js CLI 完全相同的 CLI，在运行之前使用 Babel 预设和插件进行编译，执行的时候会占用大量内存空间，Babel官方不建议在生产环境使用

  

配置.babelrc文件

```json
{
  "presets": [
    "@babel/preset-env"
  ]
}
```

修改package.json中script的 start命令

```json
{
     "start": "babel-node ./src/index.js"
}
```

然后运行 `npm run start` 这时候控制台就不会报错了。

下面补充一个知识点，介绍一下nodemon

### nodemon

nodemon用来监视node.js应用程序中的任何更改，并自动重启服务,非常适合用在开发环境中

nodemon只是简单的包装你的node应用程序，并监控任何已经改变的文件。nodemon只是node的替换包，只是在运行脚本时将其替换命令行上的node。

#### 安装

```bash
# 本地安装
npm install --save-dev nodemon
```

下面用nodemon方式启动服务。修改start命令

```json
{
    "start": "nodemon --exec babel-node ./index.js",
}
```

这样每次我们修改index.js命令，都不用重新启动 npm run start了。更多nodemon只是可以去查看 nodemon Git地址：[github.com/remy/nodemon#nodemon](https://link.jianshu.com/?t=https://github.com/remy/nodemon#nodemon)


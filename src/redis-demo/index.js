const Koa = require('koa')
const redis = require('redis')
const client = redis.createClient({
  port: 6379,
  host: '127.0.0.1',
  password: '123456'
})

client.on('connect', () => {
  console.log('Connect success>>>>>>>>');
})

client.on('error', (error) => {
  console.log(Date.now(), error);
})

// const app = new Koa()
// app.use(async (ctx, next) => {
//   if (ctx.path === '/favicon.ico') {
//     return
//   }

// })

// app.listen(3000)
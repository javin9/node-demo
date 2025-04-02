const Koa = require('koa');
const redis = require('redis');
const client = redis.createClient({
  host: 'r-2zex7wxjrxr3hl532z.redis.rds.aliyuncs.com',
  port: 6379,
  password: 'P03cVH4YuMf2yhX_',
  db: 0,
});

client.on('connect', () => {
  console.log('Connect success>>>>>>>>');
});

client.on('error', (error) => {
  console.log(Date.now(), error);
});

// const app = new Koa()
// app.use(async (ctx, next) => {
//   if (ctx.path === '/favicon.ico') {
//     return
//   }

// })

// app.listen(3000)

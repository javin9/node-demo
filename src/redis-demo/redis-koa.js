const Koa = require('koa')
const session = require('koa-session');
const redisStore = require('koa-redis');
const redis = require('redis')


const redisClient = redis.createClient({
  port: 6379,
  host: '127.0.0.1',
  password: '123456'
})
const wrapper = require('co-redis')
const client = wrapper(redisClient)



client.on('connect', () => {
  console.log('Connect success>>>>>>>>');
})

client.on('error', (error) => {
  console.log(Date.now(), error);
})

const app = new Koa()
let n = 0
//session
const sessionConfig = {
  key: 'cupidtest',
  httpOnly: true,
  signed: true,
  store: redisStore({
    client
  })
}

app.keys = ['keys', 'keykeys'];
app.use(session(sessionConfig, app));

app.use(async (ctx, next) => {
  const keys = await client.keys('*')
  keys.forEach(async key =>
    console.log(await client.get(key))
  )
  await next()
})

app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    return
  }
  n++
  client.set('count', n)
  ctx.body = `访问次数${n}`
})

app.listen(3000)
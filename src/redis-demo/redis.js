const session = require('koa-generic-session');
const Koa = require('koa');
const redisStore = require('koa-redis');
const redis = require('redis')
const app = new Koa();


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

app.keys = ['some secret hurr'];

const CONFIG = {
  store: redisStore({ client }),
  key: 'koa:sess:redis',
  maxAge: 86400000
};

app.use(session(CONFIG, app));
// or if you prefer all default config, just use => app.use(session(app));

app.use(async (ctx, next) => {
  const keys = await client.keys('*')
  keys.forEach(async key =>
    console.log(await client.get(key))
  )
  await next()
})

app.use(ctx => {
  // ignore favicon
  if (ctx.path === '/favicon.ico') return;

  let n = ctx.session.views || 0;
  ctx.session.views = ++n;
  ctx.body = n + ' views';
});

app.listen(3002);
console.log('listening on port 3002');
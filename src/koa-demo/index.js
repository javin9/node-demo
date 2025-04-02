const Koa = require('koa');
const app = new Koa();
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');

app.use(cors()); //全部允许跨域
app.use(bodyParser());
// response
app.use((ctx) => {
  console.log('请求来了');
  console.log('query', ctx.request.query);
  ctx.body = 'Hello Koa';
});

app.listen(3000, () => {
  console.log('服务器启动');
});

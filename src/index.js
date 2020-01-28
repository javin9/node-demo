const Koa=require('koa')
const app=new Koa()
app.use(async (ctx,next)=>{
    ctx.body="Hello world"
    next()
})

if(!module.parent){
    app.listen(3000)
}else{
    module.exports=app;
}
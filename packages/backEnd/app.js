const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const jwtKoa = require('koa-jwt');
const fs = require('fs')

let routeArr = []
const files = fs.readdirSync('./routes')
files.forEach(function (item, index) {
  routeArr.push("./routes/"+item)
})


const { secret } = require('./config/index')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

app.use((ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        ok: false,
        code: 401,
        msg: err.originalError ? err.originalError.message : err.message
      }
    } else {
      throw err;
    }
  });
});

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

/* 路由权限控制 */
app.use(jwtKoa({ secret: secret }).unless({
  // 设置login、register接口，可以不需要认证访问
  path: [
    /^\//,
    /^\/register/,
    /^((?!).)*$/   // 设置除了私有接口外的其它资源，可以不需要认证访问
  ]
}));

// routes
routeArr.forEach((item)=>{
  const route = require(item)
  app.use(route.routes(), route.allowedMethods())
})

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app

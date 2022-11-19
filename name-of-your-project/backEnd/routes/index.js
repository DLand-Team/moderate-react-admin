const router = require('koa-router')()
const fs = require('fs')
const jwt = require('jsonwebtoken');
const path = require('path')
const { getJWTPayload, getToken } = require('../module/jwt')

const { secret } = require('../config/index')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

// 登录
router.post("/login", async (ctx, next) => {
  const { name } = ctx.request.body;
  let payload = { name }; // 加密的数据
  let permissions
  await new Promise((resolve) => {
    fs.readFile(path.resolve('db/', `${name}_permissions.json`), (err, dataStr) => {
      permissions = JSON.parse(dataStr.toString());
      resolve()
    })
  })
  ctx.response.body = {
    status: 1,
    code: "200",
    data: { token: getToken(payload) },
  }
})


module.exports = router

const router = require('koa-router')()
const fs = require('fs')
const path = require('path')
const { getJWTPayload } = require('../module/jwt')

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

// 获得权限
router.get("/getPermissions", async (ctx, next) => {
  const payload = getJWTPayload(ctx.headers.authorization)
  const { name } = payload;
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
    data: permissions,
  }
})

// 获得权限
router.post("/updatePermissions", async (ctx, next) => {
  const payload = getJWTPayload(ctx.headers.authorization)
  const { name } = payload;
  let permissions = JSON.stringify(ctx.request.body) //获取post提交的数据
  await new Promise((resolve) => {
    fs.writeFile(path.resolve('db/', `${name}_permissions.json`),permissions, () => {
      resolve()
    })
  })
  ctx.response.body = {
    status: 1,
    code: "200",
    data: {},
  }
})


module.exports = router

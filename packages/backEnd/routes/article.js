const router = require('koa-router')()
const fs = require('fs')
const path = require('path')
const { getJWTPayload } = require('../module/jwt')

router.prefix('/article')

// 获得权限
router.post("/add", async (ctx, next) => {
  const payload = getJWTPayload(ctx.headers.authorization)
  const { name } = payload;
  let data = JSON.stringify(ctx.request.body) //获取post提交的数据
  const { content, title, subTitle } = data;
  await new Promise((resolve) => {
    fs.writeFile(path.resolve('article/', `${name}_${title}_${subTitle}.md`), content, () => {
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

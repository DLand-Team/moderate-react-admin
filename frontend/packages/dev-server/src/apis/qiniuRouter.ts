// import { qiniuConfig } from "@/config/secure";
import { yearMonthDay } from "@/utils/dateFormate";
import { realLocalFiles, removeOnefile } from "@/utils/files";
import {
  getQiniuToken,
  getQiniuTokenWithName,
  // formUploadPut,
} from "@/utils/qiniu";

const path = require("path");
const Router = require("koa-router");
const qiniuRouter = new Router({ prefix: "/qiniu" });

qiniuRouter.post("/without", async (ctx) => {
  const resultList = [];
  const fileList = ctx.request.files.file;
  if (fileList.length > 1) {
    // file有一个length属性可以返回列表中的文件数量
    Array.from(fileList).forEach((file: any) => {
      // FileList并不是可迭代对象，但是可以通过Array.from转换，也可以用item()方法
      const basename = path.basename(file.path);
      const url = `${ctx.origin}/uploads/${yearMonthDay()}/${basename}`; // ctx.origin是域名端口信息，比如http://localhost:5000
      resultList.push(url);
    });
  } else {
    const basename = path.basename(fileList.path);
    const url = `${ctx.origin}/uploads/${yearMonthDay()}/${basename}`;
    resultList.push(url);
  }
  ctx.body = { url: resultList };
});

// 直接上传到服务器本地
qiniuRouter.post("/directly", async (ctx) => {
  const file = ctx.request.files.file;
  const basename = path.basename(file.path);
  const url = `${ctx.origin}/uploads/${yearMonthDay()}/${basename}`;
  ctx.body = { url };
});

// 由服务器上传到七牛云
qiniuRouter.get("/serversidepost", async (ctx) => {
  const currentPath = "../public/uploads/" + yearMonthDay();
  const fileFoldPath = path.resolve(__dirname, currentPath);
  const fileList = realLocalFiles(fileFoldPath);
  fileList.forEach(async (file) => {
    const filePath = fileFoldPath + "/" + file;
    // const resInfo = await formUploadPut(file, filePath);
    // console.log(resInfo);
    // const fileLink = qiniuConfig.domain + "/" + file;
    // console.log(fileLink);
    removeOnefile(filePath);
  });
  ctx.body = {
    fileList,
  };
});

// 获取默认token，不用对应文件名，两个小时内有效
qiniuRouter.get("/token", async (ctx) => {
  const token = getQiniuToken();
  ctx.body = {
    code: "200",
    data: {
      token,
    },
  };
});

// 根据文件名字生成token
qiniuRouter.get("/token/name", async (ctx) => {
  const fileName = ctx.query.name;
  // console.log(fileName);
  const token = getQiniuTokenWithName(fileName);
  ctx.body = {
    token,
  };
});

// 生成文件名列表里的token
qiniuRouter.get("/token/list", async (ctx) => {
  let keyList = ctx.query.list;
  const tokenList = [];
  // console.log(ctx.query.list);
  if (!(keyList instanceof Array)) {
    keyList = [];
    keyList.push(ctx.query.list);
  }
  keyList.forEach((item) => {
    tokenList.push(getQiniuTokenWithName(item));
  });
  ctx.body = {
    tokenList,
    keyList,
  };
});

// 生成一系列的token，不用文件名。其实可以一次生成一个token，重复地用
qiniuRouter.get("/token/inlist", async (ctx) => {
  const decodeString = decodeURIComponent(ctx.query.list);
  const keyList = decodeString.split(",");
  const tokenList = [];
  keyList.forEach(() => {
    tokenList.push(getQiniuToken());
  });
  ctx.body = {
    tokenList,
    keyList,
  };
});

export default qiniuRouter;

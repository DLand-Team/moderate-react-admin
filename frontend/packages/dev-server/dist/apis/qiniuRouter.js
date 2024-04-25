"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const secure_1 = require("@/config/secure");
const dateFormate_1 = require("@/utils/dateFormate");
const files_1 = require("@/utils/files");
const qiniu_1 = require("@/utils/qiniu");
const path = require("path");
const Router = require("koa-router");
const qiniuRouter = new Router({ prefix: "/qiniu" });
qiniuRouter.post("/without", async (ctx) => {
    const resultList = [];
    const fileList = ctx.request.files.file;
    if (fileList.length > 1) {
        // file有一个length属性可以返回列表中的文件数量
        Array.from(fileList).forEach((file) => {
            // FileList并不是可迭代对象，但是可以通过Array.from转换，也可以用item()方法
            const basename = path.basename(file.path);
            const url = `${ctx.origin}/uploads/${(0, dateFormate_1.yearMonthDay)()}/${basename}`; // ctx.origin是域名端口信息，比如http://localhost:5000
            resultList.push(url);
        });
    }
    else {
        const basename = path.basename(fileList.path);
        const url = `${ctx.origin}/uploads/${(0, dateFormate_1.yearMonthDay)()}/${basename}`;
        resultList.push(url);
    }
    ctx.body = { url: resultList };
});
// 直接上传到服务器本地
qiniuRouter.post("/directly", async (ctx) => {
    const file = ctx.request.files.file;
    const basename = path.basename(file.path);
    const url = `${ctx.origin}/uploads/${(0, dateFormate_1.yearMonthDay)()}/${basename}`;
    ctx.body = { url };
});
// 由服务器上传到七牛云
qiniuRouter.get("/serversidepost", async (ctx) => {
    const currentPath = "../public/uploads/" + (0, dateFormate_1.yearMonthDay)();
    const fileFoldPath = path.resolve(__dirname, currentPath);
    const fileList = (0, files_1.realLocalFiles)(fileFoldPath);
    fileList.forEach(async (file) => {
        const filePath = fileFoldPath + "/" + file;
        const resInfo = await (0, qiniu_1.formUploadPut)(file, filePath);
        console.log(resInfo);
        const fileLink = secure_1.qiniuConfig.domain + "/" + file;
        console.log(fileLink);
        (0, files_1.removeOnefile)(filePath);
    });
    ctx.body = {
        fileList,
    };
});
// 获取默认token，不用对应文件名，两个小时内有效
qiniuRouter.get("/token", async (ctx) => {
    const token = (0, qiniu_1.getQiniuToken)();
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
    console.log(fileName);
    const token = (0, qiniu_1.getQiniuTokenWithName)(fileName);
    ctx.body = {
        token,
    };
});
// 生成文件名列表里的token
qiniuRouter.get("/token/list", async (ctx) => {
    let keyList = ctx.query.list;
    const tokenList = [];
    console.log(ctx.query.list);
    if (!(keyList instanceof Array)) {
        keyList = [];
        keyList.push(ctx.query.list);
    }
    keyList.forEach((item) => {
        tokenList.push((0, qiniu_1.getQiniuTokenWithName)(item));
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
        tokenList.push((0, qiniu_1.getQiniuToken)());
    });
    ctx.body = {
        tokenList,
        keyList,
    };
});
exports.default = qiniuRouter;
//# sourceMappingURL=qiniuRouter.js.map
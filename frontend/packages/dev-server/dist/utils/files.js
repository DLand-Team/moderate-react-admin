"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeOnefile = exports.realLocalFiles = void 0;
const fs_1 = __importDefault(require("fs"));
// 读取某个目录下的所有文件，不包含递归方式,也没有判断路径不存在的时候
function realLocalFiles(dir) {
    const fileList = [];
    const files = fs_1.default.readdirSync(dir);
    files.forEach((file) => {
        console.log(file);
        fileList.push(file);
    });
    return fileList;
}
exports.realLocalFiles = realLocalFiles;
// 删除已经上传了的图片
function removeOnefile(path) {
    fs_1.default.unlink(path, (err) => {
        if (err) {
            throw err;
        }
        console.log("文件删除成功");
    });
}
exports.removeOnefile = removeOnefile;
//# sourceMappingURL=files.js.map
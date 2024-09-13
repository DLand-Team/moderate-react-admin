const fs = require('fs-extra');
const path = require('path');

const sourceDir = path.resolve(__dirname, '../src/views'); // 输入源文件夹路径
const destinationDir = path.resolve(__dirname,'../dist/views'); // 输出目标文件夹路径

// 拷贝源文件夹的内容到目标文件夹
fs.cpSync(sourceDir, destinationDir, { recursive: true })

// console.log('Views文件夹已成功拷贝到dist目录！');
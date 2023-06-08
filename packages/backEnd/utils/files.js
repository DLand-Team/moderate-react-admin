const fs = require('fs')
// const path = require('path')

// 读取某个目录下的所有文件，不包含递归方式,也没有判断路径不存在的时候
function realLocalFiles(dir) {
    const fileList = []
    const files = fs.readdirSync(dir)
    files.forEach(file => {
        console.log(file)
        fileList.push(file)
    })
    return fileList
}

// 删除已经上传了的图片
function removeOnefile(path) {
    fs.unlink(path, (err) => {
        if (err) {
          throw err
        }
        console.log('文件删除成功')
    })    
}

module.exports = { 
    realLocalFiles,
    removeOnefile
}
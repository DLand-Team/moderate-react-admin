var fs = require('fs');
const path = require('path');
const dirCache = {};


function writeFile(pagePath, pageName, fileName, content) {
    let filePath = path.resolve(pagePath,pageName)
    if (fs.existsSync(filePath)) {
        console.log('该路径已存在');
    } else {
        console.log('该路径不存在');
        fs.mkdirSync(filePath);
    }

    var data = '\n hello world';
    fs.appendFile(path.resolve(filePath,fileName), data, 'utf8', function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('appendFile 成功了')
        }
    })
}


module.exports = {
    writeFile
}

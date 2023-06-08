const qiniu = require('qiniu')
const { qiniuConfig }  = require('../config/secure')

// 获取七牛上传Token
function getQiniuToken() {
    const mac = new qiniu.auth.digest.Mac(qiniuConfig.AK, qiniuConfig.SK)
    const options = { 
        scope: qiniuConfig.bucket,
        expires: 7200 
    }
    const putPolicy = new qiniu.rs.PutPolicy(options)
    const uploadToken = putPolicy.uploadToken(mac)
    return uploadToken;
}

// 获取上传Token并且能指定文件名字
function getQiniuTokenWithName(nameReWrite) {
    const mac = new qiniu.auth.digest.Mac(qiniuConfig.AK, qiniuConfig.SK)
    const options = { 
        scope: qiniuConfig.bucket + ":" + nameReWrite, 
        expires: 7200 
    }
    const putPolicy = new qiniu.rs.PutPolicy(options)
    const uploadToken = putPolicy.uploadToken(mac)
    return uploadToken 
}

// 服务器端上传到七牛
function formUploadPut(fileName, file) {
    const uploadToken = getQiniuTokenWithName(fileName)
    const config = new qiniu.conf.Config()
    config.zone = qiniu.zone.Zone_z2  // 根据你的上传空间选择zone对象
    const formUploader = new qiniu.form_up.FormUploader(config)
    const putExtra = new qiniu.form_up.PutExtra()
    return new Promise((resolve, reject) => {
        formUploader.putFile(uploadToken, fileName, file, putExtra, (respErr,
            respBody, respInfo) => {
            if (respErr) {
              reject(respErr)
            }
            if (respInfo.statusCode == 200) {
              resolve(respBody)
            } else {
              console.log(respInfo.statusCode);
              resolve(respBody)
            }
          })
    })   
}

module.exports = { getQiniuToken, getQiniuTokenWithName, formUploadPut}
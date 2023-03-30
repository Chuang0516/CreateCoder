const app = require('../../app')

exports.main = async (event) => {
  let logoUrl = {}
  // 获取小程序初始化信息
  await app
    .getTempFileURL({
      fileList: [
        'cloud://cloudbase-baas-4g1a5g4h6dc9d130.636c-cloudbase-baas-4g1a5g4h6dc9d130/logo/createcoder_logo.png',
        'cloud://cloudbase-baas-4g1a5g4h6dc9d130.636c-cloudbase-baas-4g1a5g4h6dc9d130/logo/logo.png',
      ],
    })
    .then((res) => {
      const logoAll = res.fileList[0].tempFileURL
      const logoImage = res.fileList[1].tempFileURL
      console.log(res.fileList)
      logoUrl = { logoImage, logoAll }
    })
  return {
    logoUrl,
  }
}

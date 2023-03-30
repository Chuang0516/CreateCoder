// @ts-nocheck
const app = require('../../app')
const db = app.database()
const axios = require('axios')

exports.main = async (event, context) => {
  const { code, userInfo } = event

  // 创建验证码，16s有效且唯一
  let captcha
  while (true) {
    captcha = Math.random().toFixed(6).slice(-6)
    // 防止验证码冲突
    const findUser = await db
      .collection('user')
      .where({
        captcha,
        ifDelete: false,
      })
      .limit(1)
      .get()
      .then(({ data }) => data[0])
    // 验证码未被使用或已经过期，就停止生成
    if (
      !findUser ||
      !findUser.captchaExpireTime ||
      findUser.captchaExpireTime.getTime() < new Date().getTime()
    ) {
      break
    }
  }

  // 验证码过期时间
  const captchaExpireTime = new Date()
  captchaExpireTime.setTime(captchaExpireTime.getTime() + 16 * 1000)

  const { data } = await axios({
    method: 'GET',
    url: 'https://api.weixin.qq.com/sns/jscode2session',
    params: {
      js_code: code,
      appid: 'wx9df6365878371c39',
      secret: 'a32533431ef95fc99a4766d16d727553',
      grant_type: 'authorization_code',
    },
  })
  const { session_key, openid, unionid } = data

  // 用户是否已经存在
  const user = await db
    .collection('user')
    .where({
      unionid,
    })
    .limit(1)
    .get()
    .then(({ data }) => data[0])
  // 如果用户不存在，则创建新用户
  let result
  if (!user) {
    // 设置默认昵称
    const totalUser = await db
      .collection('user')
      .where({
        isDelete: false,
      })
      .count()
      .then((res) => res.total)
    // 如果没有昵称
    if (!userInfo.nickName) {
      // 默认昵称为：码上创客 + 用户总数 + 1
      userInfo.nickName = `码上创客${totalUser + 1}`
    }
    // 如果没有性别
    if (!userInfo.gender) {
      // 默认性别为未知
      userInfo.gender = 0
    }
    // 如果没有头像
    if (!userInfo.avatar) {
      // 默认头像为
      await app
        .getTempFileURL({
          fileList: [
            'cloud://cloudbase-baas-4g1a5g4h6dc9d130.636c-cloudbase-baas-4g1a5g4h6dc9d130/logo/logo.png',
          ],
        })
        .then((res) => {
          userInfo.avatar = res.fileList[0].tempFileURL
        })
    }
    result = await db
      .collection('user')
      .add({
        ...userInfo,
        session_key,
        openid,
        unionid,
        createTime: new Date(),
        updateTime: new Date(),
        isDelete: false,
        captcha,
        captchaExpireTime,
      })
      .then((res) => {
        console.log('addUser succeed')
        return true
      })
      .catch((e) => {
        return false
      })
  } else {
    result = await db
      .collection('user')
      .doc(user._id)
      .update({
        ...userInfo,
        session_key,
        unionid,
        openid,
        captcha,
        captchaExpireTime,
        updateTime: new Date(),
      })
      .then((res) => {
        console.log('updateUser succeed')
        return true
      })
      .catch((e) => {
        return false
      })
  }
  return {
    result,
    captcha,
  }
}

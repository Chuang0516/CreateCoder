const app = require('../../app')
const db = app.database()
const _ = db.command

exports.main = async (event, context) => {
  const { captcha } = event
  // 查找验证码
  const user = await db
    .collection('user')
    .where({
      captcha,
      // 验证码未过期
      captchaExpireTime: _.gt(new Date()),
      isDelete: false,
    })
    .limit(1)
    .get()
    .then(({ data }) => data[0])

  // 用户不存在
  if (!user) {
    return null
  }

  // 创建登录凭证
  const ticket = app.auth().createTicket(user.unionid, {
    refresh: 30 * 24 * 60 * 60 * 1000, // 30 天刷新一次
  })

  // 存 session 登录态
  context.session.userInfo = user

  return {
    ticket,
    user,
  }
}

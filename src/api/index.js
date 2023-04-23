import request from '@/utils/request'

export const reqHomeInfo = () => request({ url: '/home/nav', method: 'post' })

export const reqHomeBanner = () =>
  request({ url: '/home/banner', method: 'post' })

export const reqLogin = (captcha, _id) =>
  request({ url: `/onlogin`, data: { captcha, _id }, method: 'post' })

export const reqCurrentUser = () =>
  request({ url: `/user/current`, method: 'post' })

export const reqLogout = () => request({ url: '/logout', method: 'post' })

export const reqUserId = () => request({ url: '/user/id', method: 'post' })

// 获取用户总数
export const reqTotalUser = () => request({ url: '/total', method: 'post' })

// 上传头像
export const reqUpdateAvatar = (rAvatar, iAvatar) => request({ url: '/user/avatar', data: { rAvatar, iAvatar }, method: 'post' })

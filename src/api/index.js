import request from '@/utils/request'
import axios from 'axios'

export const reqHomeInfo = () => request({ url: '/home/nav', method: 'post' })

export const reqHomeBanner = () =>
  request({ url: '/home/banner', method: 'post' })

export const reqLogin = (captcha, _id) =>
  request({ url: `/onlogin`, data: { captcha, _id }, method: 'post' })

export const reqCurrentUser = () =>
  request({ url: `/user/current`, method: 'post' })

export const reqLogout = () => request({ url: '/logout', method: 'post' })

export const reqUserId = () => request({ url: '/user/id', method: 'post' })

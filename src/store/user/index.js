import { reqLogin, reqCurrentUser, reqLogout, reqUserId } from '@/api'
import { setTicket, getTicket } from '@/utils/ticket'
import { auth } from '@/tcb'
import { onlineWS } from '@/service/wsInstance'

const state = {
  userInfo: {},
  ticket: getTicket(),
  currentUser: {},
}
const mutations = {
  ONLOGIN(state, userInfo) {
    state.userInfo = userInfo
  },
  GETCURRENTUSER(state, currentUser) {
    state.currentUser = currentUser
  },
}
const actions = {
  async onLogin({ commit }, { captcha }) {
    // 获取当前用户的_id以用来防止异地登陆
    const userId = await reqUserId(captcha)
    if (userId.code == 200) {
      const { _id } = userId.data
      const result = await reqLogin(captcha, _id)
      if (result.code == 200) {
        commit('ONLOGIN', result.data)
        setTicket(result.data.ticket)
        // 登录云开发
        await auth.customAuthProvider().signIn(getTicket())
        onlineWS.create({
          _id: _id,
        })
        return true
      }
    } else {
      return false
    }
  },
  // 获取当前用户
  async getCurrentUser({ commit }) {
    const result = await reqCurrentUser()
    if (result.code == 200) {
      commit('GETCURRENTUSER', result.data)
      onlineWS.create({
        _id: result.data._id,
      })
      return true
    }
  },
  // 退出登录
  async logout() {
    const result = await reqLogout()
    if (result.code == 200) {
      await auth.signOut()
      onlineWS.close()
      return true
    }
  },
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters,
}

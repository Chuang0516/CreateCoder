import { reqLogin, reqCurrentUser, reqLogout, reqUserId, reqUpdateAvatar, reqUserIp } from '@/api'
import { setTicket, getTicket } from '@/utils/ticket'
import { auth } from '@/tcb'
import { onlineWS } from '@/service/wsInstance'

const state = {
  ticket: getTicket(),
  currentUser: {},
  userIp: {}
}
const mutations = {
  GETCURRENTUSER(state, currentUser) {
    state.currentUser = currentUser
  },
  GETUSERIP(state, userIp) {
    state.userIp = userIp
  }
}
const actions = {
  async onLogin({ commit }, { captcha }) {
    // 获取当前用户的_id以用来防止异地登陆
    const userId = await reqUserId(captcha)
    if (userId.code == 200) {
      const { _id } = userId.data
      const result = await reqLogin(captcha, _id)
      if (result.code == 200) {
        setTicket(result.data.ticket)
        // 登录云开发
        await auth.customAuthProvider().signIn(getTicket())
        onlineWS.create({
          _id: _id,
          ticket: getTicket()
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
        ticket: getTicket()
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
  // 更新头像
  async updateAvatar({ commit }, { rAvatar, iAvatar }) {
    const result = await reqUpdateAvatar(rAvatar, iAvatar)
    if (result.code == 200) {
      commit('GETCURRENTUSER', result.data)
      return true
    }
  },
  // 获取用户IP属地
  async getUserIp({ commit }) {
    const result = await reqUserIp()
    if (result.code == 200) {
      commit('GETUSERIP', result.data)
      return true
    }
  }
}
const getters = {
  avatar(state) {
    return state.currentUser.avatar || {}
  },
  gender(state) {
    return state.currentUser.gender || ''
  },
  ipLocal(state) {
    return state.userIp[2]
  },
  createTime(state) {
    return state.currentUser.createTime?.substring(0, state.currentUser.createTime.indexOf('T'))
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
}

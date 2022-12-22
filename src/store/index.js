import Vue from 'vue'
import Vuex from 'vuex'
// 使用插件
Vue.use(Vuex)

import { reqHomeInfo } from '@/api'

const state = {
  homeNavList: [],
}
const mutations = {
  GETHOMENAV(state, homeNavList) {
    state.homeNavList = homeNavList
  },
}
const actions = {
  async getHomeNav({ commit }) {
    let result = await reqHomeInfo()
    if (result.code == 200) {
      commit('GETHOMENAV', result.data)
    }
  },
}
const getters = {}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
})

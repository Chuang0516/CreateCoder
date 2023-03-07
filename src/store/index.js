import Vue from 'vue'
import Vuex from 'vuex'
// 使用插件
Vue.use(Vuex)

import { reqHomeInfo, reqHomeBanner } from '@/api'

const state = {
  homeNavList: [],
  homeBanner: [],
}
const mutations = {
  GETHOMENAV(state, homeNavList) {
    state.homeNavList = homeNavList
  },
  GETHOMEBANNER(state, homeBanner) {
    state.homeBanner = homeBanner
  },
}
const actions = {
  // 获取首页侧边导航数据
  async getHomeNav({ commit }) {
    let result = await reqHomeInfo()
    if (result.code == 200) {
      commit('GETHOMENAV', result.data)
    }
  },
  // 获取首页轮播图数据
  async getHomeBanner({ commit }) {
    let result = await reqHomeBanner()
    if (result.code == 200) {
      commit('GETHOMEBANNER', result.data)
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

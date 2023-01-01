import Vue from 'vue'
import App from './App.vue'
import 'babel-polyfill'
// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'
// 引入 Element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 使用 Element-ui
Vue.use(ElementUI)
// 引入 初始化样式
import 'normalize.css'
// 引入公共样式
import '@/assets/style/base.less'
// 引入粒子背景
import VueParticles from 'vue-particles'
Vue.use(VueParticles)
// 引入 mockserve
import '@/mock/mockServe'

Vue.config.productionTip = false

new Vue({
  // 注册路由
  router,
  // 注册仓库
  store,
  beforeCreate() {
    // 全局事件总线
    Vue.prototype.$bus = this
  },
  render: (h) => h(App),
}).$mount('#app')

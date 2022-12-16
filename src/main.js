import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
// 引入 Element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入 初始化样式
import 'normalize.css'

// 使用 Element-ui
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  // 注册路由
  router,
  render: (h) => h(App),
}).$mount('#app')

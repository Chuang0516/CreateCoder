import showloginModal from './src/main.js'

const install = function (Vue) {
  // 注册全局组件
  Vue.component(showloginModal.name, showloginModal)
  // 添加全局API
  Vue.prototype.$LoginModal = showloginModal
}
export default install

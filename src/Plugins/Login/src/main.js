import Vue from 'vue'
import loginModal from '@/plugins/Login/src/LoginModal'

const showloginModal = (options) => {
  // extend 是构造一个组件的语法器.传入参数，返回一个组件
  const LoginModal = Vue.extend(loginModal)
  // 实例化ConfirmConstructor组件
  const app = new LoginModal({
    el: document.createElement('div'),
  })
  //初始化参数
  for (let key in options) {
    app[key] = options[key]
  }
  // 添加到boby
  document.body.appendChild(app.$el)
}
export default showloginModal

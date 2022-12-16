import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 解决编程式路由导航重复点击报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch((err) => err)
}

const routes = [
  {
    path: '/',
    component: () => import('@/views/Home'),
  },
  {
    path: '/books',
    component: () => import('@/views/Books'),
  },
  {
    path: '/discuss',
    component: () => import('@/views/Discuss'),
  },
  {
    path: '/team',
    component: () => import('@/views/Team'),
  },
  {
    path: '/course',
    component: () => import('@/views/Course'),
  },
]

export default new VueRouter({
  routes,
})

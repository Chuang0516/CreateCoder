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
    meta: { menuIndex: 0 },
  },
  {
    path: '/books',
    component: () => import('@/views/Books'),
    meta: { menuIndex: 1 },
  },
  {
    path: '/discuss',
    component: () => import('@/views/Discuss'),
    meta: { menuIndex: 2 },
  },
  {
    path: '/team',
    component: () => import('@/views/Team'),
    meta: { menuIndex: 3 },
  },
  {
    path: '/course',
    component: () => import('@/views/Course'),
    meta: { menuIndex: 4 },
  },
]

export default new VueRouter({
  routes,
})

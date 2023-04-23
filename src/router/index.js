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
    meta: { menuIndex: 0, leftNav: true, header: true }
  },
  {
    path: '/tools',
    name: 'tools',
    component: () => import('@/views/OnlineTool'),
    meta: { menuIndex: 0, leftNav: true, header: true }
  },
  {
    path: '/books',
    component: () => import('@/views/Books'),
    meta: { menuIndex: 1, leftNav: true, header: true },
  },
  {
    path: '/discuss',
    component: () => import('@/views/Discuss'),
    meta: { menuIndex: 2, leftNav: true, header: true },
  },
  {
    path: '/team',
    component: () => import('@/views/Team'),
    meta: { menuIndex: 3, leftNav: true, header: true },
  },
  {
    path: '/course',
    component: () => import('@/views/Course'),
    meta: { menuIndex: 4, leftNav: false, header: true },
  },
  {
    path: '/mine',
    component: () => import('@/views/PersonalCenter'),
    meta: { leftNav: false, header: true },
  }
]

export default new VueRouter({
  routes,
})

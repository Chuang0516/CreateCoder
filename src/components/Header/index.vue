<template>
  <div class="header-container" :style="{ '--leftNavWidth': isOpen ? '220px' : '60px' }">
    <div class="header"
      :style="{ '--background': currentIndex != 0 ? '#fff' : background, '--angle': angle, '--time': `${time}ms`, '--color': currentIndex != 0 ? '#666' : fontColor, '--navigationLeft': `${(currentIndex * 2 + 1) * 50 / headerMenuList.length}%`, '--navigationBackground': currentIndex != 0 ? '#2681c2' : '#eee' }">
      <div class="logo-container">
        <RouterLink class="logo" to="/">
          <div class="logo-box">
            <LogoSvg :key="updateLogoFlag" />
          </div>
          <!-- <Transition name="logoText"> -->
          <img src="~@/assets/images/logo_text.png" alt="" v-show="isOpen">
          <!-- </Transition> -->
        </RouterLink>
      </div>
      <!-- 页面菜单 -->
      <div class="menu-container">
        <!-- 侧边导航栏开关 -->
        <div class="fold-btn" @click="navSwitch(isOpen)">
          <svg class="icon" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" width="26" height="26">
            <path d="M 10 15 h 40 C 55 15 55 25 50 25 h -40 C 5 25 5 15 10 15" ref="path1" />
            <path d="M 10 45 h 80 C 95 45 95 55 90 55 h -80 C 5 55 5 45 10 45" />
            <path d="M 10 75 h 40 C 55 75 55 85 50 85 h -40 C 5 85 5 75 10 75" ref="path2" />
          </svg>
        </div>
        <ul class="header-menu">
          <li class="menu-item" :class="{ active: currentIndex == index }" v-for="(menuItem, index) in headerMenuList"
            :key="index" @click="menuHandler(index, menuItem.route)">
            <Transition name="cogs">
              <Cogs v-show="lastIndex == index && !isLeave" :angle="angle" />
            </Transition>
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="menuItem.icon"></use>
            </svg>
            <span>{{ menuItem.name }}</span>
          </li>
          <li ref="navigationBar" class="navigation-bar" v-show="currentIndex != null"></li>
        </ul>
      </div>
      <div class="login-container">
        <i class="el-icon-user-solid" @click="$LoginModal()" v-show="!isLogin"></i>
        <UserAvatar v-show="isLogin" />
      </div>
    </div>
  </div>
</template>

<script>
import Cogs from '@/components/Header/Cogs'
import LogoSvg from '@/components/LogoSvg'
import UserAvatar from '@/components/Header/UserAvatar'
import { throttle } from 'lodash'
import cloudbase from '@cloudbase/js-sdk'
import env from '@/config/login'

export default {
  name: 'Header',
  components: { Cogs, LogoSvg, UserAvatar },
  props: ['currentIndex'],
  data() {
    return {
      // 导航菜单数据
      headerMenuList: [
        { name: '首页', icon: '#icon-shouye', route: '/' },
        { name: '码上API', icon: '#icon-API1', route: '/books' },
        { name: '码上编程', icon: '#icon-biancheng', route: '/discuss' },
        { name: '待开发', icon: '', route: '/team' },
        { name: '开发日志', icon: '#icon-fuwurizhi', route: '/course' },
      ],
      // 导航条相关数据
      step: 0,
      // 齿轮相关数据
      angle: 0,
      time: 0,
      lastIndex: this.currentIndex,
      // 齿轮默认离开
      isLeave: true,
      // 侧边导航栏开关
      isOpen: true,
      // 背景颜色
      background: 'rgba(255, 255, 255, 0.1)',
      // 字体颜色
      fontColor: '#eee',
      updateLogoFlag: Date.now(),
      // 登录数据
      userLogin: {
        email: '',
        password: ''
      },
      // 登录状态
      isLogin: false
    }
  },
  methods: {
    // 菜单切换
    menuHandler(index, route) {
      let { currentIndex } = this
      this.lastIndex = index
      // 路由切换
      this.$router.push(`${route}`)
      // 点击的不是当前的菜单项
      if (currentIndex != index) {
        // 步长值等于当前的 index - 上一个 index
        this.step = currentIndex - index
        // 齿轮旋转动效相关数据变化
        this.angle = `${(this.step) * 120}deg`
        this.time = (Math.abs(this.step) + 1) * 200
        // 齿轮到达目标菜单后，停留 360ms 后离开
        this.isLeave = false
        setTimeout(() => {
          this.isLeave = true
        }, this.time + 260)
        // Logo 动效
        this.$bus.$emit('updateLogo')
      }
    },
    // 登录弹框
    openLoginBox() {
      const h = this.$createElement;
      this.$msgbox({
        title: '消息',
        message: h('p', null, [
          h('span', null, '内容可以是 '),
          h('LogoSvg', null, null)
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...';
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 3000);
          } else {
            done();
          }
        }
      }).then(action => {
        this.$message({
          type: 'info',
          message: 'action: ' + action
        });
      });
    },
    // 页面滚动
    scrollHandler() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 36) {
        this.background = '#fff'
        this.fontColor = '#666'
      } else {
        this.background = 'rgba(255, 255, 255, 0.1)'
        this.fontColor = '#eee'
      }
    },
    // 更新 Logo 动效
    updateLogo: throttle(function () {
      this.updateLogoFlag = Date.now()
    }, 1000),
    // 点击页面导航开关展开折叠
    navSwitch(isOpen) {
      if (isOpen) {
        this.$refs.path1.setAttribute('d', 'M 10 15 h 80 C 95 15 95 25 90 25 h -80 C 5 25 5 15 10 15')
        this.$refs.path2.setAttribute('d', 'M 10 75 h 80 C 95 75 95 85 90 85 h -80 C 5 85 5 75 10 75')

      } else {
        this.$refs.path1.setAttribute('d', 'M 10 15 h 40 C 55 15 55 25 50 25 h -40 C 5 25 5 15 10 15')
        this.$refs.path2.setAttribute('d', 'M 10 75 h 40 C 55 75 55 85 50 85 h -40 C 5 85 5 75 10 75')
      }
      this.isOpen = !this.isOpen
      this.$emit('switchHandler', this.isOpen)
    },
  },
  watch: {
    currentIndex() {
      let barStyle = this.$refs.navigationBar.style
      // barStyle.left = `${(this.currentIndex * 2 + 1) * 50 / this.headerMenuList.length}%`
      barStyle.transition = `left ${(Math.abs(this.step) + 1) * 200}ms linear`
    }
  },
  mounted() {
    window.addEventListener("scroll", this.scrollHandler);
    this.$bus.$on('updateLogo', () => {
      this.updateLogo()
    })
    this.$bus.$on('loginState', (isLogin) => {
      console.log(isLogin);
      this.isLogin = isLogin
    })
    const app = cloudbase.init(env)
    const loginState = app.auth().hasLoginState()
    if (loginState) {
      this.isLogin = true
    } else {
      this.isLogin = false
    }
  }
};
</script>

<style lang="less" scoped>
@import url('./header.less');
</style>

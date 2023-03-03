<template>
  <div class="header-container" :style="{ '--leftNavWidth': isOpen ? '220px' : '60px' }">
    <div class="header"
      :style="{ '--background': currentIndex != 0 ? '#fff' : background, '--angle': angle, '--time': time, '--translateY': translateY, '--color': currentIndex != 0 ? '#666' : fontColor, '--navigationLeft': `${(currentIndex * 2 + 1) * 50 / headerMenuList.length}%`, '--navigationBackground': currentIndex != 0 ? '#2681c2' : '#eee' }">
      <div class="logo-container">
        <RouterLink class="logo" to="/">
          <div class="logo-box">
            <LogoSvg :key="updateLogoFlag" />
          </div>
          <img src="~@/assets/images/logo_text.png" alt="" v-show="isOpen">
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
              <Cogs v-show="currentIndex == index" :angle="angle" />
            </Transition>
            <!-- <img :src="menuItem.icon" class="icon"> -->
            <span>{{ menuItem.name }}</span>
          </li>
          <li ref="navigationBar" class="navigation-bar" v-show="currentIndex != null"></li>
        </ul>
      </div>
      <!-- 小飞机 -->
      <div class="mini-program-tips-container">
        <el-popover placement="bottom" title="扫码联系作者" width="50" trigger="hover">
          <el-image style="width: 130px; height: 150px" :src="require('@/assets/images/mine_wechat.png')"
            fit="cover"></el-image>
          <div slot="reference" class="mini-program-tips-container">
            <i class="el-icon-s-promotion mini-program-tips"></i>
          </div>
        </el-popover>
      </div>
      <div class="login-container">
        <i class="el-icon-user-solid"></i>
      </div>
    </div>
  </div>
</template>

<script>
import Cogs from '@/components/Header/Cogs'
import LogoSvg from '@/components/LogoSvg'
import { throttle } from 'lodash'
export default {
  name: 'Header',
  components: { Cogs, LogoSvg },
  props: ['currentIndex'],
  data() {
    return {
      // 导航菜单数据
      headerMenuList: [
        { name: '首页', icon: require('@/assets/icons/home_icon.png'), route: '/' },
        { name: '待开发', icon: '', route: '/books' },
        { name: '待开发', icon: '', route: '/discuss' },
        { name: '待开发', icon: '', route: '/team' },
        { name: '开发日志', icon: '', route: '/course' },
      ],
      // // 当前点击的 active 
      // currentIndex: 0,
      // 导航条相关数据
      step: 0,
      // 齿轮相关数据
      angle: 0,
      time: 0,
      translateY: '-60%',
      // 侧边导航栏开关
      isOpen: true,
      // 背景颜色
      background: 'rgba(255, 255, 255, 0.1)',
      // 字体颜色
      fontColor: '#eee',
      updateLogoFlag: Date.now(),
    }
  },
  methods: {
    // 菜单切换
    menuHandler(index, route) {
      let { currentIndex } = this
      this.step = currentIndex - index
      // this.currentIndex = index
      // // 导航条移动
      // barStyle.left = `${(index * 20) + 10}% `
      // barStyle.transition = `left ${(Math.abs(this.step) + 1) * 200}ms linear`
      // 齿轮旋转
      this.angle = `${(this.step) * 80}deg`
      this.time = `${(Math.abs(this.step) + 1) * 200}ms`
      // Logo 动效
      this.$bus.$emit('updateLogo')
      // 路由切换
      this.$router.push(`${route}`)
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
    }
  },
  watch: {
    currentIndex() {
      let barStyle = this.$refs.navigationBar.style
      barStyle.left = `${(this.currentIndex * 2 + 1) * 50 / this.headerMenuList.length}% `
      barStyle.transition = `left ${(Math.abs(this.step) + 1) * 200}ms linear`
    }
  },
  mounted() {
    window.addEventListener("scroll", this.scrollHandler);
    this.$bus.$on('updateLogo', () => {
      this.updateLogo()
    })
  }
};
</script>

<style lang="less" scoped>
@import url('./header.less');
</style>

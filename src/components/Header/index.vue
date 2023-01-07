<template>
  <div class="header-container" :style="{ '--leftNavWidth': isOpen ? '220px' : '60px' }">
    <div class="header"
      :style="{ '--background': currentIndex != 0 ? '#fff' : 'rgba(255, 255, 255, 0.1)', '--angle': angle, '--time': time, '--translateY': translateY, '--color': currentIndex != 0 ? '#666' : '#eee', '--navigationLeft': `${(currentIndex * 2 + 1) * 50 / headerMenuList.length}%`, '--navigationBackground': currentIndex != 0 ? '#2681c2' : '#eee' }">
      <!-- 侧边导航栏开关 -->
      <div class="fold-btn">
        <label>
          <input checked type="checkbox" title="switch" />
          <div class="nav-switch" :isOpen="isOpen" @click="switchHandler">
            <div class="circle"></div>
          </div>
        </label>
      </div>
      <!-- 页面菜单 -->
      <div class="menu-container">
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
        <el-button type="primary" round @click="openLoginBox">
          <a href="javascript:;">
            <span>登录&nbsp;/&nbsp;</span>
          </a>
          <a href="javascript:;">
            <span>注册</span>
          </a>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Cogs from '@/components/Header/Cogs'
export default {
  name: 'Header',
  components: { Cogs },
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
      isOpen: true
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
    // 开关侧边导航栏
    switchHandler() {
      this.isOpen = !this.isOpen
      this.$bus.$emit('switchHandler', this.isOpen)
    }
  },
  watch: {
    currentIndex() {
      let barStyle = this.$refs.navigationBar.style
      barStyle.left = `${(this.currentIndex * 2 + 1) * 50 / this.headerMenuList.length}% `
      barStyle.transition = `left ${(Math.abs(this.step) + 1) * 200}ms linear`
    }
  }
};
</script>

<style lang="less" scoped>
@import url('./header.less');
</style>

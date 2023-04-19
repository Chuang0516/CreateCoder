<template>
  <div class="app-container">
    <Header @switchHandler="switchHandler" :currentIndex="$route.meta.menuIndex" />
    <router-view :isOpen="isOpen" />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { onlineWS } from '@/service/wsInstance'

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      isOpen: true,
      wsTimer: null,
      isLogin: false
    }
  },
  methods: {
    adaptation() {
      if (window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
        this.$message({
          message: '移动端尚未开发，建议使用电脑访问！',
          type: 'warning'
        });
      }
    },
    // 侧边导航栏开关操作
    switchHandler(isOpen) {
      this.isOpen = isOpen
    },
    // 获取当前登录状态
    async getCurrentUser() {
      const isLogin = await this.$store.dispatch('getCurrentUser')
      if (isLogin) {
        this.$bus.$emit('loginState', true)
        this.isLogin = isLogin
      } else {
        this.$LoginModal()
      }
    },
    // 心跳连接，防止连接中断
    heartbeat() {
      this.wsTimer = setInterval(() => {
        onlineWS.send(JSON.stringify({
          code: 'HEARTBEAT',
          message: '链接状态：链接中...'
        }))
      }, 30 * 1000)
    }
  },
  watch: {
    isLogin(newVal) {
      if (newVal) {
        // WS链接实时监听异地登录消息
        onlineWS.socket.onmessage = (msg) => {
          const { code } = JSON.parse(msg.data)
          if (code == 'OFFSITE_LOGIN') {
            // 提示用户异地登录
            this.$notify({
              title: '异地登录',
              message: '你的登录验证码可能泄露',
              type: 'warning',
              duration: 0
            })
            // 退出登录
            this.$store.dispatch('logout')
            // 登录态：未登录
            this.$bus.$emit('loginState', false)
            // 弹出登录模态框
            this.$LoginModal()
          }
        }
      }
    }
  },
  async mounted() {
    this.adaptation()
    await this.getCurrentUser()
    this.heartbeat()
  },
  beforeDestroy() {
    clearInterval(this.wsTimer)
  }
};
</script>

<style lang="less" scoped>
.app-container {
  min-width: 1200px;
}
</style>

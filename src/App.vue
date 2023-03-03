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

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      isOpen: true
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
    }
  },
  mounted() {
    this.adaptation()
  }
};
</script>

<style lang="less" scoped>
.app-container {
  min-width: 1200px;
}
</style>

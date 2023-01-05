<template>
  <div class="app-container">
    <CodeNav />
    <div class="page-content" :style="{ '--marginLeft': isOpen ? '220px' : '60px' }">
      <Header :currentIndex="$route.meta.menuIndex" />
      <router-view />
      <Footer />
    </div>
  </div>
</template>

<script>
import CodeNav from '@/components/CodeNav'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  name: "App",
  components: {
    Header,
    CodeNav,
    Footer
  },
  data() {
    return {
      isOpen: true,
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
    }
  },
  mounted() {
    this.adaptation()
    this.$bus.$on('switchHandler', (isOpen) => {
      this.isOpen = isOpen
    })
  }
};
</script>

<style lang="less" scoped>
.app-container {
  display: flex;

  .page-content {
    flex: 1;
    margin-left: var(--marginLeft);
    transition: all 500ms ease-in 300ms;
  }
}
</style>

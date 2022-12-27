<template>
  <div class="app-container">
    <CodeNav />
    <div class="page-content">
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
  mounted() {
    if (window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
      this.$message({
        message: '移动端尚未开发，建议使用电脑访问！',
        type: 'warning'
      });
    } else {

    }
  }
};
</script>

<style lang="less" scoped>
.app-container {
  display: flex;

  .page-content {
    flex: 1;
    margin-left: 220px;
  }
}
</style>

<template>
  <div class="app-container">
    <CodeNav />
    <div class="page-content">
      <Header :currentIndex="$route.meta.menuIndex" />
      <router-view />
    </div>
  </div>
</template>

<script>
import CodeNav from '@/components/CodeNav'
import Header from '@/components/Header'

export default {
  name: "App",
  components: {
    Header,
    CodeNav
  },

};
</script>

<style lang="less">
.app-container {
  display: flex;

  .page-content {
    flex: 1;
    margin-left: 220px;
  }
}
</style>

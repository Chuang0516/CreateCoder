<template>
  <div>
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from "@/components/Header";

export default {
  name: "App",
  components: {
    Header,
  },
};
</script>

<style lang="less">
html {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  min-width: 1250px;
  color: #333;
}

body {
  background-color: #F5F6F9;
  overflow: hidden;
  box-sizing: border-box;

  .el-popover {
    text-align: center;
    height: 180px;
  }
}

ul,
ol,
li {
  list-style-type: none;
}

ul {
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
}
</style>

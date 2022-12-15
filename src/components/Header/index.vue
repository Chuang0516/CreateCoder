<template>
  <el-row :gutter="10">
    <el-col :span="3">
      <div class="grid-content bg-purple">
        <a class="logo" href="javascript:;">
          <LogoSvg :key="updateLogoFlag" />
          <img src="~@/assets/logo_text.png" alt="">
        </a>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="grid-content bg-purple">
        <ul class="header-menu">
          <li :class="{ active: currentIndex == index }" v-for="(menuItem, index) in headerMenuList" :key="index"
            @click="menuHandler(index)">
            {{ menuItem }}
          </li>
        </ul>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="grid-content bg-purple">
      </div>
    </el-col>
    <el-col :span="5">
      <div class="grid-content bg-purple"></div>
    </el-col>
  </el-row>
</template>

<script>
import LogoSvg from '@/components/LogoSvg'
import { throttle } from 'lodash'

export default {
  name: 'Header',
  components: { LogoSvg },
  data() {
    return {
      updateLogoFlag: Date.now(),
      // 导航菜单数据
      headerMenuList: ['首页', '题库', '讨论', '小队', '课程'],
      // 当前的 active 
      currentIndex: 1
    }
  },
  methods: {
    // 更新 Logo 动效
    updateLogo: throttle(function () {
      this.updateLogoFlag = Date.now()
    }, 1000),
    // 菜单切换
    menuHandler(index) {
      this.currentIndex = index
      this.updateLogo()
    }
  },
};
</script>

<style lang="less" scoped>
.el-row {
  background-color: #fff;
  box-shadow: 0 1px 6px rgb(156, 156, 156);
}

.grid-content {
  border-radius: 4px;
  min-height: 56px;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 56px;
  margin: auto;
}

.logo img {
  height: 32px;
}

.header-menu {
  display: flex;
  align-items: center;
  height: 56px;
}

.header-menu li {
  flex: 1;
  height: 56px;
  line-height: 56px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
}

.header-menu li.active {
  position: relative;
  color: #2681c2;
}

.header-menu li.active::after {
  content: '';
  position: absolute;
  bottom: 6px;
  left: 50%;
  transform: translateX(-50%);
  display: block;
  width: 26px;
  height: 2px;
  background-color: #2681c2;
  border-radius: 1px;
}
</style>

<template>
  <el-row :gutter="10">
    <el-col :span="3">
      <div class="grid-content bg-purple">
        <a class="logo" href="javascript:;">
          <div class="logo-container">
            <LogoSvg :key="updateLogoFlag" />
          </div>
          <img src="~@/assets/logo_text.png" alt="">
        </a>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="grid-content bg-purple">
        <ul class="header-menu">
          <li class="menu-item" :style="{ '--angle': angle, '--time': time, '--translateY': translateY }"
            :class="{ active: currentIndex == index }" v-for="(menuItem, index) in headerMenuList" :key="index"
            @click="menuHandler(index, menuItem.route)">
            <Transition name="cogs">
              <Cogs v-show="currentIndex == index" />
            </Transition>
            {{ menuItem.name }}
          </li>
          <span ref="navigationBar" class="navigation-bar"></span>
        </ul>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="grid-content bg-purple">
        <SearchBox />
      </div>
    </el-col>
    <el-col :span="2">
      <div class="grid-content bg-purple">
        <el-popover placement="bottom" title="扫码联系作者" width="50" trigger="hover">
          <el-image style="width: 130px; height: 150px" :src="require('@/assets/mine_wechat.png')"
            fit="cover"></el-image>
          <div slot="reference" class="mini-program-tips-container">
            <i class="el-icon-s-promotion mini-program-tips"></i>
          </div>
        </el-popover>
      </div>
    </el-col>
    <el-col :span="3">
      <div class="grid-content bg-purple">
        <div class="login-registered-container">
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
    </el-col>
  </el-row>
</template>

<script>
import LogoSvg from '@/components/LogoSvg'
import SearchBox from '@/components/SearchBox'
import Cogs from '@/components/Cogs'
import { throttle } from 'lodash'

export default {
  name: 'Header',
  components: { LogoSvg, SearchBox, Cogs },
  data() {
    return {
      updateLogoFlag: Date.now(),
      // 导航菜单数据
      headerMenuList: [
        { name: '首页', route: '/' },
        { name: '题库', route: '/books' },
        { name: '讨论', route: '/discuss' },
        { name: '小队', route: '/team' },
        { name: '课程', route: '/course' }
      ],
      // 当前的 active 
      currentIndex: 0,
      // 导航条相关数据
      step: 0,
      // 齿轮相关数据
      angle: 0,
      time: 0,
      translateY: '-50%',
      // 作者联系方式
    }
  },
  methods: {
    // 更新 Logo 动效
    updateLogo: throttle(function () {
      this.updateLogoFlag = Date.now()
    }, 1000),
    // 菜单切换
    menuHandler(index, route) {
      let { currentIndex, $refs, updateLogo } = this
      this.step = currentIndex - index
      let barStyle = $refs.navigationBar.style
      this.currentIndex = index
      // 导航条移动
      barStyle.left = `${(index * 20) + 10}% `
      barStyle.transition = `left ${(Math.abs(this.step) + 1) * 200}ms linear`
      // 齿轮旋转
      this.angle = `${(this.step) * 80}deg`
      this.time = `${(Math.abs(this.step) + 1) * 200}ms`
      updateLogo()
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
          h('el-button', { class: 'el-button--primary' }, '主要按钮')
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
    }
  },
};
</script>

<style lang="less" scoped>
.el-row {
  background-color: #fff;
  box-shadow: 0 0.01px 0.06px rgb(156, 156, 156);

  .el-col {
    .grid-content {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      min-height: 56px;

      .login-registered-container {
        .el-button {
          background-image: linear-gradient(to right bottom, #2681c2, #3AD6E2);
          border: none;
          display: flex;

          >span {
            flex: 1;

            a {
              flex: 1;
              color: #fff;
            }
          }


        }
      }

      .logo {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 56px;
        margin: auto;

        .logo-container {
          display: flex;
          justify-content: right;
          align-items: center;
          flex: 1;
        }

        img {
          height: 32px;
          margin-right: 20px;
        }
      }

      .header-menu {
        display: flex;
        align-items: center;
        width: 100%;
        height: 56px;

        .navigation-bar {
          position: absolute;
          bottom: 6px;
          left: 10%;
          transform: translateX(-50%);
          display: block;
          width: 26px;
          height: 2px;
          background-color: #2681c2;
          border-radius: 1px;
        }

        li {
          position: relative;
          flex: 1;
          height: 56px;
          line-height: 56px;
          text-align: center;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          user-select: none;
          transition: font-size 50ms linear;

          .cogs-enter {
            transform: translate(-50%, -50%);
          }

          .cogs-enter-to {
            transform: translate(-50%, var(--translateY)) rotate(var(--angle));
          }

          .cogs-enter-active {
            transition: all var(--time) ease-in;
          }

          .cogs-leave {
            transform: translate(-50%, -50%) rotate(var(--angle));
          }

          .cogs-leave-to {
            transform: translate(-50%, -100%);
          }

          .cogs-leave-active {
            transition: all 200ms ease-in;
          }

          &.active {
            position: relative;
            color: #2681c2;
            font-size: 20px;
          }
        }
      }

      .mini-program-tips-container {
        width: 36px;
        height: 36px;
        text-align: center;
        line-height: 36px;
        font-size: 22px;
        cursor: pointer;
        color: #666;
        border-radius: 6px;

        &:hover {
          background-color: #f1f1f1;
        }
      }
    }
  }
}
</style>

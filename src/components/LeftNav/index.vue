<template>
    <div ref="fixed" class="codenav-container" :style="{ '--navWidth': isOpen ? '220px' : '60px' }">
        <div class="left-nav" v-show="$route.meta.leftNav">
            <div class="upload" @click="$router.push('/upload')">
                <i class="upload-icon">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-shangchuan"></use>
                    </svg>
                </i>
                <span>上传组件</span>
            </div>
            <!-- 展开时的导航菜单 -->
            <Transition enter-active-class="animate__animated animate__slideInRight animate__fast"
                leave-active-class="animate__animated animate__slideOutRight animate__fast">
                <ul class="nav-container" v-show="isOpen">
                    <li class="nav-menu" v-for="(navMenu, menuIndex) in  pageNavList" :key="navMenu.id">
                        <div class="menu" @click="openMenuItem(menuIndex)">
                            <i class="menu-icon">
                                <svg class="icon" aria-hidden="true">
                                    <use :xlink:href="navMenu.icon"></use>
                                </svg>
                            </i>
                            <span class="menu-text">{{ navMenu.name }}</span>
                            <i
                                :class="{ 'el-icon-arrow-right': true, 'menu-open': true, 'open': openIndex == menuIndex }"></i>
                        </div>
                        <Transition name="menu">
                            <ul class="menu-item" :style="{ '--liLength': navMenu.item.length + 1 }"
                                v-show="openIndex == menuIndex">
                                <li class="item" v-for="(navItem, itemIndex) in navMenu.item" :key="navItem.id">
                                    <i class="item-icon">
                                        <svg class="icon" aria-hidden="true">
                                            <use :xlink:href="navItem.icon"></use>
                                        </svg>
                                    </i>
                                    <span class="item-text">{{ navItem.name }}</span>
                                </li>
                            </ul>
                        </Transition>
                    </li>
                </ul>
            </Transition>
            <!-- 收缩后的菜单 -->
            <ul class="nav-container-shrink" :style="{ '--navTop': `${navTop}px` }">
                <li class="nav-menu" v-for="(navMenu, menuIndex) in  pageNavList" :key="navMenu.id">
                    <div class="menu">
                        <i class="menu-icon">
                            <svg class="icon" aria-hidden="true">
                                <use :xlink:href="navMenu.icon"></use>
                            </svg>
                        </i>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import LogoSvg from '@/components/LogoSvg'
import { mapState } from 'vuex'
import 'animate.css'

export default {
    name: 'LeftNav',
    components: { LogoSvg },
    props: ['isOpen'],
    data() {
        return {
            openIndex: null,
            // 收缩后菜单定位
            navTop: 0
        }
    },
    computed: {
        ...mapState({ pageNavList: (state) => state.home.homeNavList }),
    },
    methods: {
        // 展开菜单
        openMenuItem(menuIndex) {
            this.openIndex = menuIndex === this.openIndex ? null : menuIndex;
            // 滚动到当前项的位置
            this.$bus.$emit('leftNavClick', menuIndex)
        }
    },
    watch: {
        isOpen: {
            handler(newVal, oldVal) {
                this.navTop = newVal ? -454 : 0
            },
            immediate: true
        }
    },
    mounted() {
        window.onscroll = () => {
            let sl = -Math.max(document.body.scrollLeft, document.documentElement.scrollLeft);
            this.$refs.fixed.style.left = sl + 'px';
        }
    }
}
</script>

<style lang="less" scoped>
@import url('./left_nav.less');
</style>

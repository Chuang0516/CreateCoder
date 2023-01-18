<template>
    <div ref="fixed" class="codenav-container" :style="{ '--navWidth': isOpen ? '220px' : '60px' }">

        <div class="left-nav" v-show="$route.meta.leftNav">
            <ul class="nav-container">
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
        </div>
    </div>
</template>

<script>
import LogoSvg from '@/components/LogoSvg'
import { mapState } from 'vuex'

export default {
    name: 'CodeNav',
    components: { LogoSvg },
    data() {
        return {
            openIndex: null,
            isOpen: true
        }
    },
    computed: {
        ...mapState({ pageNavList: (state) => state.homeNavList })
    },
    methods: {
        // 展开菜单
        openMenuItem(menuIndex) {
            this.openIndex = menuIndex === this.openIndex ? null : menuIndex;
        }
    },
    mounted() {

        this.$bus.$on('switchHandler', (isOpen) => {
            this.isOpen = isOpen
        })
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

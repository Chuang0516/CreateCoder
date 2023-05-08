<template>
    <div class="home" :style="{ '--marginLeft': isOpen ? '220px' : '60px' }">
        <LeftNav :isOpen="isOpen" />
        <div class="home-top" :style="{ '--transition': transition }">
            <vue-particles class="login-bg" color="#fff" :particleOpacity="0.7" :particlesNumber="60" shapeType="circle"
                :particleSize="4" linesColor="#8DD1FE" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4"
                :linesDistance="150" :moveSpeed="2" :hoverEffect="true" hoverMode="grab" :clickEffect="true"
                clickMode="push" />
            <img :src="imgUrl" v-show="imgUrl" class="wallpaper">
            <!-- 天气预报 -->
            <div class="weather">
                <div id="he-plugin-simple"></div>
            </div>
            <div class="home-main">
                <!-- 一言 -->
                <div class="yiyan" :style="{ '--width': `${(hitokoto.length + 4) * 18}px` }" v-show="hitokoto">
                    <span>{{ hitokoto }}</span>
                    <el-tooltip class="item" effect="dark" content="刷新一言" placement="top">
                        <i class="el-icon-refresh" @click="newYiyan" :style="{ '--rotate': `${yiyanIconRotate}deg` }"></i>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="复制一言" placement="top">
                        <i class="el-icon-copy-document" v-clipboard:copy="hitokoto" v-clipboard:success="onCopy"></i>
                    </el-tooltip>
                </div>
                <!-- 搜索框 -->
                <div class="search-container">
                    <SearchBox />
                </div>
                <!-- 时钟 -->
                <div class="clock-container">
                    <Clock />
                </div>
            </div>
            <!-- 右侧卡片菜单 -->
            <MenuCards :imgUrl="imgUrl" @updateImgUrl="updateImgUrl" />
            <!-- 快捷应用栏 -->
            <div class="quickAppBar">
                <div class="app" v-for="app in quickAppBar" :key="app.id">
                    <svg class="icon" aria-hidden="true">
                        <use :xlink:href="app.icon"></use>
                    </svg>
                    <div class="active"></div>
                </div>
            </div>
        </div>
        <!-- 首页广告投放 -->
        <Billboard :isOpen="isOpen" />
        <!-- 在线工具 -->
        <OnlineTools :isOpen="isOpen" />
    </div>
</template>

<script>
import SearchBox from '@/views/Home/SearchBox'
import MenuCards from '@/views/Home/MenuCards'
import Clock from '@/views/Home/Clock'
import LeftNav from '@/components/LeftNav'
import Loader from '@/components/Loader'
import { throttle } from 'lodash'
import Billboard from '@/views/Home/Billboard'
import OnlineTools from '@/views/Home/OnlineTools'

export default {
    name: 'Home',
    props: ['isOpen'],
    components: { SearchBox, MenuCards, Clock, LeftNav, Loader, Billboard, OnlineTools },
    data() {
        return {
            hitokoto: '',
            // 一言刷新图标旋转
            yiyanIconRotate: 0,
            // 背景图片url
            imgUrl: '',
            transition: '',
            // 快捷应用相关数据
            quickAppBar: [
                { id: 1, name: '翻译', icon: '#icon-yuyanfanyi' }
            ]
        }
    },
    methods: {
        createWether() {
            window.WIDGET = {
                "CONFIG": {
                    "modules": "012",
                    "background": "5",
                    "tmpColor": "FFFFFF",
                    "tmpSize": "14",
                    "cityColor": "FFFFFF",
                    "citySize": "14",
                    "aqiColor": "FFFFFF",
                    "aqiSize": "14",
                    "weatherIconSize": "16",
                    "alertIconSize": "20",
                    "padding": "10px 10px 10px 10px",
                    "shadow": "0",
                    "language": "auto",
                    "borderRadius": "5",
                    "fixed": "true",
                    "vertical": "center",
                    "horizontal": "center",
                    "key": "18372296867d4592a43c6b85f39f252d"
                }
            }
            let script = document.createElement('script')
            script.type = 'text/javascript'
            script.src =
                'https://widget.qweather.net/simple/static/js/he-simple-common.js?v=2.0'
            document.getElementsByTagName('head')[0].appendChild(script)
        },
        getyiyan() {
            fetch('https://v1.hitokoto.cn')
                .then(response => response.json())
                .then(data => {
                    this.hitokoto = data.hitokoto
                })
                .catch(error => {
                    console.error(error)
                })
        },
        // 刷新一言API
        newYiyan: throttle(function () {
            this.yiyanIconRotate -= 360
            setTimeout(() => {
                this.getyiyan()
            }, 1000)
        }, 1000),
        // 复制一言成功
        onCopy() {
            this.$message({
                message: '一言已复制到剪贴板',
                type: 'success',
                center: true
            })
        },
        // 更新壁纸
        updateImgUrl(imgUrl) {
            this.imgUrl = imgUrl
        },
        // 初始化
        init() {
            const imgUrl = localStorage.getItem('imgUrl')
            // 本地有存储壁纸
            if (imgUrl != null) {
                this.imgUrl = imgUrl
            }
        }
    },
    async created() {
        const state = JSON.parse(JSON.stringify(this.$store.state.home))
        for (let key in state) {
            const stateItem = JSON.stringify(state[key])
            if (stateItem == '{}' || stateItem == '[]' || stateItem == '') {
                this.$bus.$emit('toLoading', true)
                await Promise.all([
                    this.$store.dispatch('getHomeBanner'),
                    this.$store.dispatch('getHomeNav')
                ])
                this.$bus.$emit('toLoading', false)
                break
            }
        }
    },
    mounted() {
        this.createWether()
        this.init()
        this.getyiyan()
    }
}
</script>

<style lang="less" scoped>
.home {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    margin-left: var(--marginLeft);
    transition: all 500ms ease;

    .home-top {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 520px;
        width: 100%;
        background-position: center;
        background-size: cover;
        background: radial-gradient(180% 100% at top center, #48466d 20%, #3d84a8 60%, #46cdcf 85%, #F7F9FE);

        #particles-js {
            width: 100%;
            height: 100%;
            position: absolute;
            z-index: 1;
            user-select: none;
        }

        .wallpaper {
            position: absolute;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: -1;
        }

        .weather {
            z-index: 9;
            position: absolute;
            left: 16px;
            top: 72px;
        }

        .home-main {
            position: relative;
            width: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            flex-direction: column;

            .yiyan {
                z-index: 2;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #fff;
                font-size: 18px;
                font-family: 'Courier New', Courier, monospace;
                transition: width 200ms linear;
                backdrop-filter: blur(60px);
                background-color: #ffffff20;
                height: 32px;
                width: var(--width);
                border-radius: 16px;
                padding: 0 10px;

                span {
                    display: flex;
                    align-items: center;
                    height: 100%;
                    margin: 0 5px 0 0;
                    padding: 0;
                    font-family: kaiti;
                    vertical-align: baseline;
                    overflow: hidden; //超出的文本隐藏
                    text-overflow: ellipsis; //溢出用省略号显示
                    white-space: nowrap; //溢出不换行
                }

                i {
                    cursor: pointer;
                    transform: rotate(var(--rotate));
                    transition: all 1s linear;
                    margin: 5px;
                }
            }

            // 搜索框的样式
            .search-container {
                z-index: 2;
                width: 100%;
                display: flex;
                justify-content: center;
                margin-top: 30px;
            }

            // 时钟
            .clock-container {
                z-index: 1;
                margin-top: 10px;
            }
        }

        .quickAppBar {
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            bottom: 20px;
            width: 92%;
            height: 50px;
            // border-bottom: 1px solid #666;
            z-index: 1;
            cursor: pointer;

            .app {
                width: 36px;
                height: 36px;
                background-color: #F5F5FB;
                border-radius: 6px;
                margin: 0 12px;
                transition: all 160ms linear;

                &:hover {
                    transform: scale(1.2) translateY(-8px);
                }

                .icon {
                    width: 36px;
                    height: 36px;
                }
            }
        }
    }

    .loading {
        font-family: Consolas, monaco, monospace;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #232427;
        color: #FF893A;
        z-index: 999;
    }
}
</style>

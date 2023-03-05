<template>
    <div class="home">
        <LeftNav :isOpen="isOpen" />
        <div class="home-top" :style="{ '--marginLeft': isOpen ? '220px' : '60px', '--transition': transition }">
            <vue-particles class="login-bg" color="#fff" :particleOpacity="0.7" :particlesNumber="60" shapeType="circle"
                :particleSize="4" linesColor="#8DD1FE" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4"
                :linesDistance="150" :moveSpeed="2" :hoverEffect="true" hoverMode="grab" :clickEffect="true"
                clickMode="push" />
            <img :src="imgUrl" v-show="imgUrl" class="wallpaper">
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
                <!-- 天气预报 -->
                <!-- <div class="weather">
                    <div id="he-plugin-simple"></div>
                </div> -->
                <!-- 时钟 -->
                <div class="clock-container">
                    <Clock />
                </div>
            </div>
            <MenuCards :imgUrl="imgUrl" @updateImgUrl="updateImgUrl" />
        </div>
    </div>
</template>

<script>
import SearchBox from '@/views/Home/SearchBox'
import MenuCards from '@/views/Home/MenuCards'
import Clock from '@/views/Home/Clock'
import LeftNav from '@/components/LeftNav'
import { throttle } from 'lodash'

export default {
    name: 'Home',
    props: ['isOpen'],
    components: { SearchBox, MenuCards, Clock, LeftNav },
    data() {
        return {
            hitokoto: '',
            // 一言刷新图标旋转
            yiyanIconRotate: 0,
            // 背景图片url
            imgUrl: '',
            transition: ''
        }
    },
    methods: {
        createWether() {
            window.WIDGET = {
                "CONFIG": {
                    "modules": "012",
                    "background": "1",
                    "tmpColor": "FFFFFF",
                    "tmpSize": "16",
                    "cityColor": "FFFFFF",
                    "citySize": "16",
                    "aqiColor": "FFFFFF",
                    "aqiSize": "16",
                    "weatherIconSize": "24",
                    "alertIconSize": "18",
                    "padding": "5px 10px 5px 10px",
                    "shadow": "0",
                    "language": "auto",
                    "borderRadius": "20",
                    "fixed": "false",
                    "vertical": "center",
                    "horizontal": "center",
                    "key": "a5d8d473da3d4efa880afc6c070886db"
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
    mounted() {
        // this.createWether()
        this.init()
        // this.$bus.$on('switchHandler', (config) => {
        //     let { isOpen, type } = config
        //     this.isOpen = isOpen
        //     if (type == 'switch') {
        //         this.transition = `null`
        //     } else {
        //         this.transition = `all 500ms ease-in 300ms`
        //     }
        // })
        this.getyiyan()
        this.$store.dispatch('getHomeNav')
    }
}
</script>

<style lang="less" scoped>
.home {
    width: 100%;
    height: 1200px;
    overflow: hidden;

    .home-top {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 520px;
        margin-left: var(--marginLeft);
        transition: all 500ms ease;
        background-position: center;
        background-size: cover;
        // background: linear-gradient(0deg, #3ad6e2 0%, #2681c2 60%, #0C72BA 100%);
        background: radial-gradient(180% 100% at top center, #48466d 20%, #3d84a8 60%, #46cdcf 85%, #f5f6f9);

        #particles-js {
            width: 100%;
            height: 100%;
            position: absolute;
            z-index: 9;
            user-select: none;
        }

        .wallpaper {
            position: absolute;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: 1;
        }

        .home-main {
            position: relative;
            width: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            flex-direction: column;

            .weather {
                z-index: 9;

                & div {
                    z-index: 9999;
                }
            }

            .yiyan {
                display: flex;
                justify-content: center;
                align-items: center;
                color: #fff;
                font-size: 18px;
                font-family: 'Courier New', Courier, monospace;
                z-index: 10;
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
                z-index: 10;
                width: 100%;
                display: flex;
                justify-content: center;
                margin-top: 30px;
            }

            // 时钟
            .clock-container {
                z-index: 9;
                margin-top: 10px;
            }
        }
    }
}
</style>

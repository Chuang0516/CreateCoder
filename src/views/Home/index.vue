<template>
    <div class="home">
        <div class="home-background">
            <vue-particles class="login-bg" color="#fff" :particleOpacity="0.7" :particlesNumber="60" shapeType="circle"
                :particleSize="4" linesColor="#8DD1FE" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4"
                :linesDistance="150" :moveSpeed="2" :hoverEffect="true" hoverMode="grab" :clickEffect="true"
                clickMode="push" />
            <img :src="imgUrl" class="wallpaper" alt="">
            <div class="home-main">
                <!-- 一言 -->
                <div class="yiyan">
                    <p ref="yiyanText">{{ hitokoto }}</p>
                    <el-tooltip class="item" effect="dark" content="刷新一言" placement="top">
                        <i class="el-icon-refresh" @click="newYiyan"
                            :style="{ '--rotate': `${yiyanIconRotate}deg` }"></i>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="复制一言" placement="top">
                        <i class="el-icon-copy-document" v-clipboard:copy="hitokoto" v-clipboard:success="onCopy"></i>
                    </el-tooltip>
                </div>
                <!-- 天气预报 -->
                <!-- <div class="weather">
                    <div id="he-plugin-standard"></div>
                </div> -->
                <!-- 搜索框 -->
                <div class="search-container">
                    <SearchBox />
                </div>
            </div>
            <div class="menu-cards">
                <ul>
                    <li @click="changeWallpaper"
                        :class="{ 'wallpaper-card': index == 0, 'wallpaper-card2': index == 1 }"
                        v-for="(card, index) in homeCards" :key="index">
                        <svg class="icon" aria-hidden="true">
                            <use :xlink:href="card.icon"></use>
                        </svg>
                        <span>{{ card.name }}</span>
                        <div class="wallpaperOptions" @click.stop>
                            <ul>
                                <el-tooltip class="item" effect="dark" :content="cardItem.name" placement="left"
                                    v-for="(cardItem, index) in card.cardItems" :key="index">
                                    <li class="lock"><i :class="[cardItem.icon]"></i></li>
                                </el-tooltip>
                            </ul>
                        </div>
                    </li>

                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import SearchBox from '@/views/Home/SearchBox'
import { throttle } from 'lodash'


export default {
    name: 'Home',
    components: { SearchBox },
    data() {
        return {
            hitokoto: '',
            // 一言刷新图标旋转
            yiyanIconRotate: 0,
            // 一言盒子宽
            yiyanWidth: 0,
            // 背景图片url
            imgUrl: '',
            // 侧边卡片
            homeCards: [
                {
                    icon: '#icon-zhuti',
                    name: '换壁纸',
                    cardItems: [
                        { icon: 'el-icon-unlock', name: '锁定' },
                        { icon: 'el-icon-menu', name: '分类' },
                        { icon: 'el-icon-more', name: '更多' }
                    ]
                },
                {
                    icon: '#icon-zhuti',
                    name: '换壁纸',
                    cardItems: [
                        { icon: 'el-icon-unlock', name: '锁定' },
                        { icon: 'el-icon-menu', name: '分类' },
                        { icon: 'el-icon-more', name: '更多' }
                    ]
                },
            ]
        }
    },
    methods: {
        getyiyan() {
            window.WIDGET = {
                "CONFIG": {
                    "layout": "1",
                    "width": "520",
                    "height": "160",
                    "background": "1",
                    "dataColor": "EEEEEE",
                    "borderRadius": "10",
                    "key": "78643238d3634c01ab0a527d1f76031a"
                }
            }
            let script = document.createElement('script')
            script.type = 'text/javascript'
            script.src =
                'https://widget.qweather.net/standard/static/js/he-standard-common.js?v=2.0'
            document.getElementsByTagName('head')[0].appendChild(script)

            fetch('https://v1.hitokoto.cn')
                .then(response => response.json())
                .then(data => {
                    this.hitokoto = data.hitokoto
                })
                .catch(console.error)
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
        // 换壁纸
        changeWallpaper() {
            fetch('https://bing.img.run/rand.php')
                .then(img => {
                    this.imgUrl = img.url
                })
        }
    },
    mounted() {
        this.getyiyan()
        this.$store.dispatch('getHomeNav')
        this.changeWallpaper()
    }
}
</script>

<style lang="less" scoped>
.home {
    width: 100%;

    .home-background {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 500px;
        background-position: center;
        background-size: cover;
        // background: linear-gradient(0deg, #3ad6e2 0%, #2681c2 60%, #0C72BA 100%);
        background: radial-gradient(180% 100% at top center, #48466d 20%, #3d84a8 60%, #46cdcf 85%, #f5f6f9);
        overflow: hidden;

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
        }

        .home-main {
            position: relative;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            margin-bottom: 120px;
            overflow: hidden;


            .weather {
                justify-self: start;
            }

            .yiyan {
                display: flex;
                justify-content: center;
                align-items: center;
                color: #fff;
                font-size: 18px;
                font-family: 'Courier New', Courier, monospace;
                z-index: 10;
                transition: width 1s ease-in;

                p {
                    margin: 0 5px 0 0;
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
        }

        .menu-cards {
            position: absolute;
            right: 0px;
            top: 56px;
            width: 35px;

            &>ul {
                position: relative;
                display: flex;
                flex-direction: column;
                width: 32px;

                &>li {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    width: 88px;
                    height: 36px;
                    margin-top: 36px;
                    background-color: rgba(28, 28, 28, 0.8);
                    border-radius: 18px 0 0 18px;
                    cursor: pointer;
                    z-index: 10;
                    padding-left: 3px;
                    box-sizing: border-box;
                    transition: all 200ms ease-in;

                    svg {
                        width: 30px;
                        height: 30px;
                    }

                    span {
                        color: #eee;
                        margin-left: 2px;
                        font-size: 14px;
                        user-select: none;
                    }

                    &:hover {
                        transform: translateX(-48px);
                    }

                    &.wallpaper-card {
                        position: relative;

                        .wallpaperOptions {
                            position: absolute;
                            top: 36px;
                            height: 0px;
                            width: 88px;
                            overflow: hidden;

                            ul {
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                width: 36px;


                                li {
                                    position: relative;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    width: 0px;
                                    height: 0px;
                                    background-color: rgba(28, 28, 28, 0.8);
                                    margin-top: 16px;
                                    border-radius: 50%;
                                    color: #fff;
                                    font-size: 12px;

                                    &::before {
                                        content: '';
                                        width: 1px;
                                        height: 0px;
                                        position: absolute;
                                        top: -16px;
                                        background-color: rgba(28, 28, 28, 0.8);
                                    }

                                    i {
                                        font-size: 0;
                                    }
                                }
                            }
                        }

                        &:hover {
                            .wallpaperOptions {
                                height: 156px;

                                ul {
                                    li {
                                        width: 36px;
                                        height: 36px;

                                        &:nth-child(1) {
                                            transition: all 100ms ease-in-out 300ms;

                                            &::before {
                                                height: 16px;
                                                transition: height 100ms linear 200ms;
                                            }

                                            i {
                                                font-size: 16px;
                                                transition: font-size 0ms linear 400ms;
                                            }
                                        }

                                        &:nth-child(2) {
                                            transition: all 100ms ease-in-out 500ms;

                                            &::before {
                                                height: 16px;
                                                transition: height 100ms linear 400ms;
                                            }

                                            i {
                                                font-size: 16px;
                                                transition: font-size 0ms linear 600ms;
                                            }
                                        }

                                        &:nth-child(3) {
                                            transition: all 100ms ease-in-out 700ms;

                                            &::before {
                                                height: 16px;
                                                transition: height 100ms linear 600ms;
                                            }

                                            i {
                                                font-size: 16px;
                                                transition: font-size 0ms linear 900ms;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    &.wallpaper-card2 {
                        position: relative;

                        .wallpaperOptions {
                            position: absolute;
                            top: 0px;

                            ul {
                                position: relative;
                                width: 36px;
                                height: 36px;


                                li {
                                    position: absolute;
                                    top: 50%;
                                    left: 50%;
                                    translate: -50% -50%;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    width: 0px;
                                    height: 0px;
                                    background-color: rgba(28, 28, 28, 0.8);
                                    border-radius: 50%;
                                    color: #fff;
                                    font-size: 12px;
                                    z-index: 9;

                                    i {
                                        font-size: 0px;
                                    }
                                }
                            }
                        }

                        &:hover {
                            .wallpaperOptions {
                                ul {

                                    &::after {
                                        position: absolute;
                                        top: 50%;
                                        left: 50%;
                                        transform: translate(-50%, -50%);
                                        content: '';
                                        width: 152px;
                                        height: 152px;
                                        border-radius: 50%;
                                    }

                                    li {
                                        transition: all 300ms linear 200ms;

                                        i {
                                            position: relative;
                                            font-size: 16px;
                                            transition-delay: 500ms;
                                        }


                                        &:nth-child(1) {
                                            width: 36px;
                                            height: 36px;
                                            transform: translate(-58px);
                                        }

                                        &:nth-child(2) {
                                            width: 36px;
                                            height: 36px;
                                            transform: translate(-58px) rotate(60deg);
                                            transform-origin: 76px;

                                            i {
                                                rotate: -60deg;
                                            }
                                        }

                                        &:nth-child(3) {
                                            width: 36px;
                                            height: 36px;
                                            transform: translate(-58px) rotate(-60deg);
                                            transform-origin: 76px;

                                            i {
                                                rotate: 60deg;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>

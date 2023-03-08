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
            <MenuCards :imgUrl="imgUrl" @updateImgUrl="updateImgUrl" />
        </div>
        <div class="home-billboard" :style="{ height: isOpen ? '216px' : '260px' }">
            <div class="recommend">
                <div v-for="recommend in homeBillboard.recommendList" :key="recommend.id">
                    <img v-lazy="recommend.url" :title="recommend.title">
                    <span>{{ recommend.title }}</span>
                </div>
            </div>
            <div class="banner">
                <el-carousel :interval="3000" type="card" :height="isOpen ? '189px' : '233px'">
                    <el-carousel-item v-for="banner in homeBillboard.bannerList" :key="banner.id">
                        <div class="banner-box">
                            <img v-lazy="banner.url" :title="banner.title">
                            <span>{{ banner.title }}</span>
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="ranking">
                <div class="ranking-top">
                    <div class="title">
                        <i class="title-icon">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-wangzhangaofang"></use>
                            </svg>
                        </i>
                        <span>网站建设日志</span>
                    </div>
                    <div class="action">
                        <i class="el-icon-sort" @click="reverse = !reverse"></i>
                        <i class="el-icon-more-outline" @click="$router.push('/course')"></i>
                    </div>
                </div>
                <div class="timeline">
                    <el-timeline :reverse="reverse">
                        <el-timeline-item v-for="(commit, index) in timelineList" :key="index" color="rgb(11, 189, 135)"
                            size="normal" :timestamp="utctobeijing(commit.date)">
                            <span class="title">{{ commit.title }}</span>
                            <br>
                            <span class="content" v-for="(content, index) in commit.contentList" :key="index">{{ content
                            }} <br></span>
                        </el-timeline-item>
                    </el-timeline>
                </div>
            </div>
        </div>
        <!-- <div class="loading">
            <Loader />
        </div> -->
    </div>
</template>

<script>
import SearchBox from '@/views/Home/SearchBox'
import MenuCards from '@/views/Home/MenuCards'
import Clock from '@/views/Home/Clock'
import LeftNav from '@/components/LeftNav'
import Loader from '@/components/Loader'
import { throttle } from 'lodash'
import { mapState } from 'vuex'
import GitHubClient from '@/utils/githubClient'
import utctobeijing from '@/utils/utc_to_beijing';


export default {
    name: 'Home',
    props: ['isOpen'],
    components: { SearchBox, MenuCards, Clock, LeftNav, Loader },
    data() {
        return {
            hitokoto: '',
            // 一言刷新图标旋转
            yiyanIconRotate: 0,
            // 背景图片url
            imgUrl: '',
            transition: '',
            timelineList: [],
            reverse: false
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
        // 处理建站日志
        getGithubCommit() {
            GitHubClient.get('/repos/Chuang0516/CreateCoder/commits', {
                nprogress: true
            })
                .then(data => {
                    data.forEach(item => {
                        let date = item.commit.committer.date
                        let message = item.commit.message.split('-')
                        let title = message[0]
                        let contentList = message.slice(1)
                        // 存在强迫症异常Commit信息，跳出本次循环
                        if (message[0].includes('Merge branch')) {
                            return console.warn(`已过滤异常Commit信息：${message[0]}`)
                        }
                        let timeLine = { date, title, contentList }
                        this.timelineList.push(timeLine)
                    })
                })

        },
        // 转为北京时间
        utctobeijing,
        // 初始化
        init() {
            const imgUrl = localStorage.getItem('imgUrl')
            // 本地有存储壁纸
            if (imgUrl != null) {
                this.imgUrl = imgUrl
            }
        }
    },
    computed: {
        // 获取仓库中轮播图数据
        ...mapState({ homeBillboard: state => state.homeBillboard })
    },
    mounted() {
        this.createWether()
        this.init()
        this.getyiyan()
        this.$store.dispatch('getHomeNav')
        this.$store.dispatch('getHomeBanner')
        this.getGithubCommit()
    }
}
</script>

<style lang="less" scoped>
.home {
    height: 1200px;
    overflow: hidden;
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
        background: radial-gradient(180% 100% at top center, #48466d 20%, #3d84a8 60%, #46cdcf 85%, #f5f6f9);

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
    }

    .home-billboard {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 216px;
        margin: -36px 10px 0 10px;
        transition: all 300ms ease;

        .recommend {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            width: 22%;
            height: 100%;
            z-index: 3;

            div {
                position: relative;
                width: 100%;
                height: 48%;
                border-radius: 18px;
                overflow: hidden;
                cursor: pointer;

                &:hover {
                    transform: scale(1.05);
                    transition: all 100ms linear;
                }

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;

                    // &:hover {
                    //     transform: scale(1.1);
                    //     transition: all 100ms ease-in;
                    // }
                }

                span {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 26px;
                    line-height: 26px;
                    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
                    color: #fff;
                    text-align: center;
                    font-size: 14px;
                    user-select: none;
                }
            }
        }

        .banner {
            width: 55%;
            height: 100%;
            margin: 0 10px;

            .banner-box {
                position: relative;
                width: 100%;
                height: 100%;
                border-radius: 20px;
                overflow: hidden;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    -webkit-user-drag: none;
                }

                span {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 32px;
                    line-height: 32px;
                    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0));
                    color: #fff;
                    text-align: center;
                    font-size: 16px;
                    user-select: none;
                }
            }
        }

        .ranking {
            display: flex;
            flex-direction: column;
            z-index: 9;
            width: 23%;
            height: 100%;
            background-color: #ffffff;
            border-radius: 10px;
            overflow: hidden;

            .ranking-top {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                height: 30px;
                background-color: #efefef;

                .title {
                    display: flex;
                    flex-direction: row;

                    .title-icon {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 30px;
                        height: 30px;

                        .icon {
                            width: 22px;
                            height: 22px;
                        }
                    }

                    span {
                        line-height: 30px;
                        font-size: 15px;
                        color: #333;
                    }
                }

                .action {
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    width: 60px;
                    height: 30px;

                    i {
                        width: 24px;
                        height: 24px;
                        cursor: pointer;
                        text-align: center;
                        line-height: 22px;

                        &:hover {
                            color: #3d84a8;
                        }
                    }
                }
            }

            .timeline {
                flex: 1;
                overflow-y: scroll;
                padding: 10px;
                user-select: none;
                line-height: 20px;
                cursor: pointer;

                span.title {
                    margin-bottom: 5px;
                }

                span.content {
                    color: #a6a6a6;
                    font-size: 12px;
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

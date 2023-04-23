<template>
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
                    <el-timeline-item v-for="(commit, index) in timelineList" :key="index" color="#2681C2" size="normal"
                        :timestamp="utctobeijing(commit.date)">
                        <span class="title">{{ commit.title }}</span>
                        <br>
                        <span class="content" v-for="(content, index) in commit.contentList" :key="index">{{ content
                        }} <br></span>
                    </el-timeline-item>
                </el-timeline>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import GitHubClient from '@/utils/githubClient'
import utctobeijing from '@/utils/utc_to_beijing'

export default {
    name: 'Billboard',
    props: ['isOpen'],
    data() {
        return {
            timelineList: [],
            reverse: false,
        }
    },
    computed: {
        // 获取仓库中轮播图数据
        ...mapState({ homeBillboard: (state) => state.home.homeBillboard })
    },
    methods: {
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
    },
    created() {
        this.$store.dispatch('getHomeBanner')
        this.getGithubCommit()
    }
}
</script>

<style scoped lang="less">
.home-billboard {
    width: calc(100% - 20px);
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 216px;
    transition: all 300ms ease;

    .recommend {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 22%;
        height: 100%;
        z-index: 1;

        div {
            position: relative;
            width: 100%;
            height: 48%;
            border-radius: 18px;
            overflow: hidden;
            cursor: pointer;
            transition: all 260ms ease;

            &:hover {
                transform: scale(1.05);
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
        z-index: 1;

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
            box-shadow: 0 1px 6px 1px #666;
            z-index: 9;

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
                        width: 20px;
                        height: 20px;
                    }
                }

                span {
                    line-height: 30px;
                    font-size: 16px;
                    color: #000;
                }
            }

            .action {
                display: flex;
                justify-content: space-around;
                align-items: center;
                width: 52px;
                height: 30px;
                margin-right: 5px;

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
            line-height: 18px;
            cursor: pointer;

            .el-timeline-item {
                padding-bottom: 10px;
            }

            span.title {
                margin-bottom: 5px;
                font-size: 13px;
            }

            span.content {
                color: #a6a6a6;
                font-size: 12px;
            }
        }
    }
}
</style>

<template>
    <div class="menu-cards">
        <ul>
            <li @click="changeWallpaper" class="wallpaper-card">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-zhuti"></use>
                </svg>
                <span>随机壁纸</span>
                <div class="wallpaperOptions">
                    <ul>
                        <el-tooltip class="item" effect="dark" :content="lockTip" placement="left">
                            <li class="lock" @click.stop="lockWallpaper">
                                <i :class="lockIcon"></i>
                            </li>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="更多" placement="left">
                            <li class="more" @click.stop>
                                <i class="el-icon-more"></i>
                            </li>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="分类" placement="left">
                            <li class="classify" @click.stop="classifyHandler" v-popover:popover>
                                <i class="el-icon-menu"></i>
                                <ul class="classifyList" v-show="classifyShow">
                                    <li v-for="(classify, index) in classifyList">{{ classify.name }}</li>
                                </ul>
                            </li>
                        </el-tooltip>
                    </ul>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'MenuCards',
    props: ['imgUrl'],
    data() {
        return {
            // 壁纸是否锁定
            imgLock: false,
            // 锁定壁纸的图标
            lockIcon: 'el-icon-unlock',
            // 锁定壁纸的提示
            lockTip: '锁定',
            // 壁纸分类列表
            classifyShow: false,
            classifyList: []
        }
    },
    methods: {
        // 换壁纸
        changeWallpaper() {
            if (this.imgLock) {
                this.$message({
                    message: '壁纸已锁定，请先解锁',
                    type: 'warning',
                    center: true
                })
            } else {
                fetch('https://bing.img.run/rand.php')
                    .then(img => {
                        this.$emit('updateImgUrl', img.url)
                    })
            }
        },
        // 处理锁定壁纸
        lockWallpaper() {
            if (this.imgUrl == '') {
                this.$message({
                    message: '你还没有换壁纸哦',
                    type: 'warning',
                    center: true
                })
            } else {
                this.imgLock = !this.imgLock
                let lockIcon = ''
                let lockTip = ''
                if (this.imgLock) {
                    lockIcon = 'el-icon-lock'
                    lockTip = '解锁'
                    this.$message({
                        message: '壁纸已锁定',
                        type: 'success',
                        center: true
                    })
                    localStorage.setItem('imgUrl', this.imgUrl)
                } else {
                    lockIcon = 'el-icon-unlock'
                    lockTip = '锁定'
                    this.$message({
                        message: '壁纸已解锁',
                        type: 'success',
                        center: true
                    })
                    localStorage.removeItem('imgUrl')
                }
                this.lockIcon = lockIcon
                this.lockTip = lockTip
            }
        },
        // 初始化
        init() {
            const imgUrl = localStorage.getItem('imgUrl')
            // 本地有存储壁纸，说明已经锁定
            if (imgUrl != null) {
                this.lockIcon = 'el-icon-lock'
                this.lockTip = '解锁'
                this.imgLock = true
            }
        },
        // 壁纸分类
        classifyHandler() {
            this.classifyShow = !this.classifyShow
            fetch('http://wallpaper.apc.360.cn/index.php?c=WallPaperAndroid&a=getAllCategories')
                .then(res => res.json())
                .then(res => {
                    this.classifyList = res.data
                })
        }
    },
    mounted() {
        this.init()
    }
}
</script>

<style lang="less" scoped>
.menu-cards {
    position: absolute;
    right: 0px;
    top: 72px;
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
            width: 96px;
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
                transform: translateX(-60px);
            }

            &.backup {
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

            &.wallpaper-card {
                position: relative;
                z-index: 999;

                .wallpaperOptions {
                    position: absolute;
                    top: 0px;

                    >ul {
                        position: relative;
                        width: 36px;
                        height: 36px;


                        >li {
                            position: absolute;
                            transform: translate(-50%, -50%);
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
                        >ul {

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

                            >li {
                                transition: all 300ms linear 200ms;

                                i {
                                    position: relative;
                                    font-size: 16px;
                                    transition-delay: 500ms;
                                }


                                &.lock {
                                    width: 36px;
                                    height: 36px;
                                    transform: translate(-58px);
                                }

                                &.more {
                                    width: 36px;
                                    height: 36px;
                                    transform: translate(-58px) rotate(60deg);
                                    transform-origin: 76px;

                                    i {
                                        transform: rotate(-60deg);
                                    }
                                }

                                &.classify {
                                    position: relative;
                                    width: 36px;
                                    height: 36px;
                                    transform: translate(-58px) rotate(-60deg);
                                    transform-origin: 76px;

                                    i {
                                        transform: rotate(60deg);
                                    }

                                    .classifyList {
                                        position: absolute;
                                        top: 36px;
                                        left: 50%;
                                        width: 86px;
                                        background-color: rgba(28, 28, 28, 0.8);
                                        transform: translate(-50%) rotate(60deg);
                                        transform-origin: 43px -18px;

                                        li {
                                            width: 86px;
                                            height: 20px;
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

<template>
    <div class="search-box">
        <div class="search-type">
            <ul class="type-menu" :style="{ '--navigationLeft': `${(currentIndex * 20) + 10}%` }">
                <li class="type-item" :class="{ active: currentIndex == index }"
                    v-for="(menuItem, index) in searchTypeList" :key="index" @click="typeHandler(index)">
                    <span>{{ menuItem.name }}</span>
                </li>
                <li ref="navigationBar" class="navigation-bar"></li>
            </ul>
        </div>
        <form>
            <input type="text" @keyup.enter="toSearch(currentIndex, currentOption)" v-model="searchInfo"
                :placeholder="searchTypeList[currentIndex].type[currentOption] || searchTypeList[currentIndex].name">
            <i class="el-icon-search" @click="toSearch(currentIndex, currentOption)"></i>
        </form>
        <div class="search-options">
            <ul>
                <li v-for="(option, index) in searchTypeList[currentIndex].type" :key="index"
                    :class="{ 'active': currentOption == index }" @click="currentOption = index">
                    <i class="el-icon-caret-bottom currentOption-icon" v-show="currentOption == index"></i>
                    <span>{{ option }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SearchBox',
    data() {
        return {
            isdown: true,
            searchTypeList: [
                {
                    name: '站内',
                    icon: require('@/assets/icons/home_icon.png'),
                    type: []
                },
                {
                    name: '搜索引擎',
                    icon: '',
                    type: ['百度', '搜狗', 'Google', 'Bing']
                },
                {
                    name: '待开发',
                    icon: '',
                    type: []
                },
                {
                    name: '待开发',
                    icon: '',
                    type: []
                },
                {
                    name: '待开发',
                    icon: '',
                    type: []
                },
            ],
            currentIndex: 0,
            currentOption: 0,
            searchInfo: ''
        }
    },
    methods: {
        typeHandler(index) {
            this.step = this.currentIndex - index
            this.currentIndex = index
        },
        // 搜索
        toSearch(currentIndex, currentOption) {
            if (this.searchInfo == '') {
                this.$message({
                    message: '你还没输入内容哦~',
                    type: 'warning',
                    center: true
                })
            } else {
                if (currentIndex == 1) {
                    if (currentOption == 0) window.open(`https://www.baidu.com/s?wd=${this.searchInfo}`)
                    if (currentOption == 1) window.open(`https://www.sogou.com/web?query=${this.searchInfo}`)
                    if (currentOption == 2) window.open(`https://www.google.com/search?q=${this.searchInfo}`)
                    if (currentOption == 3) window.open(`https://cn.bing.com/search?q=${this.searchInfo}`)
                }
            }
        }
    },
    watch: {
        currentIndex() {
            let barStyle = this.$refs.navigationBar.style
            barStyle.left = `${(this.currentIndex * 20) + 10}% `
            barStyle.transition = `left ${(Math.abs(this.step)) * 150}ms ease-in`
        }
    }
}
</script>

<style lang="less" scoped>
.search-box {
    display: flex;
    flex-direction: column;
    width: 72%;
    align-items: center;


    .search-type {
        width: 80%;
        height: 46px;
        display: flex;
        margin-bottom: 10px;

        .type-menu {
            position: relative;
            display: flex;
            align-items: center;
            width: 100%;
            height: 100%;

            .navigation-bar {
                position: absolute;
                bottom: 6px;
                left: var(--navigationLeft);
                transform: translateX(-50%);
                display: block;
                width: 32px;
                height: 3px;
                background-color: #eee;
                border-radius: 1.5px;
            }

            .type-item {
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                flex: 1;
                height: 100%;
                color: #fff;
                opacity: 0.6;
                font-size: 16px;
                cursor: pointer;
                user-select: none;

                .icon {
                    width: 22px;
                    height: 22px;
                }

                span {
                    color: var(--color);
                }

                &.active {
                    position: relative;
                    opacity: 1;
                }

                &:hover {
                    position: relative;
                    opacity: 1;

                    &:not(.active):after {
                        position: absolute;
                        bottom: 5px;
                        content: '';
                        width: 4px;
                        height: 4px;
                        border-radius: 50%;
                        background-color: #fff;
                    }
                }
            }
        }
    }

    form {
        display: flex;
        align-items: center;
        width: 100%;
        height: 52px;
        background-color: rgba(28, 28, 28, 0.6);
        border-radius: 26px;
        padding: 0 26px;

        input {
            flex: 1;
            background-color: transparent;
            border: none;
            outline: none;
            color: #eee;
            height: 100%;
            font-size: 18px;

            &::-webkit-input-placeholder {
                color: #e9e7ef80;
            }
        }

        i {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 26px;
            height: 26px;
            color: #eee;
            font-size: 26px;
            cursor: pointer;
        }
    }

    .search-options {
        width: 50%;
        height: 42px;

        ul {
            display: flex;
            justify-content: space-around;
            align-items: center;
            color: #00000090;
            height: 100%;
            width: 100%;

            li {
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                align-items: center;
                position: relative;
                cursor: pointer;
                height: 100%;
                font-size: 16px;

                i {
                    position: absolute;
                    top: -8px;
                    font-size: 26px;
                    color: rgba(28, 28, 28, 0.6);
                }

                &.active {
                    color: #fff;
                }
            }
        }
    }
}
</style>

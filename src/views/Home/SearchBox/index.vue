<template>
    <div class="search-box" :style="{ '--height': `${keywordList.length * 26}px` }">
        <div class="search-type">
            <ul class="type-menu"
                :style="{ '--navigationLeft': `${(currentIndex * 2 + 1) * 50 / searchTypeList.length}%` }">
                <li class="type-item" :class="{ active: currentIndex == index }" v-for="(menuItem, index) in searchTypeList"
                    :key="index" @click="typeHandler(index)">
                    <span>{{ menuItem.name }}</span>
                </li>
                <li ref="navigationBar" class="navigation-bar"></li>
            </ul>
        </div>
        <form>
            <input type="text" @keyup.enter="toSearch(currentIndex, currentOption)" v-model="searchInfo"
                @input="keywordIdeas(searchInfo)" @blur="isBlur = false" @focus="isBlur = true"
                :placeholder="searchTypeList[currentIndex].type.length ? searchTypeList[currentIndex].type[currentOption].name : searchTypeList[currentIndex].name">
            <i class="el-icon-search" @click="toSearch(currentIndex, currentOption)"></i>
        </form>
        <div class="search-options" :style="{ '--optionsWidth': `${searchTypeList[currentIndex].type.length * 18}%` }">
            <ul>
                <li v-for="(option, index) in searchTypeList[currentIndex].type" :key="index"
                    :class="{ 'active': currentOption == index }" @click="currentOption = index">
                    <i class="el-icon-caret-bottom currentOption-icon" v-show="currentOption == index"></i>
                    <div class="option">
                        <i class="option-icon">
                            <svg class="icon" aria-hidden="true">
                                <use :xlink:href="option.icon"></use>
                            </svg>
                        </i>
                        <span>{{ option.name }}</span>
                    </div>
                </li>
            </ul>
        </div>
        <Transition name="keywordIdeas">
            <div class="keywordIdeas-container" v-show="keywordList.length != 0 && searchInfo != '' && isBlur">
                <ul>
                    <li v-for="(keywordIdea, index) in keywordList" @mouseover="updateSearchInfo(keywordIdea)"
                        @click="chooseKeyword(currentIndex, currentOption)">{{ keywordIdea }}</li>
                </ul>
            </div>
        </Transition>
    </div>
</template>

<script>
import { jsonp } from 'vue-jsonp'
export default {
    name: 'SearchBox',
    data() {
        return {
            searchTypeList: [
                {
                    name: '站内',
                    type: [
                        { name: '首页', icon: '#icon-shouye' },
                        { name: '码上API', icon: '#icon-API1' },
                        { name: '码上编程', icon: '#icon-biancheng' },
                        { name: '待开发', icon: '' },
                        { name: '开发日志', icon: '#icon-fuwurizhi' }
                    ]
                },
                {
                    name: '搜索引擎',
                    icon: '',
                    type: [
                        {
                            name: '百度',
                            icon: '#icon-icon_baidulogo'
                        },
                        {
                            name: '搜狗',
                            icon: '#icon-sougoushuru'
                        },
                        {
                            name: 'Google',
                            icon: '#icon-google'
                        },
                        {
                            name: 'Bing',
                            icon: '#icon-bing'
                        }
                    ]
                },
                {
                    name: '待开发',
                    icon: '',
                    type: []
                }
            ],
            currentIndex: 0,
            currentOption: 0,
            // 搜索框输入内容
            searchInfo: '',
            // 关键词提示
            keywordList: [],
            // 是否获得焦点
            isBlur: false
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
        },
        // 搜索框关键词提示
        keywordIdeas(searchInfo) {
            console.log(searchInfo);
            if (searchInfo != '' && this.currentIndex != 0) {
                jsonp(`https://suggestion.baidu.com/su`, {
                    wd: searchInfo,
                    p: 3,
                    callbackQuery: 'cb',
                })
                    .then((res) => {
                        this.keywordList = res.s
                    })
                    .catch((error) => {
                        console.error(error);
                    })
            }
        },
        // 鼠标悬浮更新 input 值
        updateSearchInfo(keywordIdea) {
            this.searchInfo = keywordIdea
        },
        // 选择关键字提示
        chooseKeyword(currentIndex, currentOption) {
            this.toSearch(currentIndex, currentOption)
        }
    },
    watch: {
        currentIndex() {
            let barStyle = this.$refs.navigationBar.style
            barStyle.left = `${(this.currentIndex * 2 + 1) * 50 / this.searchTypeList.length}% `
            barStyle.transition = `left ${(Math.abs(this.step)) * 150}ms ease-in`
        }
    }
}
</script>

<style lang="less" scoped>
.search-box {
    display: flex;
    flex-direction: column;
    width: 62%;
    align-items: center;
    position: relative;


    .search-type {
        width: 80%;
        height: 42px;
        display: flex;
        margin-bottom: 5px;

        .type-menu {
            position: relative;
            display: flex;
            align-items: center;
            width: 100%;
            height: 100%;

            .navigation-bar {
                position: absolute;
                bottom: 4px;
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
        width: var(--optionsWidth);
        height: 36px;
        margin-bottom: 10px;

        ul {
            display: flex;
            justify-content: space-around;
            align-items: center;
            color: #ffffff90;
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
                user-select: none;

                &>i {
                    position: absolute;
                    top: -10.5px;
                    font-size: 28px;
                    color: rgba(28, 28, 28, 0.6);
                }

                &.active {
                    color: #fff;
                }

                .option {
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .option-icon {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-right: 5px;

                        svg {
                            width: 20px;
                            height: 20px;
                        }
                    }
                }
            }
        }
    }

    .keywordIdeas-enter,
    .keywordIdeas-leave-to {
        height: 0px;
    }

    .keywordIdeas-enter-active,
    .keywordIdeas-leave-active {
        transition: height 500ms ease-in;
    }

    .keywordIdeas-enter-to,
    .keywordIdeas-leave {
        height: calc(var(--height));
    }

    .keywordIdeas-container {
        position: absolute;
        top: 100%;
        width: 72%;
        background-color: #fff;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 2px 8px #999;

        ul {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 10px;
            box-sizing: border-box;

            li {
                display: flex;
                align-items: center;
                width: 100%;
                height: 26px;
                cursor: pointer;
                border-radius: 10px;
                padding-left: 10px;
                box-sizing: border-box;
                font-size: 14px;

                &:hover {
                    background-color: #eee;
                    transition: all 300ms linear;
                }
            }
        }
    }

}
</style>

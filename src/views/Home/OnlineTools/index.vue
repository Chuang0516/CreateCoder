<template>
    <div class="onlineTools">
        <div class="toolsBox" v-for="tools in toolsList" :key="tools.id" :ref="`tools_${tools.id}`">
            <div class="classify">
                <i class="icon"></i>
                <span class="name">{{ tools.classify }}</span>
            </div>
            <div class="tools">
                <div class="tool"
                    :style="{ '--toolHeight': isOpen ? '92px' : '102px', '--toolIconSize': isOpen ? '62px' : '72px' }"
                    v-for="tool in tools.toolList" :key="tool.id" :title="tool.name" @click="toTool(tool.id)">
                    <div class="toolIcon">
                    </div>
                    <div class="toolName">
                        <span class="name">{{ tool.name }}</span>
                        <span class="introduce"> {{ tool.introduce }} </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'OnlineTools',
    props: ['isOpen'],
    data() {
        return {
            toolsList: [
                {
                    id: 0,
                    classify: '通用',
                    toolList: [
                        { id: 11, name: '', introduce: '', icon: '' },
                        { id: 12, name: '', introduce: '', icon: '' },
                        { id: 13, name: '', introduce: '', icon: '' },
                        { id: 14, name: '', introduce: '', icon: '' },
                        { id: 15, name: '', introduce: '', icon: '' },
                        { id: 16, name: '', introduce: '', icon: '' },
                        { id: 17, name: '', introduce: '', icon: '' }
                    ]
                },
                {
                    id: 1,
                    classify: '导航',
                    toolList: [
                        { id: 21, name: '', icon: '' }
                    ]
                }, {
                    id: 2,
                    classify: '数据录入',
                    toolList: [
                        { id: 21, name: '', icon: '' }
                    ]
                }, {
                    id: 3,
                    classify: '数据展示',
                    toolList: [
                        { id: 21, name: '', icon: '' }
                    ]
                }, {
                    id: 4,
                    classify: '反馈',
                    toolList: [
                        { id: 21, name: '', icon: '' }
                    ]
                }, {
                    id: 5,
                    classify: '其他',
                    toolList: [
                        { id: 21, name: '', icon: '' }
                    ]
                }
            ],
            toolIconSize: '56px'
        }
    },
    methods: {
        toTool(id) {
            this.$router.push({
                name: 'tools',
                query: {
                    id
                }
            })
        }
    },
    mounted() {
        this.$bus.$on('leftNavClick', (id) => {
            console.log(id)
            this.$refs[`tools_${id}`][0].scrollIntoView({ behavior: "smooth", block: "start" })
        })
    }
}
</script>

<style scoped lang="less">
.onlineTools {
    width: calc(100% - 20px);

    .toolsBox {
        width: 100%;
        margin-top: 32px;
        background-color: #F7F9FE;
        padding: 15px 10px;
        box-sizing: border-box;
        border-radius: 16px;


        .classify {
            width: 100%;
            margin-bottom: 15px;

            .name {
                font-size: 25px;
                color: #34495e;
                font-weight: bolder;
            }
        }

        .tools {
            // 网格布局
            display: grid;
            // 设置有 5 列
            grid-template-columns: 1fr 1fr 1fr 1fr;
            // 网格间距
            grid-gap: 10px;
            width: 100%;

            .tool {
                display: flex;
                height: var(--toolHeight);
                background-color: #fff;
                border-radius: 12px;
                cursor: pointer;
                transition: all 200ms ease;
                user-select: none;


                &:hover {
                    background-color: #3490de;

                    .toolIcon {
                        width: 0px;
                        height: 0px;
                    }

                    .toolName {

                        .name {
                            color: #fff;
                        }

                        .introduce {
                            color: rgba(255, 255, 255, .8);
                        }

                    }
                }

                .toolIcon {
                    width: var(--toolIconSize);
                    height: var(--toolIconSize);
                    background-color: #F7F9FE;
                    margin: calc((var(--toolHeight) - var(--toolIconSize)) / 2) 16px;
                    margin-right: 0;
                    border-radius: 50%;
                    transition: all 399ms ease;
                }

                .toolName {
                    flex: 1;
                    width: 0;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    height: calc(var(--toolIconSize) - 6px);
                    margin: 0 12px;
                    font-weight: bold;
                    align-self: center;
                    transition: height 200ms ease;

                    .name {
                        width: 100%;
                        font-size: 20px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }

                    .introduce {
                        font-size: 16px;
                    }
                }
            }
        }
    }
}
</style>

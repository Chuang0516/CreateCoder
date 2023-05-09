<template>
    <div class="userInfoBox" :style="{ '--boxHeight': boxHeight }">
        <div class="user">
            <Avatar @setBoxHeight="setBoxHeight" />
            <div class="user-r">
                <div class="user-r-t">
                    <div class="nickName">{{ currentUser.nickName }}</div>
                    <div class="userId">
                        ID: {{ currentUser.userId }}
                    </div>
                    <div class="gender">
                        <svg aria-hidden="true">
                            <use
                                :xlink:href="gender == '2' ? '#icon-xingbie' : gender == 1 ? '#icon-xingbienv' : '#icon-xingbienan'">
                            </use>
                        </svg>
                    </div>
                    <div class="identityBox">
                        <div class="identity" v-for="(identity, index) in currentUser.identityList" :key="index">
                            <div class="icon">
                                <svg aria-hidden="true">
                                    <use :xlink:href="identity.icon"></use>
                                </svg>
                            </div>
                            <div class="type">{{ identity.name }}</div>
                        </div>
                    </div>
                </div>
                <div class="userData">
                    <div class="followers">
                        <strong>{{ currentUser.followers?.length }}</strong>
                        <span>粉丝</span>
                    </div>
                    <div class="follow">
                        <strong>{{ currentUser.follow?.length }}</strong>
                        <span>关注</span>
                    </div>
                    <div class="collection">
                        <strong>{{ currentUser.collection?.length }}</strong>
                        <span>收藏</span>
                    </div>
                    <div class="dev">
                        <strong>{{ currentUser.devList?.length }}</strong>
                        <span>工具</span>
                    </div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div class="introduction">
                    个人简介：{{ currentUser.introduce ? currentUser.introduce : '暂无个人简介' }}
                </div>
                <div class="ip">
                    IP属地：{{ ipLocal || '未知' }}
                </div>
                <div class="createTime" v-show="showMoreInfo">
                    注册时间：{{ createTime }}
                </div>
                <div class="more" @click="toShowMoreInfo">
                    <span>{{ showMoreInfo ? '收起详细资料' : '查看详细资料' }}</span>
                    <i class="el-icon-d-arrow-right" :style="{ '--rotate': showMoreInfo ? '-90deg' : '90deg' }"></i>
                </div>
            </div>
        </div>
        <div class="setBtn">
            <div class="setUserInfoBtn">
                <i class="el-icon-edit"></i>
                <span>编辑资料</span>
            </div>
            <div class="setSystem">
                <i class="el-icon-setting"></i>
                <span>设置</span>
            </div>
        </div>
    </div>
</template>

<script>
import Avatar from '@/views/PersonalCenter/UserInfo/Avatar'
import { mapGetters, mapState } from 'vuex'

export default {
    name: 'UserInfo',
    components: { Avatar },
    computed: {
        ...mapState({ currentUser: (state) => state.user.currentUser }),
        ...mapGetters(['gender', 'ipLocal', 'createTime'])
    },
    data() {
        return {
            boxHeight: '239px',
            showMoreInfo: false
        }
    },
    watch: {
        showMoreInfo(newVal) {
            this.boxHeight = newVal ? '278px' : '239px'
        }
    },
    methods: {
        toShowMoreInfo() {
            const { showMoreInfo } = this
            this.showMoreInfo = !showMoreInfo
        },
        setBoxHeight(boxHeight) {
            this.boxHeight = boxHeight
        }
    }
}
</script>

<style scoped lang="less">
.userInfoBox {
    display: grid;
    grid-template-columns: 2fr 1fr;
    position: relative;
    width: 90%;
    height: var(--boxHeight);
    background-color: #fff;
    border-radius: 16px;
    box-shadow: 0 0 12px 1px #aaaaaa;
    padding: 16px;
    box-sizing: border-box;
    // transition: height 100ms ease-in;

    .user {
        display: flex;
        justify-content: space-between;

        .user-r {
            flex: 1;
            display: flex;
            flex-direction: column;
            margin-left: 16px;
            font-size: 16px;

            .user-r-t {
                display: flex;
                align-items: center;
                height: 36px;

                .nickName {
                    font-size: 22px;
                    font-weight: bold;
                }

                // 用户ID
                .userId {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 22px;
                    width: 99px;
                    margin-left: 6px;
                    background: #e9e7ef;
                    padding: 0 3px;
                    font-size: 14px;
                    border-radius: 6px;
                    font-weight: bold;
                    color: #50616d;
                }

                .identityBox {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    height: 36px;

                    .identity {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        height: 22px;
                        border-radius: 11px;
                        background: #e0eafc;
                        /* fallback for old browsers */
                        background: -webkit-linear-gradient(to right, rgb(224, 234, 252), rgb(207, 222, 243));
                        /* Chrome 10-25, Safari 5.1-6 */
                        background: linear-gradient(to right, rgb(224, 234, 252), rgb(207, 222, 243));
                        /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
                        padding: 0 6px;
                        box-sizing: border-box;
                        margin-left: 6px;

                        .icon {
                            width: 19px;
                            height: 19px;

                            svg {
                                width: 100%;
                                height: 100%;
                            }
                        }

                        .type {
                            height: 22px;
                            line-height: 22px;
                            text-align: center;
                            font-size: 12px;
                            color: #112d4e;
                            margin-left: 6px;
                        }
                    }
                }

                .gender {
                    width: 21px;
                    height: 21px;
                    margin-left: 6px;

                    svg {
                        width: 100%;
                        height: 100%;
                    }
                }

            }

            .userData {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 12px;

                >div {
                    flex: 1;

                    strong {
                        display: inline-block;
                        font-size: 21px;
                        vertical-align: bottom;
                    }

                    span {
                        display: inline-block;
                        font-size: 14px;
                        color: #555;
                        vertical-align: text-bottom;
                        margin-left: 6px;
                    }
                }
            }

            // 个人简介
            .introduction {
                display: flex;
                align-items: end;
                height: 39px;
                color: #333;
            }

            .ip {
                display: flex;
                align-items: end;
                height: 39px;
                color: #333;
            }

            .createTime {
                display: flex;
                align-items: end;
                height: 39px;
                color: #333;
            }

            .more {
                display: flex;
                align-items: end;
                height: 39px;
                color: #666;
                cursor: pointer;
                width: 120px;

                i {
                    margin-left: 2px;
                    transform: rotate(var(--rotate));
                    font-size: 14px;
                }
            }
        }
    }

    .setBtn {
        display: flex;
        justify-content: end;


        .setSystem,
        .setUserInfoBtn {
            display: grid;
            grid-template-columns: auto auto;
            align-items: center;
            justify-content: center;
            grid-gap: 0 3px;
            width: 99px;
            height: 30px;
            border: 1px solid #2980b9;
            color: #fff;
            background-color: #fff;
            color: #333;
            cursor: pointer;
            border-radius: 15px;
            font-size: 14px;
            transition: all 100ms ease-in;
            margin: 6px;

            &:hover {
                border: 1px solid #fff;
                color: #fff;
                background-color: #2980b9;
            }
        }
    }
}
</style>

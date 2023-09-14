<template>
    <div class="userInfoBox" :style="{ '--boxHeight': boxHeight }">
        <div class="userInfo-header">
            <div class="userInfo-header-avatar">
                <Avatar @openAvatar="openAvatar" />
            </div>
            <div class="userInfo-header-info">
                <div class="userInfo-header-info-t">
                    <div class="userInfo-header-info-t-l">
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
                    <div class="userInfo-header-info-setBtn">
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
                <div class="userInfo-header-info-data">
                    <div class="followers">
                        <strong>{{ currentUser.followers?.length }}</strong>
                        <span>粉丝</span>
                        <div></div>
                    </div>
                    <div class="follow">
                        <strong>{{ currentUser.follow?.length }}</strong>
                        <span>关注</span>
                        <div></div>
                    </div>
                    <div class="collection">
                        <strong>{{ currentUser.collection?.length }}</strong>
                        <span>收藏</span>
                        <div></div>
                    </div>
                    <div class="dev">
                        <strong>{{ currentUser.devList?.length }}</strong>
                        <span>工具</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="userInfo-bottom">
            <p :class="{ 'introduction': true, 'omit': showMoreInfo ? false : true }">
                <span>个人简介：</span>
                xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            </p>
            <div class="ip">
                IP属地：{{ ipLocal || '未知' }}
            </div>
            <div class="createTime" v-show="showMoreInfo">
                注册时间：{{ createTime }}
            </div>
            <div class="createTime" v-show="showMoreInfo">
                在线时长：{{ onlineTime }}
            </div>
            <div class="more" @click="toShowMoreInfo">
                <span>{{ showMoreInfo ? '收起详细资料' : '查看详细资料' }}</span>
                <i class="el-icon-d-arrow-right" :style="{ '--rotate': showMoreInfo ? '-90deg' : '90deg' }"></i>
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
        ...mapGetters(['gender', 'ipLocal', 'createTime', 'onlineTime'])
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
        openAvatar(isOpen) {
            const { showMoreInfo } = this
            this.boxHeight = isOpen ? '320px' : showMoreInfo ? '278px' : '239px'

        }
    }
}
</script>

<style scoped lang="less">
.userInfoBox {
    position: relative;
    width: 90%;
    // height: var(--boxHeight);
    background-color: #fff;
    border-radius: 16px;
    box-shadow: 0 0 12px 1px #aaaaaa;
    padding: 0 24px 0 16px;
    box-sizing: border-box;

    .userInfo-header {
        display: flex;
        align-items: center;
        width: 100%;
        height: 90px;
        margin-bottom: 10px;

        .userInfo-header-avatar {
            width: 102px;
            height: 90px;
            align-self: start;
        }

        .userInfo-header-info {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: start;
            height: 100%;
            margin-left: 16px;

            .userInfo-header-info-t {
                display: flex;
                align-items: center;
                margin-top: 16px;

                .userInfo-header-info-t-l {
                    flex: 1;
                    display: flex;
                    align-items: center;

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

                .userInfo-header-info-setBtn {
                    display: flex;
                    justify-content: end;
                    align-self: start;


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
                        margin: 0 6px;

                        &:hover {
                            border: 1px solid #fff;
                            color: #fff;
                            background-color: #2980b9;
                        }
                    }
                }
            }

            .userInfo-header-info-data {
                display: flex;
                justify-content: start;
                align-items: center;
                margin-top: 10px;

                >div {
                    display: flex;
                    justify-content: start;
                    align-items: center;

                    strong {
                        display: inline-block;
                        font-size: 21px;
                        vertical-align: bottom;
                        color: #222;
                    }

                    span {
                        display: inline-block;
                        font-size: 14px;
                        color: #555;
                        vertical-align: text-bottom;
                        margin-left: 6px;
                    }

                    div {
                        width: 1px;
                        height: 16px;
                        background-color: #e8e8e8;
                        margin: 0 16px;
                    }
                }
            }
        }
    }

    .userInfo-bottom {
        margin-left: 118px;
        color: #555666;
        font-size: 14px;

        >div,
        p {
            margin: 16px 0;
        }

        // 个人简介
        .introduction {
            // text-align: justify;
            line-height: 22px;
            word-break: break-all;
            margin-top: 0;

            &.omit {
                height: 22px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }



        .ip {}

        .createTime {}

        .more {
            cursor: pointer;
            margin-bottom: 24px;

            i {
                margin-left: 2px;
                transform: rotate(var(--rotate));
                font-size: 14px;
            }
        }
    }
}
</style>

<template>
    <div class="userAvatar-container" @mouseenter="showInfoHandler" @mouseleave="showInfo = false">
        <div class="userAvatar" @click="toPersonalCenter">
            <div class="avatarBox">
                <div class="rAvatarBox" v-show="avatar.rAvatar" v-html="multiavatar(avatar.rAvatar)"></div>
                <div class="iAvatarBox" v-show="avatar.iAvatar"><img class="iAvatar" :src="`${avatar.iAvatar}`" alt="">
                </div>
            </div>
            <div class="userInfoBox" v-show="showInfo">
                <div class="userInfo">
                    <i class="el-icon-caret-top arrow"></i>
                    <div class="top">
                        <div class="avatarAndNickName" @click="toPersonalCenter">
                            <div class="avatarBox">
                                <div class="rAvatarBox" v-show="avatar.rAvatar" v-html="multiavatar(avatar.rAvatar)"></div>
                                <div class="iAvatarBox" v-show="avatar.iAvatar">
                                    <img class="iAvatar" :src="`${avatar?.iAvatar}`">
                                </div>
                            </div>
                            <span class="nickName">{{ user.nickName }}</span>
                        </div>
                        <div class="logout" @click.stop="logout">退出登录</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import multiavatar from '@multiavatar/multiavatar'

export default {
    name: 'UserAvatar',
    data() {
        return {
            showInfo: false,
        }
    },
    computed: {
        // 用户信息
        ...mapState({ user: state => state.user.currentUser }),
        ...mapGetters(['avatar'])
    },
    methods: {
        multiavatar,
        showInfoHandler() {
            this.showInfo = true
        },
        async logout() {
            const isLogin = await this.$store.dispatch('logout')
            if (isLogin) {
                this.$bus.$emit('loginState', false)
                this.$notify({
                    title: '退出成功',
                    message: '欢迎再次登录码上创新',
                    type: 'success',
                })
            }
        },
        toPersonalCenter() {
            this.$router.push('/mine')
        }
    },
    mounted() {

    }
}
</script>

<style lang="less" scoped>
.userAvatar-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;


    .userAvatar {
        position: relative;
        width: 38px;
        height: 38px;
        cursor: pointer;

        >.avatarBox {
            width: 100%;
            height: 100%;

            .rAvatarBox {
                width: 100%;
                height: 100%;
            }

            .iAvatarBox {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                overflow: hidden;

                .iAvatar {
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .userInfoBox {
            display: flex;
            align-items: flex-end;
            position: absolute;
            top: 47px;
            right: -52px;
            width: 320px;
            height: 264px;

            .userInfo {
                width: 100%;
                height: 260px;
                background-color: #fff;
                box-shadow: 0 0 12px 1px #333;
                border-radius: 10px;

                .arrow {
                    width: 26px;
                    height: 26px;
                    position: absolute;
                    top: -13px;
                    left: 236px;
                    font-size: 26px;
                    color: #fff;
                    text-shadow: 0px -5px 2px #333;
                }

                .top {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    height: 50px;
                    padding: 10px;
                    box-sizing: border-box;

                    .avatarAndNickName {
                        display: flex;
                        align-items: center;

                        >.avatarBox {
                            width: 36px;
                            height: 36px;

                            .rAvatarBox {
                                width: 100%;
                                height: 100%;
                            }

                            .iAvatarBox {
                                width: 100%;
                                height: 100%;
                                border-radius: 50%;
                                overflow: hidden;

                                .iAvatar {
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                        }

                        .nickName {
                            font-size: 16px;
                            margin-left: 6px;
                        }
                    }

                    .logout {

                        &:hover {
                            color: #666;
                        }
                    }
                }
            }
        }

    }
}
</style>

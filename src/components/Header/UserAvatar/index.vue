<template>
    <div class="userAvatar-container" @mouseenter="showInfoHandler" @mouseleave="showInfo = false">
        <div class="userAvatar" :style="{ backgroundImage: `url(${user.avatar})` }">
            <div class="userInfoBox" v-show="showInfo">
                <div class="userInfo">
                    <i class="el-icon-caret-top arrow"></i>
                    <div class="top">
                        <div class="avatarAndNickName">
                            <div class="avatar">
                                <img :src="user.avatar" alt="" />
                            </div>
                            <span class="nickName">{{ user.nickName }}</span>
                        </div>
                        <div class="logout" @click="logout">退出登录</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

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
    },
    methods: {
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
        background-size: 38px 38px;
        cursor: pointer;

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

                        .avatar {
                            width: 36px;
                            height: 36px;

                            img {
                                width: 36px;
                                height: 36px;
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

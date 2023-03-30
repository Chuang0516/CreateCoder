<template>
    <div class="userAvatar-container" @mouseenter="showInfoHandler" @mouseleave="showInfo = false">
        <div class="userAvatar"
            :style="{ backgroundImage: 'url(https://636c-cloudbase-baas-4g1a5g4h6dc9d130-1314033851.tcb.qcloud.la/user/defaultAvatar/defaultAvatar.png?sign=803922815134cb08b66901a44f13ff12&t=1678632521)' }">
            <div class="userInfoBox" v-show="showInfo">
                <div class="userInfo">
                    <i class="el-icon-caret-top arrow"></i>
                    <div class="top">
                        <div class="avatar">
                            <img :src="user.avatarUrl" alt="" />
                        </div>
                        <div class="nickNameAndId">
                            <span class="nickName">{{ user.nickName }}</span>
                            <span>ID:&nbsp;{{ user.id }}</span>
                        </div>
                        <div class=""></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import env from '@/config/login'
import cloudbase from '@cloudbase/js-sdk';
export default {
    name: 'UserAvatar',
    data() {
        return {
            showInfo: false,
            user: {}
        }
    },
    methods: {
        showInfoHandler() {
            this.showInfo = true
            const app = cloudbase.init(env)
            app
                .auth()
                .getCurrenUser()
                .then((user) => {
                    this.user = user
                });
        }
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
            }
        }

    }
}
</style>

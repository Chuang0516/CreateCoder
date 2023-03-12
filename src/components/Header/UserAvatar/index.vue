<template>
    <div class="userAvatar-container" @mouseover="showInfoHandler" @mouseleave="showInfo = false"
        :style="{ backgroundImage: 'url(https://636c-cloudbase-baas-4g1a5g4h6dc9d130-1314033851.tcb.qcloud.la/user/defaultAvatar/defaultAvatar.png?sign=803922815134cb08b66901a44f13ff12&t=1678632521)' }">
        <div class="userInfo" v-show="showInfo">
            <span>邮箱：{{ user.email }}</span>
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
    position: relative;
    width: 38px;
    height: 38px;
    background-size: 38px 38px;
    cursor: pointer;

    .userInfo {
        position: absolute;
        top: 47px;
        right: -30px;
        width: 260px;
        height: 180px;
        background-color: #fff;
    }
}
</style>

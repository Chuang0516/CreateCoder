<template>
    <div class="captchaBox">
        <div class="captchaItem" v-for="index in 6" :key="index">
            <input type="text" maxlength="1" :ref="`captcha${index}`" v-model="captcha[index - 1]" @toFocus="toFocus(index)"
                @input="captchaInput(index)" @keyup.delete="captchaDelete(index)">
        </div>
    </div>
</template>

<script>
import vueThis from '@/main'
import { onlineWS } from '@/service/wsInstance'
export default {
    name: 'CaptchaInput',
    data() {
        return {
            captcha: []
        }
    },
    methods: {
        toFocus(index) {
            // @ts-ignore
            this.$refs[`captcha${index}`][0].focus()
        },
        // 输入一个，光标自动移入下一个输入框
        async captchaInput(index) {
            const { captcha } = this
            const currentCaptcha = captcha[index - 1]
            // 输入的时小写字母且输入的不是中文拼音
            if (/^[a-z]+$/.test(currentCaptcha) && currentCaptcha != undefined) {
                this.captcha[index - 1] = currentCaptcha.toUpperCase()
            }
            if (index > 0 && index < 6 && currentCaptcha) {
                this.toFocus(index + 1)
            } else if (index == 6 && currentCaptcha) {
                this.$refs[`captcha${index}`][0].blur()
                let str = ''
                captcha.forEach((item, index) => {
                    str += item
                })
                const captchaSure = str.toUpperCase()
                try {
                    const isLogin = await vueThis.$store.dispatch('onLogin', { captcha: captchaSure })
                    if (isLogin) {
                        await vueThis.$store.dispatch('getCurrentUser')
                        onlineWS.socket.onmessage = (msg) => {
                            const data = msg.data
                            if (JSON.parse(data).code == 'OFFSITE_LOGIN') {
                                this.$notify({
                                    title: '异地登录',
                                    message: '你的登录验证码可能泄露',
                                    type: 'warning',
                                    duration: 0
                                })
                                vueThis.$store.dispatch('logout')
                                this.$bus.$emit('loginState', false)
                                vueThis.$LoginModal()
                            }
                        }
                        // 登录状态变为 true，关闭登录弹窗
                        this.$bus.$emit('loginState', true)
                        this.$bus.$emit('close', true)
                        // 登录成功
                        vueThis.$notify({
                            title: '登录成功',
                            message: '恭喜你，欢迎使用码上创新！',
                            type: 'success',
                        })

                    } else {
                        vueThis.$notify({
                            title: '登录失败',
                            message: '请检查你的验证码是否正确',
                            type: 'warning'
                        })
                    }
                } catch (error) {
                    // 登录成功
                    vueThis.$notify({
                        title: '登录失败',
                        message: '请检查您的验证码是否正确',
                        type: 'warning',
                    })
                }
            }
        },

        captchaDelete(index) {
            if (index > 1) {
                // 光标移到上一个
                this.toFocus(index - 1)
                // 删除上一个的数字
                // @ts-ignore
                this.$set(this.captcha, index - 2, '')
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.toFocus(1)
        })
    }
}
</script>

<style lang="less" scoped>
.captchaBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 300px;

    .captchaItem {
        width: 36px;
        height: 36px;
        background-color: #e9e7ef;
        overflow: hidden;

        input {
            width: 36px;
            height: 36px;
            outline: none;
            border: none;
            box-sizing: border-box;
            text-align: center;
            font-size: 20px;
            font-weight: bolder;
            padding: 0;
            margin: 0;
            background-color: #e9e7ef;
            color: #065279;
        }

        &:has(input:focus) {
            border: 2px solid #14b379;
            box-shadow: 0 0 3px 1px #14b379;
        }
    }
}
</style>

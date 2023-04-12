<template>
    <div v-if="show" ref="modal" class="loginModal" @mousedown="modalQuit" @mousewheel.prevent>
        <div class="login-container" @mousedown.stop>
            <span class="close" @click="close">
                <i class="el-icon-close"></i>
            </span>
            <div class="logoBox">
                <img src="~@/assets/images/logo.png" alt="">
                <img src="~@/assets/images/logo_text.png" alt="">
            </div>
            <p>已有超过{{ userNum }}名用户加入码上创新</p>
            <div class="emailLogin" v-show="loginType == 'email'">
                <div class="loginBox" v-if="isSignin">
                    <div class="loginInput">
                        <form @submit.prevent>
                            <div class="email input">
                                <input type="email" placeholder="邮箱地址" v-model="email" @blur="emailBlur"
                                    @focus="testResult.email.state = false">
                                <span v-show="showEmailTip" class="tips">
                                    <i :class="emailTip.icon"></i>
                                    {{ emailTip.content }}
                                </span>
                            </div>
                            <div class="password input"
                                :style="{ marginTop: showEmailTip ? '38px' : '28px', transition: showEmailTip ? 'all 160ms ease-in' : 'none' }">
                                <input :type="passwordEyes ? 'password' : 'text'" @blur="passwordBlur"
                                    @input="passwordInput" @focus="passwordFocus" placeholder="密码" v-model="password"
                                    autocomplete>
                                <span class="eyes" v-show="eyesShow" @mousedown="eyesHandler">
                                    <svg class="icon" aria-hidden="true">
                                        <use :xlink:href="passwordEyes ? '#icon-bukejian' : '#icon-kejian'"></use>
                                    </svg>
                                </span>
                                <span v-show="showPasswordTip" class="tips">
                                    <i :class="passwordTip.icon"></i>
                                    {{ passwordTip.content }}
                                </span>
                            </div>
                            <div class="captcha input"
                                :style="{ marginTop: showPasswordTip ? '38px' : '28px', transition: showPasswordTip ? 'all 160ms ease-in' : 'none' }">
                                <input type="text" v-model="code" placeholder="图形验证码" @input="codeFinish" maxlength="4">
                                <span v-show="showCodeTip" class="tips">
                                    <i :class="codeTip.icon"></i>
                                    {{ codeTip.content }}
                                </span>
                                <el-tooltip class="item" effect="dark" content="点击刷新" placement="top">
                                    <div class="codeBox" @click="refreshCode">
                                        <Identify :identifyCode="identifyCode" />
                                    </div>
                                </el-tooltip>
                            </div>
                            <div class="remember"
                                :style="{ marginTop: showCodeTip ? '32px' : '18px', transition: showCodeTip ? 'all 160ms ease-in' : 'none' }">
                                <label for="rememberCheck">
                                    <input id="rememberCheck" type="checkbox">
                                    <span>30天内免登录</span>
                                </label>
                            </div>
                            <div class="loginButton">
                                <button @click="login">登录</button>
                                <button @click="close">取消</button>
                            </div>
                        </form>
                    </div>
                    <div class="choices">
                        <span>
                            没有账号？<a @click="toSignup">注册</a>&nbsp;/&nbsp;<a>忘记密码</a>
                        </span>
                    </div>
                </div>
                <div class="signupBox" v-if="!isSignin">
                    <div class="signupInput">
                        <form @submit.prevent>
                            <div class="email input">
                                <input type="email" placeholder="邮箱地址" v-model="email" @blur="emailBlur"
                                    @focus="testResult.email.state = false">
                                <span v-show="showEmailTip" class="tips">
                                    <i :class="emailTip.icon"></i>
                                    {{ emailTip.content }}
                                </span>
                            </div>
                            <div class="password input"
                                :style="{ marginTop: showEmailTip ? '32px' : '22px', transition: showEmailTip ? 'all 160ms ease-in' : 'none' }">
                                <input :type="passwordEyes ? 'password' : 'text'" @blur="passwordBlur"
                                    @input="passwordInput" @focus="passwordFocus" placeholder="密码" v-model="password"
                                    autocomplete>
                                <span class="eyes" v-show="eyesShow" @mousedown="eyesHandler">
                                    <svg class="icon" aria-hidden="true">
                                        <use :xlink:href="passwordEyes ? '#icon-bukejian' : '#icon-kejian'"></use>
                                    </svg>
                                </span>
                                <span v-show="showPasswordTip" class="tips">
                                    <i :class="passwordTip.icon"></i>
                                    {{ passwordTip.content }}
                                </span>
                            </div>
                            <!-- 确认密码 -->
                            <div class="password input"
                                :style="{ marginTop: showPasswordTip ? '32px' : '22px', transition: showPasswordTip ? 'all 160ms ease-in' : 'none' }">
                                <input :type="passwordSureEyes ? 'password' : 'text'" @input="passwordSureInput"
                                    @blur="passwordSureBlur" placeholder="确认密码" v-model="passwordSure" autocomplete>
                                <!-- 确认密码的小眼睛 -->
                                <span class="eyes" v-show="sureEyesShow" @mousedown="sureEyesHandler">
                                    <svg class="icon" aria-hidden="true">
                                        <use :xlink:href="passwordSureEyes ? '#icon-bukejian' : '#icon-kejian'"></use>
                                    </svg>
                                </span>
                                <!-- 确认密码提示信息 -->
                                <span v-show="showPasswordSureTip" class="tips">
                                    <i :class="passwordSureTip.icon"></i>
                                    {{ passwordSureTip.content }}
                                </span>
                            </div>
                            <!-- 图形验证码 -->
                            <div class="captcha input"
                                :style="{ marginTop: showPasswordSureTip ? '32px' : '22px', transition: showPasswordSureTip ? 'all 160ms ease-in' : 'none' }">
                                <input type="text" v-model="code" placeholder="图形验证码" @input="codeFinish" maxlength="4">
                                <span v-show="showCodeTip" class="tips">
                                    <i :class="codeTip.icon"></i>
                                    {{ codeTip.content }}
                                </span>
                                <el-tooltip class="item" effect="dark" content="点击刷新" placement="top">
                                    <div class="codeBox" @click="refreshCode">
                                        <Identify :identifyCode="identifyCode" />
                                    </div>
                                </el-tooltip>
                            </div>
                            <div class="signupButton"
                                :style="{ marginTop: showCodeTip ? '36px' : '19px', transition: showCodeTip ? 'all 160ms ease-in' : 'none' }">
                                <button @click="signup">注册</button>
                                <button @click="close">取消</button>
                            </div>
                        </form>
                    </div>
                    <div class="choices">
                        <span>
                            已有账号？<a @click="isSignin = true">登录</a>
                        </span>
                    </div>
                </div>
            </div>
            <div class="mpLogin" v-show="loginType == 'MP'">
                <div class="mpQRBox">
                    <img class="mpQR" src="./images/mpQR.png" />
                </div>
                <span class="captchaTip">
                    扫码进入『 码上创新 』小程序获取动态码
                </span>
                <CaptchaInput />
            </div>
            <div class="othersLogin">
                <span class="title">第三方账号登录</span>
                <div class="othersApp">
                    <div class="qqLogin">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-social-qq"></use>
                        </svg>
                    </div>
                    <div class="giteeLogin">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-gitee"></use>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// 引入图形验证码组件
import Identify from '@/components/Identify'
import cloudbase from "@cloudbase/js-sdk"
import env from '@/config/login'
import CaptchaInput from './components/CaptchaInput'

export default {
    name: 'LoginModal',
    components: { Identify, CaptchaInput },

    data() {
        return {
            show: true,
            userNum: 6,
            identifyCodes: '1234567890abcdefjhijklinopqrsduvwxyz',
            identifyCode: '',
            // 记住密码
            checked: false,
            // 账号信息
            email: '',
            password: '',
            passwordSure: '',
            code: '',
            // 模态框状态：登录 / 注册
            isSignin: true,
            // 校验结果
            testResult: {
                email: {
                    state: false,
                    type: 0,
                },
                password: {
                    state: false,
                    type: 0,
                },
                code: {
                    state: false,
                    type: 0,
                },
                passwordSure: {
                    state: false,
                    type: 0,
                }
            },
            // 控制密码框的显示方式：text/password
            passwordEyes: true,
            passwordSureEyes: true,
            // 控制小眼睛的显示和隐藏
            eyesShow: false,
            sureEyesShow: false,
            // 标记眼睛是否被点击
            eyeClick: false,
            // 登录方式
            loginType: 'MP'
        }
    },
    computed: {
        // 显示邮箱规范提示
        showEmailTip() {
            return this.testResult.email.state
        },

        // 邮箱规范提示内容
        emailTip() {
            if (this.testResult.email.type) {
                return {
                    content: '邮箱格式检验通过',
                    type: 'sucess',
                    icon: 'el-icon-success'
                }
            } else {
                return {
                    content: '邮箱格式检验未通过',
                    type: 'warning',
                    icon: 'el-icon-warning'
                }
            }
        },

        // 显示密码规范提示
        showPasswordTip() {
            return this.testResult.password.state
        },
        // 密码规范提示内容
        passwordTip() {
            let content, type, icon;
            switch (this.testResult.password.type) {
                case 0: content = '密码至少为8个字符'; break
                case 1: content = '密码最多为16个字符'; break
                case 2: content = '密码安全系数较低，缺少大写字母'; break;
                case 3: content = '密码安全系数较低，缺少小写字母'; break;
                case 4: content = '密码安全系数较低，缺少数字'; break;
                case 5: content = '密码安全系数较低，不能全为大写字母'; break;
                case 6: content = '密码安全系数较低，不能全为小写字母'; break;
                case 7: content = '密码安全系数较低，不能全为数字'; break;
                case 8: content = '密码为8-16个字符，包括大、小写字母和数字'; break;
                case 9: content = '密码格式检验通过'; break;
            }
            switch (this.testResult.password.type) {
                case 8: type = 'info'; icon = 'el-icon-info'; break;
                case 9: type = 'success'; icon = 'el-icon-success'; break;
                default: type = 'warning'; icon = 'el-icon-warning';
            }
            return { content, type, icon }
        },

        // 显示确认密码提示
        showPasswordSureTip() {
            return this.testResult.passwordSure.state
        },
        // 确认密码提示内容
        passwordSureTip() {
            if (this.testResult.passwordSure.type) {
                return {
                    content: '密码已确认一致',
                    type: 'success',
                    icon: 'el-icon-success'
                }
            } else {
                return {
                    content: '两次密码不一致',
                    type: 'warning',
                    icon: 'el-icon-warning'
                }
            }
        },

        // 显示验证码提示
        showCodeTip() {
            return this.testResult.code.state
        },
        // 验证码提示内容
        codeTip() {
            if (this.testResult.code.type) {
                return {
                    content: '验证码正确',
                    type: 'success',
                    icon: 'el-icon-success'
                }
            } else {
                return {
                    content: '验证码错误',
                    type: 'warning',
                    icon: 'el-icon-warning'
                }
            }
        }
    },
    methods: {
        cancle() {
            this.onCancle()
            this.close()
        },
        close() {
            this.show = false
        },
        modalQuit() {
            this.close()
        },
        // 重置验证码
        refreshCode() {
            this.identifyCode = ''
            this.makeCode(this.identifyCodes, 4)
        },
        makeCode(o, l) {
            for (let i = 0; i < l; i++) {
                this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
            }
        },
        randomNum(min, max) {
            return Math.floor(Math.random() * (max - min) + min)
        },
        toSignup() {
            this.isSignin = false
        },
        // 邮箱输入框失去焦点
        emailBlur() {
            const { email } = this
            // 邮箱规范正则
            const reg = /^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/

            // 如果 email 不为空
            if (email) {
                this.testResult.email.state = true
                let type;
                if (reg.test(this.email)) {
                    type = 1
                } else {
                    type = 0
                }
                this.testResult.email.type = type
            } else {
                this.testResult.email.state = false
            }
        },
        // 密码框失去焦点
        passwordBlur() {
            const { password } = this
            // 密码正则：6-10位之间，包含大、小写字母和数字，可以使用特殊字符。
            const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/
            // 全为大写匹配
            const regX = /^[A-Z]+$/
            // 全为小写匹配
            const regx = /^[a-z]+$/
            // 全为数字匹配
            const reg9 = /^[0-9]*$/
            // 大写匹配
            const regAX = /[A-Z]+/g
            // 小写匹配
            const regAx = /[a-z]+/g
            // 数字匹配
            const regA9 = /[0-9]+/g
            // 失去焦点时，如果密码框有内容
            if (this.password) {
                let type
                // 校验结果
                this.testResult.password.state = !this.eyeClick
                if (reg.test(password)) {
                    type = 9
                } else if (password.length > 0 && password.length < 8) {
                    type = 0
                } else if (password.length > 16) {
                    type = 1
                } else if (regX.test(password)) {
                    type = 5
                } else if (regx.test(password)) {
                    type = 6
                } else if (reg9.test(password)) {
                    type = 7
                } else if (!regAX.test(password)) {
                    type = 2
                } else if (!regAx.test(password)) {
                    type = 3
                } else if (!regA9.test(password)) {
                    type = 4
                }
                this.testResult.password.type = type
            } else {
                this.testResult.password.state = false
                this.eyesShow = false
            }
            this.eyeClick = false
        },
        // 密码框输入
        passwordInput() {
            const { passwordSure, password } = this
            this.eyesShow = true
            if (passwordSure.length) {
                if (password == passwordSure) {
                    this.testResult.passwordSure.type = 1
                } else {
                    this.testResult.passwordSure.type = 0
                }
            }
            if (!password.length) {
                this.testResult.passwordSure.state = false
                this.eyesShow = false
            } else {
                this.testResult.passwordSure.state = true
            }
        },
        // 点击小眼睛
        eyesHandler() {
            // 眼睛睁开、闭上
            this.passwordEyes = !this.passwordEyes
            // 点击眼睛的标记
            this.eyeClick = true
            // 关闭提示
            this.testResult.password.state = false
        },
        sureEyesHandler() {
            this.passwordSureEyes = !this.passwordSureEyes
            // 点击眼睛的标记
            this.eyeClick = true
            // 关闭提示
            this.testResult.passwordSure.state = false
        },
        // 密码框获得焦点
        passwordFocus() {
            // 密码校验结果隐藏
            this.testResult.password.state = true
            this.eyeClick = false
            // 密码规范提示显示
            this.testResult.password.type = 8
            // 显示小眼睛
            if (this.password) {
                this.eyesShow = true
            }
        },
        // 验证码输入完毕
        codeFinish() {
            const { code, identifyCode } = this
            if (code.length == 4) {
                this.testResult.code.state = true
                if (code == identifyCode) {
                    this.testResult.code.type = 1
                } else {
                    this.testResult.code.type = 0
                }
            } else {
                this.testResult.code.state = false
            }
        },

        // 确认密码输入
        passwordSureInput() {
            const { passwordSure, password } = this
            if (passwordSure.length == password.length && password.length) {
                this.testResult.passwordSure.state = true
                if (passwordSure == password) {
                    this.testResult.passwordSure.type = 1
                } else {
                    this.testResult.passwordSure.type = 0
                }
            } else {
                this.testResult.passwordSure.state = false
            }
            if (!passwordSure) {
                this.sureEyesShow = false
            } else {
                this.sureEyesShow = true
            }
        },
        // 确认密码失去焦点
        passwordSureBlur() {
            const { passwordSure, password } = this
            if (passwordSure.length != password.length && password.length && passwordSure.length) {
                this.testResult.passwordSure.state = true
                this.testResult.passwordSure.type = 0
            }
        },
        // 登录
        login() {
            const { email, password, testResult } = this
            const app = cloudbase.init(env)
            if (testResult.email.type && testResult.password.type == 9 && testResult.code.type) {
                app
                    .auth()
                    .signInWithEmailAndPassword(email, password)
                    .then((loginState) => {
                        console.log(loginState);
                        // 登录成功
                        this.$notify({
                            title: '登录成功',
                            message: '恭喜你，欢迎使用码上创新！',
                            type: 'success',
                        })
                        // 向 header 组件发送登录成功的信息
                        this.$bus.$emit('loginState', true)
                        this.close()
                    })
                    .catch(error => {
                        if (error.message.indexOf('102001')) {
                            this.$notify({
                                title: '密码有误',
                                message: '你输入的密码有误，请重新输入',
                                type: 'warning'
                            })
                        } else if (error.message.indexOf('102003')) {
                            this.$message({
                                title: '未注册',
                                message: '你的邮箱尚未注册，请先注册',
                                type: 'warning'
                            })
                        }
                    })
            } else {
                this.$message({
                    message: '请检查您输入的信息',
                    type: 'warning',
                    center: true
                })
            }
        },
        // 注册
        signup() {
            const { email, password, testResult } = this
            const app = cloudbase.init(env)
            if (testResult.email.type && testResult.password.type == 9 && testResult.passwordSure.type && testResult.code.type) {
                app
                    .auth()
                    .signUpWithEmailAndPassword(email, password)
                    .then(() => {
                        this.$notify({
                            title: '验证邮箱',
                            message: `我们向你的邮箱发送了一封邮件，请登录你的邮箱${this.email}，以得到我们的确认。`,
                            type: 'success'
                        });
                    })
                    .catch(error => {
                        console.log(error.message);
                    })
            } else {
                this.$message({
                    message: '请检查您输入的信息',
                    type: 'warning',
                    center: true
                })
            }
        }
    },
    mounted() {
        this.identifyCode = ""
        this.makeCode(this.identifyCodes, 4)
        this.$bus.$on('close', (close) => {
            if (close) {
                this.close()
            }
        })
    }
}
</script>

<style lang="less" scoped>
@import url(./index.less);
</style>
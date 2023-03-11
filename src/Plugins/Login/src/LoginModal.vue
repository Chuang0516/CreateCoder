<template>
    <div v-if="show" ref="modal" class="loginModal" @click="modalQuit" @mousewheel.prevent>
        <div class="login-container" @click.stop>
            <span class="close" @click="close">
                <i class="el-icon-close"></i>
            </span>
            <div class="logoBox">
                <img src="~@/assets/images/logo.png" alt="">
                <img src="~@/assets/images/logo_text.png" alt="">
            </div>
            <p>已有超过{{ userNum }}名用户加入码上创新</p>
            <div class="loginBox" v-if="isSignin">
                <div class="loginInput">
                    <form>
                        <div class="email input">
                            <input type="email" placeholder="邮箱" v-model="email" @blur="emailBlur">
                            <span v-show="testResult.email" class="tips">
                                <i :class="{ 'el-icon-success': testing.email, 'el-icon-error': !testing.email }"></i>
                                {{ testing.email ? '邮箱格式正确' : '邮箱格式有误' }}
                            </span>
                        </div>
                        <div class="password input">
                            <input :type="passwordEyes ? 'password' : 'text'" @blur="passwordBlur" @input="eyesShow = true"
                                @focus="passwordFocus" placeholder="密码" v-model="password" autocomplete>
                            <span class="eyes" @click="eyesHandler" v-show="eyesShow" ref="eyes">
                                <svg class="icon" aria-hidden="true">
                                    <use :xlink:href="passwordEyes ? '#icon-bukejian' : '#icon-kejian'"></use>
                                </svg>
                            </span>
                            <span v-show="testResult.password" class="tips">
                                <i :class="{ 'el-icon-success': testing.password, 'el-icon-error': !testing.password }"></i>
                                {{ testing.password ? '密码格式正确' : '密码格式有误' }}
                            </span>
                        </div>
                        <div class="captcha input">
                            <input type="text" v-model="code" placeholder="图形验证码">
                            <el-tooltip class="item" effect="dark" content="点击刷新" placement="top">
                                <div class="codeBox" @click="refreshCode">
                                    <Identify :identifyCode="identifyCode" />
                                </div>
                            </el-tooltip>
                        </div>
                        <div class="remember">
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
                    <form>
                        <div class="email input">
                            <input type="email" placeholder="邮箱" v-model="email">
                        </div>
                        <div class="password input">
                            <input type="password" placeholder="密码" v-model="password" autocomplete>
                        </div>
                        <div class="password input">
                            <input type="password" placeholder="确认密码" v-model="password" autocomplete>
                        </div>
                        <div class="captcha input">
                            <input type="text" v-model="code" placeholder="图形验证码">
                            <el-tooltip class="item" effect="dark" content="点击刷新" placement="top">
                                <div class="codeBox" @click="refreshCode">
                                    <Identify :identifyCode="identifyCode" />
                                </div>
                            </el-tooltip>
                        </div>
                        <div class="signupButton">
                            <button>注册</button>
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

            <div class="othersLogin">
                <span class="title">第三方账号登录</span>
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
</template>

<script>
// 引入图形验证码组件
import Identify from '@/components/Identify'
export default {
    name: 'LoginModal',
    components: { Identify },
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
            code: '',
            // 模态框状态
            isSignin: true,
            // 输入信息校验
            testing: {
                email: false,
                password: false
            },
            // 校验结果
            testResult: {
                email: false,
                password: false
            },
            // 密码可见
            passwordEyes: false,
            eyesShow: false,
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
            const reg = /^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/
            if (this.email) {
                this.testResult.email = true
                if (reg.test(this.email)) {
                    this.testing.email = true
                } else {
                    this.testing.email = false
                }
            } else {
                this.testResult.email = false
            }
        },
        // 密码框失去焦点
        passwordBlur() {
            const reg = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/
            if (this.password) {
                this.testResult.password = true
                if (reg.test(this.password)) {
                    this.testing.password = true
                } else {
                    this.testing.password = false
                }
            } else {
                this.testResult.password = false
            }
        },
        // 点击小眼睛
        eyesHandler() {
            this.passwordEyes = !this.passwordEyes
        },
        // 密码框获得焦点
        passwordFocus() {
            this.testResult.password = false
        },
        // 登录
        login() {
            let { email, password, code } = this
            const app = cloudbase.init({
                env: "cloudbase-baas-4g1a5g4h6dc9d130"
            })
            app
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then((loginState) => {
                    // 登录成功
                    console.log(loginState);
                });
        },
    },
    mounted() {
        this.identifyCode = ""
        this.makeCode(this.identifyCodes, 4)
    }
}
</script>

<style lang="less" scoped>
.loginModal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    min-width: 1200px;
    z-index: 99;
    transition: all 500ms;
    background-color: rgba(0, 0, 0, 0.6);
    animation: loginModalAnimate 600ms;

    @keyframes loginModalAnimate {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }
    }

    .login-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        width: 430px;
        height: 550px;
        background-color: #fff;
        border-radius: 16px;
        z-index: 199;
        animation: loginAnimate 400ms;

        @keyframes loginAnimate {
            0% {
                transform: scale(.7);
            }

            45% {
                transform: scale(1.05);
            }

            80% {
                transform: scale(.95);
            }

            100% {
                transform: scale(1);
            }
        }

        .close {
            position: absolute;
            top: 10px;
            right: 10px;
            transition: all 300ms;
            cursor: pointer;

            i {
                font-size: 26px;
                color: #999;
            }

            &:hover {
                transform: rotate(180deg);
            }
        }

        .logoBox {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 56px;
            margin-top: 16px;

            img {

                &:first-child {
                    width: 42px;
                    height: 42px;
                }

                &:last-child {
                    height: 38px;
                }
            }
        }

        p {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            color: #666;
            letter-spacing: 1px;

            &::before {
                content: '';
                width: 32px;
                height: 2px;
                background-color: #d8d8d8;
                margin-right: 10px;
            }


            &::after {
                content: '';
                width: 32px;
                height: 2px;
                background-color: #d8d8d8;
                margin-left: 10px;
            }
        }

        .loginBox {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex: 1;
            width: 100%;

            .loginInput {
                width: 320px;

                form {
                    width: 100%;
                    height: 100%;

                    .input {
                        position: relative;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 100%;
                        height: 36px;
                        border-bottom: 1px solid #333;
                        margin: 22px 0 0 0;
                        transition: all 100ms;

                        span.tips {
                            position: absolute;
                            bottom: -16px;
                            left: 0px;
                            height: 12px;
                            font-size: 12px;
                            user-select: none;

                            &:has(i.el-icon-success),
                            i.el-icon-success {
                                color: #67C23A;
                            }

                            &:has(i.el-icon-error),
                            i.el-icon-error {
                                color: #F56C6C;
                            }
                        }

                        &:first-child {
                            margin: 12px 0 0 0;
                        }

                        &.password {
                            .eyes {
                                position: absolute;
                                top: 5px;
                                right: 12px;
                                width: 26px;
                                height: 26px;

                                .icon {
                                    width: 26px;
                                    height: 26px;
                                }
                            }
                        }

                        input {
                            width: 100%;
                            height: 36px;
                            line-height: 36px;
                            border: none;
                            outline: none;
                            font-size: 18px;
                            box-sizing: border-box;
                            font-weight: bold;
                            letter-spacing: 1px;

                            &[type='password']::-ms-reveal {
                                display: none
                            }

                            &::-webkit-input-placeholder {
                                color: #bbb;
                                font-size: 14px;
                                font-weight: normal;
                            }

                            &::-moz-placeholder {
                                /* Mozilla Firefox 19+ */
                                color: #bbb;
                                font-size: 14px;
                                font-weight: normal;
                            }

                            &:-moz-placeholder {
                                /* Mozilla Firefox 4 to 18 */
                                color: #bbb;
                                font-size: 14px;
                                font-weight: normal;
                            }

                            &:-ms-input-placeholder {
                                /* Internet Explorer 10-11 */
                                color: #bbb;
                                font-size: 14px;
                                font-weight: normal;
                            }
                        }

                        &:has(input:focus) {
                            border-bottom: 1px solid #2681C2;
                        }
                    }

                    .captcha {
                        display: flex;
                        cursor: pointer;

                        input {
                            flex: 1;
                        }

                        .codeBox {
                            width: 96px;
                            height: 32px;
                        }
                    }

                    .loginButton {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        border: none;
                        height: 36px;
                        margin-top: 32px;

                        button {
                            width: 42%;
                            height: 100%;
                            border: 1px solid #2681C2;
                            color: #fff;
                            font-size: 18px;
                            letter-spacing: 6px;
                            cursor: pointer;
                            border-radius: 5px;
                            transition: all 120ms ease;

                            &:first-child {
                                background-color: #2681C2;
                            }

                            &:last-child {
                                background-color: transparent;
                                color: #2681C2;
                            }

                            &:hover {
                                transform: scale(1.1);
                                box-shadow: 0 0 5px 1px #666;
                            }
                        }
                    }

                    .remember {
                        height: 36px;
                        margin-top: 16px;
                        line-height: 36px;

                        label {
                            display: flex;
                            align-items: center;

                            input {
                                width: 14px;
                                height: 14px;
                                cursor: pointer;
                            }

                            span {
                                margin-left: 10px;
                                font-size: 14px;
                                cursor: pointer;
                                user-select: none;
                            }
                        }
                    }
                }
            }

            .choices {
                display: flex;
                justify-content: start;
                align-items: center;
                width: 320px;
                height: 32px;
                margin-top: 12px;

                span {
                    font-size: 12px;
                    color: #666;
                    user-select: none;

                    a {
                        cursor: pointer;

                        &:hover {
                            color: #2681C2;
                        }
                    }
                }
            }
        }

        .signupBox {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex: 1;
            width: 100%;

            .signupInput {
                width: 320px;

                form {
                    width: 100%;
                    height: 100%;

                    .input {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 100%;
                        height: 36px;
                        border-bottom: 1px solid #333;
                        margin: 22px 0 0 0;
                        transition: all 100ms;

                        &:first-child {
                            margin: 12px 0 0 0;
                        }

                        input {
                            width: 100%;
                            height: 36px;
                            line-height: 36px;
                            border: none;
                            outline: none;
                            font-size: 18px;
                            box-sizing: border-box;
                            font-weight: bold;
                            letter-spacing: 1px;

                            &::-webkit-input-placeholder {
                                color: #bbb;
                                font-size: 14px;
                                font-weight: normal;
                            }

                            &::-moz-placeholder {
                                /* Mozilla Firefox 19+ */
                                color: #bbb;
                                font-size: 14px;
                                font-weight: normal;
                            }

                            &:-moz-placeholder {
                                /* Mozilla Firefox 4 to 18 */
                                color: #bbb;
                                font-size: 14px;
                                font-weight: normal;
                            }

                            &:-ms-input-placeholder {
                                /* Internet Explorer 10-11 */
                                color: #bbb;
                                font-size: 14px;
                                font-weight: normal;
                            }
                        }

                        &:has(input:focus) {
                            border-bottom: 1px solid #2681C2;
                        }
                    }

                    .captcha {
                        display: flex;
                        cursor: pointer;

                        input {
                            flex: 1;
                        }

                        .codeBox {
                            width: 96px;
                            height: 32px;
                        }
                    }

                    .signupButton {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        border: none;
                        height: 36px;
                        margin-top: 26px;

                        button {
                            width: 42%;
                            height: 100%;
                            border: 1px solid #2681C2;
                            color: #fff;
                            font-size: 18px;
                            letter-spacing: 6px;
                            cursor: pointer;
                            border-radius: 5px;
                            transition: all 120ms ease;

                            &:first-child {
                                background-color: #2681C2;
                            }

                            &:last-child {
                                background-color: transparent;
                                color: #2681C2;
                            }

                            &:hover {
                                transform: scale(1.1);
                                box-shadow: 0 0 5px 1px #666;
                            }
                        }
                    }
                }
            }

            .choices {
                display: flex;
                justify-content: start;
                align-items: center;
                width: 320px;
                height: 32px;
                margin-top: 12px;

                span {
                    font-size: 12px;
                    color: #666;
                    user-select: none;

                    a {
                        cursor: pointer;

                        &:hover {
                            color: #2681C2;
                        }
                    }
                }
            }
        }

        .othersLogin {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 90%;
            height: 36px;
            margin-bottom: 16px;

            div {
                width: 28px;
                height: 28px;
                margin: 0 10px;
                cursor: pointer;
                transition: all 200ms;

                .icon {
                    width: 28px;
                    height: 28px;
                }

                &:hover {
                    transform: scale(1.1);
                }
            }

            .title {
                position: absolute;
                top: -28px;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 14px;
                color: #666;
                letter-spacing: 1px;
                user-select: none;

                &::before {
                    content: '';
                    width: 20px;
                    height: 1px;
                    background-color: #d8d8d8;
                    margin-right: 5px;
                }

                &::after {
                    content: '';
                    width: 20px;
                    height: 1px;
                    background-color: #d8d8d8;
                    margin-left: 5px;
                }
            }
        }
    }
}
</style>
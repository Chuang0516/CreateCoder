<template>
    <div v-if="show" ref="modal" class="loginModal" @click="modalQuit" @mousewheel.prevent>
        <div class="login-container" @click.stop>
            <span class="close" @click="close">
                <i class="el-icon-close"></i>
            </span>
            <div class="loginBox">

            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LoginModal',
    data() {
        return {
            show: true,
            title: '', // 标题
            confirmText: '确定', // 确认文字
            confirmVisible: true, // 是否展示确认按钮
            onConfirm: () => { // 确认执行函数
                this.$emit('confirm')
            },
            cancleText: '取消', // 取消文字
            cancleVisible: true, // 是否展示取消按钮
            onCancle: () => { // 取消执行函数
                this.$emit('cancle')
            }
        }
    },
    methods: {
        confirm() {
            this.onConfirm()
            this.close()
        },
        cancle() {
            this.onCancle()
            this.close()
        },
        close() {
            this.show = false
            if (this.$refs.modal) {
                this.$refs.modal.remove() // 关闭时候直接移除当前元素
            }
        },
        modalQuit() {
            this.close()
        }
    },
    watch: {

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
        position: relative;
        width: 50%;
        height: 66%;
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

        .loginBox {}
    }
}
</style>
<template>
    <div v-if="show" ref="modal" class="loginModal">

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
        }
    }
}
</script>

<style lang="less" scoped></style>
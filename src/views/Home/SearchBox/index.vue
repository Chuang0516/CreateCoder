<template>
    <div class="search-box">
        <div></div>
        <form action="">
            <input type="text" placeholder="站内搜索">
            <i class="el-icon-search"></i>
        </form>
        <div></div>
    </div>
</template>

<script>
export default {
    name: 'SearchBox',
    data() {
        return {
            isdown: true
        }
    },
}
</script>

<style lang="less" scoped>
.search-box {
    display: flex;
    width: 72%;
    height: 52px;
    background-color: rgba(28, 28, 28, 0.6);
    border-radius: 26px;
    padding: 0 26px;

    form {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;

        input {
            flex: 1;
            background-color: transparent;
            border: none;
            outline: none;
            color: #eee;
            height: 100%;
        }

        i {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 36px;
            height: 36px;
            color: #eee;
            font-size: 30px;
        }
    }
}
</style>

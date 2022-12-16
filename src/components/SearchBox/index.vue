<template>
    <div class="search-box">
        <span class="classify-search" @mouseover="isdown = false" @mouseleave="isdown = true">
            分类
            <i v-show="isdown" class="el-icon-arrow-down"></i>
            <i v-show="!isdown" class="el-icon-arrow-up"></i>
        </span>
        <div class="input-box">
            <input type="text" placeholder="搜索面经/试题/小队/用户" />
        </div>
        <div class="search-btn">
            <i class="el-icon-search"></i>
            搜索
        </div>
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

<style lang="less">
.search-box {
    display: flex;
    width: 100%;
    height: 38px;
    margin-left: 20px;

    .classify-search {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 2;
        color: #666;
        border: 2px solid #2681c2;
        border-radius: 19px 0 0 19px;
        border-right: none;
        cursor: pointer;

        &::after {
            content: '';
            position: absolute;
            right: 0;
            top: 0;
            height: 34px;
            width: 1px;
            background-color: #666;
        }
    }

    .input-box {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 6;
        height: 34px;
        border-top: 2px solid #2681c2;
        border-bottom: 2px solid #2681c2;

        input {
            background-color: #fcfcfc;
            width: 100%;
            height: 32px;
            border: none;
            outline: none;
            padding-left: 10px;
            font-size: 14px;
        }
    }

    .search-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 2;
        height: 38px;
        background-image: linear-gradient(to bottom left, #2681c2, #3AD6E2);
        border: none;
        border-radius: 0 19px 19px 0;
        color: #fff;
        cursor: pointer;

        &:hover {
            background-image: linear-gradient(to top right, #2681c2, #3AD6E2);
        }
    }
}
</style>

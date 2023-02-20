<template>
    <div class="footer">
        <span>Copyright © 2022</span>
        <a href="https://createcoder.com">&nbsp;码上创新&nbsp;</a>
        <a href="https://beian.miit.gov.cn/" target="_blank">&nbsp;陕ICP备2022014724号-1</a>
    </div>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style lang="less" scoped>
.footer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    font-size: 14px;

    a {
        color: #333;

        &:hover {
            color: rgb(230, 77, 11);
        }
    }
}
</style>

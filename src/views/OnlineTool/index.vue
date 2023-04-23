<template>
    <div class="online-tool">
        <LaftNav :isOpen="isOpen" />
    </div>
</template>

<script>
import LaftNav from '@/components/LeftNav'
export default {
    name: 'OnlineTools',
    components: { LaftNav },
    props: ['isOpen'],
    data() {
        return {

        }
    },
    created() {
        const { id } = this.$route.query

    }
}
</script>

<style scoped lang="less">
.online-tool {
    height: 1000px;
}
</style>

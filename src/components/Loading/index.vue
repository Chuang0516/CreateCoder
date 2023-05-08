<template>
    <div v-show="showLoading" class="loading-container">
        <Loader01 v-if="Loader == 1" />
        <Loader02 v-if="Loader == 2" />
        <Loader03 v-if="Loader == 3" />
        <Loader04 v-if="Loader == 4" />
        <Loader05 v-if="Loader == 5" />
        <Loader06 v-if="Loader == 6" />
        <Loader07 v-if="Loader == 7" />
        <Loader08 v-if="Loader == 8" />
        <Loader09 v-if="Loader == 9" />
        <Loader10 v-if="Loader == 10" />
    </div>
</template>

<script>
const Loader01 = () => import('./01')
const Loader02 = () => import('./02')
const Loader03 = () => import('./03')
const Loader04 = () => import('./04')
const Loader05 = () => import('./05')
const Loader06 = () => import('./06')
const Loader07 = () => import('./07')
const Loader08 = () => import('./08')
const Loader09 = () => import('./09')
const Loader10 = () => import('./10')

export default {
    name: 'Loading',
    props: ['showLoading'],
    components: { Loader01, Loader02, Loader03, Loader04, Loader05, Loader06, Loader07, Loader08, Loader09, Loader10 },
    data() {
        return {
            Loader: this.getLoadId(1, 10)
        }
    },
    computed: {
        routePath() {
            return this.$route.path
        }
    },
    watch: {
        routePath: {
            handler(newVal) {
                if (this.showLoading) {
                    this.Loader = this.getLoadId(1, 10)
                }
            },
            immediate: true
        }
    },
    methods: {
        getLoadId(min, max) {
            const { Loader } = this
            let currentLoader
            while (true) {
                currentLoader = Math.floor(Math.random() * (max - min + 1)) + min
                if (currentLoader != Loader) {
                    break
                }
            }
            return currentLoader
        }
    }
}
</script>

<style scoped lang="less">
.loading-container {
    .container {
        overflow: hidden;
        display: flex;
        // flex-direction: column;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 999;
    }
}
</style>

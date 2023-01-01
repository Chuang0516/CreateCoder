<template>
    <div class="development-logs">
        <img class="githubContribute" src="https://ghchart.rshah.org/Chuang0516">
        <TimeLine :timelineList="timelineList" />
    </div>
</template>

<script>
import TimeLine from '@/views/Course/TimeLine'
export default {
    name: 'Course',
    components: { TimeLine },
    data() {
        return {
            timelineList: []
        }
    },
    methods: {
        getGithubCommit() {
            fetch('https://api.github.com/repos/Chuang0516/CreateCoder/commits')
                .then(res => res.json())
                .then(data => this.timelineList = data)
        }
    },
    mounted() {
        this.getGithubCommit()
    }
}
</script>

<style lang="less" scoped>
.development-logs {
    margin-top: 56px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .githubContribute {
        display: block;
        width: 80%;
        margin: 20px auto;
        -webkit-user-drag: none;
    }
}
</style>

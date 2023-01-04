<template>
    <div class="development-logs">
        <div class="githubContribute">
            <div class="contribute-header">
                <span class="title">贡献度</span>
                <span class="year">{{ year }}</span>
            </div>
            <!-- <img src="https://ghchart.rshah.org/Chuang0516" /> -->
            <submission-chart />
        </div>
        <TimeLine :timelineList="timelineList" />
    </div>
</template>

<script>
import TimeLine from '@/views/Course/TimeLine'
import SubmissionChart from '@/views/Course/SubmissionChart'
export default {
    name: 'Course',
    components: { TimeLine, SubmissionChart },
    data() {
        return {
            timelineList: [],
            year: '2022年'
        }
    },
    methods: {
        getGithubCommit() {
            let gitToken = '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'
            fetch('https://api.github.com/repos/Chuang0516/CreateCoder/commits', {
                headers: {
                    "Authorization": `token${gitToken}`,
                },
            })
                .then(res => res.json())
                .then(data => {
                    data.forEach(item => {
                        let date = item.commit.committer.date
                        let message = item.commit.message.split('-')
                        let title = message[0]
                        let contentList = message.slice(1)
                        let timeLine = { date, title, contentList }
                        this.timelineList.push(timeLine)
                    })
                })
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
        width: 86%;
        margin: 20px auto;

        .contribute-header {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;

            .title {
                font-size: 20px;
                font-weight: bold;
                color: #555;
            }

            .year {
                display: flex;
                align-items: center;
                color: #666;
                font-size: 16px;
            }
        }

        img {
            width: 100%;
            -webkit-user-drag: none;

        }
    }
}
</style>

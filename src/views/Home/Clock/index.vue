<template>
    <div class="clock">
        <p class="time">{{ time }}</p>
        <p class="date">{{ date }}</p>
    </div>
</template>

<script>
export default {
    name: 'Clock',
    data() {
        return {
            time: '',
            date: '',
            time: null
        }
    },
    methods: {
        updateTime() {
            let cd = new Date();
            let week = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
            const addZero = this.addZero
            this.time = addZero(cd.getHours(), 2) + ':' + addZero(cd.getMinutes(), 2) + ':' + addZero(cd.getSeconds(), 2);
            this.date = addZero(cd.getFullYear(), 4) + '-' + addZero(cd.getMonth() + 1, 2) + '-' + addZero(cd.getDate(), 2) + ' ' + week[cd.getDay()];
        },
        addZero(num, digit) {
            let zero = '';
            for (var i = 0; i < digit; i++) {
                zero += '0';
            }
            return (zero + num).slice(-digit);
        }
    },
    mounted() {
        this.timer = setInterval(() => {
            this.updateTime()
        }, 1000)
    },
    beforeDestroy() {
        clearInterval(this.timer)
    }
}
</script>

<style  lang="less" scoped>
.clock {
    font-family: 'Share Tech Mono', monospace;
    color: #ffffff;
    text-shadow: 0 0 5px #fff,
        0 0 10px #fff,
        0 0 15px #fff,
        0 0 20px #00a67c,
        0 0 35px #00a67c,
        0 0 40px #00a67c,
        0 0 50px #00a67c,
        0 0 75px #00a67c;
    z-index: 9;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    .time {
        letter-spacing: 0.05em;
        font-size: 36px;
        margin: 0;
    }

    .date {
        letter-spacing: 0.1em;
        font-size: 15px;
        margin: 0;
    }
}
</style>

<template>
    <svg xmlns="http://www.w3.org/2000/svg" height="52" width="52" viewBox="0 0 120 120">
        <circle v-show="isShow[0]" id="circle-1" cx="50%" cy="50%" r="40" stroke-width="20" fill="none" stroke="#2681c2"
            stroke-linecap="round" :transform="'rotate(30 ' + 60 + ' ' + 60 + ')'" stroke-dasharray="105, 260"></circle>
        <circle v-show="isShow[1]" id="circle-2" cx="50%" cy="50%" r="40" stroke-width="20" fill="none" stroke="#3AD6E2"
            stroke-linecap="round" transform="rotate(180 60 60)" stroke-dasharray="62, 290"></circle>
        <circle v-show="isShow[2]" id="overlap" cx="50%" cy="50%" r="40" stroke-width="20" fill="none" stroke="#0C72BA"
            stroke-linecap="round" transform="rotate(180 60 60)" stroke-dasharray="0, 360"></circle>
        <circle v-show="isShow[3]" id="circle-3" cx="50%" cy="50%" r="40" stroke-width="20" fill="none" stroke="#3AD6E2"
            stroke-linecap="round" transform="rotate(-50 60 60)" stroke-dasharray="0, 360"></circle>
    </svg>
</template>

<script>
export default {
    name: 'LogoSvg',
    props: ['svgConfig'],
    data() {
        return {
            isShow: [false, false, false, false]
        }
    },
    methods: {
        logoInit() {
            this.$set(this.isShow, 0, true)
            setTimeout(() => {
                this.$set(this.isShow, 1, true)
                this.$set(this.isShow, 2, true)
            }, 500)
            setTimeout(() => {
                this.$set(this.isShow, 3, true)
            }, 1000)
        }
    },
    mounted() {
        this.logoInit();
    }
}
</script>

<style scoped>
#circle-1 {
    animation: circle-1 .5s ease-in;
}

@keyframes circle-1 {
    from {
        stroke-dasharray: 0, 360;
    }

    to {
        stroke-dasharray: 105, 260;
    }
}

#overlap {
    animation: overlap .5s ease-in;
}

@keyframes overlap {
    from {
        stroke-width: 0;
    }

    to {
        stroke-width: 16;
    }
}

#circle-2 {
    animation: circle-2 .5s ease-in;
}

@keyframes circle-2 {
    from {
        stroke-dasharray: 0, 360;
    }

    to {
        stroke-dasharray: 62, 290;
    }
}

#circle-3 {
    animation: circle-3 0.3s ease-in;
}

@keyframes circle-3 {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}
</style>

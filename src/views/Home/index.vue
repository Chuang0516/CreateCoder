<template>
    <div class="home">
        <div class="start-background">
            <vue-particles class="login-bg" color="#fff" :particleOpacity="0.7" :particlesNumber="100"
                shapeType="circle" :particleSize="4" linesColor="#8DD1FE" :linesWidth="1" :lineLinked="true"
                :lineOpacity="0.4" :linesDistance="150" :moveSpeed="2" :hoverEffect="true" hoverMode="grab"
                :clickEffect="true" clickMode="push"></vue-particles>
            <div class="home-main">
                <!-- 一言 -->
                <p class="yiyan">{{ hitokoto }}</p>
                <!-- 天气预报 -->
                <!-- <div class="weather">
                    <div id="he-plugin-standard"></div>
                </div> -->
                <!-- 搜索框 -->
                <div class="search-container">
                    <SearchBox />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SearchBox from '@/views/Home/SearchBox'
export default {
    name: 'Home',
    components: { SearchBox },
    data() {
        return {
            hitokoto: ''
        }
    },
    methods: {
        getyiyan() {
            window.WIDGET = {
                "CONFIG": {
                    "layout": "1",
                    "width": "520",
                    "height": "160",
                    "background": "1",
                    "dataColor": "EEEEEE",
                    "borderRadius": "10",
                    "key": "78643238d3634c01ab0a527d1f76031a"
                }
            }
            let script = document.createElement('script')
            script.type = 'text/javascript'
            script.src =
                'https://widget.qweather.net/standard/static/js/he-standard-common.js?v=2.0'
            document.getElementsByTagName('head')[0].appendChild(script)

            fetch('https://v1.hitokoto.cn')
                .then(response => response.json())
                .then(data => {
                    this.hitokoto = data.hitokoto
                })
                .catch(console.error)
        }
    },
    mounted() {
        this.getyiyan()
        this.$store.dispatch('getHomeNav')
    }
}
</script>

<style lang="less" scoped>
.home {
    width: 100%;

    .start-background {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 80vh;
        // background: linear-gradient(0deg, #3ad6e2 0%, #2681c2 60%, #0C72BA 100%);
        background: radial-gradient(180% 100% at top center, #48466d 20%, #3d84a8 60%, #46cdcf 85%, #f5f6f9);

        #particles-js {
            width: 100%;
            height: 100%;
            position: absolute;
            z-index: 9;
            user-select: none;
        }

        .home-main {
            position: relative;
            width: 100%;
            height: 80%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;

            .weather {
                justify-self: start;
            }

            .yiyan {
                color: #eee;
                font-size: 16px;
                font-family: 'Courier New', Courier, monospace;
            }

            // 搜索框的样式
            .search-container {
                z-index: 10;
                width: 100%;
                display: flex;
                justify-content: center;
                margin-top: 20px;
            }
        }
    }
}
</style>

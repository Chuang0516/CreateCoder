<template>
    <div class='loader-center'>
        <div class='chars'>
            <span class='char brace'>{</span>
            <span class='dots'>
                <span class='char dot _dot-1'>.</span>
                <span class='char dot _dot-2'>.</span>
                <span class='char dot _dot-3'>.</span>
            </span>
            <span class='char brace'>}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: ' Loader'
}
</script>

<style scoped lang="less">
.loader-center {
    width: 300px;
    height: 100px;
    line-height: 100px;

    margin: 0 auto;
    text-align: center;
    font-size: 38px;
    letter-spacing: -6px;

    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -150px;
    margin-top: -50px;

    .chars {
        .dots {
            .char {
                font-size: 150%;
                display: inline-block;
            }

            .dot {
                position: relative;
                top: 0;
                left: 0;

                &._dot-1 {
                    animation: dot_1 1s ease-in-out infinite;
                    animation-fill-mode: backwards;
                    animation-direction: alternate;

                    @keyframes dot_1 {
                        0% {
                            top: 0;
                            left: 0;
                        }

                        50% {
                            top: 30px;
                            left: 20px;
                        }

                        100% {
                            top: 0px;
                            left: 40px;
                        }
                    }
                }

                &._dot-2 {
                    animation: dot_2 1s ease-in-out infinite;
                    animation-fill-mode: backwards;
                    animation-direction: alternate;
                    animation-delay: 1s;

                    @keyframes dot_2 {
                        0% {
                            top: 0;
                            left: 0;
                        }

                        50% {
                            top: -30px;
                            left: 20px;
                        }

                        100% {
                            top: 0px;
                            left: 40px;
                        }
                    }
                }

                &._dot-3 {
                    animation: dot_3 1s ease-in-out infinite;
                    animation-fill-mode: backwards;
                    animation-direction: alternate;
                    animation-delay: 0.5s;

                    @keyframes dot_3 {
                        0% {
                            top: 0;
                            left: 0;
                        }

                        50% {
                            top: -30px;
                            left: -40px;
                        }

                        100% {
                            top: 0px;
                            left: -80px;
                        }
                    }
                }
            }
        }
    }

}
</style>
<template>
    <div class="container">
        <div class="pl1">
            <div class="pl1__a"></div>
            <div class="pl1__b"></div>
            <div class="pl1__c"></div>
        </div>

        <div class="pl2">
            <div class="pl2__a"></div>
            <div class="pl2__b"></div>
            <div class="pl2__c"></div>
        </div>

        <div class="pl3">
            <div class="pl3__a"></div>
            <div class="pl3__b"></div>
            <div class="pl3__c"></div>
            <div class="pl3__d"></div>
        </div>

        <div class="pl4">
            <div class="pl4__a"></div>
            <div class="pl4__b"></div>
            <div class="pl4__c"></div>
            <div class="pl4__d"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Loader10'
}
</script>

<style scoped lang="less">
.container {
    --bg: #e3e4e8;
    --fg: #17181c;
    --c1: #f42f25;
    --c2: #f49725;
    --c3: #255ff4;
    --c4: #9725f4;
    background: var(--bg);
    color: var(--fg);
    display: flex;
    flex-wrap: wrap;
    font: 1em/1.5 sans-serif;

    .pl1,
    .pl2 {
        justify-content: space-around;
    }

    .pl1__a,
    .pl1__b,
    .pl1__c,
    .pl2__a,
    .pl2__b,
    .pl2__c {
        border-radius: 50%;
        width: 1em;
        height: 1em;
        transform-origin: 50% 100%;
    }

    .pl1__a,
    .pl1__b,
    .pl1__c {
        animation: bounce1 1s linear infinite;
    }

    .pl2__a,
    .pl2__b,
    .pl2__c {
        animation: bounce2 2s linear infinite;
    }

    .pl3,
    .pl4 {
        justify-content: space-between;
    }

    .pl3__a,
    .pl3__b,
    .pl3__c,
    .pl3__d,
    .pl4__a,
    .pl4__b,
    .pl4__c,
    .pl4__d {
        width: 0.75em;
        height: 0.75em;
    }

    .pl3__a,
    .pl3__b,
    .pl3__c,
    .pl3__d {
        animation: bounce3 2s ease-in-out infinite;
        transform-origin: 50% 0;
    }

    .pl4 {
        align-items: flex-end;
    }

    .pl4__a,
    .pl4__b,
    .pl4__c,
    .pl4__d {
        animation: bounce4 2s linear infinite;
        transform-origin: 50% 100%;
    }

    .pl1,
    .pl2,
    .pl3,
    .pl4 {
        display: flex;
        margin: 1.5em;
        width: 6em;
        height: 6em;
    }

    .pl1__a,
    .pl2__a,
    .pl3__a,
    .pl4__a {
        background: var(--c1);
    }

    .pl1__b,
    .pl2__b,
    .pl3__b,
    .pl4__b {
        background: var(--c2);
        animation-delay: 0.1s;
    }

    .pl1__c,
    .pl2__c,
    .pl3__c,
    .pl4__c {
        background: var(--c3);
        animation-delay: 0.2s;
    }

    .pl3__d,
    .pl4__d {
        background: var(--c4);
        animation-delay: 0.3s;
    }

    /* Animations */
    @keyframes bounce1 {

        from,
        to {
            transform: translateY(0) scale(1, 1);
            animation-timing-function: ease-in;
        }

        45% {
            transform: translateY(5em) scale(1, 1);
            animation-timing-function: linear;
        }

        50% {
            transform: translateY(5em) scale(1.5, 0.5);
            animation-timing-function: linear;
        }

        55% {
            transform: translateY(5em) scale(1, 1);
            animation-timing-function: ease-out;
        }
    }

    @keyframes bounce2 {

        from,
        to {
            transform: translateY(0) scale(1, 1);
            animation-timing-function: ease-in;
        }

        9%,
        29%,
        49%,
        69% {
            transform: translateY(5em) scale(1, 1);
            animation-timing-function: linear;
        }

        10% {
            transform: translateY(5em) scale(1.5, 0.5);
            animation-timing-function: linear;
        }

        11%,
        31%,
        51%,
        71%,
        91% {
            transform: translateY(5em) scale(1, 1);
            animation-timing-function: ease-out;
        }

        20% {
            transform: translateY(2.5em) scale(1, 1);
            animation-timing-function: ease-in;
        }

        30% {
            transform: translateY(5em) scale(1.25, 0.75);
            animation-timing-function: linear;
        }

        40% {
            transform: translateY(3.75em) scale(1, 1);
            animation-timing-function: ease-in;
        }

        50% {
            transform: translateY(5em) scale(1.125, 0.875);
            animation-timing-function: linear;
        }

        60% {
            transform: translateY(4.375em) scale(1, 1);
            animation-timing-function: ease-in;
        }

        70% {
            transform: translateY(5em) scale(1.0625, 0.9375);
            animation-timing-function: linear;
        }

        85% {
            transform: translateY(5em) scale(1, 1);
            animation-timing-function: ease-in;
        }

        90% {
            transform: translateY(5em) scale(1.875, 0.125);
            animation-timing-function: ease-in-out;
        }
    }

    @keyframes bounce3 {

        from,
        5%,
        95%,
        to {
            transform: translateY(0) scaleY(1);
        }

        16.7% {
            transform: translateY(0) scaleY(8);
        }

        28.3%,
        38.3% {
            transform: translateY(5.25em) scaleY(1);
        }

        50% {
            transform: translateY(2.625em) scaleY(4.5);
        }

        61.7%,
        71.7% {
            transform: translateY(2.625em) scaleY(1);
        }

        83.3% {
            transform: translateY(0) scaleY(4.5);
        }
    }

    @keyframes bounce4 {

        from,
        20%,
        40%,
        60%,
        80%,
        to {
            transform: scaleY(1);
            animation-timing-function: ease-out;
        }

        10% {
            transform: scaleY(8);
            animation-timing-function: ease-in;
        }

        30% {
            transform: scaleY(4);
            animation-timing-function: ease-in;
        }

        50% {
            transform: scaleY(2);
            animation-timing-function: ease-in;
        }

        70% {
            transform: scaleY(1.5);
            animation-timing-function: ease-in;
        }
    }

    /* Dark theme */
    @media (prefers-color-scheme: dark) {
        :root {
            --bg: #17181c;
            --fg: #e3e4e8;
        }
    }
}
</style>

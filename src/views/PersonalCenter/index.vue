<template>
    <div class="personal-center">
        <UserInfo />
    </div>
</template>

<script>
import { mapState } from 'vuex'
import UserInfo from '@/views/PersonalCenter/UserInfo'

export default {
    name: 'PersonalCenter',
    components: { UserInfo },
    data() {
        return {

        }
    },
    computed: {
        ...mapState({ currentUser: (state) => state.user.currentUser })
    },
    methods: {

    },
    mounted() {

    }
}
</script>

<style scoped lang="less">
.personal-center {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 32px;
    box-sizing: border-box;
}
</style>

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
    async created() {
        const state = JSON.parse(JSON.stringify(this.$store.state.user))
        for (let key in state) {
            const stateItem = JSON.stringify(state[key])
            if (stateItem == '{}' || stateItem == '[]' || stateItem == '') {
                this.$bus.$emit('toLoading', true)
                try {
                    await this.$store.dispatch('getUserIp')
                    this.$bus.$emit('toLoading', false)
                } catch (error) {
                    this.$bus.$emit('toLoading', false)
                }
                break
            }
        }
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

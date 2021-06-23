<template>
    <div>
        <div>{{message}}</div>

        <router-link to="/" >
            返回首页
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "Error",
        computed: {
            message() {
                return '找不到网页！'
            }
        }
    }
</script>

<style scoped>

</style>
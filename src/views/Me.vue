<template>
    <div class="me">
        <div>UserName: {{ userName }}</div>
        <div>Name: {{ name }}</div>
    </div>
</template>

<script>
export default {
    name: 'MePage',
    computed: {
        userName() {
            return this.$store.state.user.username
        },
        name() {
            return this.$store.state.user.name
        }
    }
}
</script>
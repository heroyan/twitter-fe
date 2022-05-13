<template>
    <div class="feeds">
        <div v-for="(item, index) in postList" :key="index" class="feed">
            <div class="avatar">username</div>
            <div class="content">content</div>
            <div class="info">
                <span>Comments</span>
                <span>Likes</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    postList: []
  },
}
</script>

<style scoped>
.feeds {
    width: 600px;
    margin: auto;
}
.info span {
    margin-left: 30px;
    display: inline-block;
    width: 200px;
}
</style>
<template>
    <el-row style="width: 100%;">
        <el-col v-for="(item, index) in userList" :key="index" :span="3">
            <div class="user-info">{{ item.nick }}</div>
        </el-col>
    </el-row>
</template>

<script>
export default {
    props: ['userList']
}
</script>

<style scoped>
.user-info {
    width: 80%;
    height: 100px;
    border-radius: 50%;
    background: gold;
    line-height: 100px;
}
</style>
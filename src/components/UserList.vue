<template>
    <el-row v-for="(item, index) in userList" :key="index" class="user-info">
        <el-col  :span="2">
            <el-avatar :size="50" :src="avatar"/>
        </el-col>
        <el-col :span="22">
            <div class="user-nick">{{ item.nick }}</div>
        </el-col>
        <el-divider />
    </el-row>
</template>

<script>
export default {
    props: ['userList'],
    data() {
        return {
            avatar: require('@/assets/avatar.png')
        }
    }
}
</script>

<style scoped>
.user-info {
    width: 100%;
    margin-top: 10px;
}
.user-nick {
    height: 48px;
    line-height: 48px;
    text-align: left;
}
</style>
<template>
    <el-row v-for="(item, index) in userList" :key="index" class="user-info">
        <el-col  :span="2">
            <el-avatar :size="50" :src="avatar" class="avatar" @click="toUserProfile(item.id)"/>
        </el-col>
        <el-col :span="22">
            <div class="user-nick" @click="toUserProfile(item.id)">{{ item.nick }}</div>
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
    },
    methods: {
        toUserProfile(userId) {
            this.$router.push({name: 'user', params: {id: userId}})
        }
    }
}
</script>

<style scoped>
.user-info {
    width: 100%;
    margin-top: 10px;
}
.avatar {
    cursor: pointer;
}
.user-nick {
    height: 48px;
    line-height: 48px;
    text-align: left;
    cursor: pointer;
}
.user-nick:hover {
    color: #ff8000;
}
</style>
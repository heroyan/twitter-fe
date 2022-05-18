<template>
    <el-row>
        <el-page-header content="My Followers" @back="goBack" />
        <user-list :userList="userList" />
    </el-row>
</template>

<script>
import { myFollower } from '@/api/user'
import UserList from '@/components/UserList.vue'

export default {
    name: 'FrPage',
    components: {
        UserList
    },
    data() {
        return {
            userList: []
        }
    },
    created() {
        this.myFollower()
    },
    methods: {
        myFollower() {
            myFollower().then((response) => {
                if(response.code == 0) {
                    this.userList = response.data
                }
            }).catch(err => {
                console.log(err)
            })
        },
        goBack() {
            this.$router.push({name: 'me'})
        }
    }
}
</script>

<style>

</style>
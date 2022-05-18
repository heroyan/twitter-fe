<template>
    <el-row class="fe">
        <el-page-header content="My Followees" @back="goBack" />
        <user-list :userList="userList" />
    </el-row>
</template>

<script>
import { myFollowee } from '@/api/user'
import UserList from '@/components/UserList.vue'

export default {
    name: 'FePage',
    components: {
        UserList
    },
    data() {
        return {
            userList: []
        }
    },
    created() {
        this.myFollowee()
    },
    methods: {
        myFollowee() {
            myFollowee().then((response) => {
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

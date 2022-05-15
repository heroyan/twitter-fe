<template>
    <el-card class="box-card">
        <div class="item">UserName: {{ userName }}</div>
        <div class="item">Name: {{ name }}</div>
        <div class="item"><router-link to="/logout">Logout</router-link></div>
    </el-card>
    <el-tabs v-model="myTab" class="my-tabs" @tab-click="handleClick">
      <el-tab-pane label="My Post" name="first">
        <post-list :postList="myPostList" />
      </el-tab-pane>
      <el-tab-pane label="My Star" name="second">
        <post-list :postList="myStarList" />
      </el-tab-pane>
      <el-tab-pane label="My Like" name="third">
        <post-list :postList="myLikeList" />
      </el-tab-pane>
    </el-tabs>
</template>

<script>
import { myPost } from '@/api/user'
import PostList from '@/components/PostList.vue'

export default {
    name: 'MePage',
    components: {
        PostList
    },
    data() {
        return {
            myTab: 'first',
            myPostList: [],
            myStarList: [],
            myLikeList: []
        }
    },
    created() {
        myPost().then((response) => {
            this.myPostList = response.data
        }).catch(err => {
            console.log(err)
        })
    },
    computed: {
        userName() {
            return this.$store.state.user.username
        },
        name() {
            return this.$store.state.user.name
        }
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab.name)
            console.log(event)
        }
    }
}
</script>

<style scoped>
.item {
  padding: 18px 0;
  text-align: left;
}
</style>
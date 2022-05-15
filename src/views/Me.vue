<template>
    <el-card class="box-card">
        <div class="item">UserName: {{ userName }}</div>
        <div class="item">Name: {{ name }}</div>
        <div class="item"><router-link to="/logout">Logout</router-link></div>
    </el-card>
    <el-tabs v-model="myTab" class="my-tabs" @tab-click="handleClick">
      <el-tab-pane label="My Post" name="mypost">
        <post-list :postList="myPostList" />
      </el-tab-pane>
      <el-tab-pane label="My Star" name="mystar">
        <post-list :postList="myStarList" />
      </el-tab-pane>
      <el-tab-pane label="My Like" name="mylike">
        <post-list :postList="myLikeList" />
      </el-tab-pane>
    </el-tabs>
</template>

<script>
import { myPost, myLike, myStar } from '@/api/user'
import PostList from '@/components/PostList.vue'

export default {
    name: 'MePage',
    components: {
        PostList
    },
    data() {
        return {
            myTab: 'mypost',
            myPostList: [],
            myStarList: [],
            myLikeList: []
        }
    },
    created() {
        this.myPost()
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
        handleClick() {
            var that = this
            this.$nextTick(function () {
                if(that.myTab == 'mypost') {
                    that.myPost()
                } else if(that.myTab == 'mylike') {
                    that.myLike()
                } else if(that.myTab == 'mystar') {
                    that.myStar()
                }
            })
        },
        myPost() {
            myPost().then((response) => {
                this.myPostList = response.data
            }).catch(err => {
                console.log(err)
            })
        },
        myLike() {
            myLike().then((response) => {
                this.myLikeList = response.data
            }).catch(err => {
                console.log(err)
            })
        },
        myStar() {
            myStar().then((response) => {
                this.myStarList = response.data
            }).catch(err => {
                console.log(err)
            })
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
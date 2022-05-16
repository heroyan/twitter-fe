<template>
    <el-row class="user-info">
        <el-col :span="6">
            <div class="item">UserId: {{ userId }}</div>
        </el-col>
        <el-col :span="6">
            <div class="item">UserName: {{ userName }}</div>
        </el-col>
        <el-col :span="6">
            <div class="item">Name: {{ name }}</div>
        </el-col>
        <el-col :span="6">
            <div class="item"><router-link to="/logout">Logout</router-link></div>
        </el-col>
        <el-col :span="6">
            <div class="item">FollowerNum: <router-link to="/followers">{{ followerNum }}</router-link></div>
        </el-col>
        <el-col :span="6">
            <div class="item">FolloweeNum: <router-link to="/followees">{{ followeeNum }}</router-link></div>
        </el-col>
        <el-col :span="24">
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
        </el-col>
    </el-row>
</template>

<script>
import { myPost, myLike, myStar, followerNum, followeeNum } from '@/api/user'
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
            myLikeList: [],
            followerNum: 0,
            followeeNum: 0
        }
    },
    created() {
        this.myPost()
        this.$nextTick(function(){
            this.getFollowerNum()
            this.getFolloweeNum()
        })
    },
    computed: {
        userId() {
            return this.$store.state.user.token
        },
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
        },
        getFollowerNum() {
            followerNum({id: this.userId}).then((response) => {
                this.followerNum = response.data
            }).catch(err => {
                console.log(err)
            })
        },
        getFolloweeNum() {
            followeeNum({id: this.userId}).then((response) => {
                this.followeeNum = response.data
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style scoped>
.user-info {
  padding: 18px;
  text-align: left;
}
</style>
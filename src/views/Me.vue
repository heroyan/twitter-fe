<template>
    <el-row class="user-info">
        <el-descriptions
            class="user-desc"
            title="User Info"
            :column="3"
            border
        >
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                    <el-icon class="iconStyle">
                        <Avatar />
                    </el-icon>
                    UserId
                    </div>
                </template>
                 {{ userId }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                    <el-icon class="iconStyle">
                        <user />
                    </el-icon>
                    UserName
                    </div>
                </template>
                 {{ userName }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                    <el-icon class="iconStyle">
                        <user />
                    </el-icon>
                    Name
                    </div>
                </template>
                 {{ name }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                    <el-icon class="iconStyle">
                        <user />
                    </el-icon>
                    FollowerNum
                    </div>
                </template>
                 <router-link to="/followers">{{ followerNum }}</router-link>
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                    <el-icon class="iconStyle">
                        <user />
                    </el-icon>
                    FolloweeNum
                    </div>
                </template>
                <router-link to="/followees">{{ followeeNum }}</router-link>
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                    <el-icon class="iconStyle">
                        <user />
                    </el-icon>
                    Logout
                    </div>
                </template>
                <el-button type="warning" @click="logout" round>Logout</el-button>
            </el-descriptions-item>
        </el-descriptions>
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
import { myPost, myLike, myStar, followerNum, followeeNum, logout } from '@/api/user'
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
        },
        logout() {
            logout().then((response) => {
                if(response.code == 0) {
                    this.$store.dispatch('user/resetToken')
                    this.$router.push({name: 'home'})
                }
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
.user-desc {
    width: 100%;
}
.iconStyle {
    margin-right: 6px;
}
</style>
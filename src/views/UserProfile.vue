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
                {{ followerNum }}
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
                {{ followeeNum }}
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
                <router-link to="/logout">Logout</router-link>
            </el-descriptions-item>
        </el-descriptions>
        <el-col :span="24">
            <el-tabs v-model="myTab" class="my-tabs" @tab-click="handleClick">
                <el-tab-pane label="User Post" name="mypost">
                    <post-list :postList="myPostList" />
                </el-tab-pane>
            </el-tabs>
        </el-col>
    </el-row>
</template>

<script>
import { getUser, myPost, followerNum, followeeNum } from '@/api/user'
import PostList from '@/components/PostList.vue'

export default {
    name: 'UserPage',
    components: {
        PostList
    },
    created() {
        this.$watch(
            () => this.$route.params,
            (toParams, previousParams) => {
                console.log(previousParams)
                this.userId = toParams.id
                this.myPost()
                this.getFollowerNum()
                this.getFolloweeNum()
            }
        )
    },
    data() {
        return {
            myTab: 'mypost',
            myPostList: [],
            userId: '',
            userName: '',
            name: '',
            followerNum: 0,
            followeeNum: 0
        }
    },
    methods: {
        getUser() {
            getUser({id: this.userId}).then((response) => {
                this.userName = response.data.user_name
                this.userName = response.data.nick
            }).catch(err => {
                console.log(err)
            })
        },
        handleClick() {
            var that = this
            this.$nextTick(function () {
                if(that.myTab == 'mypost') {
                    that.myPost()
                }
            })
        },
        myPost() {
            myPost({id: this.userId}).then((response) => {
                this.myPostList = response.data
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
.user-desc {
    width: 100%;
}
.iconStyle {
    margin-right: 6px;
}
</style>
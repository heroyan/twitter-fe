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
                 <el-icon class="iconStyle" @click="updateInfo">
                    <Edit />
                </el-icon>
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
    <el-dialog v-model="show" title="Edit your name">
        <el-form :model="form" label-width="120px">
            <el-form-item label="Name">
                <el-input v-model="form.name" type="text" autocomplete="off" placeholder="Please input name" />
            </el-form-item>
        </el-form>
        <template #footer>
        <span class="dialog-footer">
            <el-button @click="show = false">Cancel</el-button>
            <el-button type="primary" @click="onSubmit">Confirm</el-button>
        </span>
        </template>
    </el-dialog>
</template>

<script>
import { myPost, myLike, myStar, followerNum, followeeNum, updateInfo, logout } from '@/api/user'
import { ElMessage } from 'element-plus'
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
            followeeNum: 0,
            show: false,
            form: {
                name: ''
            }
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
        },
        updateInfo() {
            this.show = true
            this.form.name = this.name
        },
        onSubmit() {
            if(this.form.name === '') {
                ElMessage({
                        message: 'name can not be empty',
                        type: 'error',
                        duration: 3000
                })
                return
            }
            // name no change, ignore
            if(this.form.name == this.name) {
                this.show = false
                return
            }
            updateInfo({nick: this.form.name}).then(() => {
                this.$store.dispatch('user/getInfo')
                this.show = false
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
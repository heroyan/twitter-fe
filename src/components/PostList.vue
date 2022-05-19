<template>
    <div class="feeds">
        <div v-for="(item, index) in postList" :key="index" class="feed">
            <el-row class="feed-header">
                <el-col :span="1">
                    <img :src="avatar" class="avatar" @click="toUserProfile(item.user_id)"/>
                </el-col>
                <el-col :span="23" class="user-name">
                    <span class="user-nick" @click="toUserProfile(item.user_id)">{{ item.user_nick}}</span>
                    <span class="follow"><el-button @click="follow(item.user_id)">{{ getFollowText(item.user_id) }}</el-button></span>
                </el-col>
            </el-row>
            <div class="feed-content">
                {{ item.content }}
            </div>
            <div class="feed-footer">
                <span>
                    <span class="number" @click="showComment(item)">
                        <el-icon><Comment /></el-icon>
                        {{ item.comment_num }}
                    </span>
                </span>
                <span>
                    <span class="number" v-bind:class="like(item)" @click="addLike(item)">
                        <el-icon><Apple /></el-icon>
                        {{ item.like_num }}
                    </span>
                </span>
                <span>
                    <span class="number" v-bind:class="star(item)" @click="addStar(item)">
                        <el-icon><Star /></el-icon>
                        {{ item.star_num }}
                    </span>
                </span>
                <el-row v-show="isComment(item)" :gutter="20">
                    <el-col :span="12">
                        <el-input v-model="comment" autocomplete="off" placeholder="Please comment content" />
                    </el-col>
                    <el-col :span="12">
                        <el-button type="warning" @click="addComment(item)">Comment</el-button>
                    </el-col>
                    <comment-list :commentList="commentListMap[item.id]" />
                </el-row>
            </div>
            <el-divider />
        </div>
    </div>
</template>

<script>
import { addLike, addStar, addComment, getCommentList } from '@/api/post'
import { addFollow, isFollow, isStar, isLike } from '@/api/user'
import CommentList from '@/components/CommentList.vue'

export default {
  props: ['postList'],
  components: {
      CommentList
  },
  data() {
      return {
          avatar: require('@/assets/avatar.png'),
          start: 0,
          comment: '',
          commented: {},
          followed: {},
          liked: {},
          stared: {},
          commentListMap: {}
      }
  },
  watch: {
        postList: function(){
            this.isFollow()
        }
  },
  methods: {
      showComment(item) {
          this.commented[item.id] = !this.commented[item.id]
          // get comment list
          getCommentList({id: item.id}).then((response) => {
               this.commentListMap[item.id] = response.data
          }).catch(err => {
               console.log(err)
          })
      },
      addLike(item) {
          addLike({post_id: item.id}).then(() => {
             item.like_num++
             this.liked[item.id] = true
          }).catch(err => {
            console.log(err)
          })
      },
      addStar(item) {
          addStar({post_id: item.id}).then(() => {
             item.star_num++
             this.stared[item.id] = true
          }).catch(err => {
            console.log(err)
          })
      },
      addComment(item) {
          this.commented = {}
          this.commented[item.id] = true
          addComment({post_id: item.id, content: this.comment}).then(() => {
             item.comment_num++
             this.comment = ''
             this.showComment(item)
          }).catch(err => {
            console.log(err)
          })
      },
      follow(userId) {
          addFollow({id: userId}).then((response) => {
              if(response.code == 0) {
                  this.followed[userId] = true
                  console.log('followed')
              }
          }).catch(err => {
              console.log(err)
          })
      },
      getFollowText(userId) {
          if(this.followed[userId]) {
              return 'UnFollow'
          } else {
              return '+ Follow'
          }
      },
      isFollow() {
          let idList = []
          let postIdList = []
          for(let idx=this.start; idx < this.postList.length; idx++) {
              let item = this.postList[idx]
              idList.push(item.user_id)
              postIdList.push(item.id)
          }
          console.log(idList)
          console.log(postIdList)
          this.start = this.postList.length
          isFollow({idList: idList}).then((response) => {
              if(response.code == 0) {
                  for(let key in response.data) {
                      this.followed[key] = response.data[key]
                  }
              }
          }).catch(err => {
              console.log(err)
          })
          isLike({idList: postIdList}).then((response) => {
              if(response.code == 0) {
                  for(let key in response.data) {
                      this.liked[key] = response.data[key]
                  }
              }
          }).catch(err => {
              console.log(err)
          })
          isStar({idList: postIdList}).then((response) => {
              if(response.code == 0) {
                  for(let key in response.data) {
                      this.stared[key] = response.data[key]
                  }
              }
          }).catch(err => {
              console.log(err)
          })
      },
      isComment(item) {
          if(this.commented[item.id]) {
              return true
          }

          return false
      },
      like(item) {
          if(this.liked[item.id]) {
              return {
                  checked: true
              }
          }
          return {
            checked: false
          }
      },
      star(item) {
          if(this.stared[item.id]) {
              return {
                  checked: true
              }
          }
          return {
            checked: false
          }
      },
      toUserProfile(userId) {
          this.$router.push({name: 'user', params: {id: userId}})
      }
  }
}
</script>

<style scoped>
.feeds {
    margin: auto;
}
.feed {
    margin: 20px 0px;
    background: white;
    padding: 10px;
    text-align: left;
}
.avatar {
    width: 48px;
    height: 48px;
    display: inline;
    border-radius: 50%;
    cursor: pointer;
}
.user-name {
    height: 48px;
    line-height: 48px;
    text-align: left;
}
.user-nick {
    margin-left: 10px;
    cursor: pointer;
}
.user-nick:hover {
    color: #ff8000;
}
.follow {
    margin-left: 50px;
}
.feed-content {
    white-space: pre-wrap;
    padding: 48px;
}
.feed-footer {
    margin-left: 48px;
}
.feed-footer span {
    display: inline-block;
    width: 33%;
}
.feed-footer .number:hover, .checked {
    color: rgb(255 190 115);
    cursor: pointer;
}
</style>
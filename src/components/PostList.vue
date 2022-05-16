<template>
    <div class="feeds">
        <div v-for="(item, index) in postList" :key="index" class="feed">
            <div class="feed-header">
                <img :src="avatar" class="avatar"/>
                <span class="user-name">{{ item.user_nick}}</span>
                <span class="follow"><el-button @click="follow(item.user_id)">{{ getFollowText(item.user_id) }}</el-button></span>
            </div>
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
                    <span class="number" @click="addLike(item)">
                        <el-icon><Apple /></el-icon>
                        {{ item.like_num }}
                    </span>
                </span>
                <span>
                    <span class="number" @click="addStar(item)">
                        <el-icon><Star /></el-icon>
                        {{ item.star_num }}
                    </span>
                </span>
                <el-row v-show="isComment(item)">
                    <el-input v-model="comment" autocomplete="off" placeholder="Please comment content" />
                    <el-button type="warning" @click="addComment(item)">Comment</el-button>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
import { addLike, addStar, addComment } from '@/api/post'
import { addFollow, isFollow } from '@/api/user'

export default {
  props: ['postList'],
  data() {
      return {
          avatar: require('@/assets/avatar.png'),
          start: 0,
          comment: '',
          commented: {},
          followed: {},
          liked: {},
          stared: {}
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
      },
      addLike(item) {
          addLike({post_id: item.id}).then(() => {
             item.like_num++
          }).catch(err => {
            console.log(err)
          })
      },
      addStar(item) {
          addStar({post_id: item.id}).then(() => {
             item.star_num++
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
          for(let idx=this.start; idx < this.postList.length; idx++) {
              let item = this.postList[idx]
              idList.push(item.user_id)
          }
          console.log(idList)
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
      },
      isComment(item) {
          if(this.commented[item.id]) {
              return true
          }

          return false
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
.feed-footer .number:hover {
    color: rgb(255 190 115);
    cursor: pointer;
}
</style>
<template>
    <div class="feeds">
        <div v-for="(item, index) in postList" :key="index" class="feed">
            <div class="feed-header">
                <img :src="avatar" class="avatar"/>
                <span class="user-name">{{ item.user_id}}</span>
            </div>
            <div class="feed-content">
                {{ item.content }}
            </div>
            <div class="feed-footer">
                <span>
                    <span class="number" @click="showComment">{{ item.comment_num }} Comments</span>
                </span>
                <span>
                    <span class="number" @click="addLike(item)">{{ item.like_num }} Likes</span>
                </span>
                <span>
                    <span class="number" @click="addStar(item)">{{ item.star_num }} Stars</span>
                </span>
                <el-row v-show="isComment">
                    <el-input v-model="comment" autocomplete="off" placeholder="Please comment content" />
                    <el-button type="warning" @click="addComment(item)">Comment</el-button>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
import { addLike, addStar, addComment } from '@/api/post'

export default {
  props: ['postList'],
  data() {
      return {
          avatar: require('@/assets/avatar.png'),
          isComment: false,
          comment: ''
      }
  },
  methods: {
      showComment() {
          this.isComment = !this.isComment
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
          addComment({post_id: item.id, content: this.comment}).then(() => {
             item.comment_num++
             this.comment = ''
             this.showComment()
          }).catch(err => {
            console.log(err)
          })
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
    background: rgb(231, 225, 224);
    border-radius: 20%;
    cursor: pointer;
}
</style>
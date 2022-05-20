<template>
  <div class="home">
    <el-tabs v-model="myTab" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="Hot" name="hot">
        <post-list :postList="hotList" />
      </el-tab-pane>
      <el-tab-pane v-if="loggined" label="Follow" name="following">
        <post-list :postList="followingList" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { myFollow, hotPost } from '@/api/user'
import PostList from '@/components/PostList.vue'

export default {
  name: 'HomePage',
  components: {
    PostList
  },
  data() {
    return {
      myTab: 'hot',
      hotList: [],
      followingList: []
    }
  },
  created() {
    this.hotPost()
  },
  computed: {
        loggined() {
            return this.$store.state.user.token !== ''
        },
  },
  methods: {
    handleClick() {
        var that = this
        this.$nextTick(function () {
            if(that.myTab == 'hot') {
                that.hotPost()
            } else if(that.myTab == 'following') {
                that.followingPost()
            }
        })
    },
    hotPost() {
      hotPost().then((response) => {
          this.hotList = response.data
      }).catch(err => {
          console.log(err)
      })
    },
    followingPost() {
      myFollow().then((response) => {
          this.followingList = response.data
      }).catch(err => {
          console.log(err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  padding: 20px;
}
</style>

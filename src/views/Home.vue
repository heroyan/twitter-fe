<template>
  <div class="home">
    <el-tabs v-model="myTab" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="Hot" name="first">
        <post-list :postList="hotList" />
      </el-tab-pane>
      <el-tab-pane label="Following" name="second">
        <post-list :postList="followingList" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { myPost } from '@/api/user'
import PostList from '@/components/PostList.vue'

export default {
  name: 'HomePage',
  components: {
    PostList
  },
  data() {
    return {
      myTab: 'first',
      hotList: [],
      followingList: []
    }
  },
  created() {
    myPost().then((response) => {
        this.hotList = response.data
    }).catch(err => {
        console.log(err)
    })
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab)
      console.log(event)
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

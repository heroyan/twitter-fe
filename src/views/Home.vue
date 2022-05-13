<template>
  <div class="home">
     <post-list :postList="postList" />
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
      postList: []
    }
  },
  created() {
    myPost().then((response) => {
        this.postList = response.data
    }).catch(err => {
        console.log(err)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

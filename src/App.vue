<template>
  <div id="app">
    <!-- 路由出口 -->
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="discovery">Discovery</el-menu-item>
      <el-menu-item index="me" v-show="!showLogin()">Me</el-menu-item>
      <el-menu-item index="login" v-show="showLogin()">Login</el-menu-item>
      <el-menu-item index="post" v-show="!showLogin()"><el-icon><Edit /></el-icon>Post</el-menu-item>
    </el-menu>
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <post ref="post" />
  </div>
</template>

<script>
import Post from '@/components/Post.vue'

export default {
  name: 'App',
  components: {
     Post
  },
  created() {
    this.$store.dispatch('user/getInfo')
  },
  data() {
    return {
      activeIndex: "1"
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      switch(key) {
        case "discovery":
          this.$router.push({name: 'home'})
          break;
        case "me":
          this.$router.push({name: 'me'})
          break;
        case "login":
          this.$router.push({name: 'login'})
          break;
        case "post":
          this.$refs.post.showPost()
          break;
      }
      console.log(keyPath)
    },
    showLogin() {
      return this.$store.state.user.token == ""
    }
  }
}
</script>

<style>
html {
  background-color: #f5f5f5;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 1122px;
  background: white;
  margin: auto;
  
}
</style>

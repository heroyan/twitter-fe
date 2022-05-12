<template>
  <div id="app">
    <!-- 路由出口 -->
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">Discovery</el-menu-item>
      <el-menu-item index="2">Me</el-menu-item>
      <el-menu-item index="3">Login</el-menu-item>
    </el-menu>
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      activeIndex: "1"
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(this.$router)
      console.log(this.$route)
      switch(key) {
        case 1:
          this.$router.push({name: 'home'})
          break;
        case 2:
          break;
        case 3:
          this.$router.push({name: 'login'})
          break;
      }
      console.log(keyPath)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 1122px;
  margin: auto;
}
</style>

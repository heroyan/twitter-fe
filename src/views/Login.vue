<template>
    <div class="loginForm">
        <el-form :model="form" label-width="120px">
            <el-form-item label="User Name">
                <el-input v-model="form.username" autocomplete="off" placeholder="Please input username" />
            </el-form-item>
            <el-form-item label="Password">
                <el-input v-model="form.passwd" type="password" autocomplete="off" placeholder="Please input password" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">Login</el-button>
                <router-link to="/register" class="el-button el-button--info" style="text-decoration:none;">Register</router-link>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { loginUser } from '@/api/user'

export default {
  name: 'LoginPage',
  components: {
  },
  data() {
      return {
          'form': {
              'username': '',
              'passwd': ''
          }
      }
  },
  methods: {
      onSubmit() {
          loginUser({user_name: this.form.username, passwd: this.form.passwd}).then((response) => {
              if(response.code == 0) {
                  this.$store.dispatch('user/getInfo')
                  this.$router.push({name: 'home'})
                  return
              }
              alert("Login failed: " + response.msg)
          }).catch(err => {
            console.log(err)
        })
      },
      checkLogin() {
            console.log(this.$store.state.user)
            if(this.$store.state.user.token != "") {
                this.$router.push({name: 'home'})
            }
      }
  }
}
</script>

<style scoped>
.loginForm {
    width: 600px;
    margin: auto;
}
</style>

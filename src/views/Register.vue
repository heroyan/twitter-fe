<template>
    <div class="registerForm">
        <el-form :model="form" label-width="120px">
            <el-form-item label="User Name">
                <el-input v-model="form.username" autocomplete="off" placeholder="Please input username" />
            </el-form-item>
            <el-form-item label="Password">
                <el-input v-model="form.passwd" type="password" autocomplete="off" placeholder="Please input password" />
            </el-form-item>
            <el-form-item label="Confirm Password">
                <el-input v-model="form.passwd2" type="password" autocomplete="off" placeholder="Please confirm password" />
            </el-form-item>
            <el-form-item label="Nick name">
                <el-input v-model="form.nick" autocomplete="off" placeholder="Please input nickname" />
            </el-form-item>
            <el-form-item label="Your age">
                <el-input v-model="form.age" type="number" autocomplete="off" placeholder="your age" />
            </el-form-item>
            <el-form-item label="Your gender">
                <el-radio-group v-model="form.gender">
                    <el-radio :label="1">Male</el-radio>
                    <el-radio :label="0">Female</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">Register</el-button>
                <el-button type @click="cancel">Cancel</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { register } from '@/api/user'
import { ElMessage } from 'element-plus'

export default {
  name: 'RegisterPage',
  components: {
  },
  data() {
      return {
          'form': {
              'username': '',
              'passwd': '',
              'passwd2': '',
              'age': 0,
              'gender': 1
          }
      }
  },
  methods: {
      onSubmit() {
          // check two passwds if same
          if(!this.form.passwd || this.form.passwd !== this.form.passwd2) {
              ElMessage({
                 message: 'passwd cannot be empty and passwd confirm must be the same',
                 type: 'error',
                 duration: 4 * 1000
              })
              return
          }
          register({
              user_name: this.form.username, 
              passwd: this.form.passwd,
              nick: this.form.nick,
              age: parseInt(this.form.age),
              gender: this.form.gender == 1
          }).then((response) => {
              if(response.code == 0) {
                  ElMessage({
                    message: 'register successfully!',
                    type: 'success',
                    duration: 4 * 1000
                  })
                  this.$router.push({name: 'login'})
                  return
              }
              alert("register failed: " + response.msg)
          }).catch(err => {
            console.log(err)
          })
      },
      cancel() {
        this.$router.go(-1)    
      }
  }
}
</script>

<style scoped>
.registerForm {
    width: 600px;
    margin: auto;
}
</style>

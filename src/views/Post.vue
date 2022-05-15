<template>
    <div class="postForm">
        <el-form :model="form" label-width="120px">
            <el-form-item label="Content">
                <el-input v-model="form.content" rows="5" type="textarea" autocomplete="off" placeholder="Please input content" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">Post</el-button>
                <router-link to="/" class="el-button el-button--info" style="text-decoration:none;">Cancel</router-link>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { addPost } from '@/api/post'
import { ElMessage } from 'element-plus'

export default {
  name: 'PostPage',
  data() {
      return {
          form: {
              content: ''
          }
      }
  },
  methods: {
      onSubmit() {
          // check content
          if(this.form.content.length < 5) {
                ElMessage({
                    message: 'content cannot be too short',
                    type: 'error',
                    duration: 4 * 1000
                })
                return
          }
          addPost({
              content: this.form.content
          }).then((response) =>{
              if(response.code == 0) {
                  this.$router.push({name: 'me'})
              }
          }).catch(err => {
            console.log(err)
        })
      }
  }
}
</script>

<style scoped>
.postForm {
    width: 600px;
    margin: auto;
    padding: 18px;
}
</style>

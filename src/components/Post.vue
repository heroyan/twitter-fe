<template>
    <el-dialog v-model="show" title="Post something interesting">
        <el-form :model="form" label-width="120px">
            <el-form-item label="Content">
                <el-input v-model="form.content" rows="5" type="textarea" autocomplete="off" placeholder="Please input content" />
            </el-form-item>
        </el-form>
        <template #footer>
        <span class="dialog-footer">
            <el-button @click="show = false">Cancel</el-button>
            <el-button type="primary" @click="onSubmit">Confirm</el-button>
        </span>
        </template>
    </el-dialog>
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
          },
          show: false
      }
  },
  methods: {
      showPost() {
          this.show = true
      },
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
                  this.form.content = ''
                  this.show = false
              }
          }).catch(err => {
            console.log(err)
        })
      }
  }
}
</script>


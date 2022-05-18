<template>
   <div class="comment-list">
       <el-row v-for="(item, index) in commentList" :key="index" class="comment-one">
           <el-divider />
           <el-col :span="6" class="comment-header">
               <el-icon><Avatar /></el-icon>{{ item.user_nick }}
           </el-col>
           <el-col :span="18">
               {{ getDatetime(1000*item.create_time) }}
           </el-col>
           <el-col :span="24" class="comment-content">
               {{ item.content }}
           </el-col>
       </el-row>
   </div>
</template>

<script>
import moment from 'moment'

export default {
    props: ['commentList'],
    methods: {
        getDatetime(timestamp) {
            return moment(timestamp).format('YYYY-MM-DD hh:mm:ss')
        }
    }
}
</script>

<style>

</style>
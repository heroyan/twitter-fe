<template>
    <div>
        &nbsp;
    </div>
</template>

<script>
import { logout } from '@/api/user'

export default {
  name: 'LogoutPage',
  created() {
      logout().then((response) => {
          if(response.code == 0) {
              this.$store.dispatch('user/resetToken')
              this.$router.push({name: 'home'})
          }
      }).catch(err => {
          console.log(err)
      })
  }
}
</script>

<style scoped>
.loginForm {
    width: 600px;
    margin: auto;
}
</style>

<template>
  <div>
    <h1>noteId:{{ $route.query.noteId }}</h1>
  </div>
</template>

<script>
import Auth from '../apis/auth'

export default {
  data() {
    return {
      msg: '回收站'
    }
  },
  created() {
    Auth.getInfo()
      .then(res=>{
        if(!res.isLogin){
          this.$router.push({path:'/login'})
        }
      })
  }
}
</script>

<style scoped>
h1{
  color: #dd13e1;
}
</style>

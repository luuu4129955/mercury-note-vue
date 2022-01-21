<template>
  <div class="detail" id="notebook-list">
    <header>
      <a href="#" class="btn" @click.prevent="onCreate"><i class="iconfont icon-plus"></i> 新建笔记本</a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表()</h3>
        <div class="book-list">
<!--          <router-link v-for="notebook in notebooks" to="/note/1" class="notebook">-->
<!--            <div>-->
<!--              <span class="iconfont icon-notebook"></span> {{notebook.title}}-->
<!--              <span>{{notebook.noteCounts}}</span>-->
<!--              <span class="action" @click.stop.prevent="onEdit(notebook)">编辑</span>-->
<!--              <span class="action" @click.stop.prevent="onDelete(notebook)">删除</span>-->
<!--              <span class="date">{{notebook.friendlyCreatedAt}}</span>-->
<!--            </div>-->
<!--          </router-link>-->
          <div>
            <span class="iconfont icon-notebook"></span> 标题
            <span>笔记数量</span>
            <span class="action" @click.stop.prevent="onEdit()">编辑</span>
            <span class="action" @click.stop.prevent="onDelete()">删除</span>
            <span class="date">创建时间</span>
          </div>
        </div>
      </div>

    </main>

  </div>
</template>

<script>
import Auth from '../apis/auth'

export default {
  data() {
    return {
      msg: '笔记本列表'
    }
  },
  created() {
    Auth.getInfo()
    .then(res=>{
      if(!res.isLogin){
        this.$router.push({path:'/login'})
      }
    })
  },
  methods:{
    onCreate(){
      console.log('create');
    },
    onEdit(){
      console.log('edit');
    },
    onDelete(){
      console.log('delete');
    }
  }
}
</script>

<style lang="less" scoped>
@import url("../assets/css/notebook-list.less");
</style>

<template>
  <div class="note-sidebar">
    <span class="btn add-note">添加笔记</span>
    <el-dropdown class="notebook-title" placement="bottom">
      <span class="el-dropdown-link">
        标题 <i class="iconfont icon-down"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item  v-for="notebook in notebooks" :key="notebook.id">{{ notebook.title }}</el-dropdown-item>
        <el-dropdown-item command="trash">回收站</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="menu">
      <div>更新时间</div>
      <div>标题</div>
    </div>
    <ul class="notes">
      <li v-for="note in notes" :key="note.id">
        <router-link to="`/note?noteId=${note.id}&notebookId=${curBook.id}`">
          <span class="date">{{ note.updatedAtFriendly }}</span>
          <span class="title">{{note.title}}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  created() {

  },

  data() {
    return {
      notebooks: [
        {id:1,title:'假笔记本1'},
        {id:2,title:'假笔记本2'},
      ],
      notes: [
        {id:11,title:'假笔记11',updatedAtFriendly:'刚刚'},
        {id:22,title:'假笔记22',updatedAtFriendly:'1分钟前'}
      ],
      curBook: {}
    }
  },


}
</script>

<style lang="less" scoped>
@import url(../assets/css/note-sidebar.less);
</style>

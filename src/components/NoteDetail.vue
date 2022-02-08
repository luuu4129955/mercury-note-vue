<template>
  <div id="note" class="detail">
    <NoteSidebar></NoteSidebar>
    <div class="note-detail">
      <div class="note-detail-ct">
        <div class="note-bar">
          <span> 创建日期:{{ currentNotebook.createdAtFriendly }} </span>
          <span> 更新日期: {{currentNotebook.updatedAtFriendly}}</span>
          <span> {{currentNotebook.statusText}}</span>
          <span class="iconfont icon-delete"></span>
          <span class="iconfont icon-fullscreen"></span>
        </div>
        <div class="note-title">
          <input type="text" :value="currentNotebook.title"
                 placeholder="输入标题">
        </div>
        <div class="editor">
          <textarea :value="currentNotebook.content"
            @keydown="statusText='正在输入...'"></textarea>
          <div class="preview markdown-body">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from '../apis/auth'
import NoteSidebar from '../components/NoteSidebar'
import Bus from '../helpers/bus'
import MarkdownIt from 'markdown-it'

let md = new MarkdownIt()


export default {
  components: {NoteSidebar},

  data() {
    return {
      currentNotebook:{
        title:'我的笔记',
        content:'哈哈',
        createdAtFriendly:'一天前',
        updatedAtFriendly:'刚刚',
        statusText:'已保存'
      }
    }
  },

  created() {

  },

  computed: {},

  methods: {},

}
</script>

<style lang="less" scoped>
@import url(../assets/css/note-detail.less);

#note {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;
}
</style>

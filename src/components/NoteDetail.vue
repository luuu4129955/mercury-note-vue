<template>
  <div id="note" class="detail">
    <NoteSidebar ></NoteSidebar>
    <div class="note-detail">
      <div class="note-empty" v-show="!curNote.id">请选择笔记</div>
      <div class="note-detail-ct" v-show="curNote.id">
        <div class="note-bar">
          <span> 创建日期: </span>
          <span> 更新日期: </span>
          <span> 状态文本</span>
          <span class="iconfont icon-delete" ></span>
          <span class="iconfont icon-fullscreen" @click="isShowPreview = !isShowPreview"></span>
        </div>
        <div class="note-title">
          <input type="text" v-model:value="curNote.title"  @keydown="statusText='正在输入...'"
                 placeholder="输入标题">
        </div>
        <div class="editor">
          <textarea v-show="isShowPreview"
                    @keydown="statusText='正在输入...'" ></textarea>
          <div class="preview markdown-body" v-html="previewContent" v-show="!isShowPreview">
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
      curNote: {},
      notes: [],
      statusText: '笔记未改动',
      isShowPreview: false
    }
  },

  created() {
    Auth.getInfo()
      .then(res => {
        if (!res.isLogin) {
          this.$router.push({path: '/login'})
        }
      })
    Bus.$once('update:notes', val => {
      this.curNote = val.find(note => note.id === this.$route.query.noteId) || {}
    })
  },

  computed: {
    previewContent() {
      console.log(this.curNote.content || '')
      return md.render(this.curNote.content || '')
    }
  },

  methods: {




  },

  beforeRouteUpdate(to, from, next) {
    this.curNote = this.notes.find(note => note.id === to.query.noteId) || {}
    next()
  }
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

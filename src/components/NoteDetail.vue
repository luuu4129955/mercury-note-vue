<template>
  <div id="note" class="detail">
    <note-sidebar @update:notes="(val) => (notes = val)"></note-sidebar>
    <div class="note-detail">
      <div class="note-empty" v-show="!currentNote.id">请选择笔记</div>
      <div class="note-detail-ct" v-show="currentNote.id">
        <div class="note-bar">
          <span> 创建日期: {{ currentNote.createdAtFriendly }}</span>
          <span> 更新日期: {{ currentNote.updatedAtFriendly }}</span>
          <span> {{ statusText }}</span>
          <span class="iconfont icon-delete" @click="deleteNote"></span>
          <span
            class="iconfont icon-fullscreen"
            @click="isShowPreview = !isShowPreview"
          ></span>
        </div>
        <div class="note-title">
          <input
            type="text"
            v-model:value="currentNote.title"
            @input="updateNote"
            @keydown="statusText = '正在输入...'"
            placeholder="输入标题"
          />
        </div>
        <div class="editor">
          <textarea
            v-model:value="currentNote.content"
            v-show="isShowPreview"
            @input="updateNote"
            @keydown="statusText = '正在输入...'"
            placeholder="输入内容, 支持 markdown 语法"
          ></textarea>
          <div
            v-html="previewContent"
            class="preview markdown-body"
            v-show="!isShowPreview"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from '../apis/auth'
import NoteSidebar from '../components/NoteSidebar'
import _ from "lodash";
import Bus from '../helpers/bus'
import Notes from "../apis/notes";
import MarkdownIt from "markdown-it";

let md = new MarkdownIt();

export default {
  components: {NoteSidebar},

  data() {
    return {
      currentNote: {},
      notes: [],
      statusText: '笔记未改动',
      isShowPreview: false
    }
  },
  created() {
    Auth.getInfo().then((res) => {
      if (!res.isLogin) {
        this.$router.push({path: "/login"});
      }
    });
    Bus.$once("update:notes", (val) => {
      this.currentNote = val.find((note) => note.id.toString() === this.$route.query.noteId) || {};
      // console.log(`currentNote:${this.currentNote}`);
    });
  },

  computed: {
    previewContent() {
      return md.render(this.currentNote.content || "");
    },
  },

  methods: {
    updateNote: _.debounce(function () {
      Notes.updateNote(
        {noteId: this.currentNote.id},
        {title: this.currentNote.title, content: this.currentNote.content}
      )
        .then((data) => {
          this.statusText = "已保存";
        })
        .catch((data) => {
          this.statusText = "保存出错";
        });
    }, 300),

    deleteNote() {
      console.log('deleteNote');
      Notes.deleteNote({noteId: this.currentNote.id})
        .then(data => {
          this.$message.success(data.msg);
          this.notes.splice(this.notes.indexOf(this.currentNote), 1);
          this.$router.replace({path: "/note"});
        })
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.currentNote = this.notes.find((note) => note.id.toString() === to.query.noteId)
    next()
  },

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

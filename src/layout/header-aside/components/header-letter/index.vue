<template>
  <div>
    <el-tooltip
      effect="dark"
      :content="message"
      placement="bottom">
      <el-button
        class="d2-ml-0 d2-mr btn-text can-hover"
        type="text"
        @click="handleClick">
        <el-badge
          v-if="letterCount > 0"
          :max="99"
          :value="letterCount"
          :is-dot="letterCount === 0">
          <d2-icon
            :name="letterCount === 0 ? 'dot-circle-o' : 'bug'"
            style="font-size: 20px"/>
        </el-badge>
        <d2-icon
          v-else
          name="dot-circle-o"
          style="font-size: 20px"/>
      </el-button>
    </el-tooltip>
    <el-dialog
      :title="this.message"
      :fullscreen="true"
      :visible.sync="dialogVisible"
      :append-to-body="true">
      <div class="d2-mb-10">
        <el-button type="danger" size="mini" @click="handleLogClean">
          <d2-icon name="trash-o"/>
          清空
        </el-button>
      </div>
      <d2-error-log-list/>
    </el-dialog>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import D2ErrorLogList from './components/list'
import request from '@/plugin/axios'
export default {
  components: {
    D2ErrorLogList
  },
  data () {
    return {
      dialogVisible: false,
      letterCount: 0,
      message: ''
    }
  },
  created () {
    request({
      url: '/personalLetter/unRead',
      method: 'get'
    }).then(async res => {
      this.letterCount = res.length
      this.message = this.letterCount === 0
        ? '没有未读消息'
        : `${this.letterCount} 条未读`
    })
  },
  methods: {
    ...mapMutations('d2admin/log', [
      'clean'
    ]),
    handleClick () {
      if (this.logLength > 0) {
        this.dialogVisible = true
      }
    },
    handleLogClean () {
      this.dialogVisible = false
      this.clean()
    }
  }
}
</script>

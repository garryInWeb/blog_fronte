<template>
  <d2-container :filename="filename">
    <template slot="header">新增数据</template>
    <d2-crud
      ref="d2Crud"
      :columns="columns"
      :data="data"
      add-title="我的新增"
      :add-template="addTemplate"
      :edit-template="editTemplate"
      :form-options="formOptions"
      :rowHandle="rowHandle"
      @dialog-open="handleDialogOpen"
      @row-add="handleRowAdd"
      @row-edit="handleRowEdit"
      @dialog-cancel="handleDialogCancel">
      <el-button slot="header" style="margin-bottom: 5px" @click="addRow">新增</el-button>
    </d2-crud>
  </d2-container>
</template>

<script>
import doc from './doc.md'
import code from './code.js'
import request from '@/plugin/axios'

export default {
  data () {
    return {
      filename: __filename,
      doc,
      code,
      columns: [
        {
          title: 'ID',
          key: 'id'
        },
        {
          title: '姓名',
          key: 'typeName'
        },
        {
          title: '最后更新时间',
          key: 'updateTime'
        },
        {
          title: '概述',
          key: 'articleTypeInfo'
        }
      ],
      data: [],
      rowHandle: {
        columnHeader: '编辑表格',
        edit: {
          icon: 'el-icon-edit',
          text: '点我进行编辑',
          size: 'small'
        },
        show (index, row) {
          return true
        }
      },
      addTemplate: {
        typeName: {
          title: '姓名'
        },
        articleTypeInfo: {
          title: '概述'
        }
      },
      editTemplate: {
        typeName: {
          title: '姓名',
          value: ''
        },
        articleTypeInfo: {
          title: '概述',
          value: ''
        }
      },
      formOptions: {
        labelWidth: '80px',
        labelPosition: 'left',
        saveLoading: false
      }
    }
  },
  created () {
    let _this = this
    // 初始化分类
    request({
      url: '/articleType/all',
      method: 'post'
    }).then(async res => {
      res.forEach(v => {
        let item = {
          id: v.id,
          typeName: v.typeName,
          updateTime: v.updateTime,
          articleTypeInfo: v.articleTypeInfo
        }
        _this.data.push(item)
      })
    })
  },
  methods: {
    handleDialogOpen ({ mode }) {
      this.$message({
        message: '打开模态框，模式为：' + mode,
        type: 'success'
      })
    },
    addRow () {
      // this.$router.push({ path: '/demo/components/editor-simpleMDE' })
      this.$refs.d2Crud.showDialog({
        mode: 'add'
      })
    },
    handleRowEdit ({ index, row }, done) {
      this.formOptions.saveLoading = true
      setTimeout(() => {
        request({
          url: '/articleType/save',
          method: 'post',
          data: row
        }).then(async res => {
          this.$message({
            message: '编辑成功',
            type: 'success'
          })
        })
        done({
          address: '我是通过done事件传入的数据！'
        })
        this.formOptions.saveLoading = false
      }, 300)
    },
    handleRowAdd (row, done) {
      this.formOptions.saveLoading = true
      setTimeout(() => {
        request({
          url: '/articleType/save',
          method: 'post',
          data: row
        }).then(async res => {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
        })
        done({
          address: '我是通过done事件传入的数据！'
        })
        this.formOptions.saveLoading = false
      }, 300)
    },
    handleDialogCancel (done) {
      this.$message({
        message: '取消保存',
        type: 'warning'
      })
      done()
    }
  }
}
</script>

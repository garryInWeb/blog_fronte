<template>
  <d2-container :filename="filename">
    <template slot="header">新增数据</template>
    <d2-crud
            ref="d2Crud"
            :columns="columns"
            :data="data"
            add-title="我的新增"
            :rowHandle="rowHandle"
            @custom-emit-1="handleCustomEvent"
            :form-options="formOptions">
      <el-button slot="header" style="margin-bottom: 5px" @click="addRow">新增</el-button>
    </d2-crud>
  </d2-container>
</template>

<script>
import request from '@/plugin/axios'

export default {
  data () {
    return {
      filename: __filename,
      columns: [
        {
          title: 'ID',
          key: 'id'
        },
        {
          title: '类别',
          key: 'typeName'
        },
        {
          title: '标题',
          key: 'articleTitle'
        },
        {
          title: '概述',
          key: 'articleInfo'
        },
        {
          title: '阅读量',
          key: 'articleCount'
        },
        {
          title: '最后更新时间',
          key: 'updateTime'
        }
      ],
      rowHandle: {
        custom: [
          {
            text: '自定义按钮',
            type: 'warning',
            size: 'small',
            emit: 'custom-emit-1'
          }
        ]
      },
      data: [],
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
      url: '/article/all',
      method: 'get'
    }).then(async res => {
      res.forEach(v => {
        let item = {
          id: v.id,
          typeName: v.typeName,
          updateTime: v.updateTime,
          articleInfo: v.articleInfo,
          articleTitle: v.articleTitle,
          articleCount: v.articleCount
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
      this.$router.push({ path: '/demo/components/editor-simpleMDE' })
    },
    handleCustomEvent ({ index, row }) {
      this.$router.push({ path: '/demo/components/editor-simpleMDE', query: { id: row.id } })
    }
  }
}
</script>

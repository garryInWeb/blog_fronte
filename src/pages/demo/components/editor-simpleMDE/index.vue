<template>
  <d2-container :filename="filename">

    <el-form ref="form" label-width="40px">
      <el-form-item label="标题">
        <el-input v-model="article.articleTitle"></el-input>
      </el-form-item>
    </el-form>
    <el-form ref="form" :inline="true" label-width="40px">
      <el-form-item label="类别">
        <el-select v-model="article.articleTypeId" placeholder="请选择" @change="$set(article,article.articleTypeId,$event)">
          <el-option
                  v-for="item in article.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="原创" label-width="60px">
        <el-switch v-model="article.articleFrom">
        </el-switch>
      </el-form-item>
        <el-form-item label="阅读量:" label-width="80px" v-if="article.update">
          <span style="color: #E6A23C;">{{article.articleCount}}</span>
        </el-form-item>
        <el-form-item label="最后更新时间:" label-width="100px" style="float:right" v-if="article.update">
          <span>{{article.updateTime}}</span>
        </el-form-item>
    </el-form>
    <el-form ref="form" label-width="40px">
        <el-form-item label="摘要" prop="desc">
            <el-input type="textarea" v-model="article.articleInfo"></el-input>
        </el-form-item>
    </el-form>
    <d2-mde v-model="article.articleContent" class="mde"/>
    <el-form ref="form">
        <el-form-item style="float:right">
            <el-button type="primary" @click="addRow">立即创建</el-button>
        </el-form-item>
    </el-form>
  </d2-container>
</template>

<script>
import request from '@/plugin/axios'

export default {
  data () {
    return {
      filename: __filename,
      article: {
        articleTitle: '',
        options: [],
        articleTypeId: '',
        articleContent: '',
        articleFrom: false,
        articleCount: 110,
        articleInfo: '',
        updateTime: '2019',
        update: false
      }
    }
  },
  created () {
    let _this = this.article
    if (this.$route.query.id) {
      _this.update = true
      request({
        url: '/article/article/' + this.$route.query.id,
        method: 'get'
      }).then(async res => {
        _this.updateTime = res.updateTime
        _this.articleCount = res.articleCount
        _this.articleFrom = res.articleFrom
        _this.articleTitle = res.articleTitle
        _this.articleContent = res.articleContent
        _this.articleTypeId = res.articleTypeId
        _this.articleInfo = res.articleInfo
        console.log(_this)
      })
    }
    // 初始化分类
    request({
      url: '/articleType/all',
      method: 'post'
    }).then(async res => {
      res.forEach(v => {
        let item = {
          value: v.id,
          label: v.typeName
        }
        _this.options.push(item)
      })
    })
  },
  methods: {
    addRow () {
      request({
        url: '/article/save',
        method: 'post',
        data: this.article
      }).then(async res => {
        this.$message({
          message: '编辑成功',
          type: 'success'
        })
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.mde {
  margin-bottom: 16px;
}
</style>

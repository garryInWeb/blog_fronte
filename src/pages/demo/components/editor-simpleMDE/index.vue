<template>
  <d2-container :filename="filename">

    <el-form ref="form" label-width="40px">
      <el-form-item label="标题">
        <el-input v-model="input"></el-input>
      </el-form-item>
    </el-form>
    <el-form ref="form" :inline="true" :inline-message="true" label-width="40px">
      <el-form-item label="类别">
        <el-select v-model="value" placeholder="请选择">
          <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="原创" label-width="60px">
        <el-switch v-model="original">
        </el-switch>
      </el-form-item>
      <div v-if="update">
        <el-form-item label="阅读量:" label-width="80px">
          <span style="color: #E6A23C;">{{count}}</span>
        </el-form-item>
        <el-form-item label="最后更新时间:" label-width="100px" style="float:right">
          <span>{{updateTime}}</span>
        </el-form-item>
      </div>
    </el-form>
    <d2-mde v-model="text" class="mde"/>
    <el-form ref="form">
        <el-form-item style="float:right">
            <el-button type="primary" >立即创建</el-button>
        </el-form-item>
    </el-form>
  </d2-container>
</template>

<script>
import text from './text'
import request from '@/plugin/axios'

export default {
  data () {
    return {
      filename: __filename,
      input: '',
      options: [],
      value: '',
      text,
      original: false,
      count: 110,
      updateTime: '2019',
      update: false
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
          value: v.id,
          label: v.typeName
        }
        _this.options.push(item)
      })
    })
  }

}
</script>

<style lang="scss" scoped>
.mde {
  margin-bottom: 16px;
}
</style>

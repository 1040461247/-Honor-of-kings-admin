<template>
  <div class="articles-create">
    <h1 class="title">{{ id ? '编辑' : '新建' }}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="标题">
        <el-input v-model="model.title"/>
      </el-form-item>
      <el-form-item label="所属分类">
        <el-select v-model="model.parent" placeholder="请选择父级分类">
          <el-option :key="item._id" v-for="item in parentList" :label="item.name" :value="item._id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor v-model="model.content" useCustomImageHandler @image-added="handleImageAdded" />
        <!-- useCustomImageHandler @imageAdded="handleImageAdded" -->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import ArticlesList from './ArticlesList'

export default {
  name: 'ArticlesCreate',
  components: {
    VueEditor,
    ArticlesList
  },
  data() {
    return {
      model: {
        title: null,
        parent: null,
        content: null,
        _id: null
      },
      parentList: [],
      listInfo: [],
      cateInfo: []
    }
  },
  props: {
    id: null
  },
  methods: {
    // 保存新建信息
    async save() {
      if(this.id) {
        let res = await this.$http.post(`/articles/edit/${this.id}`, this.model)
        if(res) {
          this.$router.replace('/articles/list')
          this.$message.success('添加成功')
        }
      }else {
        let res = await this.$http.post('/articles/create', this.model)
        if(res) {
          this.$router.replace('/articles/list')
          this.$message.success('添加成功')
        }
      }
    },
    // 获取所属分类列表
    async getParentList() {
      let res = await this.$http.get('/categories/list')
      let news = res.data.filter(item => {
        return item.name === '新闻资讯'
      })
      this.parentList = news[0].children
    },
    // 富文本编辑器-上传图片
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData()
      formData.append('file', file)
      let res = await this.$http.post('/upload', formData)
      Editor.insertEmbed(cursorLocation, 'image', res.data)
      resetUploader()
    },
    // 编辑时获取原数据
    async getOldInfo() {
      // 获取列表信息
      let res = await this.$http.get('/articles/list')
      this.listInfo = res.data
      // 获取所属分类信息
      let cateRes = await this.$http.get('/categories/list')
      cateRes = cateRes.data.filter(item => {
        return item.name == '新闻资讯'
      })
      cateRes = cateRes[0].children
      this.cateInfo = cateRes
      // 遍历id找到与当前编辑相匹配的数据
      this.listInfo = this.listInfo.filter(item => {
        return item._id == this.$route.params.id
      })
      this.model = this.listInfo[0]
    }
  },
  created() {
    this.getParentList()
    this.id && this.getOldInfo()
  }
}
</script>

<style>

</style>
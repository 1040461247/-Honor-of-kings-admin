<template>
  <div class="articles-list">
    <el-table :data="listInfo"  style="width: 100%">
      <el-table-column type="index"/>
      <el-table-column prop="title" label="文章标题"/>
      <el-table-column prop="parent" label="所属分类"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="edit(scope)">编辑</el-button>
          <el-button type="text" @click="handleRemove(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'ArticlesList',
  data() {
    return {
      listInfo: [],
      cateInfo: []
    }
  },
  methods: {
    // 获取列表
    async getList() {
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
      // 修改parent为名称
      this.listInfo.forEach(artiItem => {
        this.cateInfo.forEach(cateItem => {
          if(artiItem.parent == cateItem._id) {
            artiItem.parent = cateItem.name
          } 
        })
      })
    },
    // 编辑文章
    async edit(scope) {
      this.$router.push(`/articles/edit/${scope.row._id}`)
    },
    // 删除文章
    async handleRemove(scope) {
      this.$confirm(`此操作将永久删除"${scope.row.title}"文章 , 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then( async () => {
        let res = await this.$http.delete(`/articles/delete/${scope.row._id}`)
        this.$message.success(res.data)
        this.getList()
      })
    }
  },
  created() {
    this.getList()
  }
}
</script>

<style>

</style>
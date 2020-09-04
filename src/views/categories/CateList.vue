<template>
  <div class="cate_list">
    <tree-table :data='items' :columns="columns" :selection-type='false' :expand-type="false" show-index index-text="#" border is-fold>
      <template slot="handleTem" slot-scope="scope">
        <el-button type="text" @click="edit(scope)">编辑</el-button>
        <el-button type="text" @click="handleRemove(scope.row)">删除</el-button>
      </template>
    </tree-table>
  </div>
</template>

<script>
export default {  
  name: 'CateList',
  data() {
    return {
      items: undefined,
      columns:[
        {
          label: '分类名称',
          prop: 'name'
        },
        {
          label: '操作',
          type: 'template',
          template: 'handleTem'
        }
      ]
    }
  },
  methods: {
    // 请求数据
    async getList() {
      const res = await this.$http.get('/categories/list')
      res.status === 200
        ? this.items = res.data
        : console.log('列表拉取失败，状态码：' + res.status)
    },
    // 删除一条文档
    async handleRemove(rowInfo) {
      this.$confirm(`此操作将永久删除"${rowInfo.name}"分类 , 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then( async () => {
        let res = null
        rowInfo.parent
          ? res = await this.$http.delete(`/categories/delete/${rowInfo._id}/${rowInfo.parent}`)
          : res = await this.$http.delete(`/categories/delete/${rowInfo._id}`)
        res && this.$message.success('删除成功')
        this.getList()
      })
    },
    // 编辑
    async edit(scope) {
      scope.row.parent
        ? this.$router.push(`/categories/edit/${scope.row._id}/${scope.row.parent}`)
        : this.$router.push(`/categories/edit/${scope.row._id}`)
    }
  },
  computed: {
    getRowKey(row) {
      return row.id
    }
  },
  created() {
    this.getList()
  }
}
</script>

<style>
.el-table {
  font-size: 16px;
}
</style>
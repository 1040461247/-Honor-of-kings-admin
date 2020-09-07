<template>
  <div class="ads-list">
    <el-table :data="listInfo"  style="width: 100%">
      <el-table-column type="index"/>
      <el-table-column prop="name" label="广告位名称"/>
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
  name: 'AdsList',
  data() {
    return {
      listInfo: null
    }
  },
  methods: {
    // 获取广告位列表
    async getList() {
      let res = await this.$http.get('/ads/list')
      if(res.status === 200) {
        this.listInfo = res.data
      }else {
        this.$message.error('列表获取失败')
        console.log(res.data)
      }
    },
    // 编辑广告位信息
    async edit(scope) {
      this.$router.push(`/ads/edit/${scope.row._id}`)
    },
    // 删除广告位信息
    async handleRemove(scope) {
      this.$confirm(`此操作将永久删除"${scope.row.name}"广告位 , 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then( async () => {
        let res = await this.$http.delete(`/ads/delete/${scope.row._id}`)
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
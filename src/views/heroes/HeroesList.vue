<template>
  <div class="item-list">
    <el-table :data="heroesInfo"  style="width: 100%">
      <el-table-column type="index"/>
      <el-table-column label="图标">
        <template slot-scope="scope">
          <img :src="scope.row.icon" style="height: 60px">
        </template>
      </el-table-column>
      <el-table-column prop="name" label="英雄名称"/>
      <el-table-column prop="title" label="称号"/>
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
  name: 'ItemList',
  data() {
    return {
      heroesInfo: []
    }
  },
  methods: {
    // 获取列表
    async getItemsList() {
      let res = await this.$http.get('/heroes/list')
      this.heroesInfo = res.data
    },
    // 跳转到编辑页
    async edit(scope) {
      this.$router.push(`/heroes/edit/${scope.row._id}`)
    },
    // 删除物品
    handleRemove(scope) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then( async () => {
        let row = scope.row 
        let res = await this.$http.delete(`/heroes/delete/${row._id}`)
        if(res.data) {
          this.$message.success('删除成功')
          this.getItemsList()
        } else {
          this.$message.error('删除失败，状态码：' + res.status)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created() {
    this.getItemsList()
  }
}
</script>

<style>

</style>
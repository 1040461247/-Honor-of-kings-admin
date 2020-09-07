<template>
  <div class="admin-user-list">
    <el-table :data="listInfo"  style="width: 100%">
      <el-table-column type="index"/>
      <el-table-column prop="username" label="用户名"/>
      <el-table-column prop="levelName" label="权限"/>
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
  name: 'AdminUserList',
  data() {
    return {
      listInfo: null
    }
  },
  methods: {
    // 获取用户列表
    async getList() {
      let res = await this.$http.get('/adminUser/list')
      if(res.status === 200) {
        res.data.forEach(item => {
          if(item.level === 1) item.levelName = '超级管理员'
        })
        this.listInfo = res.data
      } else {
        this.$message.error('列表获取失败')
      }
    },
    async edit(scope) {
      this.$router.push(`/adminUser/edit/${scope.row._id}`)
    },
    async handleRemove(scope) {
      this.$confirm(`此操作将永久删除"${scope.row.username}"用户 , 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then( async () => {
        let res = await this.$http.delete(`/adminUser/delete/${scope.row._id}`)
        if(res.status === 200) {
          this.getList()
          this.$message.success('删除成功')
        } else {
          this.$message.error('删除失败')
          console.log(res.data)
        }
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
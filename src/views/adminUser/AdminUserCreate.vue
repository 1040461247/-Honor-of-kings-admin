<template>
  <div class="admin-user-create">
    <h1 class="title">{{ id ? '编辑' : '新建' }}管理员</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input v-model="model.username"/>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="model.password"/>
      </el-form-item>
      <el-form-item label="权限等级">
        <el-select v-model="model.level" placeholder="请选择权限等级">
          <el-option :key="item.level" v-for="item in powerLevel" :label="item.name" :value="item.level"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'AdminUserCreate',
  data() {
    return {
      model: {
        username: '',
        password: '',
        level: null
      },
      powerLevel: []
    }
  },
  props: {
    id: null
  },
  methods: {
    // 获取权限等级列表
    async getpowerLevel() {
      let res = await this.$http.get('/adminUser/powerLevel')
      this.powerLevel = res.data
    },
    // 保存新建\编辑
    async save() {
      if(this.id) {
        let res = await this.$http.put(`/adminUser/edit/${this.id}`, this.model)
        if(res.status === 200) {
          this.$router.replace('/adminUser/list')
          this.$message.success('编辑成功')
        } else {
          this.$message.error('编辑失败')
          console.log(res.data)
        }
      } else {
        let res = await this.$http.post('/adminUser/create', this.model)
        if(res.status === 200) {
          this.$message.success(res.data)
          this.$router.replace('/adminUser/List')
        }
      }
    },
    // 编辑获取原数据
    async getOldInfo() {
      let res = await this.$http.get(`/adminUser/edit/${this.id}`)
      if(!res.status === 200) {
          this.$message.error('原数据获取失败')
          console.log(res.data)
      } else {
        this.model = res.data
      }
    }
  },
  created() {
    this.getpowerLevel()
    this.id && this.getOldInfo()
  }
}
</script>

<style>

</style>
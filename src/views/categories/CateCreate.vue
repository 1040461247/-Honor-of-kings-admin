<template>
  <div class="cate_create">
    <h1 class="title">{{ id ? '编辑' : '新建' }}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"/>
      </el-form-item>
      <el-form-item label="父级分类">
        <el-select v-model="model.parent" placeholder="请选择父级分类">
          <el-option :key="item._id" v-for="item in parentList" :label="item.name" :value="item._id"/>
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
  name: 'CateCreate',
  data() {
    return {
      model: {
        name: '',
        parent: undefined,
        children: [],
        _id: undefined
      },
      parentList: []
    }
  },
  props: {
    id: undefined,
    parent: undefined
  },
  methods: {
    // 保存提交表单
    async save() {
      if(this.id) {
        // 进入编辑时触发
        let res = null
        this.parent 
          ? res = await this.$http.put(`/categories/edit/${this.id}/${this.parent}`, this.model)
          : res = await this.$http.put(`/categories/edit/${this.id}`, this.model)
        res && this.$message.success(res.data)
        this.$router.replace('/categories/list')
      } else {
        // 进入新建时触发
        const res = await this.$http.post('/categories/create', this.model)
        if(res.status === 200) {
          this.$message.success(res.data)
          this.$router.replace('/categories/list')
        } else {
          console.log(res.status)
        }
      }
    },
    // 获取原数据
    async getOldInfo() {
      let res = null
      this.parent 
        ? res = await this.$http.get(`/categories/edit/${this.id}/${this.parent}`)
        : res = await this.$http.get(`/categories/edit/${this.id}`)
      if(res.status === 200) {
        this.model = res.data
      } else {
        this.$message.error('原数据获取失败，状态码：' + res.status)
      }
    },
    // 获取父分类名称
    async getList() {
      const res = await this.$http.get('/categories/list')
      this.parentList = res.data.filter(item => {
        return !item.parent
      })
    },
  },
  created() {
    this.getList()
    this.id && this.getOldInfo()
  }
}
</script>

<style>
.title {
    margin-bottom: 20px;
  }
</style>
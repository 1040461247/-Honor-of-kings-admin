<template>
  <div class="cate_create">
    <h1 class="title">{{ id ? '编辑' : '新建' }}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"/>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success="uploadSuccess">
          <img v-if="model.icon" :src="model.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
        icon: null
      }
    }
  },
  props: {
    id: undefined
  },
  methods: {
    // 提交表单
    async save() {
      if(this.id) {
        let res = await this.$http.put(`/items/edit/${this.id}`, this.model)
        if(res) {
          this.$message.success(res.data)
          this.$router.replace('/items/list')
        }else {
          this.$message.success('提交失败，状态码：' + res.status)
        }
      } else {
        let res = await this.$http.post('/items/create', this.model)
        if(res) {
          this.$message.success(res.data)
          this.$router.replace('/items/list')
        } else {
          this.$message.success('提交失败，状态码：' + res.status)
        }
      }
    },
    // 图标提交成功后触发的回调,res为服务端的响应内容
    async uploadSuccess(res) {
      this.model.icon = res
    },
    // 处于编辑页面时，获取原数据
    async getOldInfo() {
      let res = await this.$http.get(`/items/edit/${this.id}`)
      this.model = res.data
    },
  },
  created() {
    this.id && this.getOldInfo()
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .title {
    margin-bottom: 20px;
  }
</style>
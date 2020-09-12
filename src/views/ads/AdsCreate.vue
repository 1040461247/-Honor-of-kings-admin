<template>
  <div class="ads-create">
    <h1 class="title">{{ id ? '编辑' : '新建' }}广告位</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"/>
      </el-form-item>
      <el-form-item>
        <el-button type="text" @click="model.items.push({image: null, url: null})"><i class="el-icon-plus"/>添加广告</el-button>
        <el-divider/>
        <el-row type="flex" style="flex-wrap: wrap">
          <el-col :md="12" v-for="(item, index) in model.items" :key="index">
            <el-divider direction="vertical" content-position="center"/>
            <el-form-item label="广告图片">
              <el-upload
                class="avatar-uploader"
                :action="getLoadImgPath"
                :show-file-list="false"
                :on-success="res => item.image = res"
                :headers="getAuth">
                <img v-if="item.image" :src="item.image" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="跳转链接">
              <el-input v-model="item.url"/>
            </el-form-item>
            <el-form-item>
              <el-button type="text" @click="removeSkill(item)">删除广告</el-button>
            </el-form-item>
            <el-divider/>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getAuth, getLoadImgPath } from 'tools/mixin'

export default {  
  name: 'AdsCreate',
  mixins: [getAuth, getLoadImgPath],
  data() {
    return {
      model: {
        name: '',
        items: []
      }
    }
  },
  props: {
    id: null
  },
  methods: {
    // 保存新建\编辑
    async save() {
      if(this.id) {
        let res = await this.$http.put(`/ads/edit/${this.id}`, this.model)
        if(res.status === 200) {
          this.$message.success(res.data)
          this.$router.replace('/ads/list')
        } else {
          this.$message.error(res.data)
        }
      } else {
        let res = await this.$http.post('/ads/create', this.model)
        if(res.status === 200) {
          this.$message.success(res.data)
          this.$router.replace('/ads/list')
        } else {
          this.$message.error(res.data)
        }
      }
    },
    // 编辑时请求原数据
    async getOldInfo() {
      let res = await this.$http.get(`/ads/edit/${this.id}`)
      if(res.status === 200) {
        this.model = res.data
      } else {
        this.$message.error('获取原数据失败')
        console.log(res.data)
      }
    },
    // 删除广告位广告
    async removeSkill(item) {
      this.$confirm('此操作将永久删除该广告, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then( async () => {
        const heroesId = this.$route.params.id
        this.model.items = this.model.items.filter(item1 => {
          return item1._id !== item._id
        })
        this.$message.success('删除成功')
      }).catch(err => {
        console.log(err)
      })
    }
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
    width: 5rem;
    height: 5rem;
    line-height: 5rem;
    text-align: center;
  }
  .avatar {
    width: 5rem;
    height: 5rem;
    display: block;
  }
  .title {
    margin-bottom: 20px;
    color: #606266;
  }
</style>
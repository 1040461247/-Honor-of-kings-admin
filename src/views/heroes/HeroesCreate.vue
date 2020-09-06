<template>
  <div class="cate_create">
    <h1 class="title">{{ id ? '编辑' : '新建' }}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs type="border-card" value="skills">
        <el-tab-pane label="基础信息">
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
          <el-form-item label="名称">
            <el-input v-model="model.name" style="width:200px"/>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title" style="width:200px"/>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id"/>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate :max="9" show-score v-model="model.scores.defficult" style="margin-top:0.8em"/>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate :max="9" show-score v-model="model.scores.skills" style="margin-top:0.8em"/>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate :max="9" show-score v-model="model.scores.attack" style="margin-top:0.8em"/>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate :max="9" show-score v-model="model.scores.survive" style="margin-top:0.8em"/>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"/>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"/>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips" style="width:600px"/>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips" style="width:600px"/>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips" style="width:600px"/>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <el-button type="text" @click="model.skills.push({icon: null, name: null, description: null, tips: null})"><i class="el-icon-plus"/>添加技能</el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item, index) in model.skills" :key="index">
              <el-form-item label="名称">
                <el-input v-model="item.name"/>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL + '/upload'"
                  :show-file-list="false"
                  :on-success="res => item.icon = res">
                  <img v-if="item.icon" :src="item.icon" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"/>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input type="textarea" v-model="item.tips"/>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="danger" @click="removeSkill(item)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
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
        icon: null,
        title: null,
        categories: null,
        scores: {
          difficult: 0,
          skills: 0,
          attack: 0,
          survive: 0
        },
        items1: null,
        items2: null,
        usageTips: null,
        battleTips: null,
        teamTips: null,
        skills: []
      },
      categories: [],
      items: []
    }
  },
  props: {
    id: undefined
  },
  methods: {
    // 提交表单
    async save() {
      if(this.id) {
        let res = await this.$http.put(`/heroes/edit/${this.id}`, this.model)
        if(res) {
          this.$message.success(res.data)
          this.$router.replace('/heroes/list')
        }else {
          this.$message.success('提交失败，状态码：' + res.status)
        }
      } else {
        let res = await this.$http.post('/heroes/create', this.model)
        if(res) {
          this.$message.success(res.data)
          this.$router.replace('/heroes/list')
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
      let res = await this.$http.get(`/heroes/edit/${this.id}`)
      this.model = Object.assign({}, this.model, res.data)
    },
    // 获取英雄、物品分类数据
    async getHeroesCate() {
      // 获取英雄分类数据
      let res = await this.$http.get('/categories/list')
      res = res.data.filter(item => {
        return item.name == '英雄分类'
      })
      this.categories = res[0].children
      // 获取物品分类数据
      let itemRes = await this.$http.get('/items/list')
      this.items = itemRes.data
    },
    // 删除技能元素
    async removeSkill(item) {
      this.$confirm('此操作将永久删除该技能, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then( async () => {
        const heroesId = this.$route.params.id
        this.model.skills = this.model.skills.filter(item1 => {
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
    this.getHeroesCate()
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
  }
</style>
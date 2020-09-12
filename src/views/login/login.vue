<template>
  <div class="login">
    <el-card header="用户登录" class="login-card">
      <el-form :rules="rules" :model="model" ref="formRef">
        <el-form-item label="用户名" prop="username">
          <el-input placeholder="Username" v-model="model.username"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" placeholder="Password" v-model="model.password"/>
        </el-form-item>
        <el-form-item class="submit-button">
          <el-button type="primary" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      model: {
        username: '',
        password: ''
      },
      // 表单验证
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 登录
    handleLogin() {
      this.$refs.formRef.validate(async (valid, obj) => {
        if(valid) {
          let res = await this.$http.post('/login', this.model)
          if(res.status === 200) {
            sessionStorage.token = res.data
            console.log(res.data)
            this.$router.replace('/categories/list')
            this.$message.success('登陆成功')
          } else {
            this.$message.error(res.data)
          }
        } else {
          this.$message.warning('请输入合法表单信息')
        }
      })
    }
  }
}
</script>

<style>
.login-card {
  width: 25em;
  margin: 10em auto;
}
.submit-button {
  float: right;
}
</style>
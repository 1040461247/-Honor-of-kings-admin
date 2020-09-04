<template>
  <el-container style="height: 500vh;">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router :default-openeds="['1', '3']">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>内容管理</template>
          <el-menu-item-group v-for="item1 in menuInfo" :key="item1._id">
            <template slot="title">{{ item1.level1 }}</template>
            <el-menu-item :index="item2.url" v-for="item2 in item1.children" :key="item2.name">{{ item2.name }}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>

      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      menuInfo: undefined
    }
  },
  methods: {
    // 动态侧边栏数据
    async getMenu () {
      const res = await this.$http.get('menu')
      if(res.status === 200) {
        this.menuInfo = res.data
      } else {
        console.log('动态侧边栏数据拉取出错')
      }
    }
  },
  created() {
    this.getMenu()
  }
}
</script>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>

// 获取所有文章信息
export const getArticles = {
  data() {
    return {
      listInfo: [],
      cateInfo: []
    }
  },
  methods: {
     // 获取列表
    async getList() {
      // 获取列表信息
      let res = await this.$http.get('/articles/list')
      this.listInfo = res.data
      // 获取所属分类信息
      let cateRes = await this.$http.get('/categories/list')
      cateRes = cateRes.data.filter(item => {
        return item.name == '新闻资讯'
      })
      cateRes = cateRes[0].children
      this.cateInfo = cateRes
      // 修改parent为名称
      this.listInfo.forEach(artiItem => {
        this.cateInfo.forEach(cateItem => {
          if(artiItem.parent == cateItem._id) {
            artiItem.parent = cateItem.name
          } 
        })
      })
    },
  }
}
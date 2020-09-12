// 获取Authorization
export const getAuth = {
  computed: {
    getAuth() {
      return {
        Authorization: `Bearer ${sessionStorage.token || ''}`
      }
    }
  }
}

// 获取图片上传地址
export const getLoadImgPath = {
  computed: {
    getLoadImgPath() {
      return this.$http.defaults.baseURL + '/upload'
    }
  }
}

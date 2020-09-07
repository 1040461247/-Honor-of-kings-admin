const path = require('path')
const resolve = dir => path.join(__dirname, dir)
module.exports = {
  chainWebpack: config => {
    // 设置快捷路径， @ 表示 'src' ，components 表示 'src/components'
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))
      .set('plugins', resolve('src/plugins'))
      .set('router', resolve('src/router'))
      .set('store', resolve('src/store'))
      .set('common', resolve('src/common'))
  }
}

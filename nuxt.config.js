module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: 'https://res.wx.qq.com/open/js/jweixin-1.2.0.js' }
    ]
  },
  /*
  ** Global CSS 该配置项用于定义应用的全局（所有页面均需引用的）样式文件、模块或第三方库。
  */
  css: ['~static/css/main.css'],
  /*
  ** Customize the progress-bar color
  * 在页面切换的时候，
    Nuxt.js 使用内置的加载组件显示加载进度条。你可以定制它的样式，禁用或者创建自己的加载组件。
  */
  loading: { color: '#3B8070' },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLINT on save// 为客户端和服务端的构建配置进行手工的扩展处理。
     */
    extend(config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({ // 为 客户端打包 进行扩展配置
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

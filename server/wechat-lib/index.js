import request from 'request-promise'

const base = 'https://api.weixin.qq.com/cgi-bin/'
const api = {
  accessToken: base + 'token?grant_type=client_credential'
}
export const Wechat = class Wechat {
  constructor(opts) { // 微信配置项
    this.opts = Object.assign({}, opts)
    this.appID = opts.appID
    this.appSecret = opts.appSecret
    this.getAccessToken = opts.getAccessToken
    this.saveAccessToken = opts.saveAccessToken

    this.fetchAccessToken()
  }
  async request(options) { // 发请求
    options = Object.assign({}, options, { json: true })
    try {
      const response = await request(options)
      return response
    } catch (e) {
      console.error(e)
    }
  }
  async fetchAccessToken() { // 获取token
    let data = await this.getAccessToken()
    if (!this.isValidAccessToken(data)) { // 检验
      data = await this.updateAccessToken()
    }
    await this.saveAccessToken(data)
    return data
  }
  async updateAccessToken() { // 更新token
    const url = api.accessToken + '&appid=' + this.appID + '&secret=' + this.appSecret
    const data = await this.request({ url: url })
    const now = new Date().getTime()
    const expiresIn = now + (data.expires_in - 20) * 1000
    data.expires_in = expiresIn
    return data
  }
  isValidAccessToken(data) {
    if (!data || !data.access_token || !data.expires_in) {
      return false
    }
    const expiresIn = data.expires_in
    const now = (new Date().getTime)
    if (now < expiresIn) {
      return true
    } else {
      return false
    }
  }
}

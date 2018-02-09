import { Mongoose } from 'mongoose'
import config from '../config'
import { Wechat } from '../wechat-lib/index'

const Token = Mongoose.mode('Token')
const wechatConfig = {
  wechat: {
    appID: config.wechat.appID,
    appSecret: config.wechat.appSecret,
    token: config.wechat.token,
    getAccessToken: async () => Token.getAccessToken(),
    saveAccessToken: async () => Token.saveAccessToken()
  }
}
export const getWechat = () => {
  const wechatClint = new Wechat(wechatConfig.wechat)
  return wechatClint
}
getWechat()

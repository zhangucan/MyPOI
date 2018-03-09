// import { mongoose } from 'mongoose'
import config from '../config'
import { Wechat } from '../wechat-lib/index' // 初始化mongodb的方法

const mongoose = require('mongoose')
const Token = mongoose.model('Token')
const Ticket = mongoose.model('Ticket')
const wechatConfig = {
  wechat: {
    appID: config.wechat.appID,
    appSecret: config.wechat.appSecret,
    token: config.wechat.token,
    // 传入schema的方法 函数式编程
    getAccessToken: async () => Token.getAccessToken(),
    saveAccessToken: async (data) => Token.saveAccessToken(data),
    getTicket: async () => await Ticket.getTicket(),
    saveTicket: async (data) => await Ticket.saveTicket(data)
  }
}
export const getWechat = () => {
  const wechatClint = new Wechat(wechatConfig.wechat)
  return wechatClint
}

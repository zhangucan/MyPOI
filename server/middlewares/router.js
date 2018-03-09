import Router from 'koa-router'
import config from '../config'
import { resolve } from 'path'
import reply from '../wechat/reply' // 加入业务逻辑
import wechatMiddle from '../wechat-lib/middleware'
import { signature } from '../controller/wechat'

export const router = app => {
  const router = new Router()
  router.all('/wechat-hear', wechatMiddle(config.wechat, reply))
  router.get('/upload', (ctx, next) => {
    const mp = require('../wechat')
    const client = mp.getWechat()
    client.handle('uploadMaterial', 'video', resolve(__dirname, ''))
  })
  router.get('/wechat-signature', signature)
  app.use(router.routes())
     .use(router.allowedMethods())
}

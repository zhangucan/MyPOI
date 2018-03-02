import Router from 'koa-router'
import config from '../config'
import reply from '../wechat/reply' // 加入业务逻辑
import wechatMiddle from '../wechat-lib/middleware'

export const router = app => {
  const router = new Router()
  router.all('/wechat-hear', wechatMiddle(config.wechat, reply))
  app.use(router.routes())
     .use(router.allowedMethods())
}

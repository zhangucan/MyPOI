import sha1 from 'sha1'
import getRawBody from 'raw-body'
import * as util from './util'
export default function(opts, reply) {
  return async function wechatMiddle(ctx, next) {
    const token = opts.token
    const {
              signature,
              nonce,
              timestamp,
              echostr
          } = ctx.query
    // 拿到所有参数 进行字典排序 并进行加密
    const str = [token, timestamp, nonce].sort().join('')
    const sha = sha1(str)
    console.log(sha === signature)
    if (ctx.method === 'GET') {
      if (sha === signature) {
        ctx.body = echostr
      } else {
        ctx.body = 'failed'
      }
    } else if (ctx.method === 'POST') {
      if (sha !== signature) {
        ctx.body = 'failed'
        return false
      }
      const data = await getRawBody(ctx.req, { // 拿到数据包
        length: ctx.length,
        limit: '1mb',
        encoding: ctx.charset
      })

      const content = await util.parseXML(data) // 解析 xml 数据
      console.log(content)
      const message = await util.formatMessage(content) // 转换为 js对象
      ctx.weixin = message // 挂载到context上边
      await reply.apply(ctx, [ctx, next]) // 加载到回调函数上边
      const replyBody = ctx.body
      const msg = ctx.weixin
      const xml = util.tpl(replyBody, msg) // 构建成xml数据返回给微信服务器
      console.log(replyBody + ' : ' + msg)
      ctx.status = 200
      ctx.type = 'application/xml'
      ctx.body = xml
    }
  }
}

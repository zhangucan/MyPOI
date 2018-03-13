import { getWechat } from './index'
export default async (ctx, next) => {
  const client = await getWechat()
  const message = ctx.weixin
  if (message.MsgType === 'text') {
    ctx.body = message.Content
    if (message.Content === '1') {
      const menu = require('./menu').default
      const data = await client.handle('createMenu', menu)
      console.log(data)
    }
  } else if (message.MsgType === 'image') {
    ctx.body = {
      msgType: 'image',
      mediaId: message.MediaId
    }
  } else if (message.MsgType === 'voice') {
    ctx.body = {
      msgType: 'voice',
      mediaId: message.MediaId
    }
  } else if (message.MsgType === 'video') {
    ctx.body = {
      title: message.ThumbMediaId,
      msgType: 'video',
      mediaId: message.MediaId
    }
  } else if (message.MsgType === 'location') {
    ctx.body = message.Location_X + ' : ' + message.Location_Y
  } else if (message.MsgType === 'link') {
    ctx.body = message.title
  }
}

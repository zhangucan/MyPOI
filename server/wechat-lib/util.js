import xml2js from 'xml2js'
import template from './tpl'
// 解析xml
function parseXML(xml) {
  return new Promise((resolve, reject) => { // 返回的是Promise对象
    xml2js.parseString(xml, {trim: true}, (err, content) => {
      if (err) {
        reject(err)
      } else {
        resolve(content) // 操作成功返回content
      }
    })
  })
}
// 解析object对象
function formatMessage(result) {
  let message = {}
  if (typeof result === 'object') {
    const keys = Object.keys(result)
    for (let i = 0; i < keys.length; i++) {
      let item = result[keys[i]]
      let key = keys[i]
      if (!(item instanceof Array) || item.length === 0) {
        continue
      }
      if (item.length === 1) {
        let val = item[0]
        if (typeof val === 'object') {
          message[key] = formatMessage(val)
        } else {
          message[key] = (val || '').trim()
        }
      } else {
        message[key] = []
        for (let j = 0; j < item.length; j++) {
          message[key].push(formatMessage(item[j]))
        }
      }
    }
  }
  return message
}
function tpl(content, message) { // 回复内容 解析后的微信消息
  let type = 'text'
  if (Array.isArray(content)) {
    type = 'news'
  }
  if (!content) {
    content = '暂无回复'
  }
  type = content.type || type
  let info = Object.assign({}, {
    content: content,
    createTime: new Date().getTime(),
    msgType: content.type || type,
    toUserName: message.FromUserName,
    fromUserName: message.toUserName
  })
  return template(info)
}

export default {
  parseXML,
  formatMessage,
  tpl
}

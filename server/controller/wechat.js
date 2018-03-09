import * as wechat from '../api/wechat'
export async function signature(ctx, next) {
  let url = ctx.query.url

  if (!url) ctx.throw(404)

  url = decodeURIComponent(url)
  const params = await wechat.getSignatureAsync(url)

  ctx.body = {
    success: 1,
    params: params
  }
}

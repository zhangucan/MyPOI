const tip = 'mypoi say hello'
export default async (ctx, next) => {
  const messge = ctx.weixin
  console.log(messge)
  ctx.body = tip
}

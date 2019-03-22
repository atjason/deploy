const webhook = require('../deploy/webhook.js')

async function query (ctx) {
  const param = ctx.request.body
  ctx.body = await webhook.query(param)
}

module.exports = {
  query,
}
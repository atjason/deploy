const webhook = require('../deploy/webhook.js')

async function query (ctx) {
  ctx.body = await webhook.query(ctx.request)
}

module.exports = {
  query,
}
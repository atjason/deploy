
const router = require('koa-router')()
const webhook = require('./webhook')

router.post('/webhook', webhook.query)

module.exports = router


const router = require('koa-router')()
const webhook = require('./webhook')
const test = require('../../test/basic')

router.get('/hi',        test.test)
router.post('/webhook',  webhook.query)

module.exports = router

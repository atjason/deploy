
const Koa = require('koa')
const koaBody = require('koa-body')
const router = require('./router')
const app = new Koa()
const debug = require('debug')('s:api')

async function processor(ctx, next) {
  try {
    // debug(ctx.method, ctx.path)
    await next()

  } catch (error) {
    ctx.status = error.status || 500
    ctx.type = 'json'
    ctx.body = { error: error.message || error }
    debug(error.stack || e)
    
    ctx.app.emit('error', error, ctx)
  }
}

async function start () {
  app.use(koaBody())
  app.use(processor)
  app.use(router.routes())
  
  const host = '127.0.0.1'
  const port = 3030
  app.listen(port, host)
  debug(`Server listening on ${host}:${port}`)
  
  if (process.env.NODE_ENV === 'dev') {
    debug('NOTE: currently running on dev mode.')
  }
}

module.exports = { 
  start,
}

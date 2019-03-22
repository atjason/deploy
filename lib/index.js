
const debug = require('debug')('index')

async function start() {
  const api = require('./api')
  await api.start()
}

start()

process.on('unhandledRejection', e => {
  debug('Error: unhandledRejection:', e)
})

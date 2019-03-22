const debug = require('debug')('s:utils')

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

module.exports = {
  sleep,
}
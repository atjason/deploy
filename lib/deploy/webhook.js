
const utils = require('../utils/utils')
const debug = require('debug')('s:api:webook')

class Webhook {
  constructor() {
    
  }

  async query(param) {
    debug(JSON.stringify(param, null, 2))
    // param = param || {}
    // const type = param.type

    // if (!type) {
    //   const error = 'Param missed.'
    //   debug('query', error, JSON.stringify(param))
    //   return { error }
    // }

    // if (param.format === 'JSONString') {
    //   try {
    //     const jsonString = param.JSONString
    //     delete param.JSONString
    //     delete param.format

    //     const json = JSON.parse(jsonString)
    //     Object.assign(param, json)
    //   } catch(e) {}
    // }

    // switch(type) {
    //   case 'query':   return this.addQuery(param)
    //   case 'fetch':   return this.fetch(param)
    //   default:        return { error: 'Type not supported.' }
    // }
  }
}

const webhook = new Webhook()
module.exports = webhook
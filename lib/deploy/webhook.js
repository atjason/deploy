const util = require('util')
const exec = util.promisify(require('child_process').exec)
const config = require('../../config/config.json')
const debug = require('debug')('s:api:webook')

class Webhook {
  constructor() {
    
  }

  async query(param) {
    let error, output = '', key = ''
    try {
      do {
        const ref = param.ref
        if (!ref || !param.commits) {
          error = 'Not commit.'
          break
        }
  
        const repositoryName = param.repository.full_name
        key = repositoryName + '_' + ref
        const options = config[key]
        if (!options) {
          error = "Not configured."
          break
        }
  
        const { stdout, stderr } = await exec(options.command, options);
        output = stdout || ''
        error = stderr || ''

      } while(false)

    } catch(e) {
      error = e.message
    }

    if (error) {
      debug(JSON.stringify({ key, error, output }, null, 2))
      return { error, output }
    } else {
      return output
    }
  }
}

const webhook = new Webhook()
module.exports = webhook
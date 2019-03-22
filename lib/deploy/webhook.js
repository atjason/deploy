const util = require('util')
const exec = util.promisify(require('child_process').exec)
const config = require('../../config/config.json')
const { sendMail } = require('../utils/mail')
const debug = require('debug')('s:api:webook')

class Webhook {
  constructor() {
    
  }

  async query(param) {
    let error, output = '', key = ''
    try {
      const ref = param.ref
      if (!ref || !param.commits) {
        return 'Not commit.'
      }

      const branch = ref.slice('refs/heads/'.length)
      const repositoryName = param.repository.name
      key = repositoryName + '_' + branch
      const options = config[key]
      if (!options) {
        return 'Not configured.'
      }

      const { stdout, stderr } = await exec(options.command, options);
      output = stdout || ''
      error = stderr || ''

    } catch(e) {
      error = e.message
    }

    let result, mailParam = {}

    if (error) {
      mailParam.title = 'Failed: ' + key
      result = error + '\n\n' + output
    } else {
      mailParam.title = 'OK: ' + key
      result = output
    }

    mailParam.content = result
    sendMail(mailParam)

    return result
  }
}

const webhook = new Webhook()
module.exports = webhook
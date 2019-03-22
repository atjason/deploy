const util = require('util')
const crypto = require('crypto')
const exec = util.promisify(require('child_process').exec)
const config = require('../../config/config.json')
const { sendMail } = require('../utils/mail')
const debug = require('debug')('s:api:webook')

class Webhook {
  constructor() { }

  async query(request) {
    let error, output = '', key = ''
    try {
      const param = request.body
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

      if (!this.verifySignature(request, options.secret)) {
        const error = 'Signature not matched'
        const title = 'ERROR: ' + error
        debug(title)
        sendMail({ title, content: error })
        return error
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

    const date = new Date()
    const dateStr = date.getHours() + ':' + date.getMinutes()
    mailParam.title += ' ' + dateStr

    mailParam.content = result
    sendMail(mailParam)

    debug(mailParam.title)
    debug(mailParam.content)

    return result
  }

  verifySignature(request, secret) {
    const hmac = crypto.createHmac('sha1', secret)
    const self_signature = hmac.update(JSON.stringify(request.body)).digest('hex')
    return `sha1=${self_signature}` === request.headers['x-hub-signature']
  }
}

const webhook = new Webhook()
module.exports = webhook
'use strict'

const nodemailer = require('nodemailer')
const mailConfig = require('../../config/security.json').mailConfig
const debug = require('debug')('s:api:mail')

function setMail (param) {
  const transporter = nodemailer.createTransport({
    //https://github.com/andris9/nodemailer-wellknown#supported-services    support list
    host: mailConfig.host,
    port: mailConfig.port, // SMTP port
    secure: true, // SSL
    auth: {
      user: mailConfig.user,
      pass: mailConfig.password
    }
  })
  const mailOptions = {
    from: mailConfig.user,
    to: mailConfig.email,
    subject: param.title,
    html: param.content,
  }

  if (typeof mailOptions.html === 'object') {
    mailOptions.html = JSON.stringify(mailOptions.html, null, 2)
  }
  mailOptions.html = `<span style="white-space: pre">${mailOptions.html}</span>`

  return [transporter, mailOptions]
}

/*
  param: {
    title: '',
    content: '',
  }
 */
async function sendMail (param) {
  const [transporter, mailOptions] = setMail(param)
  try {
    await transporter.sendMail(mailOptions)
    debug('Send mail succeeded.')
    return true
  } catch (e) {
    debug('Error: Failed to send mail.', e.message)
    return false
  }
}

module.exports = {
  sendMail
}

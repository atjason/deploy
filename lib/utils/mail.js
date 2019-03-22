'use strict'

const nodemailer = require('nodemailer')
const mailConfig = require('../../config/security.json').mailConfig
const debug = require('debug')('s:api:mail')

function setMail (body) {
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
    subject: body.title,
    html: body.content
  }

  if (typeof mailOptions.html === 'object') {
    mailOptions.html = JSON.stringify(mailOptions.html, null, 2)
  }
  mailOptions.html = mailOptions.html.slice(0, 1024 * 4).replace(/</g, '%3C').replace(/>/g, '%3E')

  return [transporter, mailOptions]
}

async function sendMail (body) {
  const [transporter, mailOptions] = setMail(body)
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

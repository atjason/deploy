[中文版说明](./README_cn.md)

## what is this?

Web service responses to GitHub Webhook.

## Prerequisites

This is not a Hello Word teaching example, but an actual project that I am using myself. Suppose you already know the following techniques or meet their conditions:

- Have a server of your own
- Could configure the domain name
- Could configure nginx or other web server to forward the web service to the node service
- Could create shell script
- Know about node, koa
- Know about Webhook
- Know about SMTP

## The main function

- After run `node lib/index.js`, a service that responds to GitHub Webhook is provided on port 3030.
- Internally call the actual working shell script (you need to write it yourself) via `exec`
- Send email for the result of script.

## Main configuration

Both are located in the `config` directory, refer to `*_demo.json`, add a version without `_demo`

### config.json

You can create a corresponding configuration for each warehouse and branch:

```js
{
  "webhook-test_master": { // RepositoryName_BranchName
    "secret": "GitHub_Webhook_secret",
    "cwd": "/home/jason/testapi/", // script execution directory
    "command": "/bin/bash ./deploy.sh", // Really work shell script
    "env": { // some environment variables
      "DEBUG": "s:*"
    }
  }
}
```

### security.json

Currently, the SMTP configuration information is mainly stored for sending notification emails:

```js
{
  "mailConfig": {
    "host": "email-smtp.us-west-2.amazonaws.com",
    "port": "465",
    "user": "user123",
    "password": "password123",
    "from": "from@gmail.com",
    "to": "to@gmail.com"
  }
}
```

## Trivial

For GitHub Webhook, remember to generate a `secret` and select the `json` format.

For shell scripts `warn/error`, which is not important, can be transferred from stderr to stdout via `2>&1`.

For the mail service, I'm using Amazon SES. Everything is going well with 200 free mail quotas per day.

If you have a problem, ask Google and yourself; It works fine in my side.
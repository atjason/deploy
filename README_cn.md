## 这是什么？

响应 GitHub Webhook 实现自动部署的 Web 服务。

## 前提条件

这并不是一个 Hello Word 教学示例，而是我自己在用的实际项目。假设你已经知道下列技术或满足其条件：

- 有一台自己的服务器
- 会配置域名
- 会配置 nginx 或者其他 Web 服务器，实现 Web 服务至 node 服务的转发
- 了解 node、koa
- 了解 Webhook
- 了解 SMTP
- 会编辑 shell 脚本

## 主要功能

- `node lib/index.js` 运行后，在 3030 端口提供可响应 GitHub Webhook 的服务
- 内部通过 `exec` 来调用实际工作的 shell 脚本（需要自己编写）
- 将发布结果发邮件告知

## 主要配置

均位于 `config` 目录，参照 `*_demo.json`，添加没有 `_demo` 的版本

### config.json

可为每个仓库、分支创建对应的配置：

```js 
{
  "webhook-test_master": { // RepositoryName_BranchName
    "secret": "GitHub_Webhook_secret",
    "cwd": "/home/jason/testapi/", // 脚本执行目录
    "command": "/bin/bash ./deploy.sh", // 真正工作的 shell 脚本
    "env": { // 一些环境变量
      "DEBUG": "s:*"
    }
  }
}
```

### security.json

目前主要存储了 SMTP 配置信息，用于发告知邮件：

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

## 琐碎的

关于 GitHub Webhook，记得生成密码、选择 `json` 格式。

关于 shell 脚本，可以通过 `2>&1` 将其中不重要的 warn/error，从 stderr 转到 stdout 中。

关于邮件服务，我开始时用的是阿里云，但出现了提示发送成功、但实际不破功的情况，垃圾箱也没有。后来试了 Amazon SES，目前一切顺利；每天 200 封免费邮件额度。

如果你遇到了问题，多问问 Google 和自己；我这边是顺畅运行的。


## 简介

简易投票服务接口，使用`nestjs`、`typeorm`、`mongodb`编写

## 安装

```bash
$ npm install
```

如果因网络原因，也可以运行

```bash
$ yarn install
```

## 运行

```bash
$ npm run start
```

运行成功之后，可访问`http://localhost:3000/api`查看接口文档

登录授权使用`jwt`

默认帐号:admin
默认密码:admin

## 调试

```bash
$ npm run start:debug
```
## 测试

```bash

# e2e tests
$ npm run test:e2e
```

## 其它说明

1.投票结果监控和邮件通知相关方法写在了`src/app.module.ts`
2.全局异常处理`src/main.ts`和`src/core/http-exception.filter.ts`
3.邮件服务器`src/lib/mail-server.ts`
4.mongodb配置`src/app.module.ts`
5.e2e测试`test/app.e2e-spec.ts`
6.数据库实体类`src/entity`
7.接口文档`http://localhost:3000/api`
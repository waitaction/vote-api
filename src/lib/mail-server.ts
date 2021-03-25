import { MailConfigModel } from "../shared/mail-config-model";

/**
 * 发送邮件服务器
 */
export class MailServer {
    config: MailConfigModel;
    smtp: any;
    nodemailer = require('nodemailer');
    smtpTransport = require('nodemailer-smtp-transport');;
    constructor(config: MailConfigModel) {
        this.config = config;
        this.smtp = this.nodemailer.createTransport(this.smtpTransport({
            service: config.service,
            auth: {
                user: config.user,
                pass: config.password
            }
        }));
    }

    /**
     * 发送邮件
     * @param recipient 收件人
     * @param subject 主题
     * @param html 内容
     */
    sendMail(recipient: Array<string>, subject: string, html: string) {
        this.smtp.sendMail({
            from: this.config.user,
            to: recipient,
            subject: subject,
            html: html
        }, function (error, response) {
            if (error) {
                console.log(error);
            }
            console.log('发送通知邮件成功')
        });
    }
}
// 收发邮件
const mailer = require('nodemailer');
const licence = require('../assets/licence');

// 常量，始终使用这个账号发送消息
const MAIL_FROM = 'doublejan@126.com';

// 邮件服务连接对象
const mailOptions = {
  pool: true,
  host: "smtp.126.com",
  port: 465,
  secure: true, // use TLS
  auth: {
    user: MAIL_FROM,
    pass: "DOUBLEJAN2LIENCE"
  }
}

function createSendMail(mail) {
  mailer.createTestAccount((err, account) => {
    const transporter = mailer.createTransport(mailOptions);
    transporter.sendMail({
      from: MAIL_FROM,
      to: MAIL_FROM,
      subject: "SpiritThought 灵思",
      ...mail
    });
  })
}

// 向管理者发送用户注册申请邮件
function sendRegisterLicenceMail(data) {
  createSendMail({ html: licence.requestAuthLicenceMail(data) });
}

// 向用户发送许可证邮件
function sendUserLicenceMail(data) {
  createSendMail({ html: licence.giveUserLicence(data), to: data.email });
}

// 启动服务器后，发送确认邮件
function notificationServer() {
  createSendMail({ text: 'SpiritThought服务启动自8000端口' });
}

module.exports = { sendRegisterLicenceMail, sendUserLicenceMail, notificationServer }



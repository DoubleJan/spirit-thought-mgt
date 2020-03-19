// 处理获取许可的请求
const moment = require('moment');
const template = require('../../utils/template');
const crypto = require('./crypto');
const { parseQuery } = require('../../utils/httpUtils');
const Constants = require('../../constants');
const { sendRegisterLicenceMail, sendUserLicenceMail, } = require('../../utils/mailer');

// 已经申请了的许可
const RequestedLicences = [];

// 关于许可号的处理方法都在这里
const LicenceHandler = {

  // 客户端主站发送的，要求获取许可的请求
  requestLicence: (res, params) => {

    const index = RequestedLicences.findIndex((lic) => {
      if (lic.username === params.username || lic.email === params.email) {
        return true;
      }
      return false
    })

    // 如果已经申请过，并且距离上次间隔小于一天的时间，不与申请，并返回错误状态和提示
    if (index > -1 && moment().unix() - moment(RequestedLicences[index].createTime).unix() <= 86400000) {
      console.log(JSON.stringify(`RequestedLicences[${index}]`, RequestedLicences[index]));
      res.end(JSON.stringify(template.simpleGet({ code: '101.104', msg: '每天只能申请一次许可号' })));
      return;
    }

    // 向管理员发送邮件，关闭连接
    // 由于126邮箱限制脚本执行，目前只能直接发送许可
    // sendRegisterLicenceMail({ username: params.username, email: params.email, host: Constants.host });

    const licence = crypto(params.username, moment().format()).substr(0, 12);
    sendUserLicenceMail({ email: params.email, username: params.username, licence });
    console.log({ email: params.email, username: params.username, licence });
    res.end(JSON.stringify(template.simpleGet({})));

    // 更新或记录当前许可申请的时间
    if (index > -1) {
      RequestedLicences[index].createTime = moment().format();
    } else {
      RequestedLicences.push({
        username: params.username,
        email: params.email,
        createTime: moment().format(),
        licence
      });
    }
  },

  // 由申请页面发起的，同意授权用户的许可码
  sendUserLience: (res, params) => {
    const lic = crypto(params.username, moment().format())
    sendUserLicenceMail({ email: params.email, username: params.username, licence: lic.substr(0, 12) });
    console.log({ email: params.email, username: params.username, licence: lic.substr(0, 12) });
    res.end(JSON.stringify(template.simpleGet({})));
  }

}


module.exports = {
  licence: function (req, res) {
    const query = parseQuery(req.url);

    if (query.params && query.params.type && LicenceHandler[query.params.type]) {
      console.log('type, licence: ', query.params.type, JSON.stringify(Constants))
      LicenceHandler[query.params.type](res, query.params);

    } else {
      res.end(JSON.stringify(template.simpleGet({ code: '103.101', msg: '未找到执行方法' })));
    }
  },

  getLicences: function () {
    return RequestedLicences;
  }
}




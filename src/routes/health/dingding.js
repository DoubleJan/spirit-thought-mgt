const axios = require('axios');

const url = 'https://oapi.dingtalk.com/service/get_corp_token?';
const date = new Date();

// 
const signature = 'signature=';
// 当前时间戳
const timestamp = `timestamp=${date.getTime()}`;
// 测试应用随意填写
const suiteTicket = 'suiteTicket=spirithoughtTest';
// suiteKey
const accessKey = 'accessKey=suitezwpecoqej37ypgyz';


// 钉钉鉴权
function dingdingAuth() {
  axios.post('', {

  })
}

module.exports = dingdingAuth;
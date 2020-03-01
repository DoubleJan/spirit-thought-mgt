// 导出html邮件代码字符串
const moment = require('moment');

// 导出经过设置字符的注册许可邮件html代码
function requestAuthLicenceMail(data) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
    <title>Spirit Thought 注册许可</title>
  </head>
  <style>
    body,
    html {
      padding: 0;
      margin: 0;
      font-size: 16px;
    }
  
    .text-body {
      padding: 2rem 1rem;
      margin-top: 1rem;
      letter-spacing: 0.06rem;
    }
  
    h1 {
      font-size: 2rem;
      font-size: 800;
      margin: 0;
      border-bottom: 1px solid #cf56a1;
      color: #cf56a1;
      padding: 1rem;
    }
  
    h2 {
      margin-bottom: 2rem;
      font-size: 1.4rem;
      color: #000;
    }
  
    p {
      line-height: 2rem;
      color: #666;
      font-size: 1.2rem;
      font-weight: 200;
      text-align: justify;
    }
  
    .remark {
      float: right;
    }
  
    .remark p {
      text-align: right;
      line-height: 1.4rem;
      margin: 0.8rem 0;
      color: #000;
    }
  
    .button-wrap {
      display: flex;
      justify-content: center;
      margin: 3rem 0;
    }
  
    .button {
      margin: 1rem;
      font-size: 1.4rem;
      padding: 1rem 2.4rem;
      background-color: #cf56a1;
      border-radius: 0.2rem;
      color: #fff;
      border: none;
      outline: none;
    }
  
    .button:hover {
      background-color: #ef498b;
      border-radius: 2rem;
      transition: .6s all;
    }
    .button:not(:hover) {
      background-color: #cf56a1;
      border-radius: .2rem;
      transition: .2s all;
    }
  
    .button:active {
      background-color: #ba2f7b;
      transition: .4s all;
    }
  
    .name {
      font-weight: 600;
      color: #000;
    }
  
    ul {
      margin: 2rem 0;
    }
  
    ul li {
      font-size: 1.2rem;
      font-weight: 100;
    }
  
  </style>
  
  <body>
    <h1>灵思注册许可申请</h1>
    <div class="text-body">
      <h2>尊敬的管理员：</h2>
      <p>用户<span class="name">${data.username}</span>在刚才向您申请了灵思的用户注册许可: </p>
      <ul>
        <li>用户名：<span>${data.username}</span></li>
        <li>邮箱名：<span>${data.email}</span></li>
      </ul>
      <p>如果您认为这是允许的，请点击下方按钮，向他提供的邮箱中发送许可。</p>
      <div class="button-wrap">
        <button class="button">AUTH-LICENCE</button>
      </div>
      <div class="remark">
        <p>Spirit Thought Server</p>
        <p>${moment().format('YYYY.MM.DD HH:mm')}</p>
      </div>
    </div>
  </body>
  <script>
    function sendLience() {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open("GET", "${data.host}/api/auth/licence/sendUserLience", true);
      xmlhttp.send();
    }
  </script>
  </html>
  `
}

// 发送给用户的许可号邮件html字符串
function giveUserLicence(data) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
  <title>Spirit Thought 灵思</title>
</head>

<style>
   body,
  html {
    padding: 0;
    margin: 0;
    font-size: 16px;
  }

  .text-body {
    padding: 32px;
    margin-top: 16px;
    font-size: 1.2em;
    line-height: 1.6em;
    font-weight: 100;
    color: #888;
    text-align: justify;
  }

  .hello {
    color: #000;
  }

  h1 {
    font-size: 2em;
    font-weight: 800;
    margin: 0;
    border-bottom: 1px solid #cf56a1;
    color: #cf56a1;
    padding: 1em;
  }

  .text-body h2 {
    margin-bottom: 2em;
    font-size: 1.2em;
    color: #000;
  }

  p {
    letter-spacing: 2px;
  }

  .lience {
    font-size: 1.4em;
    font-weight: 600;
    letter-spacing: 4px;
    text-align: center;
    color: #000;
    margin: 2em 0;
  }

  .remark {
    float: right;
    margin-top: 2em;
  }

  .remark p {
    text-align: right;
    line-height: 1.2em;
    color: #000;
  }

  .remark .spt {
    color: #cf56a1;
  }
</style>

<body>
  <h1>Spirit Thought 灵思</h1>
  <div class="text-body">
    <h2>尊敬的<span>${data.username}</span>：</h2>
    <p class="hello">您好！</p>
    <p>
      很荣幸收到您的注册申请。灵思是一个将自己的知识，思想，技术，记录下来并分享给他人的无名小站。
    </p>
    <p>尽管现在灵思的团队并不大，但我们相信，您的加入必定会让我们更进一步。</p>
    <p>您应该已经在注册页面填写了基本的信息，那么，请您复制下面的许可号，并在主站申请注册吧：</p>
    <p class="lience">${data.licence}</p>
    <p>最后，我们诚挚的欢迎您的加入！期待您在灵思迸发的灵感！</p>
    <div class="remark">
      <p class="spt">Spirit Thought 灵思</p>
      <p>${moment().format('YYYY.MM.DD HH:mm')}</p>
    </div>
  </div>
</body>
</html>
  `
}




module.exports = { requestAuthLicenceMail, giveUserLicence }

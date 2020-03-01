const login = require('./login');
const register = require('./register');
const resetPwd = require('./resetPwd');
const { licence } = require('./licence');

module.exports = {
  '/auth/login': { handler: login, method: 'POST' },
  '/auth/register': { handler: register, method: 'POST' },
  '/auth/resetPwd': { handler: resetPwd, method: 'PATCH' },
  '/auth/licence': { handler: licence, method: 'GET' }
}
const postHealth = require('./postHealth');

module.exports = {
  'health/postHealth': { handler: postHealth, method: 'POST' },
}
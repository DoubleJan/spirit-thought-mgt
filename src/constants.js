const Constants = {
  DEVELOPMENT: {
    host: 'http://localhost:8000'
  },

  PRODUCTION: {
    host: 'http://spirithought.net'
  }
}

module.exports = Constants[process.env.NODE_ENV];
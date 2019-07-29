var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"test"',
  // API_SERVER_URL: '"https://devapi.phc-dow.com"',
  // IMAGE_SERVER_URL: '"http://testxlc.bakheet.cn/"',
  API_SERVER_URL: '"http://craou.cn/"',
  IMAGE_SERVER_URL: '"http://craou.cn/"',
  OWNER_APPID: '"wxd0a30c4e6b561490"'
})

var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_SERVER_URL: '"http://craou.cn/"',
  IMAGE_SERVER_URL: '"http://craou.cn/"',
  // NODE_ENV: '"test"',
  // BASE_API: '"//devapi.phc-dow.com/"',
  // IMAGE_SERVER_URL: '"http://testxlc.bakheet.cn/"',
  OWNER_APPID: '"wxe627a9a956e716c1"'
})
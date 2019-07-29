var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"pre"',
  // API_SERVER_URL: '"//preapi.phc-dow.com/"',
  // IMAGE_SERVER_URL: '"http://prexlc.phc-dow.com/"',
  API_SERVER_URL: '"http://craou.cn/"',
  IMAGE_SERVER_URL: '"http://craou.cn/"',
  OWNER_APPID: '"wxe627a9a956e716c1"'
})

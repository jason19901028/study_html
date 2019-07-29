// 静默授权，微信登录,换取code
export function goWXStaticAuth (appid, uriString, type) {
  const _appid = appid
  const _uriString = uriString
  const _host = window.location.origin
  // const _host = 'https://testh5.phc-dow.com'
  console.log('_host:', _host)
  const wxUriString = `${_host}${_uriString}`
  if (type === 0) {
    return wxUriString
  } else {
    const wxRedirectUri = encodeURIComponent(wxUriString)
    const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${_appid}&redirect_uri=${wxRedirectUri}&response_type=code&scope=snsapi_userinfo&state=kj_parts&connect_redirect=1#wechat_redirect`
    window.location.href = url
  }
}
// 微信环境判断
export function isWeiXin () {
  const ua = navigator.userAgent.toLowerCase()
  if (ua.includes('micromessenger')) {
    return true
  } else {
    return false
  }
}
// ios浏览器
export function isIOS () {
  const u = navigator.userAgent
  const isIOSFlag = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  return isIOSFlag
}


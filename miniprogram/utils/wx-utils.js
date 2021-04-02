/**
 * 跳转页面
 */
export function wxNavigateTo(url) {
  return new Promise((resolve, reject) => {
    wx.navigateTo({
      url,
      success: resolve,
      fail: reject,
      complete() {}
    })
  })
}

/**
 * 重定向
 */
export function wxRedirectTo(url) {
  return new Promise((resolve, reject) => {
    wx.redirectTo({
      url,
      success: resolve,
      fail: reject,
      complete() {}
    })
  })
}

/**
 * 微信获取用户信息
 */
export function wxGetUserInfo() {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      lang: 'zh_CN',
      success: resolve,
      fail: reject,
      complete() {}
    })
  })
}

/**
 * 小程序登陆鉴权
 */
export function wxLogin() {
  return new Promise((resolve, reject) => {
    wx.login({
      success(res) {
        if (res.code) {
          resolve(res.code)
        } else {
          reject(res)
        }
      },
      fail: reject
    })
  })
}

/**
 * 跳转小程序
 */
export function wxToMini(appId, path, envVersion = 'develop') {
  return new Promise((resolve, reject) => {
    wx.navigateToMiniProgram({
      appId,
      path,
      envVersion,       // develop | trial | release
      success: resolve,
      fail: reject,
      complete() {}
    })
  })
}

/**
 * 开启loading
 */
export function wxShowLoading(title) {
  wx.showLoading({
    title,
    mask: true,
    success() {},
    fail() {},
    complete() {}
  })
}

/**
 * 关闭loading
 */
export function wxHideLoading() {
  wx.hideLoading({
    success() {},
    fail() {},
    complete() {}
  })
}

/**
 * 批量设置storage
 */
export function wxSetStorage(obj) {
  for (let key in obj) {
    wx.setStorageSync(key, obj[key])
  }
}

/**
 * 批量获取storage
 */
export function wxGetStorage() {
  const keys = wx.getStorageInfoSync().keys,
    data = {}
  for (let i = 0, len = keys.length; i < len; i++) {
    const key = keys[i]
    data[key] = wx.getStorageSync(key)
  }
  return data
}
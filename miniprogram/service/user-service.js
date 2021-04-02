import {cloudFunction, http} from '../utils/http-utils'
import {wxGetUserInfo, wxLogin} from "../utils/wx-utils"

/**
 * 用户静默登录-云函数
 */
export function autoLoginCloud() {
  const localUserInfo = wx.getStorageSync('userInfo')
  if (localUserInfo && localUserInfo.userId) {
    return Promise.resolve(localUserInfo)
  }
  return cloudFunction('autoLogin').then(userInfo => {
    wx.setStorageSync('userInfo', userInfo)
    return userInfo
  })
}

/**
 * 用户主动登录-云函数
 */
export function userLoginCloud() {
  return wxGetUserInfo().then(user => {
    const params = {
      userName: user.nickName,        // 昵称
      userAvatar: user.avatarUrl,     // 头像
      gender: user.gender,            // 性别
      country: user.country,          // 国家
      province: user.province,        // 省
      city: user.city,                // 城市
      language: user.language         // 语言
    }
    return cloudFunction('userLogin', params)
  }).then(userInfo => {
    wx.setStorageSync('userInfo', userInfo)
    return userInfo
  })
}

/**
 * 用户静默登录
 */
export function autoLogin() {
  return wxLogin().then(code => {
    const url = '/auth/api/wechat/micro/login/auto'
    const params = {
      sessionId: 'login',
      code
    }
    return http.post(url, params)
  }).then(userInfo => {
    // 登录信息缓存到全局
    wx.setStorageSync('userInfo', userInfo)
    return userInfo
  })
}

/**
 * 用户主动登录
 */
export function userLogin() {
  const p1 = wxLogin(),
    p2 = wxGetUserInfo()

  return Promise.all([p1, p2]).then(resList => {
    const code = resList[0],
      resUser = resList[1]

    const url = '/auth/api/wechat/micrologin'
    let params = {
      code,
      rawData: resUser.rawData,
      signature: resUser.signature,
      encryptedData: resUser.encryptedData,
      iv: resUser.iv,
    }
    return http.post(url, params)
  }).then(userInfo => {
    // 登录信息缓存到全局
    wx.setStorageSync('userInfo', userInfo)
    return userInfo
  })
}
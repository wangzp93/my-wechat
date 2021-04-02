import { wxShowLoading, wxHideLoading } from "./wx-utils";
import { autoLogin } from "../service/user-service";

const host = wx.getStorageSync('host')   // 全局host
let reqCount = 0    // 当前请求中的个数，用来控制loading

/**
 * 小程序调用云函数公共方法
 * @param {*} name 云函数名称
 * @param {*} data 参数
 */
export function cloudFunction(name, data = {}) {
  return new Promise((resolve, reject) => {
    showLoading()
    wx.cloud.callFunction({
      name,
      data,
      success(res) {
        resolve(res.result)
      },
      fail: reject,
      complete: hideLoading
    })
  })
}

/**
 * 封装云函数http请求
 * @param {*} url 请求地址
 * @param {*} params 参数
 */
export const cloudHttp = {
  get(url, params = {}) {
    return cloudFunction('http', {
      url,
      params,
      method: 'GET'
    })
  },
  post(url, params = {}) {
    return cloudFunction('http', {
      url,
      params,
      method: 'POST'
    })
  }
}

/**
 * 封装http请求
 * @param {*} url 请求地址
 * @param {*} params 参数
 */
export const http = {
  get(url, params) {
    return wxRequest(url, params, 'GET')
  },
  post(url, params) {
    return wxRequest(url, params, 'POST')
  }
}
function wxRequest(url, data = {}, method) {
  return checkSession(data).then(()=> {
    // 请求头
    let header = {
      'content-type': 'application/x-www-form-urlencoded',
    }
    return new Promise((resolve, reject) => {
      showLoading()
      wx.request({
        url: host + url,
        data,
        header,
        method,
        enableHttp2: true,
        enableQuic: true,
        success(res) {
          if (res.statusCode === 200) {
            if (res.data.state.code === '0') {  // 请求成功
              resolve(res.data.data)
            } else {
              if (res.data.state.code === '401') {  // 401，重新请求
                autoLogin().then(userInfo => {
                  data.sessionId = userInfo.sessionId
                  return wxRequest(url, data, method)
                }).then(reTryRes => {
                  resolve(reTryRes)
                }).catch(err => {
                  reject(err)
                })
              }
              reject(res.data.state.msg)
            }
          }
          reject(res.errMsg)
        },
        fail: reject,
        complete: hideLoading
      })
    })
  })
}

/**
 * 检查请求参数中的session
 */
function checkSession(data) {
  if (data.sessionId) {   // 参数中有session，不做处理
    return Promise.resolve()
  } else {    // 参数中没有session，去获取一下
    return getSession().then(sessionId=> {
      data.sessionId = sessionId
    })
  }
}

/**
 * 获取session
 */
function getSession() {
  const userInfo = wx.getStorageSync('userInfo')
  if (userInfo && userInfo.sessionId) {   // 有session，直接返回
    return Promise.resolve(userInfo.sessionId)
  } else {  // 没有session，调用登录接口获取
    return autoLogin().then(res=> {
      return res.sessionId
    })
  }
}

function showLoading() {
  if (reqCount++ === 0) {
    wxShowLoading('加载中')
  }
}

function hideLoading() {
  if (--reqCount === 0) {
    wxHideLoading()
  }
}
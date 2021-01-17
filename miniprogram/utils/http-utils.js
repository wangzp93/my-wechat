import { globalData } from "./init-utils";
import { wxShowLoading, wxHideLoading } from "./wx-utils";

const { host } = globalData.getData()   // 全局host
let reqCount = 0    // 当前请求中的个数，用来控制loading

/**
 * 小程序调用云函数公共方法
 * @param {*} name 云函数名称
 * @param {*} data 参数
 */
export function cloudFunction(name, data = {}) {
    return new Promise((resolve, reject)=> {
        showLoading()
        wx.cloud.callFunction({
            name,
            data,
            success(res) {
                resolve(res.result)
            },
            fail(err) {
                reject(err)
            },
            complete() {
                hideLoading()
            }
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

/**
 * 小程序发送请求
 */
export function wxRequest(url, data={}, method) {
    // sessionId
    return checkSession(data.sessionId).then((sessionId)=> {
        data.sessionId = sessionId

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
                        if (res.data.state.code === '0') {
                            // 处理成功状态的返回数据
                            resolve(res.data.data)
                        } else {
                            if (res.data.state.code === '401') {
                                // 重新登录，并更换sessionId重新请求
                                autoLogin().then(userInfo=> {
                                    data.sessionId = userInfo.sessionId
                                    return wxRequest(url, data, method)
                                }).then(reTryRes=> {
                                    resolve(reTryRes)
                                }).catch(err=> {
                                    reject(err)
                                })
                            }
                            reject(res.data.state.msg)
                        }
                    }
                    reject(res.errMsg)
                },
                fail(err) {
                    reject(err)
                },
                complete: () => {
                    hideLoading()
                }
            })
        })
    })
}

/**
 * 校验session
 */
export function checkSession(sessionId) {
    return new Promise((resolve)=> {
        if (sessionId) {    // 参数中自带sessionId，直接返回
            resolve(sessionId)
        } else {    // 参数中没有，从全局缓存中取
            const { userInfo } = globalData.getData()
            if (userInfo && userInfo.sessionId) {     // 缓存中有sessionId
                resolve(userInfo.sessionId)
            } else {    // 缓存中没有sessionId，重复获取
                const timer = setInterval(()=> {
                    const { userInfo } = globalData.getData()
                    if (userInfo && userInfo.sessionId) {     // 缓存中有sessionId
                        clearInterval(timer)
                        resolve(userInfo.sessionId)
                    }
                }, 300)
            }
        }
    })
}

function showLoading() {
    if (reqCount === 0) {
        wxShowLoading('加载中')
    }
    reqCount++
}

function hideLoading() {
    reqCount--
    if (reqCount === 0) {
        wxHideLoading()
    }
}
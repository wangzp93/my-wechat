import { wxGetUserInfo, wxLogin } from './wx-utils'

let envVersion = 'prod',    // 环境
    host = 'https://api.hongsong.club'  // 请求host
if (typeof __wxConfig === "object") {
    envVersion = __wxConfig.envVersion
    switch (envVersion) {
        case 'develop':
            //  工具或者真机 开发环境
            // host = 'https://dev.hongsong.club'
            host = 'https://beta.hongsong.club'
            // host = 'https://api.hongsong.club'
            break
        case 'trial':
            //  测试环境(体验版)
            host = 'https://beta.hongsong.club'
            // host = 'https://api.hongsong.club'
            break
        case 'release':
            //  正式环境
            host = 'https://api.hongsong.club'
            break
        default:
            //  默认环境
            host = 'https://api.hongsong.club'
    }
}

export { envVersion, host }

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
            wx.request({
                url: host + url,
                data,
                header,
                method,
                enableHttp2: true,
                enableQuic: true,
                success: (res) => {
                    if (res.statusCode === 200) {
                        if (res.data.state.code === '0') {
                            // 处理成功状态的返回数据
                            resolve(res.data.data)
                        } else {
                            if (res.data.state.code === '401') {
                                autoLogin()
                            }
                            reject(res.data.state.msg)
                        }
                    }
                    reject(res.errMsg)
                },
                fail: (err) => {
                    reject(err)
                },
                complete: () => {
                    //  成功失败都会执行
                }
            })
        })
    })
}

/**
 * 校验session
 */
export function checkSession(sessionId) {
    return new Promise((resolve, reject)=> {
        if (sessionId) {    // 参数中自带sessionId，直接返回
            resolve(sessionId)
        } else {    // 参数中没有，从全局缓存中取
            const { globalData } = getApp()
            if (globalData.userInfo && globalData.userInfo.sessionId) {     // 缓存中有sessionId
                resolve(globalData.userInfo.sessionId)
            } else {    // 缓存中没有sessionId，调用登录接口获取
                autoLogin().then(userInfo=> {
                    resolve(userInfo.sessionId)
                })
            }
        }
    })
}

/**
 * 用户静默登录
 */
export function autoLogin() {
    return wxLogin().then(code=> {
        const url = '/auth/api/wechat/micro/login/auto'
        const params = {
            sessionId: 'login',
            code
        }

        return http.post(url, params)
    }).then(userInfo=> {
        // 登录信息缓存到全局
        const { globalData } = getApp()
        globalData.userInfo = userInfo

        return userInfo
    })
}

/**
 * 用户主动登录
 */
export function userLogin() {
    const p1 = wxLogin(),
        p2 = wxGetUserInfo()

    return Promise.all([p1, p2]).then(resList=> {
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
    }).then(userInfo=> {
        // 登录信息缓存到全局
        const { globalData } = getApp()
        globalData.userInfo = userInfo

        return userInfo
    })
}
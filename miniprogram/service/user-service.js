import { http } from '../utils/http-utils'
import { wxGetUserInfo, wxLogin } from "../utils/wx-utils"
import { globalData } from "../utils/init-utils";

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
        globalData.setData({
            userInfo
        })

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
        globalData.setData({
            userInfo
        })

        return userInfo
    })
}
/**
 * 微信获取用户信息
 */
export function wxGetUserInfo() {
    return new Promise((resolve, reject) => {
        wx.getUserInfo({
            lang: 'zh_CN',
            success: res => {
                resolve(res)
            },
            fail: error => {
                reject(error)
            }
        })
    })
}

/**
 * 小程序登陆鉴权
 */
export function wxLogin() {
    return new Promise((resolve, reject) => {
        wx.login({
            success: res => {
                if (res.code) {
                    resolve(res.code)
                } else {
                    reject(res)
                }
            },
            fail: error => {
                reject(error)
            }
        })
    })
}

/**
 * 获取系统信息
 */
export function wxGetSystemInfo() {
    return new Promise((resolve, reject) => {
        wx.getSystemInfo({
            success: res => {
                resolve(res)
            },
            fail: err => {
                reject(err)
            }
        })
    })
}

/**
 * 跳转小程序
 */
export function wxToMini(appId, path) {
    return new Promise((resolve, reject)=> {
        wx.navigateToMiniProgram({
            appId,
            path,
            envVersion: 'develop',       // develop | trial | release
            success() {
                resolve()
            },
            fail() {
                reject()
            }
        })
    })
}

export function wxShowLoading(title) {
    wx.showLoading({
        title,
        mask: true,
        success() {},
        fail() {},
        complete() {}
    })
}

export function wxHideLoading() {
    wx.hideLoading({
        success() {},
        fail() {},
        complete() {}
    })
}
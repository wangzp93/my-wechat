/**
 * 跳转页面
 */
export function wxNavigateTo(url) {
    return new Promise((resolve, reject)=> {
        wx.navigateTo({
            url,
            success() {
                resolve()
            },
            fail() {
                reject()
            },
            complete() {}
        })
    })
}

/**
 * 重定向
 */
export function wxRedirectTo(url) {
    return new Promise((resolve, reject)=> {
        wx.redirectTo({
            url,
            success() {
                resolve()
            },
            fail() {
                reject()
            },
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
            success(res) {
                resolve(res)
            },
            fail(error) {
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
            success(res) {
                if (res.code) {
                    resolve(res.code)
                } else {
                    reject(res)
                }
            },
            fail(error) {
                reject(error)
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
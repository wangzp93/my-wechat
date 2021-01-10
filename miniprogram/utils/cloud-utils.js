/**
 * 小程序调用云函数公共方法
 * @param {*} name 云函数名称
 * @param {*} data 参数
 * @param {*} isLoading 是否展示loading
 */
export function cloudFunction(name, data = {}, isLoading = true) {
    if (isLoading) {
        wx.showLoading({
            title: '加载中...',
            mask: true
        })
    }
    return wx.cloud.callFunction({
        name,
        data
    }).then(res=> {
        if (isLoading) {
            wx.hideLoading()
        }
        return res.result
    }).catch(err=> {
        if (isLoading) {
            wx.hideLoading()
        }
        console.log(err)
        return Promise.reject(err)
    })
}

export const cloudHttp = {
    get(url, params = {}, isLoading = true) {
        return cloudFunction('http', {
            url,
            params,
            method: 'GET'
        }, isLoading)
    },
    post(url, params = {}, isLoading = true) {
        return cloudFunction('http', {
            url,
            params,
            method: 'POST'
        }, isLoading)
    }
}
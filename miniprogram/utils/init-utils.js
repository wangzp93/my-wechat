/**
 * 全局变量
 */
function GlobalData() {
    let data = {}
    this.setData = function(newData) {
        for (let key in newData) {
            data[key] = newData[key]
        }
    }
    this.getData = function(key) {
        if (key) {
            return data[key]
        } else {
            return data
        }
    }
    this.remove = function(key) {
        delete data[key]
    }
}

export const globalData = new GlobalData()

/**
 * 初始化全局
 */
export function initGlobal() {
    // 初始化环境
    const { envVersion, host, cloudEnvId } = initEnv()

    // 初始化平台
    const { platform } = wx.getSystemInfoSync()     // devtools | android | ios

    // 初始化云服务
    initWxCloud(cloudEnvId)

    globalData.setData({
        envVersion,
        host,
        cloudEnvId,
        platform
    })
}

/**
 * 初始化环境
 */
function initEnv() {
    let envVersion = 'prod',    // 环境
        host = 'https://api.hongsong.club',  // 请求host
        cloudEnvId = 'dev-8jxb0'     // 云服务环境id

    if (typeof __wxConfig === "object") {
        envVersion = __wxConfig.envVersion
        switch (envVersion) {
            case 'develop':     //  开发版
                host = 'https://dev.hongsong.club'
                cloudEnvId = 'dev-8jxb0'
                break
            case 'trial':       //  体验版
                host = 'https://beta.hongsong.club'
                cloudEnvId = 'dev-8jxb0'
                break
            case 'release':     //  正式版
                host = 'https://api.hongsong.club'
                cloudEnvId = 'dev-8jxb0'
                break
        }
    }

    return {
        envVersion,
        host,
        cloudEnvId
    }
}

/**
 * 初始化云开发
 */
function initWxCloud(cloudEnvId) {
    if (!wx.cloud) {
        console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
        wx.cloud.init({
            // env 参数说明：
            //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
            //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
            //   如不填则使用默认环境（第一个创建的环境）
            env: cloudEnvId,
            traceUser: true,
        })
    }
}
import { wxSetStorage } from "./wx-utils";

/**
 * 初始化环境
 */
export function initEnv() {
  let envVersion = 'release'    // 环境
  if (typeof __wxConfig === "object") {
    envVersion = __wxConfig.envVersion
  }
  const dict = {
    develop: {    // 开发版
      host: 'https://dev.hongsong.club',
      cloudEnvId: 'dev-8jxb0'
    },
    trial: {    // 体验版
      host: 'https://beta.hongsong.club',
      cloudEnvId: 'dev-8jxb0'
    },
    release: {    // 正式版
      host: 'https://api.hongsong.club',
      cloudEnvId: 'dev-8jxb0'
    }
  }

  const host = dict[envVersion].host,   // 请求host
    cloudEnvId = dict[envVersion].cloudEnvId    // 云服务环境id
  // 初始化平台
  const { platform } = wx.getSystemInfoSync()     // devtools | android | ios

  wxSetStorage({
    envVersion,
    host,
    cloudEnvId,
    platform
  })
}

/**
 * 初始化云开发
 */
export function initCloud() {
  const cloudEnvId = wx.getStorageSync('cloudEnvId')
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
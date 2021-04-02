import {autoLoginCloud, autoLogin} from './service/user-service';
import { initEnv, initCloud } from "./utils/init-utils";


App({
  onLaunch: function (options) {
    // 初始化环境
    initEnv()
    // 初始化云函数
    initCloud()

    // 静默登录
    autoLoginCloud()
    // autoLogin()
  },

  onShow(options) {

  }
})

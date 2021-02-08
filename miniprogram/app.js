import { autoLoginCloud, autoLogin } from './service/user-service';
import { init } from "./utils/init-utils";


App({
    onLaunch: function (options) {
        // 初始化
        init()

        // 静默登录
        autoLoginCloud()
        // autoLogin()
    },

    onShow(options) {

    }
})

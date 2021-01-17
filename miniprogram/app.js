import { autoLogin } from './service/user-service';
import { initGlobal } from "./utils/init-utils";


App({
    onLaunch: function (options) {
        // 初始化全局
        initGlobal()

        // 静默登录
        // autoLogin()
    },

    onShow(options) {

    }
})

// components/custom-header/custom-header.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        // title
        title: {
            type: String,
            value: ''
        },
        // title颜色
        color: {
            type: String,
            value: '#000'
        },
        // 背景颜色
        bgColor: {
            type: String,
            value: '#FFF'
        },
        // 底部占用高度
        bottom: {
            type: Number,
            value: 20
        },
        // 是否显示返回
        showBack: {
            type: Boolean,
            value: true
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        top: 0,
        height: 0
    },

    /**
     * 组件的方法列表
     */
    methods: {
        /**
         * 返回
         */
        goBack() {
            wx.navigateBack({
                fail() {
                    wx.switchTab({
                        url: '/pages/index/index'
                    })
                }
            })
        }
    },

    /**
     * 生命周期
     */
    lifetimes: {
        attached() {
            const { top, height } = wx.getMenuButtonBoundingClientRect()
            this.setData({
                top: top + 2,
                height
            })
        }
    }
})

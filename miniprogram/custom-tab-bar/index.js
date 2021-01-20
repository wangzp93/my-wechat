Component({
    /**
     * 组件的初始数据
     */
    data: {
        selected: 'index',
        list: [
            {
                id: 'index',
                text: '首页',
                url: '/pages/index/index',
                icon: '/images/tabbar/home.png',
                selectedIcon: '/images/tabbar/home-active.png'
            }, {
                id: 'class',
                text: '班级',
                url: '/pages/class/class',
                icon: '/images/tabbar/class.png',
                selectedIcon: '/images/tabbar/class-active.png'
            }, {
                id: 'schedule',
                text: '课表',
                url: '/pages/schedule/schedule',
                icon: '/images/tabbar/schedule.png',
                selectedIcon: '/images/tabbar/schedule-active.png'
            }, {
                id: 'party',
                text: '活动',
                url: '/pages/party/party',
                icon: '/images/tabbar/party.png',
                selectedIcon: '/images/tabbar/party-active.png'
            }, {
                id: 'me',
                text: '我的',
                url: '/pages/me/me',
                icon: '/images/tabbar/me.png',
                selectedIcon: '/images/tabbar/me-active.png'
            }
        ]
    },

    /**
     * 组件的方法列表
     */
    methods: {
        switchTab(e) {
            const { url } = e.currentTarget.dataset
            wx.switchTab({
                url
            })
        }
    }
})

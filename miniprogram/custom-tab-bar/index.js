Component({
    /**
     * 组件的初始数据
     */
    data: {
        selected: 'index',
        tabbarList: [
            {
                id: 'index',
                text: '房价',
                url: '/pages/house-price/index',
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
        switchTab(event) {
            const { url } = event.currentTarget.dataset
            wx.switchTab({
                url
            })
        }
    }
})

Component({
    /**
     * 组件的初始数据
     */
    data: {
        selected: 'music',
        list: [
            {
                id: 'index',
                text: '听老歌',
                url: '/pages/index/index',
                icon: '/images/tabbar/music-icon.png',
                selectedIcon: '/images/tabbar/music-active.png'
            }, {
                id: 'video',
                text: '看直播',
                url: '/pages/hs-video/hs-video',
                icon: '/images/tabbar/video-icon.png',
                selectedIcon: '/images/tabbar/video-active.png'
            }
        ]
    },

    /**
     * 组件的方法列表
     */
    methods: {
        switchTab(e) {
            const { path: url } = e.currentTarget.dataset
            wx.switchTab({
                url
            })
        }
    }
})

const computedBehavior = require('miniprogram-computed')

Page({

    behaviors: [computedBehavior.behavior],

    /**
     * 页面的初始数据
     */
    data: {
        dealPrice: 1,   // 成交价
        area: 1,       // 面积
        deposit: 20000,       // 定金
        balance: 10000,       // 尾款
        declarePrice: '',       // 申报价
        loan: '',       // 贷款额
        firstRate: 0.3,  // 首付比例
        mediation: '',       // 中介费
        loanService: '',       // 贷款服务费
        deedTax: '',       // 契税
        incomeTax: '',       // 个税
        pureFirstPay: '',       // 净首付
        totalFirstPay: '',       // 总首付
    },

    computed: {
        unitPrice: function(data) {
            return data.dealPrice / data.area
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 输入框失焦
     */
    onBlur(event) {
        this.setData({
            dealPrice: event.detail.value
        })

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    toTeacher() {
        wx.navigateToMiniProgram({
            appId: 'wxb76abad73a6c1d5c',
            path: 'packageA/pages/teacher-center/teacher-center?lecCode=lec2702',
            envVersion: 'develop',       // develop | trial | release
            success() {
                resolve()
            },
            fail() {
                reject()
            }
        })
    },

    toLive() {
        wx.navigateToMiniProgram({
            appId: 'wxb76abad73a6c1d5c',
            path: 'pages/swiper-live/swiper-live?roomID=room_lec2702_c40688',
            envVersion: 'develop',       // develop | trial | release
            success() {
                resolve()
            },
            fail() {
                reject()
            }
        })
    }
})
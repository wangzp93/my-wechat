const computedBehavior = require('miniprogram-computed')

Page({
  behaviors: [computedBehavior.behavior],
  /**
   * 页面的初始数据
   */
  data: {
    labelWidth: '220rpx',

    dealPrice: 1200000,   // 成交价
    area: 90,       // 面积
    deposit: 20000,       // 定金
    balance: 10000,       // 尾款
    firstRate: 0.3,  // 首付比例
    pureFirstPay: 0,       // 净首付
    totalFirstPay: 0,       // 总首付
  },

  computed: {
    // 单价 = 成交价 / 面积
    unitPrice: function (data) {
      return Number((data.dealPrice / data.area).toFixed(2))
    },

    // 申报价 = 成交价 - 定金 - 尾款
    declarePrice(data) {
      return data.dealPrice - data.deposit - data.balance
    },

    // 贷款额 = (申报价 * (1 - 首付比例))，向下以万取整
    loan(data) {
      return Math.floor(data.declarePrice * (1 - data.firstRate) / 10000) * 10000
    },

    // 中介费(1%，可谈) = 成交价 * 1%
    mediation(data) {
      return data.dealPrice * 0.01
    },

    // 贷款服务费 = 贷款额 * 1%
    loanService(data) {
      return data.loan * 0.01
    },

    // 契税 = 申报价 * 税率（x <= 90: 1%   90 < x <= 144: 1.5%   144 < x: 3%）
    deedTax(data) {
      let rate = 0.01
      const area = data.area
      if (area <= 90) {
        rate = 0.01
      } else if (area > 90 && area < 144) {
        rate = 0.15
      } else {
        rate = 0.03
      }
      return data.declarePrice * rate
    },

    // 个税 = 申报价 * 1%
    incomeTax(data) {
      return data.declarePrice * 0.01
    },

    // 首付 = 成交价 - 贷款额
    pureFirstPay(data) {
      return data.dealPrice - data.loan
    },

    // 总首付 = 首付 + 契税 + 个税 + 中介费 + 贷款服务费
    totalFirstPay(data) {
      return data.pureFirstPay + data.deedTax + data.incomeTax + data.mediation + data.loanService
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
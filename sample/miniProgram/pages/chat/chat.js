var Hub = require("../../utils/miniProgramSignalr.js")
var message = '';
var text = '';
var user = {};
var length;
var zx_info_id;
var openid_talk;
var app = getApp();
var centendata= [];
// pages/chat/chat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    news: '',
    scrollTop: 0,
    message: '',
    text: text,
    nickName: '',
    avatarUrl: '',
    news_input_val: ''
  },
  bindChange: function (e) {
    message = e.detail.value
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    this.hubConnect = new Hub.HubConnection();

    this.hubConnect.start("https://chat.jingshonline.net/chat", { nickName: app.globalData.userInfo.nickName, avatar: app.globalData.userInfo.avatarUrl });
    this.hubConnect.onOpen = res => {
      console.log("成功开启连接")
    }

    this.hubConnect.on("system", res => {
      wx.showModal({
        title: '系统消息',
        content: res,
      })
    })

    this.hubConnect.on("receive", res => {
      centendata.push({
        content: res.msg,
        time: new Date().toLocaleString(),
        head_owner: res.avatar,
        is_show_right: 0
      });
      this.setData({
        centendata: centendata
      })
    })
  },
  add: function (e) { 
    this.hubConnect.send("sendMessage",message);
    centendata.push({
      content: message,
      time: new Date().toLocaleString(),
      head_owner: app.globalData.userInfo.avatarUrl,
      is_show_right: 1
    });
    this.setData({
      centendata: centendata
    })
    this.setData({
      news_input_val: ''
    })
    message = '';
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
    this.hubConnect.close({ reason: "退出" })
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
  
  },
  bottom: function () {
    var query = wx.createSelectorQuery()
    query.select('#hei').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function (res) {
      wx.pageScrollTo({
        scrollTop: res[0].bottom  // #the-id节点的下边界坐标
      })
      res[1].scrollTop // 显示区域的竖直滚动位置
    })
  },
})
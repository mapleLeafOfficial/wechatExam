// pages/home/index.js
// 在需要使用 httpRequest 的地方使用 require 导入
const {
  httpRequest
} = require('../../utils/request');
const {
  BASEURL
} = require('../../utils/constant');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {},
    items:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let app= getApp()
      let userData= app.userData
      if(userData!=undefined){
        this.setData({
          user:userData
        })
      }else{
        let url = '/pages/login/login';
        wx.redirectTo({
          url: url
        })
      }
      console.log("user",userData);
      this.query(1)
  },
  async query(openid){
    const apiUrl = BASEURL+'/exam/api/paper/paper/paging';
    try {
      const res = await httpRequest(apiUrl,{"current": 1,
      "size": 5,
      "params": {
          "userId": this.data.user.id
      }},{ token: getApp().userData.token});
      if (res.success) {
        // 获得考试id
        console.log("Result",res); 
        this.setData({
          items:res.data.records
        })
      } else {
        console.error(res.msg);
      }
    } catch (error) {
      console.error(error);
    }
  },
  toReviewPage: function(e){
    console.log(e.currentTarget.dataset.id);
    let id = e.currentTarget.dataset.id;
    let url = '/pages/review/review?id='+id;
    wx.navigateTo({
      url: url
    })
  },
  toModePage: function(e){
    console.log(e.currentTarget.dataset.questions);
    wx.setStorageSync('arr', JSON.parse(e.currentTarget.dataset.questions));
    let url = '/pages/look/index';
    wx.redirectTo({
      url: url
    })
  },  
  toAttendPage: function(e){
    console.log(e.currentTarget.dataset.id);
    let id = e.currentTarget.dataset.id;
    let title = e.currentTarget.dataset.title;
    let url;
    url = '/pages/question/index?id='+id +'&title=' +title;
    wx.navigateTo({
      url: url
    })
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

  },
})
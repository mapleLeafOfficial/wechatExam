
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
    items1:{},
    items2:{},
    items3:{}
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
  sign:function(attendanceId){
    try {
      const apiUrl1 = BASEURL + '/exam/api/qu/qu/add-attendancenote';
      const res1 =  httpRequest(apiUrl1,{
        "attendanceId": attendanceId.currentTarget.dataset.name,
        "userId": this.data.user.id
      }, { token: getApp().userData.token });
      if (res1) {
        console.log(res1);
        wx.showToast({
          title: '签到成功',
        })
        wx.navigateBack()
        // const pages = getCurrentPages();
        // const currentPage = pages[pages.length - 1];
        // currentPage.onLoad();
      } else {
        console.error(res1);
      }
    } catch (error) {
      console.error(error);
    }
  },
  async query(openid) {
    try {
      wx.showLoading({
        title: '加载数据中',
      })
      const apiUrl1 = BASEURL + '/exam/api/qu/qu/pending-attendance';4
      const res1 = await httpRequest(apiUrl1, { "id": this.data.user.id }, { token: getApp().userData.token });
      if (res1) {
        console.log("Result1", res1);
        this.setData({
          items1: res1
        });
      } else {
        console.error(res1);
      }
    } catch (error) {
      console.error(error);
    }
    try {
      const apiUrl2 = BASEURL + '/exam/api/qu/qu/failed-attendance';
      const res2 = await httpRequest(apiUrl2, { "id": this.data.user.id }, { token: getApp().userData.token });
      if (res2) {
        console.log("Result2", res2);
        this.setData({
          items2: res2
        });
      } else {
        console.error(res2);
      }
    } catch (error) {
      console.error(error);
    }
    try {
      const apiUrl3 = BASEURL + '/exam/api/qu/qu/completed-attendance';
      const res3 = await httpRequest(apiUrl3, { "id": this.data.user.id }, { token: getApp().userData.token });
      if (res3) {
        console.log("Result3", res3);
        this.setData({
          items3: res3
        });
        wx.hideLoading()({
          title: '加载数据中',
        })
      } else {
        console.error(res3);
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
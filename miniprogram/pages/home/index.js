// pages/home/index.js
// 在需要使用 httpRequest 的地方使用 require 导入
const {
  httpRequest
} = require('../../utils/request');
const {
  BASEURL,TEMPTOKEN
} = require('../../utils/constant');
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    queryResult: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const app = getApp()
    console.log("用户数据",app.userData); 
    this.onQuery();
  },
  onQuery: function() {
    const apiUrl = BASEURL+'/exam/api/exam/exam/paging';
    httpRequest(
      apiUrl,
      {
        size:10,
        current: 1,
},{token: getApp().userData.token }).then(res => {
        // 处理API返回结果
        if (res.success) {
          // 登录成功
          wx.showToast({
            title: '刷新成功',
            icon: 'none', // 设置图标为警告
            duration: 2000 // 持续时间为2秒
          });
          console.log(res.data.records);
          // 进行其他操作，比如跳转页面或显示成功提示
          this.setData({
            queryResult: res.data.records
          });
        } else {
          // 登录失败
          console.error('登录失败:', res.msg);
          // 进行失败提示或其他处理
        }
      })
      .catch(error => {
        // 请求失败
        console.error('请求失败:', error);
        // 进行失败提示或其他处理
      });
  },
  toQuestionPage: function(e){
    console.log(e.currentTarget.dataset.id);
    let id = e.currentTarget.dataset.id;
    let url = '/pages/question/index?id='+id;
    wx.navigateTo({
      url: url
    })
  },
  getExamByCode(code){
    let exams = this.data.queryResult;
    let exam;
    exams.forEach((item)=>{
      if(item.code == code){
        exam = item;
      }
    })
    return exam;
  },
  
  toEntryPage: function(e){
    console.log(e.currentTarget.dataset.code);
    let code = e.currentTarget.dataset.code;
    let url = '/pages/entry/index?code='+code;
    wx.navigateTo({
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
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 1];
    console.log('开始输出');
    console.log(pages);
    console.log(prevPage);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onQuery();
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
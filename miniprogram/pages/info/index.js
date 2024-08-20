// 在需要使用 httpRequest 的地方使用 require 导入
const {
  httpRequest
} = require('../../utils/request');
const {
  BASEURL
} = require('../../utils/constant');
const{
  formatTime3,randomUUID
} = require('../../utils/util');
// 将 dist 目录下，weapp.qrcode.esm.js 复制到项目中。路径根据实际引用的页面路径自行改变
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: { },
    id:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userData = getApp().userData;
    this.setData({
      userInfo: userData
    })
    console.log(this.data.userInfo);
    let _this = this;
    // if(_this.data.userInfo.departId==='1773011453545074690'){

    // }else{
    // }
    // wx.login({
    //   success (res) {
    //     console.log(res);
    //     if (res.code) {
    //       //发起网络请求
    //       console.log(res);
    //     } else {
    //       console.log('登录失败！' + res.errMsg)
    //     }
    //   }
    // })  
  },
  // 2. 发起签到请求
 addAttendance:function(currentTime){
  const url = BASEURL+'/exam/api/qu/qu/add-attendance';
  this.setData({
    id : randomUUID()
  })
  console.log(this.data.id);
  const data = {
    attendanceId: this.data.id,
    attendanceTime: currentTime
  };
  const header = { token: getApp().userData.token}; // 设置请求头信息
  httpRequest(url, data, header)
    .then(res => {
      // 3. 签到成功，弹出对话框通知用户
      wx.showModal({
        title: '',
        content: '停止签到',
        success:res=>{
         if (res.confirm) {
          console.log('-----用户点击确定-----')
          let url = BASEURL+"/exam/api/qu/qu/update-attendance";
          let header = {
            token: getApp().userData.token
          };
          httpRequest(url, { attendanceId: this.data.id,}, header)
          .then
         }
        }
       })
      // 如果需要关闭签到功能，可以在这里执行相应操作
    })
    .catch(error => {
      console.error('签到失败：', error);
      // 如果签到失败，可以弹出错误信息提示用户
      wx.showToast({
        title: '签到失败，请重试',
        icon: 'none',
        duration: 2000
      });
    });
},
  sent: function(){
    // 网络请求获得当前时间
    const currentTime = formatTime3(new Date());
    console.log("当前时间",currentTime);
    // 签到插入到数据库
    this.addAttendance(currentTime)
  },
  resent:function(){
    let url = '/pages/attendance/attendance'
    wx.navigateTo({
      url: url
    })
  },
  // Getuserinfobyopenid: function(openid){
  //   let _this = this;
  // },
  bindMyHuodong: function(){
    let url = '/pages/activity/index';
    wx.navigateTo({
      url: url
    })
  },
  bindMyHistory: function(){
    let url = '/pages/history/index';
    wx.navigateTo({
      url: url
    })
  },  
  bindMyStudy: function(){
    let url = '/pages/study/index';
    wx.navigateTo({
      url: url
    })
  },    
  bindgoname: function(){
    let url = '/pages/name/index';
    wx.navigateTo({
      url: url
    })
  },
  bindmyinfo: function(){
    let url = '/pages/notice/index';
    wx.navigateTo({
      url: url
    })
  },
  bindgopay: function(){
    let url = '/pages/pay/index';
    wx.navigateTo({
      url: url
    })
  },
  bindgosend: function(){
    let url = '/pages/send/index';
    wx.navigateTo({
      url: url
    })
  },
  bindgoabout: function(){
    let url = '/pages/about/index';
    wx.navigateTo({
      url: url
    })
  },
  bindgorule: function(){
    let url = '/pages/rule/index';
    wx.navigateTo({
      url: url
    })
  }, 
  bindgomode: function(){
    let url = '/pages/mode/index';
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

  }
})
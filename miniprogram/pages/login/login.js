// pages/login/login.js
// 在需要使用 httpRequest 的地方使用 require 导入
const {
  httpRequest
} = require('../../utils/request');
const {
  BASEURL
} = require('../../utils/constant');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    checked: false ,// 初始时不同意协议
    disabled: true,
    account: '', // 存储用户输入的账号
    password: '', // 存储用户输入的密码
  },
    // 监听账号输入
    bindAccountInput: function (e) {
      this.setData({
        account: e.detail.value
      });
    },
    // 监听密码输入
    bindPasswordInput: function (e) {
      this.setData({
        password: e.detail.value
      });
    },
  // 复选框状态改变时触发
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    let val = e.detail.value
    if(val.length>0){
      this.setData({
        checked:true,
        disabled:false
      })
    }else{
      this.setData({
        checked:false,
        disabled:true
      })
    }
  },
  navToReg: function(e){
    wx.redirectTo({
      url: '../register/register',
    })
  },
    // 点击登录按钮
    login: function () {
      // 获取用户输入的账号和密码
      const {
        account,
        password
      } = this.data;
      // 验证账号和密码
      if (!account || !password) {
        wx.showToast({
          title: '账号或密码不能为空',
          icon: 'none', // 设置图标为警告
          duration: 2000 // 持续时间为2秒
        });
        return;
      }  
      // 请求API
      const apiUrl = BASEURL + '/exam/api/sys/user/login';
      // 使用 wx.redirectTo 跳转到指定页面
        httpRequest(apiUrl, {
            password,
            userName: account,
          })
          .then(res => {
            // 处理API返回结果
            if (res.success) {
              // 登录成功
              wx.showToast({
                title: '登录成功',
                icon: 'none', // 设置图标为警告
                duration: 2000 // 持续时间为2秒
              });
              // 进行其他操作，比如跳转页面或显示成功提示
              const app = getApp()
              app.userData = res.data // 第一次 null，回传后为 true
              wx.switchTab({
                url: '../home/index',
              })
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
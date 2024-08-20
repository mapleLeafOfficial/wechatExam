// pages/question/index.js
// 在需要使用 httpRequest 的地方使用 require 导入
const {
  httpRequest
} = require('../../utils/request');
const {
  BASEURL,TEMPTOKEN
} = require('../../utils/constant');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    exam_id: 0,
    idx: 0,
    score: 0,
    questions:[],
    score_arr:[0,0,0,0,0,0,0,0,0,0],
    code_arr:['M','M','M','M','M','M','M','M','M','M'],
    sortcode: '01',
    hiddenbtn: true
  },
  async checkboxChange(e) {
    console.log('check发生change事件，携带value值为：',e.detail.value );
    let idxs = [];
    let options= [];
    let questions= [];
    let values = e.detail.value.map(item => {
      let parts = item.split('|');
      idxs.push(JSON.parse(parts[0]));
      options.push(JSON.parse(parts[1]));
      questions.push(JSON.parse(parts[2]));
    });
    const apiUrl = BASEURL+'/exam/api/paper/paper/fill-answer';
    console.log("idx",idxs);
    console.log("option",options);
    console.log("question",questions);
    let answers = []
    options.map(item => {
      answers.push(item.id);
    });
    console.log("我的答案",answers);
    const body = {
      answer: "",
      answers: answers,
      paperId: questions[0].paperId,
      quId: questions[0].quId,
    }
    console.log(body);
      try {
        const res = await httpRequest(apiUrl,body,{token: getApp().userData.token });
        if (res.success) {
          // 获得考试id
          console.log("提交答案",res); // 请注意这里使用了 this.data.exam_id 来获取 exam_id
        } else {
          console.error(res);
        }
      } catch (error) {
        console.error(error);
      }
  },  
  async radioChange(e) {
    console.log('radio发生change事件，携带value值为：' );
    let arr = e.detail.value.split('|');
    let idx = arr[0];
    let option = JSON.parse(arr[1]);
    let question = JSON.parse(arr[2]);
    const apiUrl = BASEURL+'/exam/api/paper/paper/fill-answer';
    console.log("idx",idx);
    console.log("option",option);
    console.log("question",question);
    const body = {
      answer: option.id,
      answers: [option.id],
      paperId: question.paperId,
      quId: question.quId,
    }
    console.log(body);
      try {
        const res = await httpRequest(apiUrl,body,{token: getApp().userData.token });
        if (res.success) {
          // 获得考试id
          console.log("提交答案",res); // 请注意这里使用了 this.data.exam_id 来获取 exam_id
        } else {
          console.error(res);
        }
      } catch (error) {
        console.error(error);
      }
  },  
  async bindSubmitTap(){
    const apiUrl = BASEURL+'/exam/api/paper/paper/hand-exam';
    const body = {
      // id: this.data.exam_id,
      id: this.data.exam_id
    }
    try {
      const res = await httpRequest(apiUrl,body,{token: getApp().userData.token });
      if (res.success) {
        // 获得考试id
        console.log("交卷",res); // 请注意这里使用了 this.data.
        wx.setStorage({
          id:null,
        })
        wx.navigateBack({
          delta: 1  // 返回上一个页面
        });
        wx.showModal({
          showCancel: false,
          title: '温馨提醒',
          content: '交卷成功',
          success (res) {
            if (res.confirm) {
              _this.bindgolistview()
            } else if (res.cancel) {
            }
          }
        })
      } else {
        console.error(res);
      }
    } catch (error) {
      console.error(error);
    }
    let _this = this;
  },
  bindgoscore: function(score){
    let url = '/pages/score/index?score='+score;
    wx.navigateTo({
      url: url
    })
  },  
  bindgolistview: function(){
    let url = '';
    wx.navigateTo({
      url: url
    })
  },  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    var that = this; // 保存页面实例的引用
    wx.getStorage({
      key: 'id',
      success(res) {
        console.log(res)
        that.setData({ // 使用setData方法更新数据
          exam_id: res.data
      });
      }
    })
    let id = options.id;
    this.setData({
      idx : id
    });
    this.initFun();
  },
  async initFun(){
    // 将按钮设为禁用状态
    wx.showLoading({
      title: 'Loading...',
    })
    await this.startExam(this.data.idx); 
    await this.getQuestions(this.data.exam_id);

  },
  async startExam(id) {
    const apiUrl = BASEURL+'/exam/api/paper/paper/create-paper';
  try {
    const res = await httpRequest(apiUrl, { examId:id }, {token: getApp().userData.token });
    if (res.success) {
      this.setData({
        exam_id: res.data.id
      });
      wx.setStorage({
        key: 'id',
        data: this.data.exam_id,
        success(res) {
          console.log('数据存储成功');
        },
        fail(error) {
          console.error('数据存储失败', error);
        }
      });
      // 获得考试id
      console.log("Myid",this.data.exam_id); // 请注意这里使用了 this.data.exam_id 来获取 exam_id
    } else {
      console.error(res.msg);
    }
  } catch (error) {
    console.error(error);
  }
  },
  //通过考试id获得题目
  async getQuestions(id){
    console.log("MyExam:" ,id);
    const apiUrl = BASEURL+'/exam/api/paper/paper/paper-result';
    try {
      const res = await httpRequest(apiUrl, { id:id}, {token: getApp().userData.token });
      if (res.success) {
        this.setData({
          questions : res.data.quList
        });
        // 获得考试id
        console.log("MyQuestion",this.data.questions); // 请注意这里使用了 this.data.exam_id 来获取 exam_id
        wx.hideLoading()
        this.setData({
          hiddenbtn: false
        });
      } else {
        console.error(res.msg);
      }
    } catch (error) {
      console.error(error);
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 1];
    console.log(pages);
    console.log(prevPage);
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
// pages/douban/coming_soon/coming_soon.js
// 导入Api模块
import { COMING_SOON } from "../../../api/apiConfig"

import { request } from "../../../api/httpclient"

const app = getApp();

/**
 * 即将上映
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: app.globalData.screenHeight,
    movies: {}
  },

  call: function(res){
    console.log(res)
    wx.hideLoading();

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })

    let that = this;
    request(COMING_SOON, {}, function success(data) {
      wx.hideLoading()
      that.setData({
        movies: data.subjects
      })
    }, function fail(res) {
      wx.hideLoading()
      console.log("__fail__", res)
    })
  },

  bindMovieDetail() {
    wx.navigateTo({
      url: '../movie_detail/movie_detail',
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
    if (this.data.movies) {
      console.log("onShow....", this.data.movies)
    }
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
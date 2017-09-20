// pages/douban/movie_detail/movie_detail.js

// 导入Api模块
import { MOVIE_DETAIL } from "../../../api/apiConfig"

import { request } from "../../../api/httpclient"


const bapp = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('__Movie Detail__', options.movie_id)

    let that = this;
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
    
    let url_detail = MOVIE_DETAIL + options.movie_id
    // let url_detail = MOVIE_DETAIL + "27132379"
    request(url_detail, {}, function success(res) {
      wx.hideLoading();
      console.log(res)
      that.setData({
        movie: res,
      })
      wx.setNavigationBarTitle({
        title: res.title,
      })
      console.log(that.data)
    }, function fail(res) {
      wx.hideLoading();
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showToast({
      title: '下拉',
    })

  },

  bindWant2See() {
    wx.showToast({
      title: "想看被点击了",
    })
  },

  bindSeen() {
    wx.showToast({
      title: "已看被点击了",
    })
  },

  bindCast(e) {
    wx.showToast({
      title: e.currentTarget.id,
    })
  }
})
// pages/douban/coming_soon/coming_soon.js
// 导入Api模块
import { COMING_SOON } from "../../../api/apiConfig"

import { httpGet } from "../../../api/httpclient"

const app = getApp();

let isAllowLoadMore = false;
/**
 * 即将上映
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: app.globalData.screenHeight,
    movies: [],
    currentPage: 0,
    movie_id: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestData(false);
  },

  bindMovieDetail(e) {
    console.log('__ movie_id __', e.currentTarget.id);
    wx.navigateTo({
      url: `../movie_detail/movie_detail?movie_id=${e.currentTarget.id}`,
    })
  },

  requestData: function(isRefresh) {
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })

    let that = this;
    if (isRefresh) {
      that.data.movies.splice(0, that.data.movies.length)
    }
    httpGet(COMING_SOON, {
      params: {
        start: this.data.currentPage * 20,
        count: 20,
      },
      success: function(res) {
        wx.hideLoading();
        isAllowLoadMore = true;
        var movieTemp = that.data.movies;
        let len = res.subjects.length;
        for (let i = 0; i < len; i++) {
          movieTemp.push(res.subjects[i])
        }
        that.setData({
          movies: movieTemp
        })
        console.log(that.data.movies);
      },
      fail: function(res) {
        that.data.currentPage--;
        wx.hideLoading();
        console.log("__fail__", res)
        isAllowLoadMore = true;
      }
    })
  },

  bindscrolltoupper() {
    console.log("----bindscrolltolower-------", this.data.currentPage)
    this.data.currentPage = 0
    console.log("----bindscrolltolower-------", this.data.currentPage)
    this.requestData(true);
  },

  bindscrolltolower: function(e) {
    console.log("----bindscrolltolower-------", this.data.currentPage)
    if (isAllowLoadMore) {
      isAllowLoadMore = false;
      this.data.currentPage++;
      // 发起请求
      this.requestData(false);
    }
    
    console.log("----bindscrolltolower-------", this.data.currentPage) 
  },
})


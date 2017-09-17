
/**
 * 网络请求
 */

export function request(
    url, data={}, 
    success=undefined, 
    fail=undefined, 
    method = 'GET', 
    ) {

  if (typeof success != undefined && typeof success != 'function') {
    throw new Error("type of success must be define a function...")
  }
  if (typeof fail != undefined && typeof fail != 'function') {
    throw new Error("type of fail must be define a function...")
  }
  console.log('__requestUrl__', url, '\n__requestParams__', data)

  wx.request({
    url: url,
    data: data,
    header: {
      'content-type': 'json' // 默认值
    },
    method: method,
    
    success: function (res) {
      console.log('__response__', res)
      let httpCode = res.statusCode
        if (success && httpCode == 200) {
          success(res.data)
        }
        if (fail && httpCode != 200) {
          fail(res.data)
        }
    },

    fail: function (res) {
      console.log("__fail__", res)
      if (fail) {
        wx.showToast({
          title: '网络异常',
          duration: 2000,
        })
        // fail(res)
      }
    },
  })
}












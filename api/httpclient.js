
/**
 * 网络请求
 */

var requestHandler = {
  params: {},
  success: function (res) {
    // success
  },
  fail: function (res) {
    // fail
  },
}

//GET请求
export function httpGet(url, requestHandler) {
  request('GET', url, requestHandler)
}
//POST请求
export function httpPost(url, requestHandler) {
  request('POST', url, requestHandler)
}

function request(method, url, requestHandler) {
  console.log('__url__', url)
  var params = requestHandler.params;

  wx.request({
    url: url,
    data: params,
    header: {
      'content-type': 'json' // 默认值
    },
    method: method,

    success: function (res) { 
      console.log('__response__', res)
      if (res.statusCode == 200) {
        requestHandler.success(res.data)
      } else {
        requestHandler.fail(res.data)
      }
    },

    fail: function (res) {
      console.log("__fail__", res)
      requestHandler.fail(res.data)
    },

    complete: function (res) { },
  })
}

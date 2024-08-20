/**
 * 发起 HTTP POST 请求
 * @param {string} url - 请求的 URL
 * @param {Object} data - 请求体数据
 * @param {Object} header - 请求头信息
 * @returns {Promise} - 返回一个 Promise 对象
 */
export function httpRequest(url, data, header) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: 'POST',
      data: data, // 将请求体数据传递给后端
      header: header, // 设置请求头信息
      success: (res) => {
        // 请求成功，将结果通过 resolve 返回
        resolve(res.data);
      },
      fail: (error) => {
        // 请求失败，将错误信息通过 reject 返回
        reject(error);
      }
    });
  });
}

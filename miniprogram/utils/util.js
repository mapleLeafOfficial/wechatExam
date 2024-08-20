/**
 * 获取格式化的时间字符串（包含年月日时分秒）
 * @param {Date} date - 要格式化的日期对象
 * @returns {string} 格式化后的时间字符串，格式为：YYYY/MM/DD HH:mm:ss
 */
const getTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
function randomUUID() {
  var uuid = '';
  for (var i = 0; i < 10; i++) {
      if (i === 4 || i === 7) {
          uuid += '-';
      } else {
          uuid += Math.floor(Math.random() * 16).toString(16);
      }
  }
  return parseInt(uuid.replace(/-/g, ''), 16);
}



/**
 * 获取格式化的时间字符串（只包含年月日时分秒，无间隔符号）
 * @param {Date} date - 要格式化的日期对象
 * @returns {string} 格式化后的时间字符串，格式为：YYYYMMDDHHmmss
 */
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('') + '' + [hour, minute, second].map(formatNumber).join('')
}

/**
 * 获取格式化的日期字符串（只包含年月日，无间隔符号）
 * @param {Date} date - 要格式化的日期对象
 * @returns {string} 格式化后的日期字符串，格式为：YYYYMMDD
 */
const formatTime2 = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('')
}

/**
 * 格式化数字，如果数字小于 10，则在前面补 0
 * @param {number} n - 要格式化的数字
 * @returns {string} 格式化后的字符串
 */
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**
 * 将日期对象格式化为指定格式的时间字符串
 * @param {Date} date - 要格式化的日期对象
 * @returns {string} 格式化后的时间字符串，格式为：YYYY-MM-DD HH:mm:ss
 */
const formatTime3 = (date) => {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hour = ('0' + date.getHours()).slice(-2);
  const minute = ('0' + date.getMinutes()).slice(-2);
  const second = ('0' + date.getSeconds()).slice(-2);
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};

// 获取当前时间并格式化
const currentTime = formatTime(new Date());
console.log(currentTime); // 输出格式化后的时间字符串

module.exports = {
  getTime: getTime,
  formatTime: formatTime,
  formatTime2: formatTime2,
  formatTime3:formatTime3,
  randomUUID:randomUUID
}

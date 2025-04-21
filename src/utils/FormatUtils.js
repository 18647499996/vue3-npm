/**
 * 格式化时间
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * todo 显示聊天列表时间
 * @param timeStamp
 * @returns {string}
 */
export function showMessageTime(timeStamp) {
  let dayText
  let monthText
  const currentDate = getDate(new Date())
  const _today_stamp = Date.parse(currentDate['year'] + '/' + currentDate['month'] + '/' + currentDate['day'] + ' 00:00:00')

  const stamp = []
  stamp[0] = _today_stamp + 86400000
  stamp[1] = _today_stamp
  stamp[2] = _today_stamp - 86400000
  stamp[3] = _today_stamp - 172800000
  stamp[4] = _today_stamp - 518400000 // 7天
  stamp[5] = _today_stamp - 31536000000 // 365天

  const _compare_obj = new Date()
  _compare_obj.setTime(timeStamp)

  let return_str

  if (timeStamp >= stamp[1] && timeStamp < stamp[0]) {
    return_str = _compare_obj.getHours() + ':' + (_compare_obj.getMinutes() < 10 ? '0' + _compare_obj.getMinutes() : _compare_obj.getMinutes())
  } else if (timeStamp >= stamp[2] && timeStamp < stamp[1]) {
    const yesterdayText = '昨天'
    return_str = yesterdayText + ' ' + _compare_obj.getHours() + ':' +
      (_compare_obj.getMinutes() < 10 ? '0' + _compare_obj.getMinutes() : _compare_obj.getMinutes())
  } else if (timeStamp >= stamp[3] && timeStamp < stamp[2]) {
    const theDayBeforeYesterdayText = '前天'
    return_str = theDayBeforeYesterdayText + ' ' + _compare_obj.getHours() + ':' +
      (_compare_obj.getMinutes() < 10 ? '0' + _compare_obj.getMinutes() : _compare_obj.getMinutes())

  } else if (timeStamp >= stamp[4] && timeStamp < stamp[3]) { // 7天内
    const dayNames = ['天', '一', '二', '三', '四', '五', '六']
    const dayStr = '星期' + dayNames[_compare_obj.getDay()]

    const SundayText = '星期天'
    const MondayText = '星期一'
    const TuesdayText = '星期二'
    const WednesdayText = '星期三'
    const ThursdayText = '星期四'
    const FridayText = '星期五'
    const SaturdayText = '星期六'

    let dayStr2

    switch (dayStr) {
      case '星期天':
        dayStr2 = SundayText
        break
      case '星期一':
        dayStr2 = MondayText
        break
      case '星期二':
        dayStr2 = TuesdayText
        break
      case '星期三':
        dayStr2 = WednesdayText
        break
      case '星期四':
        dayStr2 = ThursdayText
        break
      case '星期五':
        dayStr2 = FridayText
        break
      case '星期六':
        dayStr2 = SaturdayText
        break
      default:
        dayStr2 = dayStr
        break
    }

    return_str = dayStr2 + ' ' + _compare_obj.getHours() + ':' +
      (_compare_obj.getMinutes() < 10 ? '0' + _compare_obj.getMinutes() : _compare_obj.getMinutes())
  } else if (timeStamp >= stamp[5] && timeStamp < stamp[4]) { // 365天内
    monthText = '月'
    dayText = '日'
    return_str = (_compare_obj.getMonth() - (-1)) + monthText + _compare_obj.getDate() + dayText + ' '
      + _compare_obj.getHours() + ':' + (_compare_obj.getMinutes() < 10 ? '0' + _compare_obj.getMinutes() : _compare_obj.getMinutes())

  } else {
    const yearText = '年'
    monthText = '月'
    dayText = '日'
    return_str = _compare_obj.getFullYear() + yearText + (_compare_obj.getMonth() - (-1)) +
      monthText + _compare_obj.getDate() + dayText + ' ' + _compare_obj.getHours() + ':' +
      (_compare_obj.getMinutes() < 10 ? '0' + _compare_obj.getMinutes() : _compare_obj.getMinutes())
  }
  return return_str

}

/**
 * todo 年月日时分秒转时间戳
 * @param dateStr 时间格式字符串
 * @returns {number}
 */
export function getTimestamp(dateStr) {
  const date = new Date(dateStr)
  return date.getTime() / 1000
}

/**
 * todo 获取格式化时间（ yyyy-MM-dd HH:mm ）
 * @param time 时间
 * @param format 格式
 * @returns {string}
 */
export function getDateFormat(time, format) {
  const currentDate = getDate(new Date(time))
  switch (format) {
    case 'yyyy-MM-dd':
      return currentDate['year'] + '-' + currentDate['month'] + '-' + currentDate['day']
    case 'yyyy-MM-dd HH:mm':
      return currentDate['year'] + '-' + currentDate['month'] + '-' + currentDate['day'] + ' ' + currentDate['hours'] + ':' + currentDate['minutes']
    case 'yyyy-MM-dd HH:mm:ss':
      return currentDate['year'] + '-' + currentDate['month'] + '-' + currentDate['day'] + ' ' + currentDate['hours'] + ':' + currentDate['minutes'] + ':' + currentDate['seconds']
    case 'yyyy年MM月dd日':
      return currentDate['year'] + '年' + currentDate['month'] + '月' + currentDate['day'] + '日'
    case 'yyyy年MM月dd日 HH:mm':
      return currentDate['year'] + '年' + currentDate['month'] + '月' + currentDate['day'] + '日' + ' ' + currentDate['hours'] + ':' + currentDate['minutes']
    case 'yyyy年MM月dd日 HH:mm:ss':
      return currentDate['year'] + '年' + currentDate['month'] + '月' + currentDate['day'] + '日' + ' ' + currentDate['hours'] + ':' + currentDate['minutes'] + ':' + currentDate['seconds']
  }
}

/**
 * 格式化年月日
 * @param date 时间
 * @returns {{hours: (string|number), seconds: (string|number), month: (string|number), year: number, minutes: (string|number), day: (string|number)}}
 */
function getDate(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()

  return {
    'year': year,
    'month': month < 10 ? '0' + month : month,
    'day': day < 10 ? '0' + day : day,
    'hours': hours < 10 ? '0' + hours : hours,
    'minutes': minutes < 10 ? '0' + minutes : minutes,
    'seconds': seconds < 10 ? '0' + seconds : seconds
  }
}

export default {
  formatTime,
  getTimestamp,
  getDateFormat,
  showMessageTime
}

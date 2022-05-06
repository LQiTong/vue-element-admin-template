import moment from 'moment'

/**
 * @returns 生成随机颜色 16进制
 */
export function generateRandomHexColor() {
  return `#${Math.floor(Math.random() * 0xffffff).toString(16)}`
}

/**
 * 滚动到底部
 * @param {HtmlElement} element 页面元素
 */
export function scrollToBottom(element) {
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'end'
  })
}

/**
 * 滚动到顶部
 * @param {HtmlElement} element 页面元素
 */
export function scrollToTop(element) {
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })
}

/**
 * 检测用户是否开启了黑暗模式
 * @returns boolean
 */
export function isDarkMode() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

/**
 * 时间转换
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string') {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if (typeof time === 'number' && time.toString().length === 10) {
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
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    // Array.padStart 需要两个参数——新创建的结果字符串的总长度和将被重复的字符串
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * 获取时间间隔
 * @param {string} type 'today'/'week'/'month'/'year'
 * @returns
 */
export function getTimeDistance(type) {
  const now = new Date()
  const oneDay = 1000 * 60 * 60 * 24

  if (type === 'today') {
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)
    return [moment(now), moment(now.getTime() + (oneDay - 1000))]
  }

  if (type === 'week') {
    let day = now.getDay()
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)

    if (day === 0) {
      day = 6
    } else {
      day -= 1
    }

    const beginTime = now.getTime() - day * oneDay

    return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))]
  }

  if (type === 'month') {
    const year = now.getFullYear()
    const month = now.getMonth()
    const nextDate = moment(now).add(1, 'months')
    const nextYear = nextDate.year()
    const nextMonth = nextDate.month()

    return [
      moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
      moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000)
    ]
  }

  if (type === 'year') {
    const year = now.getFullYear()

    return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)]
  }
}

/**
 * 小于10数字补零
 * @param {string|number} val 数字或隐式数字
 * @returns
 */
export function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val
}

/**
 * 获取普通节点
 * @param {HTML Nodes} nodeList HTML 节点列表
 * @param {*} parentPath
 * @returns
 */
export function getPlainNode(nodeList, parentPath = '') {
  const arr = []
  nodeList.forEach((node) => {
    const item = node
    item.path = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/')
    item.exact = true
    if (item.children && !item.component) {
      arr.push(...getPlainNode(item.children, item.path))
    } else {
      if (item.children && item.component) {
        item.exact = false
      }
      arr.push(item)
    }
  })
  return arr
}

/**
 * @description 将数值金额转换成大写金额
 * @date 2019-01-29
 * @export
 * @param {*} n 数值金额
 * @returns string
 */
export function digitUppercase(n) {
  const fraction = ['角', '分']
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  const unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟']
  ]
  let num = Math.abs(n)
  let s = ''
  fraction.forEach((item, index) => {
    s += (digit[Math.floor(num * 10 * 10 ** index) % 10] + item).replace(/零./, '')
  })
  s = s || '整'
  num = Math.floor(num)
  for (let i = 0; i < unit[0].length && num > 0; i += 1) {
    let p = ''
    for (let j = 0; j < unit[1].length && num > 0; j += 1) {
      p = digit[num % 10] + unit[1][j] + p
      num = Math.floor(num / 10)
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
  }

  return s
    .replace(/(零.)*零元/, '元')
    .replace(/(零.)+/g, '零')
    .replace(/^整$/, '零元整')
}

/**
 * @description 判断两个字符串关系
 * @date 2019-01-29
 * @param {*} str1
 * @param {*} str2
 * @returns number
 */
const getRelation = (str1, str2) => {
  if (str1 === str2) {
    console.warn('Two path are equal!') // eslint-disable-line
  }
  const arr1 = str1.split('/')
  const arr2 = str2.split('/')
  if (arr2.every((item, index) => item === arr1[index])) {
    return 1
  } else if (arr1.every((item, index) => item === arr2[index])) {
    return 2
  }
  return 3
}

const getRenderArr = (routes) => {
  let renderArr = []
  renderArr.push(routes[0])
  for (let i = 1; i < routes.length; i += 1) {
    let isAdd = false
    // 是否包含
    isAdd = renderArr.every((item) => getRelation(item, routes[i]) === 3)
    // 去重
    renderArr = renderArr.filter((item) => getRelation(item, routes[i]) !== 1)
    if (isAdd) {
      renderArr.push(routes[i])
    }
  }
  return renderArr
}

/**
 * 获取路由配置
 * { path:{name,...param}}=>Array<{name,path ...param}>
 * @param {string} path
 * @param {routerData} routerData
 */
export function getRoutes(path, routerData) {
  let routes = Object.keys(routerData).filter((routePath) => routePath.indexOf(path) === 0 && routePath !== path)
  // Replace path to '' eg. path='user' /user/name => name
  routes = routes.map((item) => item.replace(path, ''))
  // Get the route to be rendered to remove the deep rendering
  const renderArr = getRenderArr(routes)
  // Conversion and stitching parameters
  const renderRoutes = renderArr.map((item) => {
    const exact = !routes.some((route) => route !== item && getRelation(route, item) === 1)
    return {
      exact,
      ...routerData[`${path}${item}`],
      key: `${path}${item}`,
      path: `${path}${item}`
    }
  })
  return renderRoutes
}

/* eslint no-useless-escape:0 */
const reg =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g
// 验证url是否正确
export function isUrl(path) {
  return reg.test(path)
}

// 正则规则整理
export const regular = {
  // 验证自然数
  naturalNumber: /^(([0-9]*[1-9][0-9]*)|(0+))$/,
  // 英文
  english: /^.[A-Za-z]+$/,
  // 验证是否是座机号
  telephone: /^\d{3}-\d{7,8}|\d{4}-\d{7,8}$/,
  // 手机号
  mobile: /^1[34578]\d{9}$/,
  // 银行卡号码
  bankCard: /^[1-9]\d{9,19}$/,
  // 证件号码
  IDNumber: /^[a-z0-9A-Z]{0,50}$/,
  // 身份证号码,包括15位和18位的
  IDCard:
    /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{7}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/,
  // QQ号码
  qq: /^[1-9]\d{4,11}$/,
  // 网址, 仅支持http和https开头的
  url: /^(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?$/,
  // 0到20位的英文字符和数字
  enNum0to20: /^[a-z0-9A-Z]{0,20}$/,
  // 2到100位的中英文字符和空格，可以是中文、英文、空格
  cnEnSpace2to100: /^[a-zA-Z\u4E00-\u9FA5\s*]{2,100}$/,
  // 数字和换行符
  numLinefeed: /^[0-9\n*]+$/,
  // 255位以内的字符
  char0to255: /^.{0,255}$/
}

/**
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
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  let s = str.length
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xdc00 && code <= 0xdfff) i--
  }
  return s
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map((key) => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach((v) => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach((property) => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
 * 元素切换类方法
 * @param {HTMLElement} element 目标元素
 * @param {string} className 类名
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

/**
 * 防抖函数
 * @param {Function} func 要执行的方法
 * @param {number} wait 时间间隔
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = () => {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return (...args) => {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * 节流函数
 * @param {Function} fn 要处理的事件
 * @param {number} wait 时间间隔
 * @returns
 */
export function throttle(fn, wait) {
  let start = 0 // 初始时间
  return () => {
    const end = new Date() // 当前时间
    if (end - start > wait) {
      fn.apply(this, arguments)
      start = end
    }
  }
}

/**
 * 这只是深度复制的一个简单版本
 * 有很多edge bug案例
 * 如果你想使用完美的深度复制，请使用lodash的。cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * Array.from方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）
 * @deprecated 数组去重
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

/**
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * 检查元素是否有类
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * 将类添加到元素
 * @param {HTMLElement} ele 目标元素
 * @param {string} cls 类名
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * 从元素中删除类
 * @param {HTMLElement} ele 目标元素
 * @param {string} cls 类名
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

// 2022-04-28 15:54:00 add
/**
 * 校验输入的密码强度
 * @param {string} pwd 要校验的密码字符串
 * @returns lv 密码强度
 */
export function checkPwa(pwd) {
  let lv = 0
  if (pwd.length < 6) return lv
  if (/[0-9]/.test(pwd)) lv++
  if (/[a-z]/.test(pwd)) lv++
  if (/[A-Z]/.test(pwd)) lv++
  if (/[\.|-|_,.?':~`!@#$%^&*()]/.test(pwd)) lv++
  return lv
}
/**
 * 获取评分数
 * @param {number} rate 评分级别
 * @returns 星级数量
 */
export function getRate(rate) {
  return '★★★★★☆☆☆☆☆'.slice(5 - rate, 10 - rate)
}
/**
 * 保留 n 位小数
 * @param {float} num 浮点型小数
 * @param {number} n 要保留的小数位数
 * @returns
 */
export function filterToFixed (num, n = 2) {
  return parseFloat(num.toFixed(n), 10)
}
/**
 * 金额转大写
 * @param {float} money 浮点型的金额数字
 * @returns
 */
export function convertCurrency (money) {
  // 汉字的数字
  const cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  // 基本单位
  const cnIntRadice = ['', '拾', '佰', '仟']
  // 对应整数部分扩展单位
  const cnIntUnits = ['', '万', '亿', '兆']
  // 对应小数部分单位
  const cnDecUnits = ['角', '分', '毫', '厘']
  // 整数金额时后面跟的字符
  const cnInteger = '整'
  // 整型完以后的单位
  const cnIntLast = '元'
  // 最大处理的数字
  const maxNum = 999999999999999.9999
  // 金额整数部分
  let integerNum
  // 金额小数部分
  let decimalNum
  // 输出的中文金额字符串
  let chineseStr = ''
  // 分离金额后用的数组，预定义
  let parts
  // 传入的参数为空情况
  if (money === '') {
    return ''
  }
  money = parseFloat(money)
  if (money >= maxNum) {
    return ''
  }
  // 传入的参数为0情况
  if (money === 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger
    return chineseStr
  }
  // 转为字符串
  money = money.toString()
  // indexOf 检测某字符在字符串中首次出现的位置 返回索引值（从0 开始） -1 代表无
  if (money.indexOf('.') === -1) {
    integerNum = money
    decimalNum = ''
  } else {
    parts = money.split('.')
    integerNum = parts[0]
    decimalNum = parts[1].substr(0, 4)
  }
  // 转换整数部分
  if (parseInt(integerNum, 10) > 0) {
    let zeroCount = 0
    const IntLen = integerNum.length
    for (let i = 0; i < IntLen; i++) {
      const n = integerNum.substr(i, 1)
      const p = IntLen - i - 1
      const q = p / 4
      const m = p % 4
      if (n === '0') {
        zeroCount++
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0]
        }
        zeroCount = 0
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m]
      }
      if (m === 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q]
      }
    }
    // 最后+ 元
    chineseStr += cnIntLast
  }
  // 转换小数部分
  if (decimalNum !== '') {
    const decLen = decimalNum.length
    for (let i = 0; i < decLen; i++) {
      const n = decimalNum.substr(i, 1)
      if (n !== '0') {
        chineseStr += cnNums[Number(n)] + cnDecUnits[i]
      }
    }
  }
  if (chineseStr === '') {
    chineseStr += cnNums[0] + cnIntLast + cnInteger
  } else if (decimalNum === '') {
    chineseStr += cnInteger
  }

  return chineseStr
}

/**
 * 解决浮点型运算精度丢失的问题
 */
export const calculation = {
  // 加法
  plus(arg1, arg2) {
    var r1, r2, m
    try {
      r1 = arg1.toString().split('.')[1].length
    } catch (e) {
      r1 = 0
    }
    try {
      r2 = arg2.toString().split('.')[1].length
    } catch (e) {
      r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2))
    return (arg1 * m + arg2 * m) / m
  },
  // 减法
  subtract(arg1, arg2) {
    var r1, r2, m, n
    try {
      r1 = arg1.toString().split('.')[1].length
    } catch (e) {
      r1 = 0
    }
    try {
      r2 = arg2.toString().split('.')[1].length
    } catch (e) {
      r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2))
    n = r1 >= r2 ? r1 : r2
    return ((arg1 * m - arg2 * m) / m).toFixed(n)
  },
  //   乘法
  multiply(arg1, arg2) {
    var m = 0
    var s1 = arg1.toString()
    var s2 = arg2.toString()
    try {
      m += s1.split('.')[1].length
    } catch (e) {
      console.log(e)
    }
    try {
      m += s2.split('.')[1].length
    } catch (e) {
      console.log(e)
    }
    return ((Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m))
  },
  //   除法
  divide(arg1, arg2) {
    var t1 = 0
    var t2 = 0
    var r1
    var r2
    try {
      t1 = arg1.toString().split('.')[1].length
    } catch (e) {
      console.log(e)
    }
    try {
      t2 = arg2.toString().split('.')[1].length
    } catch (e) {
      console.log(e)
    }
    r1 = Number(arg1.toString().replace('.', ''))
    r2 = Number(arg2.toString().replace('.', ''))
    return (r1 / r2) * Math.pow(10, t2 - t1)
  }
}


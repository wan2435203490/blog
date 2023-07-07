/**
 * Created by Wan on 23/6/20.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}


/////////////////////////////
// Element-UI form表单rules规则校验(常用)

export const username = {
  required: true,
  message: '用户名不能为空',
  trigger: 'blur'
}

export const password = {
  required: true,
  message: '密码不能为空',
  trigger: 'blur'
}

export const captcha = {
  required: true,
  message: '验证码不能为空',
  trigger: 'blur'
}

/**必填校验
 *
 * @type {{trigger: string, message: string, required: boolean}}
 */
export const required = {
  required: true,
  message: '请填写此项内容',
  trigger: 'blur'
}

/**手机号校验
 *
 * @type {{pattern: RegExp, trigger: string, message: string}}
 */
export const phone = {
  pattern: /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/,
  message: '请输入正确的手机号',
  trigger: 'blur'
}

/**纯整数校验
 *
 * @type {{pattern: RegExp, trigger: string, message: string}}
 */
export const integer = {
  pattern: /^(\-|\+)?\d+?$/,
  message: '请输入正确的数字',
  trigger: 'blur'
}

/**纯整数或小数校验
 *
 * @type {{pattern: RegExp, trigger: string, message: string}}
 */
export const float = {
  pattern: /^(\-|\+)?\d+(\.\d+)?$/,
  message: '请输入正确的数字（整数或小数）',
  trigger: 'blur'
}

/**日期校验
 *
 * @type {{trigger: string, type: string, message: string}}
 */
export const date = {
  type: 'date',
  message: '请选择日期',
  trigger: 'blur'
}

/**邮箱校验
 *
 * @type {{trigger: string, type: string, message: string}}
 */
export const email = {
  required: true,
  type: 'email',
  message: '请输入正确的邮箱地址',
  trigger: 'blur'
}

/**字符长度校验
 *
 * @param max
 * @param min
 * @returns {{min: number, max: number, trigger: string, message: string}}
 */
export function len(max = 255, min = 0) {
  return {
    min,
    max,
    message: `长度在 ${min} 到 ${max} 个字符`,
    trigger: 'blur'
  }
}

/**微信号校验
 *
 * @type {{pattern: RegExp, trigger: string, message: string}}
 */
export const wecheat = {
  pattern: /^[a-zA-Z][a-zA-Z0-9_-]{5,19}$/,
  message: '请输入正确的微信号',
  trigger: 'blur'
};

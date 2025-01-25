// import Cookies from 'js-cookie'
import Cookies from 'vue-cookies';


/**
 * 保存cookies // TODO 注：cookies的名称key不能设置为以下关键字:['expires'，'max-age'，'path'，'domain'，'secure']
 * @param {•} key 键
 * @param {*} value 值 
 * @param {•} [expires=null] 过期时间（ 默认：1天 ）
 * y:年（ 例如：'3y' 3年后过期 ）
 * m:月（ 例如：'4m' 4个月后过期 ）
 * d:日（ 例如：'7d' 7天后过期 ）
 * h:时（ 例如：'1h' 1小时后过期 ）
 * min:分 （ 例如：'30min' 30分钟后过期 ）
 * s:秒（ 例如：'10s' 10秒钟后过期 ）
 * @param {*} [path=null] 设置路由地址
 * 
 */
export function saveCookies(key, value, expires = null, path = null) {
  Cookies.set(key, value, expires, path)
}

/**
 * 清除Cookies
 * @param {*} key 
 */
export function removeCookies(key) {
  Cookies.remove(key)
}

/**
 * 获取Cookies
 * @param key
 * @return {*}
 */
export function getCookies(key) {
  return Cookies.get(key)
}

/**
 * 是否包含Cookies key
 * @param {*} key 
 * @returns 
 */
export function isCookiesKey(key){
  return Cookies.isKey(key)
}

/**
 * todo 保存LocalStorage
 * @param key
 * @param value
 */
export function saveLocalStorage(key, value) {
  window.localStorage.setItem(key, value)
}

/**
 * todo 清除LocalStorage
 */
export function removeLocalStorage(key) {
  window.localStorage.remove(key)
}

/**
 * todo 清除所有LocalStorage
 */
export function removeAllLocalStorage() {
  window.localStorage.clear()
}

/**
 * todo 保存sessionStorage
 * @param key
 * @param value
 */
export function saveSessionStorage(key, value) {
  window.sessionStorage.setItem(key, value)
}

/**
 * todo 清除sessionStorage
 * @param key
 */
export function removeSessionStorage(key) {
  window.sessionStorage.removeItem(key)
}

/**
 * todo 清除所有sessionStorage
 */
export function removeAllSessionStorage() {
  window.sessionStorage.clear()
}

/**
 * todo 清除所有本地缓存 sessionStorage localStorage
 */
export function removeAll() {
  window.sessionStorage.clear()
  window.localStorage.clear()
}

/**
 * todo 获取LocalStorage
 * @param key
 */
export function getLocalStorage(key) {
  return window.localStorage.getItem(key)
}

/**
 * todo 获取sessionStorage
 * @param key
 */
export function getSessionStorage(key) {
  return window.sessionStorage.getItem(key)
}

export default {
  saveCookies,
  saveLocalStorage,
  saveSessionStorage,
  removeCookies,
  removeLocalStorage,
  removeAllLocalStorage,
  removeSessionStorage,
  removeAllSessionStorage,
  removeAll,
  getCookies,
  isCookiesKey,
  getLocalStorage,
  getSessionStorage,
}

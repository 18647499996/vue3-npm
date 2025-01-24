import Cookies from 'js-cookie'

/**
 * 保存cookies
 * @param key 键
 * @param value 值
 */
export function saveCookies(key, value) {
  Cookies.set(key, value)
}

/**
 * todo 保存Cookies有效期
 * @param key 键
 * @param value 值
 * @param expires 有效期
 */
export function saveCookiesExpires(key, value, expires) {
  Cookies.set(key, value, { expires: expires })
}

/**
 * todo 可以通过配置path,为当前页创建有效期的cookie
 * @param key
 * @param vale
 * @param expires
 * @param path
 */
export function saveCookiesPath(key, vale, expires, path) {
  Cookies.set(key, vale, { expires: expires, path: path })
}

/**
 * todo 清除Cookies
 */
export function removeCookies(key) {
  Cookies.remove(key)
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

/**
 * todo 获取Cookies
 * @param key
 * @return {*}
 */
export function getCookies(key) {
  return Cookies.get(key)
}

/**
 * todo 获取Cookies对象
 * @param key
 * @return {*}
 */
export function getCookiesObject(key) {
  return Cookies.getJSON(key)
}

export default {
  saveCookies,
  saveCookiesExpires,
  saveCookiesPath,
  saveLocalStorage,
  saveSessionStorage,
  removeCookies,
  removeLocalStorage,
  removeAllLocalStorage,
  removeSessionStorage,
  removeAllSessionStorage,
  removeAll,
  getCookies,
  getLocalStorage,
  getSessionStorage,
  getCookiesObject
}
